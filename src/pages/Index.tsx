import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { NavBar } from "@/components/layout/NavBar";
import { SidebarLeft } from "@/components/layout/SidebarLeft";
import { SidebarRight } from "@/components/layout/SidebarRight";
import { PostCard, type Post } from "@/components/feed/PostCard";
import { PostSkeleton } from "@/components/feed/PostSkeleton";
import { CreatePostModal } from "@/components/modals/CreatePostModal";
import { SignatureMoment } from "@/components/SignatureMoment";
import { usePosts } from "@/hooks/usePosts";
import { useAuth } from "@/hooks/useAuth";

// Transform database post to UI post format
const transformPost = (dbPost: any): Post => {
  const initials = dbPost.author?.full_name
    ?.split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase() || 'U';

  const skills = dbPost.author?.skills || [];
  const subtitle = [
    dbPost.author?.branch,
    dbPost.author?.year_of_study,
    ...skills.slice(0, 2)
  ].filter(Boolean).join(', ');

  return {
    id: dbPost.id,
    author: dbPost.author?.full_name || 'Unknown User',
    initials,
    year: dbPost.author?.year_of_study || '',
    subtitle,
    text: dbPost.content,
  };
};

const Index = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const { posts: dbPosts, loading } = usePosts();
  const { user } = useAuth();

  const posts = dbPosts.map(transformPost);
  
  console.log('Index page - dbPosts count:', dbPosts.length);
  console.log('Index page - transformed posts:', posts);

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
          ) : posts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No posts yet. Be the first to share something!</p>
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

      <CreatePostModal 
        open={openCreate} 
        onOpenChange={setOpenCreate}
        currentUser={user}
      />
    </div>
  );
};

export default Index;
