"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { authService } from "@/services/auth.service";

// Dynamically import Sidebar to avoid SSR issues with framer-motion
const DynamicSidebar = dynamic(() => import("./components/store/Sidebar"), {
  ssr: false,
});

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const auth = authService.isAuthenticated();
      setIsAuthenticated(auth);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = "/login";
    }
  }, [isLoading, isAuthenticated]);

  // While checking authentication, show loading
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="size-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
      </div>
    );
  }

  // If authenticated, show the layout
  if (isAuthenticated) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <div className="fixed left-0 top-0 z-10 h-full">
          <DynamicSidebar />
        </div>
        
        <div className="w-full md:pl-[280px]">
          <main className="container mx-auto p-4 md:p-8">
            {children}
          </main>
        </div>
      </div>
    );
  }

  // This should not be reached due to the redirect, but just in case
  return null;
} 