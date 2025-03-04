"use client";

import React from "react";
import { ProductProvider } from "./contexts/ProductContext";
import { CartProvider } from "./contexts/CartContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ProductProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </ProductProvider>
  );
}
