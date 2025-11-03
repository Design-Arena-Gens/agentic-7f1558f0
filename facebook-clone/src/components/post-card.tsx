"use client";

import Image from "next/image";
import {
  Bookmark,
  Globe,
  Heart,
  MessageCircle,
  Share2,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useSocial } from "@/context/social-context";
import { users } from "@/lib/data";
import { cn, timeAgo } from "@/lib/utils";
import { Post } from "@/types/social";
import { Avatar } from "./avatar";
import { CommentThread } from "./comment-thread";

type PostCardProps = {
  post: Post;
};

const privacyIcons = {
  public: Globe,
  friends: Users,
  "only-me": Bookmark,
};

export function PostCard({ post }: PostCardProps) {
  const { currentUser, toggleLike } = useSocial();
  const author = users.find((user) => user.id === post.userId);
  const [showComments, setShowComments] = useState(true);
  if (!author) return null;

  const Icon = privacyIcons[post.privacy];
  const liked =
    currentUser != null ? post.likes.includes(currentUser.id) : false;

  return (
    <article className="card-border space-y-4 p-5">
      <header className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar src={author.avatar} alt={author.name} />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-content">
                {author.name}
              </span>
              <span className="text-xs text-subtle">· {timeAgo(post.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-subtle">
              <Icon className="h-3 w-3" />
              {post.privacy === "public"
                ? "Public"
                : post.privacy === "friends"
                  ? "Friends"
                  : "Only me"}
              {post.audienceSummary && <>· {post.audienceSummary}</>}
            </div>
          </div>
        </div>
        <button className="rounded-full bg-surface-muted px-3 py-1 text-xs font-medium text-subtle">
          Follow
        </button>
      </header>

      <div className="space-y-3">
        <p className="text-sm leading-relaxed text-content">{post.content}</p>
        {post.image && (
          <div className="relative aspect-video w-full overflow-hidden rounded-3xl">
            <Image
              src={post.image}
              alt="Post media"
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-subtle">
        <span>
          <strong className="font-semibold text-content">
            {post.likes.length}
          </strong>{" "}
          likes
        </span>
        <div className="flex items-center gap-3">
          <span>{post.comments.length} comments</span>
          <span>{post.shares} shares</span>
        </div>
      </div>

      <footer className="flex items-center justify-between border-t border-border pt-4">
        <button
          onClick={() => toggleLike(post.id)}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition hover:bg-surface-muted",
            liked && "text-accent",
          )}
        >
          <Heart className={cn("h-4 w-4", liked && "fill-accent text-accent")} />
          Like
        </button>
        <button
          onClick={() => setShowComments((state) => !state)}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium text-subtle transition hover:bg-surface-muted"
        >
          <MessageCircle className="h-4 w-4" />
          Comment
        </button>
        <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium text-subtle transition hover:bg-surface-muted">
          <Share2 className="h-4 w-4" />
          Share
        </button>
      </footer>

      {showComments && (
        <CommentThread postId={post.id} comments={post.comments} />
      )}
    </article>
  );
}
