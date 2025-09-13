import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { UserPlus, MessageCircle, Check, X, Clock } from 'lucide-react';
import { SearchUser } from '@/hooks/useUserSearch';
import { useFriendRequests } from '@/hooks/useFriendRequests';

interface UserProfileModalProps {
  user: SearchUser | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UserProfileModal = ({ user, open, onOpenChange }: UserProfileModalProps) => {
  const [connectionStatus, setConnectionStatus] = useState<any>(null);
  const { sendFriendRequest, checkConnectionStatus, loading } = useFriendRequests();

  useEffect(() => {
    if (user && open) {
      checkConnectionStatus(user.id).then(setConnectionStatus);
    }
  }, [user, open, checkConnectionStatus]);

  const handleSendFriendRequest = async () => {
    if (!user) return;
    
    const result = await sendFriendRequest(user.id);
    if (result.data) {
      // Refresh connection status
      const status = await checkConnectionStatus(user.id);
      setConnectionStatus(status);
    }
  };

  const getConnectionButton = () => {
    if (!connectionStatus) {
      return (
        <Button onClick={handleSendFriendRequest} disabled={loading} className="flex-1">
          <UserPlus className="w-4 h-4 mr-2" />
          {loading ? 'Sending...' : 'Add Friend'}
        </Button>
      );
    }

    switch (connectionStatus.status) {
      case 'pending':
        if (connectionStatus.requester_id === user?.id) {
          return (
            <Button variant="outline" disabled className="flex-1">
              <Clock className="w-4 h-4 mr-2" />
              Request Received
            </Button>
          );
        } else {
          return (
            <Button variant="outline" disabled className="flex-1">
              <Clock className="w-4 h-4 mr-2" />
              Request Sent
            </Button>
          );
        }
      case 'accepted':
        return (
          <Button variant="outline" disabled className="flex-1">
            <Check className="w-4 h-4 mr-2" />
            Friends
          </Button>
        );
      case 'rejected':
        return (
          <Button variant="outline" disabled className="flex-1">
            <X className="w-4 h-4 mr-2" />
            Request Rejected
          </Button>
        );
      default:
        return (
          <Button onClick={handleSendFriendRequest} disabled={loading} className="flex-1">
            <UserPlus className="w-4 h-4 mr-2" />
            {loading ? 'Sending...' : 'Add Friend'}
          </Button>
        );
    }
  };

  if (!user) return null;

  const initials = user.full_name
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4 py-4">
          {/* Profile Picture */}
          <Avatar className="w-24 h-24">
            <AvatarImage src={user.profile_pic_url || undefined} alt={user.full_name} />
            <AvatarFallback className="text-lg">{initials}</AvatarFallback>
          </Avatar>

          {/* User Info */}
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold">{user.full_name}</h3>
            <p className="text-sm text-muted-foreground">@{user.username}</p>
            
            {(user.year_of_study || user.branch) && (
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                {user.year_of_study && <span>{user.year_of_study}</span>}
                {user.year_of_study && user.branch && <span>•</span>}
                {user.branch && <span>{user.branch}</span>}
              </div>
            )}
          </div>

          {/* Bio */}
          {user.bio && (
            <p className="text-sm text-center text-muted-foreground max-w-sm">
              {user.bio}
            </p>
          )}

          {/* Skills */}
          {user.skills && user.skills.length > 0 && (
            <div className="w-full">
              <h4 className="text-sm font-medium mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 w-full pt-4">
            {getConnectionButton()}
            <Button variant="outline" className="flex-1">
              <MessageCircle className="w-4 h-4 mr-2" />
              Message
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
