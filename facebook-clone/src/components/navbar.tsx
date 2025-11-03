"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Home,
  MessageCircle,
  Search,
  ShoppingBag,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useSocial } from "@/context/social-context";
import { cn, timeAgo } from "@/lib/utils";
import { Avatar } from "./avatar";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/friends", icon: Users, label: "Friends" },
  { href: "/marketplace", icon: ShoppingBag, label: "Marketplace" },
  { href: "/messages", icon: MessageCircle, label: "Messages" },
];

export function Navbar() {
  const pathname = usePathname();
  const { currentUser, notifications, markNotificationAsRead } = useSocial();
  const [showNotifications, setShowNotifications] = useState(false);
  const unread = useMemo(
    () => notifications.filter((item) => !item.read),
    [notifications],
  );

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-border bg-surface-card/95 px-6 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-surface-card/75">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white font-semibold text-xl"
        >
          sa
        </Link>
        <div className="relative hidden sm:flex items-center">
          <Search className="pointer-events-none absolute left-3 h-4 w-4 text-subtle" />
          <input
            className="h-10 w-64 rounded-full bg-surface-muted pl-10 pr-4 text-sm text-content placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Search Social Atlas"
          />
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex h-11 w-20 items-center justify-center rounded-xl text-subtle transition",
                isActive
                  ? "bg-accent-soft text-accent"
                  : "hover:bg-surface-muted",
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="sr-only">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-3">
        <Link
          href="/messages"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-muted text-subtle transition hover:bg-accent-soft hover:text-accent"
        >
          <MessageCircle className="h-5 w-5" />
        </Link>
        <button
          className={cn(
            "relative flex h-10 w-10 items-center justify-center rounded-full bg-surface-muted text-subtle transition hover:bg-accent-soft hover:text-accent",
            showNotifications && "bg-accent-soft text-accent",
          )}
          onClick={() => setShowNotifications((state) => !state)}
        >
          <Bell className="h-5 w-5" />
          {unread.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[10px] font-semibold text-white">
              {unread.length}
            </span>
          )}
        </button>
        {currentUser && (
          <Link href={`/profile/${currentUser.username}`}>
            <Avatar src={currentUser.avatar} alt={currentUser.name} size={40} />
          </Link>
        )}
      </div>

      {showNotifications && (
        <div className="absolute right-6 top-16 w-80 rounded-2xl border border-border bg-surface-card p-4 shadow-xl">
          <div className="flex items-center justify-between pb-2">
            <h2 className="text-sm font-semibold text-content">Notifications</h2>
            <span className="text-xs text-subtle">{unread.length} unread</span>
          </div>
          <ul className="space-y-3">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={cn(
                  "flex flex-col gap-1 rounded-2xl p-3 transition",
                  notification.read
                    ? "bg-surface"
                    : "bg-accent-soft text-accent",
                )}
              >
                <span className="text-sm">{notification.message}</span>
                <div className="flex items-center justify-between text-xs text-subtle">
                  <span>{timeAgo(notification.createdAt)}</span>
                  {!notification.read && (
                    <button
                      className="text-xs font-medium text-accent underline-offset-2 hover:underline"
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      Mark read
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
