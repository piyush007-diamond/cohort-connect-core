import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  author?: {
    id: string;
    full_name: string;
    username: string;
    profile_pic_url?: string;
    branch?: string;
    year_of_study?: string;
  };
}

export const useComments = (postId: string) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    if (!postId) return;

    try {
      console.log('Fetching comments for post:', postId);
      
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          author:profiles!author_id(
            id,
            full_name,
            username,
            profile_pic_url,
            branch,
            year_of_study
          )
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching comments:', error);
        toast.error('Failed to load comments');
        return;
      }

      console.log('Fetched comments:', data);
      setComments(data || []);
    } catch (error) {
      console.error('Error in fetchComments:', error);
    } finally {
      setLoading(false);
    }
  };

  const createComment = async (content: string) => {
    if (!user || !postId || !content.trim()) return null;

    try {
      console.log('Creating comment:', { postId, content });
      
      const { data, error } = await supabase
        .from('comments')
        .insert({
          post_id: postId,
          author_id: user.id,
          content: content.trim()
        })
        .select(`
          *,
          author:profiles!author_id(
            id,
            full_name,
            username,
            profile_pic_url,
            branch,
            year_of_study
          )
        `)
        .single();

      if (error) {
        console.error('Error creating comment:', error);
        toast.error('Failed to post comment');
        return null;
      }

      console.log('Comment created successfully:', data);
      
      // Add comment to local state immediately
      setComments(prev => [...prev, data]);
      
      toast.success('Comment posted!');
      return data;
    } catch (error) {
      console.error('Error in createComment:', error);
      toast.error('Failed to post comment');
      return null;
    }
  };

  const deleteComment = async (commentId: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId)
        .eq('author_id', user.id);

      if (error) {
        console.error('Error deleting comment:', error);
        toast.error('Failed to delete comment');
        return false;
      }

      // Remove comment from local state
      setComments(prev => prev.filter(comment => comment.id !== commentId));
      toast.success('Comment deleted');
      return true;
    } catch (error) {
      console.error('Error in deleteComment:', error);
      toast.error('Failed to delete comment');
      return false;
    }
  };

  useEffect(() => {
    if (postId) {
      fetchComments();

      // Set up real-time subscription for new comments
      const channel = supabase
        .channel(`comments-${postId}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'comments',
            filter: `post_id=eq.${postId}`,
          },
          async (payload) => {
            console.log('Real-time comment received:', payload);
            
            // Fetch the complete comment with author info
            const { data } = await supabase
              .from('comments')
              .select(`
                *,
                author:profiles!author_id(
                  id,
                  full_name,
                  username,
                  profile_pic_url,
                  branch,
                  year_of_study
                )
              `)
              .eq('id', payload.new.id)
              .single();

            if (data) {
              setComments(prev => {
                // Check if comment already exists to avoid duplicates
                if (prev.some(comment => comment.id === data.id)) {
                  return prev;
                }
                return [...prev, data];
              });
            }
          }
        )
        .subscribe();

      console.log('Real-time subscription set up for comments');

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [postId]);

  return {
    comments,
    loading,
    createComment,
    deleteComment,
    refreshComments: fetchComments
  };
};
