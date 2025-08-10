import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PostCard, type Post } from "@/components/feed/PostCard";
import { ResourceFilters } from "./resources/ResourceFilters";
import { EventsGrid } from "./events/EventsGrid";
import { WorkflowCanvas } from "./workflow/WorkflowCanvas";

export function ClubTabs({ posts }: { posts: Post[] }) {
  return (
    <Tabs defaultValue="feed" className="w-full">
      <div className="sticky top-16 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
        <TabsList className="h-12 gap-2 px-2">
          <TabsTrigger value="feed" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Feed</TabsTrigger>
          <TabsTrigger value="resources" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Resources</TabsTrigger>
          <TabsTrigger value="events" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Events</TabsTrigger>
          <TabsTrigger value="course" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Course</TabsTrigger>
          <TabsTrigger value="workflow" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Workflow</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="feed" className="mt-4">
        <div className="grid grid-cols-3">
          <div className="flex justify-center">
            <Button className="rounded-xl w-28">Post</Button>
          </div>
          <div />
          <div className="flex justify-center">
            <Button variant="outline" className="rounded-xl w-28">Chat</Button>
          </div>
        </div>
        <div className="mt-4 space-y-4">
          {posts.map(p => (<PostCard key={p.id} post={p} />))}
        </div>
      </TabsContent>

      <TabsContent value="resources" className="mt-4">
        <ResourceFilters />
        <div className="mt-3 space-y-2">
          {[{n:'Project Templates', t:'Documents', d:'2d'}, {n:'Design Assets', t:'Images', d:'5h'}, {n:'Meeting Notes', t:'Documents', d:'1w'}, {n:'Event Photos', t:'Images', d:'3d'}].map((f) => (
            <div key={f.n} className="flex items-center justify-between p-4 rounded-xl border hover:bg-muted transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-xl">📁</span>
                <div>
                  <div className="text-sm font-semibold">{f.n}</div>
                  <div className="text-xs text-muted-foreground">{f.t}</div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">{f.d}</div>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="events" className="mt-4">
        <EventsGrid />
      </TabsContent>

      <TabsContent value="course" className="mt-4">
        <div className="rounded-xl border p-6 text-sm text-muted-foreground">Course materials and modules will appear here.</div>
      </TabsContent>

      <TabsContent value="workflow" className="mt-4">
        <WorkflowCanvas />
      </TabsContent>
    </Tabs>
  );
}
