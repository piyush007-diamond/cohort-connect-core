import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const events = [
  {
    title: "Tech Week",
    by: "Programming Club",
    desc: "Join us for a week of workshops and talks...",
    date: "Dec 15-20, 2024",
  },
  {
    title: "Study Group",
    by: "CS Students",
    desc: "Daily problem-solving sessions.",
    date: "Every Tue & Thu",
  },
];

export function SidebarRight() {
  return (
    <aside className="hidden xl:block w-[280px] flex-shrink-0">
      <h2 className="text-sm font-semibold text-foreground mb-3">Events</h2>
      <div className="space-y-3">
        {events.map((e) => (
          <Card key={e.title} className="rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{e.title}</CardTitle>
              <p className="text-xs text-muted-foreground">By: {e.by}</p>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-2">{e.desc}</p>
              <div className="text-xs">📅 {e.date}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </aside>
  );
}
