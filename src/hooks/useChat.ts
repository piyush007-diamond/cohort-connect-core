import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export interface ChatMessage {
  id: string;
  content: string;
  sender_id: string;
  receiver_id: string;
  created_at: string;
  is_read: boolean;
  media_urls?: string[];
  sender?: {
    id: string;
    full_name: string;
    username: string;
    profile_pic_url?: string;
  };
}

export const useChat = (friendId: string) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    if (!user || !friendId) return;

    try {
      console.log('Fetching messages between:', user.id, 'and', friendId);
      
      const { data, error } = await supabase
        .from('direct_messages')
        .select(`
          *,
          sender:profiles!sender_id(id, full_name, username, profile_pic_url)
        `)
        .or(`and(sender_id.eq.${user.id},receiver_id.eq.${friendId}),and(sender_id.eq.${friendId},receiver_id.eq.${user.id})`)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        toast.error('Failed to load messages');
        return;
      }

      console.log('Fetched messages:', data);
      setMessages(data || []);
    } catch (error) {
      console.error('Error in fetchMessages:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (content: string, mediaUrls?: string[]) => {
    if (!user || !friendId || (!content.trim() && !mediaUrls?.length)) return;

    try {
      console.log('Sending message from', user.id, 'to', friendId, ':', content);
      
      const { data, error } = await supabase
        .from('direct_messages')
        .insert({
          content: content.trim() || null,
          sender_id: user.id,
          receiver_id: friendId,
          is_read: false,
          media_urls: mediaUrls || null
        })
        .select(`
          *,
          sender:profiles!sender_id(id, full_name, username, profile_pic_url)
        `)
        .single();

      if (error) {
        console.error('Error sending message:', error);
        toast.error('Failed to send message');
        return;
      }

      console.log('Message sent successfully:', data);
      
      // Add message to local state immediately for better UX
      setMessages(prev => [...prev, data]);
      
      return data;
    } catch (error) {
      console.error('Error in sendMessage:', error);
      toast.error('Failed to send message');
    }
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    if (!user) return null;

    try {
      console.log('Uploading file:', file.name, 'Size:', file.size);
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('chat-attachments')
        .upload(fileName, file);

      if (error) {
        console.error('Error uploading file:', error);
        toast.error(`Failed to upload file: ${error.message}`);
        return null;
      }

      console.log('File uploaded successfully:', data);

      const { data: { publicUrl } } = supabase.storage
        .from('chat-attachments')
        .getPublicUrl(data.path);

      console.log('Public URL generated:', publicUrl);
      return publicUrl;
    } catch (error) {
      console.error('Error in uploadFile:', error);
      toast.error('Failed to upload file');
      return null;
    }
  };

  const markMessagesAsRead = async () => {
    if (!user || !friendId) return;

    try {
      const { error } = await supabase
        .from('direct_messages')
        .update({ is_read: true })
        .eq('sender_id', friendId)
        .eq('receiver_id', user.id)
        .eq('is_read', false);

      if (error) {
        console.error('Error marking messages as read:', error);
        return;
      }

      // Update local state
      setMessages(prev => 
        prev.map(msg => 
          msg.sender_id === friendId && msg.receiver_id === user.id 
            ? { ...msg, is_read: true }
            : msg
        )
      );
    } catch (error) {
      console.error('Error in markMessagesAsRead:', error);
    }
  };

  useEffect(() => {
    if (user && friendId) {
      fetchMessages();
      markMessagesAsRead();

      // Set up real-time subscription for new messages
      const channel = supabase
        .channel(`chat-${user.id}-${friendId}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'direct_messages',
            filter: `or(and(sender_id.eq.${user.id},receiver_id.eq.${friendId}),and(sender_id.eq.${friendId},receiver_id.eq.${user.id}))`,
          },
          async (payload) => {
            console.log('Real-time message received:', payload);
            
            // Fetch the complete message with sender info
            const { data } = await supabase
              .from('direct_messages')
              .select(`
                *,
                sender:profiles!sender_id(id, full_name, username, profile_pic_url)
              `)
              .eq('id', payload.new.id)
              .single();

            if (data) {
              setMessages(prev => {
                // Check if message already exists to avoid duplicates
                if (prev.some(msg => msg.id === data.id)) {
                  return prev;
                }
                return [...prev, data];
              });

              // Mark as read if it's from the friend
              if (data.sender_id === friendId) {
                markMessagesAsRead();
              }
            }
          }
        )
        .subscribe();

      console.log('Real-time subscription set up for chat');

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user, friendId]);

  return {
    messages,
    loading,
    sendMessage,
    uploadFile,
    markMessagesAsRead,
    refreshMessages: fetchMessages
  };
};
