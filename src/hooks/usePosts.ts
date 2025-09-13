import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export interface Post {
  id: string;
  content: string;
  author_id: string;
  created_at: string;
  updated_at: string | null;
  is_published: boolean;
  visibility: string | null;
  media_urls: string[] | null;
  scheduled_time: string | null;
  author?: {
    id: string;
    full_name: string;
    username: string;
    profile_pic_url?: string;
    branch?: string;
    year_of_study?: string;
    skills?: string[];
  };
}

export const usePosts = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      console.log('Fetching posts...');
      
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          author:profiles!author_id(
            id,
            full_name,
            username,
            profile_pic_url,
            branch,
            year_of_study,
            skills
          )
        `)
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        toast.error('Failed to load posts');
        return;
      }

      console.log('Fetched posts count:', data?.length);
      console.log('Posts data:', data);
      setPosts(data || []);
    } catch (error) {
      console.error('Error in fetchPosts:', error);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (content: string, visibility: string = 'everyone', mediaUrls?: string[]) => {
    if (!user || !content.trim()) return null;

    try {
      console.log('Creating post:', { content, visibility, mediaUrls });
      
      const { data, error } = await supabase
        .from('posts')
        .insert({
          content: content.trim(),
          author_id: user.id,
          visibility,
          is_published: true,
          media_urls: mediaUrls || null
        })
        .select(`
          *,
          author:profiles!author_id(
            id,
            full_name,
            username,
            profile_pic_url,
            branch,
            year_of_study,
            skills
          )
        `)
        .single();

      if (error) {
        console.error('Error creating post:', error);
        toast.error('Failed to create post');
        return null;
      }

      console.log('Post created successfully:', data);
      
      // Add post to local state immediately for better UX
      setPosts(prev => [data, ...prev]);
      
      // Also refresh posts to ensure consistency
      await fetchPosts();
      
      toast.success('Post created successfully!');
      return data;
    } catch (error) {
      console.error('Error in createPost:', error);
      toast.error('Failed to create post');
      return null;
    }
  };

  const uploadPostMedia = async (file: File): Promise<string | null> => {
    if (!user) return null;

    try {
      console.log('Uploading post media:', file.name);
      const fileExt = file.name.split('.').pop();
      const fileName = `posts/${user.id}/${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('post-media')
        .upload(fileName, file);

      if (error) {
        console.error('Error uploading media:', error);
        toast.error('Failed to upload media');
        return null;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('post-media')
        .getPublicUrl(data.path);

      console.log('Media uploaded successfully:', publicUrl);
      return publicUrl;
    } catch (error) {
      console.error('Error in uploadPostMedia:', error);
      toast.error('Failed to upload media');
      return null;
    }
  };

  useEffect(() => {
    fetchPosts();

    // Set up real-time subscription for new posts
    const channel = supabase
      .channel('posts')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'posts',
          filter: 'is_published.eq.true',
        },
        async (payload) => {
          console.log('Real-time post received:', payload);
          
          // Fetch the complete post with author info
          const { data } = await supabase
            .from('posts')
            .select(`
              *,
              author:profiles!author_id(
                id,
                full_name,
                username,
                profile_pic_url,
                branch,
                year_of_study,
                skills
              )
            `)
            .eq('id', payload.new.id)
            .single();

          if (data) {
            console.log('Adding real-time post to feed:', data);
            setPosts(prev => {
              // Check if post already exists to avoid duplicates
              if (prev.some(post => post.id === data.id)) {
                console.log('Post already exists in feed, skipping');
                return prev;
              }
              console.log('Adding new post to beginning of feed');
              return [data, ...prev];
            });
          }
        }
      )
      .subscribe();

    console.log('Real-time subscription set up for posts');

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    posts,
    loading,
    createPost,
    uploadPostMedia,
    refreshPosts: fetchPosts
  };
};
