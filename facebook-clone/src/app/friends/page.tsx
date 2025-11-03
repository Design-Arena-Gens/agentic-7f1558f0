'use client';

import { useMemo } from "react";
import { UserPlus } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Avatar } from "@/components/avatar";
import { useSocial } from "@/context/social-context";

export default function FriendsPage() {
  const { users, currentUser } = useSocial();

  const suggestions = useMemo(
    () => users.filter((user) => user.id !== currentUser?.id),
    [users, currentUser?.id],
  );

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Navbar />
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-6 lg:px-6">
        <header>
          <h1 className="text-2xl font-semibold text-content">Friends</h1>
          <p className="text-sm text-subtle">
            Explore people you might know and expand your circles.
          </p>
        </header>
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {suggestions.map((user) => (
            <div key={user.id} className="card-border space-y-4 p-5">
              <div className="flex items-center gap-3">
                <Avatar src={user.avatar} alt={user.name} size={56} />
                <div>
                  <h2 className="text-sm font-semibold text-content">
                    {user.name}
                  </h2>
                  <p className="text-xs text-subtle">{user.location}</p>
                </div>
              </div>
              <p className="text-sm text-subtle">
                {user.bio}
              </p>
              <button className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent/90">
                <UserPlus className="h-4 w-4" />
                Add friend
              </button>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
