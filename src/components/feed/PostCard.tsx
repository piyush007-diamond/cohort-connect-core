import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle, Share2, MessageSquareMore } from "lucide-react";

export interface Post {
  id: string;
  author: string;
  initials: string;
  year: string;
  subtitle: string;
  text: string;
}

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="mb-4">
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-5">
          <header className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback>{post.initials}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-semibold">{post.author}</div>
                <div className="text-xs text-muted-foreground">{post.year} • {post.subtitle}</div>
              </div>
            </div>
            <Button variant="outline" size="sm">Connect</Button>
          </header>

          <section className="mt-4 text-sm text-foreground">
            <p className="max-h-24 overflow-hidden">
              {post.text} <button className="text-primary hover:underline">see more</button>
            </p>
            {/* Media preview placeholder */}
            <div className="mt-4 h-40 w-full rounded-xl bg-muted" aria-hidden />
          </section>

          <div className="mt-4 grid grid-cols-3 divide-x rounded-lg border">
            <button className="flex items-center justify-center gap-2 py-2 text-sm hover:bg-accent/70 transition-transform duration-200 ease-out hover:scale-[1.02]">
              <MessageCircle size={18} /> Comment
            </button>
            <button className="flex items-center justify-center gap-2 py-2 text-sm hover:bg-accent/70 transition-transform duration-200 ease-out hover:scale-[1.02]">
              <Share2 size={18} /> Share
            </button>
            <button className="flex items-center justify-center gap-2 py-2 text-sm hover:bg-accent/70 transition-transform duration-200 ease-out hover:scale-[1.02]">
              <MessageSquareMore size={18} /> Chat
            </button>
          </div>

          <footer className="mt-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6"><AvatarFallback>MI</AvatarFallback></Avatar>
              <span>Mike: "I'm interested in..."</span>
              <button className="text-primary hover:underline ml-auto">Show all comments</button>
            </div>
          </footer>
        </CardContent>
      </Card>
    </article>
  );
}
