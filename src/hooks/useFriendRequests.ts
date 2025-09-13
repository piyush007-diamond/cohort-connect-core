import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface FriendRequest {
  id: string;
  requester_id: string;
  receiver_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}

export const useFriendRequests = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const sendFriendRequest = useCallback(async (receiverId: string) => {
    if (!user) return { error: 'User not authenticated' };

    setLoading(true);
    try {
      // Check if connection already exists
      const { data: existingConnection } = await supabase
        .from('connections')
        .select('*')
        .or(`and(requester_id.eq.${user.id},receiver_id.eq.${receiverId}),and(requester_id.eq.${receiverId},receiver_id.eq.${user.id})`)
        .single();

      if (existingConnection) {
        toast({
          variant: 'destructive',
          title: 'Connection exists',
          description: 'You already have a connection with this user.',
        });
        return { error: 'Connection already exists' };
      }

      // Create friend request
      const { data, error } = await supabase
        .from('connections')
        .insert({
          requester_id: user.id,
          receiver_id: receiverId,
          status: 'pending'
        })
        .select()
        .single();

      if (error) {
        console.error('Error sending friend request:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to send friend request. Please try again.',
        });
        return { error: error.message };
      }

      // Create notification for the receiver
      await supabase
        .from('notifications')
        .insert({
          user_id: receiverId,
          type: 'friend_request',
          title: 'New Friend Request',
          message: 'You have a new friend request',
          data: { connection_id: data.id, requester_id: user.id }
        });

      toast({
        title: 'Friend request sent!',
        description: 'Your friend request has been sent successfully.',
      });

      return { data };
    } catch (error) {
      console.error('Error sending friend request:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to send friend request. Please try again.',
      });
      return { error: 'Failed to send friend request' };
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  const acceptFriendRequest = useCallback(async (connectionId: string) => {
    if (!user) return { error: 'User not authenticated' };

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('connections')
        .update({ status: 'accepted' })
        .eq('id', connectionId)
        .select()
        .single();

      if (error) {
        console.error('Error accepting friend request:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to accept friend request. Please try again.',
        });
        return { error: error.message };
      }

      // Create notification for the requester
      await supabase
        .from('notifications')
        .insert({
          user_id: data.requester_id,
          type: 'friend_request_accepted',
          title: 'Friend Request Accepted',
          message: 'Your friend request has been accepted',
          data: { connection_id: connectionId }
        });

      toast({
        title: 'Friend request accepted!',
        description: 'You are now friends.',
      });

      return { data };
    } catch (error) {
      console.error('Error accepting friend request:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to accept friend request. Please try again.',
      });
      return { error: 'Failed to accept friend request' };
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  const rejectFriendRequest = useCallback(async (connectionId: string) => {
    if (!user) return { error: 'User not authenticated' };

    setLoading(true);
    try {
      const { error } = await supabase
        .from('connections')
        .update({ status: 'rejected' })
        .eq('id', connectionId);

      if (error) {
        console.error('Error rejecting friend request:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to reject friend request. Please try again.',
        });
        return { error: error.message };
      }

      toast({
        title: 'Friend request rejected',
        description: 'The friend request has been rejected.',
      });

      return { success: true };
    } catch (error) {
      console.error('Error rejecting friend request:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to reject friend request. Please try again.',
      });
      return { error: 'Failed to reject friend request' };
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  const checkConnectionStatus = useCallback(async (userId: string) => {
    if (!user) return null;

    try {
      const { data } = await supabase
        .from('connections')
        .select('*')
        .or(`and(requester_id.eq.${user.id},receiver_id.eq.${userId}),and(requester_id.eq.${userId},receiver_id.eq.${user.id})`)
        .single();

      return data;
    } catch (error) {
      return null;
    }
  }, [user]);

  return {
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    checkConnectionStatus,
    loading
  };
};
