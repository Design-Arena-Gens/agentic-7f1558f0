"use client";

import { FormEvent, useMemo, useState } from "react";
import { Send } from "lucide-react";
import Link from "next/link";
import { useSocial } from "@/context/social-context";
import { users } from "@/lib/data";
import { cn, timeAgo } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Avatar } from "@/components/avatar";

export default function MessagesPage() {
  const { conversations, sendMessage, currentUser } = useSocial();
  const [activeConversationId, setActiveConversationId] = useState(
    () => conversations[0]?.id ?? "",
  );
  const [text, setText] = useState("");

  const activeConversation = useMemo(
    () =>
      conversations.find(
        (conversation) => conversation.id === activeConversationId,
      ),
    [activeConversationId, conversations],
  );

  const participants = useMemo(() => {
    if (!activeConversation) return [];
    return activeConversation.participants
      .map((participantId) => users.find((user) => user.id === participantId))
      .filter(Boolean);
  }, [activeConversation]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!text.trim() || !activeConversationId) return;
    sendMessage(activeConversationId, text.trim());
    setText("");
  };

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Navbar />
      <div className="mx-auto flex w-full max-w-6xl flex-1 gap-6 px-4 py-6 lg:px-6">
        <aside className="hidden w-72 flex-col gap-4 rounded-3xl border border-border bg-surface-card p-4 shadow-xl sm:flex">
          <header className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-content">Chats</h2>
            <Link href="/" className="text-xs text-accent">
              Home
            </Link>
          </header>
          <div className="space-y-2">
            {conversations.map((conversation) => {
              const firstParticipant = users.find(
                (user) =>
                  user.id ===
                  conversation.participants.find(
                    (participant) => participant !== currentUser?.id,
                  ),
              );
              const lastMessage = conversation.messages.at(-1);
              return (
                <button
                  key={conversation.id}
                  onClick={() => setActiveConversationId(conversation.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left transition",
                    conversation.id === activeConversationId
                      ? "bg-accent-soft text-accent"
                      : "hover:bg-surface-muted",
                  )}
                >
                  {firstParticipant && (
                    <Avatar
                      src={firstParticipant.avatar}
                      alt={firstParticipant.name}
                      size={44}
                    />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-semibold">
                      {firstParticipant?.name ?? "Chat"}
                    </p>
                    {lastMessage && (
                      <p className="line-clamp-1 text-xs text-subtle">
                        {lastMessage.text}
                      </p>
                    )}
                  </div>
                  {lastMessage && (
                    <span className="text-[10px] uppercase tracking-wider text-subtle">
                      {timeAgo(lastMessage.sentAt)}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        <section className="flex flex-1 flex-col overflow-hidden rounded-3xl border border-border bg-surface-card shadow-xl">
          {activeConversation && (
            <>
              <header className="flex items-center gap-3 border-b border-border px-5 py-4">
                {participants.map((participant) => (
                  <div key={participant!.id} className="flex items-center gap-2">
                    <Avatar
                      src={participant!.avatar}
                      alt={participant!.name}
                      size={40}
                    />
                    <div>
                      <p className="text-sm font-semibold text-content">
                        {participant!.name}
                      </p>
                      <p className="text-xs text-subtle">
                        {participant!.jobTitle} · {participant!.workplace}
                      </p>
                    </div>
                  </div>
                ))}
              </header>
              <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-5 py-6">
                {activeConversation.messages.map((message) => {
                  const sender = users.find(
                    (user) => user.id === message.senderId,
                  );
                  const isCurrentUser = message.senderId === currentUser?.id;
                  return (
                    <div
                      key={message.id}
                      className={cn(
                        "flex items-end gap-3",
                        isCurrentUser && "flex-row-reverse text-right",
                      )}
                    >
                      {sender && (
                        <Avatar
                          src={sender.avatar}
                          alt={sender.name}
                          size={36}
                        />
                      )}
                      <div
                        className={cn(
                          "max-w-md rounded-3xl px-4 py-3 text-sm shadow",
                          isCurrentUser
                            ? "bg-accent text-white"
                            : "bg-surface-muted text-content",
                        )}
                      >
                        <p>{message.text}</p>
                        <span className="mt-2 block text-[10px] uppercase tracking-wider text-white/70">
                          {timeAgo(message.sentAt)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-3 border-t border-border px-5 py-4"
              >
                <input
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  placeholder="Write a message..."
                  className="flex-1 rounded-full border border-border bg-surface px-4 py-3 text-sm text-content placeholder:text-subtle focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:bg-accent/50"
                  disabled={!text.trim()}
                >
                  <Send className="h-4 w-4" />
                  Send
                </button>
              </form>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
