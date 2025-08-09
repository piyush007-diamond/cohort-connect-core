import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchResult {
  id: string;
  name: string;
  year: string;
  major: string;
  initials: string;
}

const mockResults: SearchResult[] = [
  { id: "1", name: "Sarah Johnson", year: "2nd Year", major: "Computer Science", initials: "SJ" },
  { id: "2", name: "Alex Chen", year: "3rd Year", major: "Data Science", initials: "AC" },
  { id: "3", name: "Jane Smith", year: "1st Year", major: "Design", initials: "JS" },
  { id: "4", name: "Mike Brown", year: "4th Year", major: "Mechanical Eng.", initials: "MB" },
];

export function Header({ onOpenCreate }: { onOpenCreate: () => void }) {
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);

  const results = useMemo(() => {
    if (!q.trim()) return [] as SearchResult[];
    const t = q.toLowerCase();
    return mockResults.filter(r => r.name.toLowerCase().includes(t) || r.major.toLowerCase().includes(t));
  }, [q]);

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
          {(focused || q) && results.length > 0 && (
            <div className="absolute top-11 w-full bg-popover text-popover-foreground rounded-xl shadow-lg border border-border z-50">
              <ul className="max-h-80 overflow-auto py-2">
                {results.map((r) => (
                  <li key={r.id}
                      className="px-3 py-2 hover:bg-accent/70 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{r.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="text-sm font-medium leading-tight">{r.name}</div>
                        <div className="text-xs text-muted-foreground">{r.year} • {r.major}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button size="icon" onClick={onOpenCreate} aria-label="Create post">
            <Plus />
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarFallback>CC</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
