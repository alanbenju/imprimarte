"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiShoppingCart, FiMenu } from "react-icons/fi";
import { useCart } from "../cart/CartProvider";
import CartDrawer from "../cart/CartDrawer";

type StoreData = {
  id: string;
  name: string;
  logoImage?: string;
  colorPanel?: string;
  colorText?: string;
  buyButtonColor?: string;
  showStoreName?: boolean;
};

export default function Header({ store }: { store: StoreData }) {
  const { totalItems, isCartOpen, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <header
      style={{
        backgroundColor: store.colorPanel || "#f3f4f6",
        color: store.colorText || "#374151",
      }}
      className="sticky top-0 z-10 shadow-sm"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href={`/store/${store.id}`} className="flex items-center">
              {store.logoImage && (
                <div className="mr-3 size-10 overflow-hidden rounded-full">
                  <Image
                    src={store.logoImage}
                    alt={store.name}
                    width={40}
                    height={40}
                    className="size-full object-cover"
                  />
                </div>
              )}
              {(store.showStoreName !== false) && (
                <span className="text-lg font-semibold">{store.name}</span>
              )}
            </Link>
            
            <nav className="ml-8 hidden md:block">
              <ul className="flex space-x-6">
                <li>
                  <Link 
                    href={`/store/${store.id}`}
                    className="hover:text-opacity-80"
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#"
                    className="hover:text-opacity-80"
                  >
                    Productos
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          
          <div className="flex items-center">
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center rounded-full p-2 transition hover:bg-black/5"
              aria-label="Abrir carrito"
            >
              <FiShoppingCart size={20} />
              {totalItems > 0 && (
                <span 
                  className="ml-1 flex size-5 items-center justify-center rounded-full text-xs text-white"
                  style={{ backgroundColor: store.buyButtonColor || "#3b82f6" }}
                >
                  {totalItems}
                </span>
              )}
            </button>
            
            <button
              className="ml-4 block rounded p-1 md:hidden"
              onClick={toggleMobileMenu}
              aria-label="Menu"
            >
              <FiMenu size={24} />
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-gray-200 py-2 md:hidden">
            <nav>
              <ul className="space-y-2 py-2">
                <li>
                  <Link
                    href={`/store/${store.id}`}
                    className="block px-4 py-2 hover:bg-black/5"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="block px-4 py-2 hover:bg-black/5"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Productos
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
      
      <CartDrawer store={store} />
    </header>
  );
} 