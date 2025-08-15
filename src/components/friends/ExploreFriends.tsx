import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, Plus, ArrowLeft } from "lucide-react";
import { type FriendSuggestion } from "@/pages/Friends";

interface ExploreFriendsProps {
  suggestions: FriendSuggestion[];
  onBack: () => void;
}

export function ExploreFriends({ suggestions, onBack }: ExploreFriendsProps) {
  const [visibleSuggestions, setVisibleSuggestions] = useState<FriendSuggestion[]>(suggestions);
  const [pendingConnections, setPendingConnections] = useState<Set<string>>(new Set());

  const handleConnect = (suggestionId: string) => {
    setPendingConnections(prev => new Set([...prev, suggestionId]));
  };

  const handleDismiss = (suggestionId: string) => {
    setVisibleSuggestions(prev => prev.filter(s => s.id !== suggestionId));
  };

  const truncateSkills = (skills: string[], maxLength: number = 50) => {
    const skillsText = skills.join(", ");
    if (skillsText.length <= maxLength) return skillsText;
    return skillsText.substring(0, maxLength) + "...";
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border bg-card">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Explore Friends</h1>
            <p className="text-sm text-muted-foreground">
              People you may know based on your recent activity
            </p>
          </div>
        </div>
      </div>

      {/* Suggestions Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleSuggestions.map((suggestion) => {
            const isPending = pendingConnections.has(suggestion.id);
            
            return (
              <div
                key={suggestion.id}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:transform hover:scale-[1.02] transition-all duration-200 relative group"
              >
                {/* Dismiss Button */}
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDismiss(suggestion.id)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity rounded-full h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>

                {/* Profile Section */}
                <div className="text-center space-y-4">
                  <div className="relative inline-block">
                    <Avatar className="h-16 w-16 mx-auto">
                      <AvatarImage src={suggestion.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                        {suggestion.initials}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {/* User Info */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      <h3 className="font-semibold text-foreground">{suggestion.name}</h3>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{suggestion.year}</span>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        {suggestion.branch}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {truncateSkills(suggestion.skills)}
                      </p>
                    </div>

                    <p className="text-xs italic text-muted-foreground">
                      {suggestion.reason}
                    </p>
                  </div>

                  {/* Connect Button */}
                  <Button
                    onClick={() => handleConnect(suggestion.id)}
                    disabled={isPending}
                    className={`w-full transition-all duration-200 ${
                      isPending 
                        ? "bg-muted text-muted-foreground cursor-not-allowed" 
                        : ""
                    }`}
                    style={!isPending ? { background: "var(--gradient-primary)" } : {}}
                  >
                    {isPending ? (
                      <>
                        Pending
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Connect
                      </>
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {visibleSuggestions.length === 0 && (
          <div className="text-center py-12">
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <Plus className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No more suggestions
                </h3>
                <p className="text-muted-foreground">
                  You've seen all available friend suggestions for now.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}