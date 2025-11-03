"use client";

import { useSocial } from "@/context/social-context";
import { PostCard } from "./post-card";
import { PostComposer } from "./post-composer";
import { StoryRail } from "./story-rail";

export function Feed() {
  const { posts } = useSocial();

  return (
    <main className="flex w-full max-w-2xl flex-col gap-6">
      <StoryRail />
      <PostComposer />
      <div className="flex flex-col gap-5">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
