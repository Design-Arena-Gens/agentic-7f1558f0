'use client';

import { useCallback } from "react";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { Avatar } from "@/components/avatar";
import { Navbar } from "@/components/navbar";
import { useSocial } from "@/context/social-context";

export default function LoginPage() {
  const { users, currentUser, login } = useSocial();

  const handleLogin = useCallback(
    (userId: string) => () => {
      login(userId);
    },
    [login],
  );

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Navbar />
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-4 py-10 lg:px-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold text-content">
            Switch account
          </h1>
          {currentUser && (
            <p className="text-sm text-subtle">
              You&apos;re currently signed in as {currentUser.name}.
            </p>
          )}
        </header>
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {users.map((user) => (
            <button
              key={user.id}
              onClick={handleLogin(user.id)}
              className="card-border flex items-center gap-3 rounded-3xl p-5 text-left transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <Avatar src={user.avatar} alt={user.name} size={64} />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-content">
                  {user.name}
                </span>
                <span className="text-xs text-subtle">{user.jobTitle}</span>
              </div>
              <LogIn className="ml-auto h-5 w-5 text-accent" />
            </button>
          ))}
        </section>
        <Link
          href="/"
          className="text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          Return to feed
        </Link>
      </div>
    </div>
  );
}
