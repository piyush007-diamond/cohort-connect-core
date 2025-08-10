import { Card, CardContent } from "@/components/ui/card";

const events = [
  { title: 'Tech Week', updated: true },
  { title: 'Workshop', updated: false },
  { title: 'Demo Day', updated: false },
  { title: 'Tutorial Series', updated: false },
  { title: 'Study Session', updated: false },
];

export function EventsGrid() {
  return (
    <div className="space-y-6">
      <Section title="Main Events">
        <Grid>
          {events.slice(0,3).map(e => (
            <EventCard key={e.title} title={e.title} updated={e.updated} />
          ))}
        </Grid>
      </Section>

      <Section title="Club Service">
        <Grid>
          {events.slice(3).map(e => (
            <EventCard key={e.title} title={e.title} updated={e.updated} />
          ))}
        </Grid>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground my-2 flex items-center gap-2">
        <span className="flex-1 border-t" />
        <span className="whitespace-nowrap">{title}</span>
        <span className="flex-1 border-t" />
      </div>
      {children}
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {children}
    </div>
  );
}

function EventCard({ title, updated }: { title: string; updated?: boolean }) {
  return (
    <Card className="rounded-2xl overflow-hidden transition-transform duration-200 hover:-translate-y-1">
      <div className="h-[120px] w-full bg-muted" aria-label={`${title} image`} />
      <CardContent className="p-4 text-center">
        <div className="text-sm font-semibold">{title}</div>
        {updated && <div className="text-xs text-muted-foreground">Updated</div>}
      </CardContent>
    </Card>
  );
}
