import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const myClubs = [
  { id: 'photo', name: 'Photography Club', emoji: '📷', unread: 2 },
  { id: 'coding', name: 'Coding Club', emoji: '💻', unread: 8 },
  { id: 'drama', name: 'Drama Society', emoji: '🎭', unread: 1 },
];

const groupsByClub: Record<string, Array<{ name: string; icon: string; members: string[]; admin?: string }>> = {
  photo: [
    { name: 'Main Chat', icon: '📸', members: ['Piyush Hire', 'Nikshay Balki', 'Alex Doe', 'Lia Kim', 'Sam Wu'] },
    { name: 'Art Directors', icon: '🎨', members: ['Sarah Chen', 'Mike Brown', 'Priya S'], admin: 'Sarah Chen' },
    { name: 'Social Media Team', icon: '📱', members: ['Ava Patel', 'Diego R', 'Zara K', 'Noah L', 'Mina J', 'Kaito N'], admin: 'Sarah Chen' },
  ],
  coding: [
    { name: 'Hackathon', icon: '⚡', members: ['Ted', 'Ivy', 'Liam', 'Nora'] },
  ],
  drama: [
    { name: 'Stage Crew', icon: '🎭', members: ['Ana', 'Ben', 'Cara'] },
  ],
};

export function ClubSidebarLeft() {
  const [selected, setSelected] = useState<string | null>('photo');
  const selectedGroups = useMemo(() => (selected ? groupsByClub[selected] ?? [] : []), [selected]);

  return (
    <aside className="hidden lg:block w-[280px] flex-shrink-0">
      <div className="mb-4">
        <label className="sr-only" htmlFor="club-search">Search clubs</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <Input id="club-search" placeholder="Search clubs..." className="pl-9 rounded-xl" />
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-sm font-semibold mb-2">My Clubs</h2>
        <div className="space-y-2">
          {myClubs.map(c => (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-colors hover:bg-muted ${selected===c.id ? 'bg-muted' : ''}`}
              aria-pressed={selected===c.id}
            >
              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-lg" aria-hidden>
                <span>{c.emoji}</span>
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-semibold">{c.name}</div>
              </div>
              {c.unread > 0 && (
                <Badge className="rounded-full" variant="secondary">{c.unread}</Badge>
              )}
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div className="mt-6">
          <button className="w-full flex items-center justify-between p-3 rounded-lg border">
            <span className="text-sm font-semibold">{myClubs.find(c=>c.id===selected)?.name}</span>
            <ChevronDown size={16} />
          </button>

          <div className="mt-3">
            <div className="text-xs font-semibold text-muted-foreground mb-2">Club Groups</div>
            <Accordion type="single" collapsible className="w-full">
              {selectedGroups.map((g, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger className="py-2 px-2 rounded-lg hover:no-underline">
                    <div className="flex items-center gap-2 text-sm">
                      <span>{g.icon}</span>
                      <span className="font-medium">{myClubs.find(c=>c.id===selected)?.name}/{g.name}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-8 pr-2 pb-2">
                    {g.admin && (
                      <div className="text-xs text-muted-foreground mb-1">Admin: {g.admin}</div>
                    )}
                    <ul className="space-y-1 text-xs">
                      {g.members.slice(0,3).map((m) => (
                        <li key={m} className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full bg-accent" aria-hidden />
                          <span>{m}</span>
                        </li>
                      ))}
                      {g.members.length > 3 && (
                        <li className="text-xs text-muted-foreground">[+{g.members.length - 3} more]</li>
                      )}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      )}
    </aside>
  );
}
