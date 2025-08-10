import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/layout/Header";
import { NavBar } from "@/components/layout/NavBar";
import { PostCard, type Post } from "@/components/feed/PostCard";
import { ClubSidebarLeft } from "@/components/club/ClubSidebarLeft";
import { ClubSidebarRight } from "@/components/club/ClubSidebarRight";
import { ClubTabs } from "@/components/club/ClubTabs";

const mockPosts: Post[] = [
  {
    id: "c1",
    author: "Photography Club",
    initials: "PC",
    year: "Club",
    subtitle: "Announcements, Events",
    text: "Welcome to the Photography Club! Share your work, join events, and collaborate on projects.",
  },
];

export default function Clubs() {
  const [openCreate] = useState(false); // reserved for future modal
  const posts = useMemo(() => mockPosts, []);

  useEffect(() => {
    document.title = "Clubs | Campus Connect";
  }, []);

  return (
    <div>
      <h1 className="sr-only">Clubs — Collaboration, Resources, Events, and Workflows</h1>
      <Header onOpenCreate={() => {}} />
      <NavBar />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-[280px,1fr] xl:grid-cols-[280px,1fr,280px] gap-6">
        <ClubSidebarLeft />

        <section aria-labelledby="club-content" className="min-w-0">
          <h2 id="club-content" className="sr-only">Club Content</h2>
          <ClubTabs posts={posts} />
        </section>

        <ClubSidebarRight />
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Clubs',
            url: '/clubs',
            description: 'Discover clubs and collaborate on resources, events, and workflows.'
          })
        }}
      />
    </div>
  );
}
