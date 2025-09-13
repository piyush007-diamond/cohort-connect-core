import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Notification {
  id: string;
  type: string | null;
  content: string | null;
  related_id: string | null;
  is_read: boolean | null;
  created_at: string | null;
  user_id: string | null;
  requester?: {
    id: string;
    full_name: string;
    username: string;
    profile_pic_url: string | null;
  };
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchNotifications = async () => {
    if (!user) {
      console.log('No user found for notifications');
      return;
    }

    console.log('Fetching notifications for user:', user.id);

    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) {
        console.error('Error fetching notifications:', error);
        return;
      }

      console.log('Raw notifications from database:', data);

      // Fetch requester details for friend request notifications
      const enrichedNotifications = await Promise.all(
        (data || []).map(async (notification) => {
          if (notification.type === 'friend_request' && notification.related_id) {
            // For friend requests, related_id contains the connection_id
            // We need to get the requester info from the connections table
            const { data: connection } = await supabase
              .from('connections')
              .select(`
                requester_id,
                requester:profiles!connections_requester_id_fkey(
                  id, full_name, username, profile_pic_url
                )
              `)
              .eq('id', notification.related_id)
              .single();
            
            return { ...notification, requester: connection?.requester };
          }
          return notification;
        })
      );

      console.log('Fetched notifications:', enrichedNotifications);
      console.log('Setting notifications state with:', enrichedNotifications.length, 'items');
      console.log('Unread count will be:', enrichedNotifications.filter(n => !n.is_read).length);
      
      setNotifications(enrichedNotifications);
      setUnreadCount(enrichedNotifications.filter(n => !n.is_read).length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId);

      if (error) {
        console.error('Error marking notification as read:', error);
        return;
      }

      // Update local state
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', user.id)
        .eq('is_read', false);

      if (error) {
        console.error('Error marking all notifications as read:', error);
        return;
      }

      // Update local state
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  useEffect(() => {
    if (user) {
      console.log('Setting up notifications for user:', user.id);
      fetchNotifications();

      // Set up real-time subscription for new notifications
      const channel = supabase
        .channel('notifications')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'notifications',
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            console.log('Real-time notification received:', payload);
            fetchNotifications(); // Refresh notifications when new one arrives
          }
        )
        .subscribe();

      console.log('Real-time subscription set up for notifications');

      return () => {
        supabase.removeChannel(channel);
      };
    } else {
      console.log('No user available for notifications setup');
    }
  }, [user]);

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    refreshNotifications: fetchNotifications
  };
};
