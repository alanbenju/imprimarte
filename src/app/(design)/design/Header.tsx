"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiShoppingCart, FiMenu, FiX, FiUser, FiLogOut, FiChevronDown } from "react-icons/fi";
import { useCartStore } from "@/store/cart";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { items, toggleCart } = useCartStore();
  const router = useRouter();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Check authentication status
    setIsAuthenticated(authService.isAuthenticated());

    window.addEventListener("scroll", handleScroll);
    
    // Close user menu when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    router.push("/login");
    setIsUserMenuOpen(false);
  };

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
          <div className="hidden items-center space-x-5 md:flex">
            <Link
              href="/#products"
              className="font-heading font-medium text-blue-800 transition-colors hover:text-blue-600"
            >
              Productos
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
            
            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center rounded-full bg-blue-50 p-2 text-blue-800 hover:bg-blue-100"
              >
                <FiUser className="size-5" />
              </button>
              
              <div
                className={`absolute right-0 mt-2 w-48 rounded-md border border-gray-200 bg-white py-1 shadow-lg transition-all duration-200 ${
                  isUserMenuOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible translate-y-2 opacity-0"
                }`}
              >
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/my-store"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Mi Tienda
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      <FiLogOut className="mr-2 size-4" />
                      Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Iniciar Sesión
                    </Link>
                    <Link
                      href="/create-store"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Crear Tienda
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

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
      <div
        className={`border-t border-blue-100 bg-white transition-all duration-300 md:hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 overflow-hidden opacity-0"
        }`}
      >
        <div className="container mx-auto space-y-4 p-4">
          <Link
            href="/#products"
            className="font-heading block py-2 text-blue-800 transition-colors hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Productos
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link
                href="/my-store"
                className="font-heading block py-2 text-blue-800 transition-colors hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Mi Tienda
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="font-heading flex w-full items-center py-2 text-left text-blue-800 transition-colors hover:text-blue-600"
              >
                <FiLogOut className="mr-2 size-4" />
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link
                href="/create-store"
                className="font-heading block py-2 text-blue-800 transition-colors hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Crear Tienda
              </Link>
              <Link
                href="/login"
                className="font-heading flex items-center py-2 text-blue-800 transition-colors hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                <FiUser className="mr-2 size-4" />
                Iniciar Sesión
              </Link>
            </>
          )}
          
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
      </div>
    </header>
  );
}
