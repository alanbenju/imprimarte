"use client";

import React from "react";
import { CartProvider } from "./(design)/contexts/CartContext";
import { ProductProvider } from "./(design)/contexts/ProductContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ProductProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </ProductProvider>
  );
}
