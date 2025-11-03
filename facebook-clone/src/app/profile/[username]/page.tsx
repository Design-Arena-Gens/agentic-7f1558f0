import { notFound } from "next/navigation";
import { ProfileClient } from "./profile-client";
import { users } from "@/lib/data";

type ProfilePageProps = {
  params: Promise<{ username: string }>;
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  const user = users.find((candidate) => candidate.username === username);
  if (!user) {
    notFound();
  }

  return <ProfileClient user={user} />;
}
