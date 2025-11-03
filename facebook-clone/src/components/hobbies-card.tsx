"use client";

import { Sparkles } from "lucide-react";
import { User } from "@/types/social";

type HobbiesCardProps = {
  user: User;
};

export function HobbiesCard({ user }: HobbiesCardProps) {
  return (
    <section className="card-border space-y-4 p-5">
      <header className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-content">Hobbies</h3>
        <button className="text-xs font-medium text-accent">Edit</button>
      </header>
      <div className="flex flex-wrap gap-2">
        {user.hobbies.map((hobby) => (
          <span
            key={hobby}
            className="flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent"
          >
            <Sparkles className="h-3 w-3" />
            {hobby}
          </span>
        ))}
      </div>
    </section>
  );
}
