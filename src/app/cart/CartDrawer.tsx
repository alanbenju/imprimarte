// src/app/components/CartDrawer.tsx
"use client";

import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

export const CartDrawer = () => {
  const { getCart, toggleCart, isCartOpen } = useContext(CartContext);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      } z-50`}
      style={{ overflowY: "auto" }}
    >
      <div className="p-4">
        <button className="text-gray-600" onClick={toggleCart}>
          Close
        </button>
        <h2 className="text-lg font-bold">Your Cart</h2>
        {/* Display cart items */}
        {getCart().map((item, index) => (
          <div key={index} className="p-2 border-b">
            <p>{item.name}</p>
            <p>
              {item.quantity} x {item.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
