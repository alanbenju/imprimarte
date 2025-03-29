"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/(mystore)/my-store/components/store/Sidebar";
import { authService } from "@/services/auth.service";

export default function StoreLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!authService.isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="h-full p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
} 