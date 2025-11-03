"use client";

import { Plus } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";
import { useSocial } from "@/context/social-context";
import { stories, users } from "@/lib/data";
import { Avatar } from "./avatar";

export function StoryRail() {
  const { currentUser } = useSocial();

  const storyCards = useMemo(() => {
    const availableStories = stories.map((story) => {
      const author = users.find((user) => user.id === story.userId);
      return {
        ...story,
        author,
      };
    });
    return availableStories;
  }, []);

  return (
    <section className="card-border flex gap-3 overflow-hidden p-4">
      {currentUser && (
        <button className="flex w-32 shrink-0 flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-border bg-surface-muted/60 px-4 py-6 text-sm font-medium text-subtle transition hover:border-accent hover:text-accent">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow">
            <Plus className="h-5 w-5" />
          </div>
          Add story
        </button>
      )}
      <div className="flex gap-3 overflow-x-auto">
        {storyCards.map((story) => (
          <article
            key={story.id}
            className="relative flex h-48 w-32 shrink-0 flex-col justify-between overflow-hidden rounded-3xl"
          >
            <Image
              src={story.backgroundImage}
              alt={story.caption}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            {story.author && (
              <div className="relative z-10 px-3 pt-3">
                <Avatar
                  src={story.author.avatar}
                  alt={story.author.name}
                  size={40}
                  className="border-2 border-white"
                />
              </div>
            )}
            <p className="relative z-10 px-3 pb-4 text-xs font-semibold text-white">
              {story.caption}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
