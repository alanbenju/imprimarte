"use client"

import Link from "next/link";
import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../contexts/CartContext";

export const Header = () => {
  const { getCart, toggleCart } = useContext(CartContext);
  const items = getCart().length;

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-2xl font-bold text-primary">
          Imprimarte
        </Link>
        <nav className="flex items-center space-x-4">
          <Link href="/faq" className="text-gray-600 hover:text-gray-900">
            FAQ
          </Link>
          <Link href="/design" className="rounded-md bg-green-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-150 hover:bg-green-700">
            Diseña
          </Link>
          <button onClick={toggleCart} className="relative">
            <FaShoppingCart className="text-2xl text-gray-600 hover:text-gray-900" />
            {items > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {items}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};
