"use client";

import { FormEvent, useState } from "react";
import { useSocial } from "@/context/social-context";
import { Comment } from "@/types/social";
import { users } from "@/lib/data";
import { timeAgo } from "@/lib/utils";
import { Avatar } from "./avatar";

type CommentThreadProps = {
  postId: string;
  comments: Comment[];
};

export function CommentThread({ postId, comments }: CommentThreadProps) {
  const { addComment, currentUser } = useSocial();
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!message.trim()) return;
    addComment(postId, message.trim());
    setMessage("");
  };

  return (
    <div className="space-y-4">
      <ul className="space-y-3">
        {comments.map((comment) => {
          const author = users.find((user) => user.id === comment.userId);
          if (!author) return null;
          return (
            <li key={comment.id} className="flex gap-3">
              <Avatar src={author.avatar} alt={author.name} size={36} />
              <div className="relative w-full rounded-2xl bg-surface-muted/70 px-3 py-2">
                <p className="text-xs font-semibold text-content">
                  {author.name}
                </p>
                <p className="text-sm text-content">{comment.message}</p>
                <span className="mt-2 inline-block text-[11px] uppercase tracking-wide text-subtle">
                  {timeAgo(comment.createdAt)}
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="flex items-start gap-3 rounded-2xl border border-border px-3 py-2"
        >
          <Avatar src={currentUser.avatar} alt={currentUser.name} size={36} />
          <div className="flex flex-1 flex-col gap-2">
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Write a comment..."
              className="w-full rounded-full bg-surface-muted px-4 py-2 text-sm text-content placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:bg-accent/50"
                disabled={!message.trim()}
              >
                Send
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
