"use client";

import { ReactNode } from "react";
import { useParams } from "next/navigation";
import CartProvider from "./components/cart/CartProvider";
import Header from "./components/layout/Header";
import { StoreLayoutClient } from "./StoreLayoutClient";

export default function StoreLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {children}
    </div>
  );
} 