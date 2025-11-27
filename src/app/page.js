"use client"
import Image from "next/image";
import LandingPage from "@/components/landingpagecomponent";

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black overflow-hidden">
      <main className="flex h-full w-full flex-col items-center justify-between bg-white dark:bg-black sm:items-start">
        <LandingPage />
      </main>
    </div>
  );
}
