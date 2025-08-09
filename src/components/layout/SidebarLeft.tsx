import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const chats = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  name: ["John Doe", "Jane Smith", "Mike Brown", "Alex Chen", "Sara Lee"][i % 5],
  time: ["2d", "1h", "3h", "5m"][i % 4],
  preview: ["Hey, about...", "Thanks for...", "Let's meet...", "See you at..."][i % 4],
  unread: i % 3 === 0 ? (i % 2 === 0 ? 3 : 1) : 0,
  initials: ["JD", "JS", "MB", "AC", "SL"][i % 5],
}));

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
  return (
    <aside className="hidden lg:block w-[280px] flex-shrink-0">
      <section aria-labelledby="friends-heading" className="mb-6">
        <h2 id="friends-heading" className="text-sm font-semibold text-foreground mb-3">Friends</h2>
        <div className="rounded-lg border border-border bg-card">
          <ul className="max-h-[540px] overflow-auto divide-y">
            {chats.map((c) => (
              <li key={c.id} className="px-3 py-3 hover:bg-accent/70 transition-colors">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{c.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium truncate">{c.name}</span>
                      <span className="text-xs text-muted-foreground">{c.time}</span>
                    </div>
                    <div className="text-xs text-muted-foreground truncate">{c.preview}</div>
                  </div>
                  {c.unread > 0 && (
                    <Badge className="ml-1" variant="secondary">{c.unread}</Badge>
                  )}
                </div>
              </li>
            ))}
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
