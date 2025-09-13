import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus, Search, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useUserSearch, SearchUser } from "@/hooks/useUserSearch";
import { UserProfileModal } from "@/components/modals/UserProfileModal";


export function Header({ onOpenCreate }: { onOpenCreate: () => void }) {
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);
  const [selectedUser, setSelectedUser] = useState<SearchUser | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const { users, loading } = useUserSearch(q);

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to sign out. Please try again.',
      });
    } else {
      toast({
        title: 'Signed Out',
        description: 'You have been successfully signed out.',
      });
    }
  };

  const handleUserClick = (clickedUser: SearchUser) => {
    setSelectedUser(clickedUser);
    setShowUserModal(true);
    setQ("");
    setFocused(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="font-bold text-lg tracking-tight text-foreground select-none">
            Campus<span className="text-primary">Connect</span>
          </div>
        </div>

        <div className="relative hidden md:flex md:items-center md:w-[320px]">
          <Search className="absolute left-3 text-muted-foreground" size={18} aria-hidden />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            placeholder="Search students, groups, clubs..."
            className="pl-9 rounded-xl"
            aria-label="Search students, groups, clubs"
          />
          {(focused || q) && (users.length > 0 || loading) && (
            <div className="absolute top-11 w-full bg-popover text-popover-foreground rounded-xl shadow-lg border border-border z-50">
              <ul className="max-h-80 overflow-auto py-2">
                {loading ? (
                  <li className="px-3 py-2 text-center text-sm text-muted-foreground">
                    Searching...
                  </li>
                ) : users.length > 0 ? (
                  users.map((user) => {
                    const initials = user.full_name
                      .split(' ')
                      .map(name => name.charAt(0))
                      .join('')
                      .toUpperCase()
                      .slice(0, 2);
                    
                    return (
                      <li key={user.id}
                          onClick={() => handleUserClick(user)}
                          className="px-3 py-2 hover:bg-accent/70 cursor-pointer transition-colors">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{initials}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="text-sm font-medium leading-tight">{user.full_name}</div>
                            <div className="text-xs text-muted-foreground">
                              {user.year_of_study && user.branch 
                                ? `${user.year_of_study} • ${user.branch}`
                                : user.year_of_study || user.branch || '@' + user.username
                              }
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })
                ) : q.trim().length >= 2 ? (
                  <li className="px-3 py-2 text-center text-sm text-muted-foreground">
                    No users found
                  </li>
                ) : null}
              </ul>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button size="icon" onClick={onOpenCreate} aria-label="Create post">
            <Plus />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {user?.user_metadata?.full_name?.charAt(0)?.toUpperCase() || 
                     user?.email?.charAt(0)?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem 
                className="cursor-pointer"
                onClick={() => window.location.href = '/profile'}
              >
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer text-destructive focus:text-destructive"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <UserProfileModal 
        user={selectedUser}
        open={showUserModal}
        onOpenChange={setShowUserModal}
      />
    </header>
  );
}
