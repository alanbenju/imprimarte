"use client";

import dynamic from "next/dynamic";

// Dynamically import the Sidebar component with SSR disabled
const Sidebar = dynamic(
  () => import("./Sidebar"),
  { 
    ssr: false,
    loading: () => (
      <div className="hidden h-screen w-[280px] border-r bg-white md:block">
        <div className="flex h-16 items-center border-b px-6">
          <div className="h-8 w-40 animate-pulse rounded bg-gray-200"></div>
        </div>
        <div className="py-4">
          {[...Array(4)].map((_, i) => (
            <div 
              key={i} 
              className="mx-4 my-2 flex items-center rounded p-2"
            >
              <div className="mr-3 size-5 rounded-full bg-gray-200"></div>
              <div className="h-4 w-32 rounded bg-gray-200"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }
);

export default function DynamicSidebar() {
  return <Sidebar />;
} 