import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { NavBar } from "@/components/layout/NavBar";
import { FriendsLeftPanel } from "@/components/friends/FriendsLeftPanel";
import { FriendsRightPanel } from "@/components/friends/FriendsRightPanel";
import { useFriends, Friend as DatabaseFriend } from "@/hooks/useFriends";

export interface Friend {
  id: string;
  name: string;
  initials: string;
  year: string;
  branch: string;
  skills: string[];
  lastMessage?: string;
  lastMessageTime?: string;
  isOnline: boolean;
  unreadCount?: number;
  avatar?: string;
}

// Transform database friend to UI friend format
const transformFriend = (dbFriend: DatabaseFriend): Friend => {
  const initials = dbFriend.full_name
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return {
    id: dbFriend.id,
    name: dbFriend.full_name,
    initials,
    year: dbFriend.year_of_study || 'Unknown',
    branch: dbFriend.branch || 'Unknown',
    skills: dbFriend.skills || [],
    lastMessage: 'Start a conversation',
    lastMessageTime: '',
    isOnline: dbFriend.is_online || false,
    unreadCount: 0,
    avatar: dbFriend.profile_pic_url || undefined
  };
};

export interface FriendSuggestion {
  id: string;
  name: string;
  initials: string;
  year: string;
  branch: string;
  skills: string[];
  reason: string;
  avatar?: string;
}

const mockSuggestions: FriendSuggestion[] = [
  {
    id: "s1",
    name: "David Kumar",
    initials: "DK",
    year: "3rd Year", 
    branch: "Computer Science",
    skills: ["JavaScript", "Node.js", "React", "MongoDB"],
    reason: "Based on your profile",
  },
  {
    id: "s2",
    name: "Emma Wilson",
    initials: "EW",
    year: "2nd Year",
    branch: "Design",
    skills: ["UI/UX", "Figma", "Adobe XD"],
    reason: "Shares skills in Design",
  },
  {
    id: "s3",
    name: "Raj Patel",
    initials: "RP", 
    year: "4th Year",
    branch: "Engineering",
    skills: ["Python", "Machine Learning", "Data Analysis"],
    reason: "Based on your recent activity",
  },
];

const Friends = () => {
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [showExplore, setShowExplore] = useState(false);
  const [suggestions] = useState<FriendSuggestion[]>(mockSuggestions);
  const { friends: dbFriends, loading } = useFriends();
  const [searchParams] = useSearchParams();
  
  // Transform database friends to UI format
  const friends = dbFriends.map(transformFriend);

  // Handle URL parameter for direct chat navigation
  useEffect(() => {
    const chatFriendId = searchParams.get('chat');
    if (chatFriendId && friends.length > 0) {
      const friendToSelect = friends.find(friend => friend.id === chatFriendId);
      if (friendToSelect) {
        setSelectedFriend(friendToSelect);
        setShowExplore(false);
      }
    }
  }, [searchParams, friends]);

  return (
    <div className="min-h-screen bg-background">
      {/* SEO H1 for page intent */}
      <h1 className="sr-only">Friends - Connect and Chat with College Peers</h1>
      
      <Header onOpenCreate={() => {}} />
      <NavBar />
      
      <main className="flex h-[calc(100vh-8rem)]">
        {/* Left Panel - 1/3 width */}
        <div className="w-1/3 border-r border-border bg-background">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-sm text-muted-foreground">Loading friends...</div>
            </div>
          ) : (
            <FriendsLeftPanel
              friends={friends}
              selectedFriend={selectedFriend}
              onSelectFriend={setSelectedFriend}
              onExploreClick={() => setShowExplore(true)}
            />
          )}
        </div>
        
        {/* Right Panel - 2/3 width */}
        <div className="w-2/3 bg-background">
          <FriendsRightPanel
            selectedFriend={selectedFriend}
            showExplore={showExplore}
            suggestions={suggestions}
            onBackToChat={() => setShowExplore(false)}
            onSelectFriend={setSelectedFriend}
          />
        </div>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Friends - Campus Connect',
            url: '/friends',
            description: 'Connect with college peers, chat in real-time, and discover new study partners.'
          })
        }}
      />
    </div>
  );
};

export default Friends;