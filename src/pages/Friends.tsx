import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { NavBar } from "@/components/layout/NavBar";
import { FriendsLeftPanel } from "@/components/friends/FriendsLeftPanel";
import { FriendsRightPanel } from "@/components/friends/FriendsRightPanel";

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

// Mock data
const mockFriends: Friend[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    initials: "SJ",
    year: "2nd Year",
    branch: "Computer Science",
    skills: ["React", "Python", "UI/UX"],
    lastMessage: "Hey! Are you free for the study session?",
    lastMessageTime: "10:45 PM",
    isOnline: true,
    unreadCount: 2,
  },
  {
    id: "2", 
    name: "Alex Chen",
    initials: "AC",
    year: "3rd Year",
    branch: "Data Science", 
    skills: ["Machine Learning", "Python", "Statistics"],
    lastMessage: "Thanks for the notes!",
    lastMessageTime: "Yesterday",
    isOnline: false,
    unreadCount: 0,
  },
  {
    id: "3",
    name: "Maria Garcia",
    initials: "MG", 
    year: "1st Year",
    branch: "Design",
    skills: ["Figma", "Adobe Creative Suite", "Prototyping"],
    lastMessage: "The mockups look great",
    lastMessageTime: "2 days ago",
    isOnline: true,
    unreadCount: 1,
  },
];

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
  const [friends] = useState<Friend[]>(mockFriends);
  const [suggestions] = useState<FriendSuggestion[]>(mockSuggestions);

  return (
    <div className="min-h-screen bg-background">
      {/* SEO H1 for page intent */}
      <h1 className="sr-only">Friends - Connect and Chat with College Peers</h1>
      
      <Header onOpenCreate={() => {}} />
      <NavBar />
      
      <main className="flex h-[calc(100vh-8rem)]">
        {/* Left Panel - 1/3 width */}
        <div className="w-1/3 border-r border-border bg-background">
          <FriendsLeftPanel
            friends={friends}
            selectedFriend={selectedFriend}
            onSelectFriend={setSelectedFriend}
            onExploreClick={() => setShowExplore(true)}
          />
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