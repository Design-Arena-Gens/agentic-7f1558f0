"use client";

import { SocialProvider } from "@/context/social-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return <SocialProvider>{children}</SocialProvider>;
}
