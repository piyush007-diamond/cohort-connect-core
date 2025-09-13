import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFriends } from "@/hooks/useFriends";
import { useNavigate } from "react-router-dom";


const groups = [
  { name: "Study Group CS", unread: 5 },
  { name: "Web Dev Team", unread: 12 },
  { name: "Data Science", unread: 3 },
];

const clubs = [
  { name: "Photography Club", unread: 2 },
  { name: "Coding Club", unread: 8 },
  { name: "Debate Society", unread: 1 },
];

export function SidebarLeft() {
  const { friends, loading } = useFriends();
  const navigate = useNavigate();

  const handleFriendClick = (friendId: string) => {
    navigate(`/friends?chat=${friendId}`);
  };

  return (
    <aside className="hidden lg:block w-[280px] flex-shrink-0">
      <section aria-labelledby="friends-heading" className="mb-6">
        <h2 id="friends-heading" className="text-sm font-semibold text-foreground mb-3">Friends</h2>
        <div className="rounded-lg border border-border bg-card">
          <ul className="max-h-[540px] overflow-auto divide-y">
            {loading ? (
              <li className="px-3 py-3">
                <div className="text-xs text-muted-foreground">Loading friends...</div>
              </li>
            ) : friends.length === 0 ? (
              <li className="px-3 py-3">
                <div className="text-xs text-muted-foreground">No friends yet</div>
              </li>
            ) : (
              friends.map((friend) => {
                const initials = friend.full_name
                  .split(' ')
                  .map(n => n[0])
                  .join('')
                  .toUpperCase();
                
                return (
                  <li 
                    key={friend.id} 
                    className="px-3 py-3 hover:bg-accent/70 transition-colors cursor-pointer"
                    onClick={() => handleFriendClick(friend.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={friend.profile_pic_url || undefined} />
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium truncate">{friend.full_name}</span>
                          <span className="text-xs text-muted-foreground">
                            {friend.is_online ? 'Active' : 'Offline'}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {friend.branch} • {friend.year_of_study}
                        </div>
                      </div>
                      {friend.is_online && (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </section>

      <section aria-labelledby="groups-heading" className="mb-6">
        <h2 id="groups-heading" className="text-sm font-semibold text-foreground mb-3">Groups</h2>
        <div className="space-y-2">
          {groups.map((g) => (
            <div key={g.name} className="rounded-lg border border-border bg-card px-3 py-2 flex items-center justify-between">
              <span className="text-sm">{g.name}</span>
              <Badge variant="secondary">{g.unread}</Badge>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="clubs-heading">
        <h2 id="clubs-heading" className="text-sm font-semibold text-foreground mb-3">Clubs</h2>
        <div className="space-y-2">
          {clubs.map((c) => (
            <div key={c.name} className="rounded-lg border border-border bg-card px-3 py-2 flex items-center justify-between">
              <span className="text-sm">{c.name}</span>
              <Badge variant="secondary">{c.unread}</Badge>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}
