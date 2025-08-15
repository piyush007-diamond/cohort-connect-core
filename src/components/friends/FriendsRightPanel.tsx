import { MessageCircle } from "lucide-react";
import { type Friend, type FriendSuggestion } from "@/pages/Friends";
import { ChatInterface } from "./ChatInterface";
import { ExploreFriends } from "./ExploreFriends";

interface FriendsRightPanelProps {
  selectedFriend: Friend | null;
  showExplore: boolean;
  suggestions: FriendSuggestion[];
  onBackToChat: () => void;
  onSelectFriend: (friend: Friend) => void;
}

export function FriendsRightPanel({
  selectedFriend,
  showExplore,
  suggestions,
  onBackToChat,
  onSelectFriend,
}: FriendsRightPanelProps) {
  if (showExplore) {
    return (
      <ExploreFriends
        suggestions={suggestions}
        onBack={onBackToChat}
      />
    );
  }

  if (selectedFriend) {
    return (
      <ChatInterface
        friend={selectedFriend}
        onProfileClick={() => {
          // Navigate to friend's profile
          console.log("Navigate to profile:", selectedFriend.id);
        }}
      />
    );
  }

  // Default state - no chat selected
  return (
    <div className="h-full flex items-center justify-center bg-muted/30">
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <MessageCircle className="w-8 h-8 text-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            Select a conversation to start chatting
          </h3>
          <p className="text-muted-foreground max-w-md">
            Choose from your friends list to start a conversation or explore new connections
          </p>
        </div>
      </div>
    </div>
  );
}