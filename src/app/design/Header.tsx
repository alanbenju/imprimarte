"use client"

import Link from "next/link";
import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../contexts/CartContext";
import { ShoppingBag } from "lucide-react";
import { usePathname } from "next/navigation";

export const Header = () => {
  const { getCart, toggleCart } = useContext(CartContext);
  const items = getCart().length;
  const pathname = usePathname();

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="flex h-16 items-center bg-white px-4 shadow-md lg:px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <Link className="flex items-center justify-center" href="/">
            <ShoppingBag className="size-6 text-teal-600" />
            <span className="ml-2 text-2xl font-bold text-teal-600">ImprimArte</span>
          </Link>
          <div className="flex items-center gap-4">
            <nav className="flex gap-4 sm:gap-6">
              {pathname === "/" && (
                <>
                  <a className="cursor-pointer text-sm font-medium transition-colors hover:text-teal-600" onClick={() => scrollToSection("how-it-works")}>
                    Cómo Funciona
                  </a>
                  <a className="cursor-pointer text-sm font-medium transition-colors hover:text-teal-600" onClick={() => scrollToSection("products")}>
                    Productos
                  </a>
                </>
              )}
              <a className="cursor-pointer text-sm font-medium transition-colors hover:text-teal-600" href="/faq">
                FAQ
              </a>
            </nav>
            <Link href="/design" className="rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-700">
              Diseña ahora
            </Link>
            <button
              onClick={toggleCart}
              className="flex items-center justify-center rounded-full bg-teal-600 p-2 text-white hover:bg-teal-700"
            >
              <FaShoppingCart className="size-5" />
              {items > 0 && (
                <span className="ml-1 text-sm font-bold">{items}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
