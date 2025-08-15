import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Sparkles } from "lucide-react";
import { type Friend } from "@/pages/Friends";

interface FriendsLeftPanelProps {
  friends: Friend[];
  selectedFriend: Friend | null;
  onSelectFriend: (friend: Friend) => void;
  onExploreClick: () => void;
}

export function FriendsLeftPanel({
  friends,
  selectedFriend,
  onSelectFriend,
  onExploreClick,
}: FriendsLeftPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col p-4">
      {/* Explore Friends Button */}
      <Button
        onClick={onExploreClick}
        className="w-full mb-4 h-12 relative overflow-hidden group"
        style={{ background: "var(--gradient-primary)" }}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-shine" />
        </div>
        <Sparkles className="mr-2 h-4 w-4" />
        <span className="relative z-10 font-semibold">Explore Friends</span>
      </Button>

      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search your connections"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Friends List */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {filteredFriends.map((friend) => (
          <div
            key={friend.id}
            onClick={() => onSelectFriend(friend)}
            className={`p-3 rounded-lg cursor-pointer transition-all duration-200 border ${
              selectedFriend?.id === friend.id
                ? "bg-primary/10 border-primary"
                : "bg-card border-border hover:bg-muted hover:border-primary/30"
            } hover:transform hover:scale-[1.02] hover:shadow-md`}
          >
            <div className="flex items-center space-x-3">
              {/* Profile Photo with Online Status */}
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={friend.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {friend.initials}
                  </AvatarFallback>
                </Avatar>
                {friend.isOnline && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-accent border-2 border-background rounded-full" />
                )}
              </div>

              {/* Friend Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground truncate">
                    {friend.name}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {friend.lastMessageTime}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {friend.lastMessage || "No messages yet"}
                </p>
              </div>

              {/* Unread Badge */}
              {friend.unreadCount && friend.unreadCount > 0 && (
                <Badge variant="destructive" className="h-5 min-w-[20px] rounded-full text-xs">
                  {friend.unreadCount}
                </Badge>
              )}
            </div>
          </div>
        ))}

        {filteredFriends.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            {searchQuery ? "No friends found" : "No connections yet"}
          </div>
        )}
      </div>
    </div>
  );
}