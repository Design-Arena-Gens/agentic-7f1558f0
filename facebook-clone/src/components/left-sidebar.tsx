"use client";

import Link from "next/link";
import {
  Bookmark,
  Clock,
  Flag,
  LayoutDashboard,
  PlaySquare,
  Users,
} from "lucide-react";
import { useSocial } from "@/context/social-context";
import { cn } from "@/lib/utils";
import { Avatar } from "./avatar";

const shortcuts = [
  { label: "Your pages", icon: Flag, href: "/pages" },
  { label: "Watch", icon: PlaySquare, href: "/watch" },
  { label: "Saved", icon: Bookmark, href: "/saved" },
  { label: "Memories", icon: Clock, href: "/memories" },
  { label: "Groups", icon: Users, href: "/groups" },
  { label: "Market", icon: LayoutDashboard, href: "/marketplace" },
];

export function LeftSidebar() {
  const { currentUser } = useSocial();

  return (
    <aside className="sticky top-20 hidden h-[calc(100vh-80px)] w-72 flex-col gap-6 overflow-y-auto rounded-3xl border border-border bg-surface-card p-5 shadow-lg lg:flex">
      {currentUser && (
        <Link
          href={`/profile/${currentUser.username}`}
          className="flex items-center gap-3 rounded-2xl p-2 transition hover:bg-surface-muted"
        >
          <Avatar src={currentUser.avatar} alt={currentUser.name} size={48} />
          <div>
            <p className="text-sm font-semibold text-content">
              {currentUser.name}
            </p>
            <p className="text-xs text-subtle">View your profile</p>
          </div>
        </Link>
      )}

      <div>
        <h3 className="px-2 text-xs font-semibold uppercase tracking-wide text-subtle">
          Menu
        </h3>
        <ul className="mt-3 space-y-1">
          {shortcuts.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-3 py-2 text-sm text-content transition hover:bg-surface-muted",
                  )}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-muted text-accent">
                    <Icon className="h-4 w-4" />
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
