"use client";

import { ImagePlus, Lock, Users } from "lucide-react";
import { FormEvent, useState } from "react";
import { useSocial } from "@/context/social-context";
import { Avatar } from "./avatar";

const audienceOptions = [
  { value: "friends" as const, label: "Friends", icon: Users },
  { value: "only-me" as const, label: "Only me", icon: Lock },
];

export function PostComposer() {
  const { currentUser, createPost } = useSocial();
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [expandImage, setExpandImage] = useState(false);

  if (!currentUser) return null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!content.trim()) return;
    createPost({
      content,
      image: imageUrl.trim() ? imageUrl.trim() : undefined,
    });
    setContent("");
    setImageUrl("");
    setExpandImage(false);
  };

  return (
    <section className="card-border space-y-4 p-5">
      <header className="flex items-center gap-3">
        <Avatar src={currentUser.avatar} alt={currentUser.name} />
        <div>
          <p className="text-sm font-semibold text-content">
            What&apos;s on your mind, {currentUser.name.split(" ")[0]}?
          </p>
          <div className="flex items-center gap-2 text-xs text-subtle">
            {audienceOptions.map((option) => {
              const Icon = option.icon;
              return (
                <span
                  key={option.value}
                  className="flex items-center gap-1 rounded-full bg-surface-muted px-2 py-1"
                >
                  <Icon className="h-3 w-3" />
                  {option.label}
                </span>
              );
            })}
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Share an update, ask for recommendations, or celebrate something."
          className="min-h-[120px] w-full resize-none rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-content placeholder:text-subtle focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50"
        />

        {expandImage && (
          <input
            type="url"
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            placeholder="Optional image URL"
            className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm text-content placeholder:text-subtle focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        )}

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setExpandImage((state) => !state)}
            className="flex items-center gap-2 rounded-2xl bg-accent-soft px-3 py-2 text-sm font-medium text-accent transition hover:bg-accent/10"
          >
            <ImagePlus className="h-4 w-4" />
            {expandImage ? "Remove image" : "Add image"}
          </button>
          <button
            type="submit"
            className="rounded-2xl bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:bg-accent/50"
            disabled={!content.trim()}
          >
            Post
          </button>
        </div>
      </form>
    </section>
  );
}
