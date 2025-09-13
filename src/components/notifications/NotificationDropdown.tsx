import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Bell, Check, X, UserPlus } from 'lucide-react';
import { useNotifications, Notification } from '@/hooks/useNotifications';
import { useFriendRequests } from '@/hooks/useFriendRequests';
import { formatDistanceToNow } from 'date-fns';

export const NotificationDropdown = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const { acceptFriendRequest, rejectFriendRequest, loading } = useFriendRequests();
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());

  const handleAcceptFriendRequest = async (notification: Notification) => {
    if (!notification.related_id) return;
    
    setProcessingIds(prev => new Set(prev).add(notification.id));
    const result = await acceptFriendRequest(notification.related_id);
    
    if (result.data) {
      markAsRead(notification.id);
    }
    
    setProcessingIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(notification.id);
      return newSet;
    });
  };

  const handleRejectFriendRequest = async (notification: Notification) => {
    if (!notification.related_id) return;
    
    setProcessingIds(prev => new Set(prev).add(notification.id));
    const result = await rejectFriendRequest(notification.related_id);
    
    if (result.success) {
      markAsRead(notification.id);
    }
    
    setProcessingIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(notification.id);
      return newSet;
    });
  };

  const renderNotificationContent = (notification: Notification) => {
    const isProcessing = processingIds.has(notification.id);
    
    switch (notification.type) {
      case 'friend_request':
        const requester = notification.requester;
        if (!requester) return null;
        
        const initials = requester.full_name
          .split(' ')
          .map(name => name.charAt(0))
          .join('')
          .toUpperCase()
          .slice(0, 2);

        return (
          <div className="flex items-start gap-3 p-3 hover:bg-accent/50 transition-colors">
            <Avatar className="h-10 w-10 flex-shrink-0">
              <AvatarImage src={requester.profile_pic_url || undefined} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <UserPlus className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Friend Request</span>
                {!notification.is_read && (
                  <Badge variant="secondary" className="h-2 w-2 p-0 rounded-full bg-blue-500" />
                )}
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">
                <span className="font-medium text-foreground">{requester.full_name}</span> sent you a friend request
              </p>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => handleAcceptFriendRequest(notification)}
                  disabled={isProcessing || loading}
                  className="h-7 px-3 text-xs"
                >
                  <Check className="h-3 w-3 mr-1" />
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleRejectFriendRequest(notification)}
                  disabled={isProcessing || loading}
                  className="h-7 px-3 text-xs"
                >
                  <X className="h-3 w-3 mr-1" />
                  Decline
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground mt-2">
                {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
        );

      case 'friend_request_accepted':
        return (
          <div className="flex items-start gap-3 p-3 hover:bg-accent/50 transition-colors">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <Check className="h-5 w-5 text-green-600" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium">Friend Request Accepted</span>
                {!notification.is_read && (
                  <Badge variant="secondary" className="h-2 w-2 p-0 rounded-full bg-green-500" />
                )}
              </div>
              
              <p className="text-sm text-muted-foreground mb-1">
                {notification.content}
              </p>
              
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-start gap-3 p-3 hover:bg-accent/50 transition-colors">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Bell className="h-5 w-5 text-blue-600" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium">Notification</span>
                {!notification.is_read && (
                  <Badge variant="secondary" className="h-2 w-2 p-0 rounded-full bg-blue-500" />
                )}
              </div>
              
              <p className="text-sm text-muted-foreground mb-1">
                {notification.content}
              </p>
              
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-80 max-h-96 overflow-y-auto p-0">
        <div className="flex items-center justify-between p-3 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs h-auto p-1"
            >
              Mark all read
            </Button>
          )}
        </div>
        
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div key={notification.id} onClick={() => !notification.is_read && markAsRead(notification.id)}>
                {renderNotificationContent(notification)}
              </div>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
