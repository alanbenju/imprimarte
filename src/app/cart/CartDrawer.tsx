"use client";

import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const CartDrawer = () => {
  const { getCart, toggleCart, isCartOpen, getTotalPrice, updateCartItemQuantity, removeFromCart } = useContext(CartContext);
  const router = useRouter();

  return (
    <div
      className={`fixed right-0 top-0 size-full transform bg-white shadow-lg transition-transform duration-300 ease-in-out md:w-1/2 lg:w-1/3 xl:w-1/4 ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      } z-50`}
      style={{ overflowY: "auto" }}
    >
      <div className="flex h-full flex-col p-4">
        <button className="absolute right-4 top-4 text-gray-600" onClick={toggleCart} aria-label="Close cart">
          ✕
        </button>
        <h2 className="mb-4 text-lg font-bold">Your Cart</h2>
        <div className="grow overflow-y-auto">
          {getCart().map((item, index) => (
            <div key={index} className="flex flex-col border-b p-4">
              <div className="flex w-full space-x-2 mb-2">
                <div className="w-1/2 aspect-square relative">
                  <Image
                    src={item.imageUrl}
                    alt="Uploaded design"
                    fill
                    className="rounded border border-black object-cover"
                  />
                </div>
                <div className="w-1/2 aspect-square relative">
                  <Image
                    src={item.shirtImage}
                    alt="Shirt preview"
                    fill
                    className="rounded border border-black object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <p className="font-semibold">{item.name} - {item.color.toUpperCase()}</p>
                  <p className="text-sm text-gray-600">Talle: {item.size}</p>
                </div>
                <p className="font-bold">ARS {(item.quantity * item.price).toFixed(2)}</p>
                <div className="flex items-center space-x-2">
                  <button
                    className="rounded bg-gray-200 px-2 py-1 text-sm"
                    onClick={() => updateCartItemQuantity(item.id, Math.max(item.quantity - 1, 1))}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="rounded bg-gray-200 px-2 py-1 text-sm"
                    onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button
                  className="self-end text-red-500 hover:text-red-700"
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 border-t pt-4">
          <p className="mb-4 text-xl font-bold">Total: ARS {getTotalPrice().toFixed(2)}</p>
          <button
            className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={() => {
              toggleCart();
              router.push("/checkout");
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
