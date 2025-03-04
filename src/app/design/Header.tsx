"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cart";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { items, toggleCart } = useCartStore();

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 py-3 shadow-lg backdrop-blur-md"
          : "bg-white/80 py-4 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="mr-2 flex size-10 items-center justify-center rounded-full bg-blue-600 shadow-md">
              <span className="text-xl font-bold text-white">C</span>
            </div>
            <span className="font-heading text-xl font-bold text-blue-900">Customia</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            <Link
              href="/#how-it-works"
              className="font-heading font-medium text-blue-800 transition-colors hover:text-blue-600"
            >
              Cómo Funciona
            </Link>
            <Link
              href="/#products"
              className="font-heading font-medium text-blue-800 transition-colors hover:text-blue-600"
            >
              Productos
            </Link>
            <Link
              href="/create-store"
              className="font-heading font-medium text-blue-800 transition-colors hover:text-blue-600"
            >
              Crear Tienda
            </Link>
            <Link
              href="/design"
              className="btn btn-primary rounded-full px-5 py-2 text-sm font-medium"
            >
              Diseñar Ahora
            </Link>
            <button
              onClick={toggleCart}
              className="btn btn-outline relative rounded-full p-2 hover:bg-blue-50"
              aria-label="Carrito de compras"
            >
              <FiShoppingCart className="size-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="rounded-md p-2 text-blue-800 hover:bg-blue-50 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isOpen ? <FiX className="size-6" /> : <FiMenu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-blue-100 bg-white md:hidden"
          >
            <div className="container mx-auto space-y-4 p-4">
              <Link
                href="/#how-it-works"
                className="font-heading block py-2 text-blue-800 transition-colors hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Cómo Funciona
              </Link>
              <Link
                href="/#products"
                className="font-heading block py-2 text-blue-800 transition-colors hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Productos
              </Link>
              <Link
                href="/create-store"
                className="font-heading block py-2 text-blue-800 transition-colors hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Crear Tienda
              </Link>
              <Link
                href="/design"
                className="btn btn-primary block w-full rounded-full py-2 text-center"
                onClick={() => setIsOpen(false)}
              >
                Diseñar Ahora
              </Link>
              <button
                onClick={() => {
                  toggleCart();
                  setIsOpen(false);
                }}
                className="btn btn-outline flex w-full items-center justify-center rounded-full py-2"
              >
                <FiShoppingCart className="mr-2 size-5" />
                <span>Carrito ({totalItems})</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
