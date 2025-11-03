import { Feed } from "@/components/feed";
import { LeftSidebar } from "@/components/left-sidebar";
import { Navbar } from "@/components/navbar";
import { RightSidebar } from "@/components/right-sidebar";

export default function Home() {
  return (
    <>
      {/* The navigation bar */}
      <div className="flex min-h-screen w-full flex-col bg-surface">
        <Navbar />
        <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-6 lg:px-6">
          <LeftSidebar />
          <Feed />
          <RightSidebar />
        </div>
      </div>
    </>
  );
}
