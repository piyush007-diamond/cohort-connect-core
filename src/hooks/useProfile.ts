import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface Profile {
  id: string;
  username: string;
  full_name: string;
  profile_pic_url?: string;
  year_of_study?: string;
  branch?: string;
  skills?: string[];
  bio?: string;
  created_at: string;
  updated_at: string;
  is_online: boolean;
  last_seen: string;
}

export function useProfile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to load profile data.',
        });
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: 'No user found' };

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to update profile.',
        });
        return { error };
      } else {
        setProfile(data);
        toast({
          title: 'Success',
          description: 'Profile updated successfully!',
        });
        return { data };
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      return { error };
    }
  };

  const uploadProfilePicture = async (file: File) => {
    if (!user) return { error: 'No user found' };

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('profile-pictures')
        .upload(fileName, file, { upsert: true });

      if (uploadError) {
        toast({
          variant: 'destructive',
          title: 'Upload Error',
          description: 'Failed to upload profile picture.',
        });
        return { error: uploadError };
      }

      const { data: urlData } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(fileName);

      const profileUpdateResult = await updateProfile({
        profile_pic_url: urlData.publicUrl,
      });

      return profileUpdateResult;
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      return { error };
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return {
    profile,
    loading,
    updateProfile,
    uploadProfilePicture,
    refetch: fetchProfile,
  };
}