import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Friend {
  id: string;
  full_name: string;
  username: string;
  branch: string | null;
  year_of_study: string | null;
  skills: string[] | null;
  profile_pic_url: string | null;
  is_online: boolean | null;
  last_seen: string | null;
  bio: string | null;
  connection_id: string;
}

export interface FriendRequest {
  id: string;
  requester: {
    id: string;
    full_name: string;
    username: string;
    branch: string | null;
    year_of_study: string | null;
    profile_pic_url: string | null;
  };
  created_at: string;
}

export const useFriends = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchFriends = async () => {
    if (!user) return;

    try {
      // Fetch accepted connections
      const { data: connections, error } = await supabase
        .from('connections')
        .select(`
          id,
          requester_id,
          receiver_id,
          requester:profiles!connections_requester_id_fkey(
            id, full_name, username, branch, year_of_study, skills, 
            profile_pic_url, is_online, last_seen, bio
          ),
          receiver:profiles!connections_receiver_id_fkey(
            id, full_name, username, branch, year_of_study, skills, 
            profile_pic_url, is_online, last_seen, bio
          )
        `)
        .eq('status', 'accepted')
        .or(`requester_id.eq.${user.id},receiver_id.eq.${user.id}`);

      if (error) {
        console.error('Error fetching friends:', error);
        return;
      }

      // Transform connections to friends list
      const friendsList: Friend[] = connections?.map(conn => {
        const friend = conn.requester_id === user.id ? conn.receiver : conn.requester;
        return {
          ...friend,
          connection_id: conn.id
        };
      }) || [];

      setFriends(friendsList);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  const fetchFriendRequests = async () => {
    if (!user) return;

    try {
      // Fetch pending friend requests received by current user
      const { data: requests, error } = await supabase
        .from('connections')
        .select(`
          id,
          created_at,
          requester:profiles!connections_requester_id_fkey(
            id, full_name, username, branch, year_of_study, profile_pic_url
          )
        `)
        .eq('receiver_id', user.id)
        .eq('status', 'pending');

      if (error) {
        console.error('Error fetching friend requests:', error);
        return;
      }

      setFriendRequests(requests || []);
    } catch (error) {
      console.error('Error fetching friend requests:', error);
    }
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      Promise.all([fetchFriends(), fetchFriendRequests()])
        .finally(() => setLoading(false));
    }
  }, [user]);

  const refreshData = () => {
    if (user) {
      fetchFriends();
      fetchFriendRequests();
    }
  };

  return {
    friends,
    friendRequests,
    loading,
    refreshData
  };
};
