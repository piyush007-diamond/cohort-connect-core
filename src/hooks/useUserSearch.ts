import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface SearchUser {
  id: string;
  full_name: string;
  username: string;
  branch: string | null;
  year_of_study: string | null;
  skills: string[] | null;
  profile_pic_url: string | null;
  bio: string | null;
}

export const useUserSearch = (query: string) => {
  const [users, setUsers] = useState<SearchUser[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const searchUsers = async () => {
      if (!query.trim() || query.length < 2) {
        setUsers([]);
        return;
      }

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, full_name, username, branch, year_of_study, skills, profile_pic_url, bio')
          .neq('id', user?.id || '') // Exclude current user
          .or(`full_name.ilike.%${query}%,username.ilike.%${query}%,branch.ilike.%${query}%`)
          .limit(10);

        if (error) {
          console.error('Error searching users:', error);
          setUsers([]);
        } else {
          setUsers(data || []);
        }
      } catch (error) {
        console.error('Error searching users:', error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchUsers, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, user?.id]);

  return { users, loading };
};
