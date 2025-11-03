"use client";

import { ArrowUpRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { useSocial } from "@/context/social-context";
import { highlights, trendingTopics, users } from "@/lib/data";
import { timeAgo } from "@/lib/utils";
import { Avatar } from "./avatar";

export function RightSidebar() {
  const { conversations } = useSocial();

  const activeContacts = useMemo(() => {
    const ids = new Set<string>();
    conversations.forEach((conversation) =>
      conversation.participants.forEach((participant) =>
        ids.add(participant),
      ),
    );
    return users.filter((user) => ids.has(user.id));
  }, [conversations]);

  return (
    <aside className="sticky top-20 hidden h-[calc(100vh-80px)] w-80 flex-col gap-6 overflow-y-auto rounded-3xl border border-border bg-surface-card p-5 shadow-lg xl:flex">
      <section>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-content">Trending</h3>
          <button className="text-xs font-medium text-accent">Refresh</button>
        </div>
        <ul className="mt-4 space-y-3">
          {trendingTopics.map((topic) => (
            <li
              key={topic.id}
              className="flex items-start justify-between rounded-2xl border border-border px-3 py-2"
            >
              <div>
                <p className="text-sm font-semibold text-content">
                  {topic.title}
                </p>
                <p className="text-xs text-subtle">{topic.hashtag}</p>
                <p className="text-xs text-subtle">{topic.posts} posts</p>
              </div>
              {topic.trend === "up" && (
                <TrendingUp className="h-4 w-4 text-success" />
              )}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-content">Events</h3>
          <Link href="/events" className="text-xs font-medium text-accent">
            See all
          </Link>
        </div>
        <ul className="mt-4 space-y-3">
          {highlights.map((event) => (
            <li
              key={event.id}
              className="flex items-center justify-between rounded-2xl border border-border px-3 py-3"
            >
              <div>
                <p className="text-sm font-semibold text-content">
                  {event.title}
                </p>
                <p className="text-xs text-subtle">{event.time}</p>
                <p className="text-xs text-subtle">{event.location}</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-accent" />
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-content">Contacts</h3>
          <button className="text-xs text-subtle">Search</button>
        </div>
        <ul className="mt-4 space-y-2">
          {activeContacts.map((contact) => {
            const latestConversation = conversations.find((conversation) =>
              conversation.participants.includes(contact.id),
            );
            const lastMessage = latestConversation?.messages.at(-1);
            return (
              <li
                key={contact.id}
                className="flex items-center gap-3 rounded-2xl px-2 py-2 transition hover:bg-surface-muted"
              >
                <div className="relative">
                  <Avatar src={contact.avatar} alt={contact.name} size={44} />
                  <span className="absolute -bottom-1 -right-0 h-3 w-3 rounded-full border-2 border-surface-card bg-success" />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-medium text-content">
                    {contact.name}
                  </p>
                  {lastMessage && (
                    <span className="text-xs text-subtle">
                      {lastMessage.senderId === contact.id ? "Sent" : "You"} ·{" "}
                      {timeAgo(lastMessage.sentAt)}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </aside>
  );
}
