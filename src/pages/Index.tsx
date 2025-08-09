import { useMemo, useState } from "react";
import { Header } from "@/components/layout/Header";
import { NavBar } from "@/components/layout/NavBar";
import { SidebarLeft } from "@/components/layout/SidebarLeft";
import { SidebarRight } from "@/components/layout/SidebarRight";
import { PostCard, type Post } from "@/components/feed/PostCard";
import { PostSkeleton } from "@/components/feed/PostSkeleton";
import { CreatePostModal } from "@/components/modals/CreatePostModal";
import { SignatureMoment } from "@/components/SignatureMoment";

const mockPosts: Post[] = [
  {
    id: "1",
    author: "Sarah Johnson",
    initials: "SJ",
    year: "2nd Year",
    subtitle: "Computer Science, React, Python",
    text: "Looking for teammates for the upcoming hackathon. We need someone good with backend development and APIs...",
  },
  {
    id: "2",
    author: "Alex Chen",
    initials: "AC",
    year: "3rd Year",
    subtitle: "Data Science, TypeScript",
    text: "Anyone up for a study group this weekend focusing on algorithms and system design?",
  },
];

const Index = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [loading, setLoading] = useState(false);

  const posts = useMemo(() => mockPosts, []);

  return (
    <div>
      {/* SEO H1 for page intent */}
      <h1 className="sr-only">College Student Networking Platform</h1>

      <Header onOpenCreate={() => setOpenCreate(true)} />
      <NavBar />
      <SignatureMoment />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-[280px,1fr] xl:grid-cols-[280px,1fr,280px] gap-6">
        <SidebarLeft />

        <section aria-labelledby="feed-heading" className="min-w-0">
          <h2 id="feed-heading" className="text-base font-semibold mb-3">Feed</h2>
          {loading ? (
            <div className="space-y-4">
              <PostSkeleton />
              <PostSkeleton />
            </div>
          ) : (
            <div>
              {posts.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          )}
        </section>

        <SidebarRight />
      </main>

      <script
        type="application/ld+json"
        // Structured data for SEO
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Campus Connect',
            url: '/',
            description: 'College student networking platform for collaboration and campus communities.'
          })
        }}
      />

      <CreatePostModal open={openCreate} onOpenChange={setOpenCreate} />
    </div>
  );
};

export default Index;
