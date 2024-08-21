import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";  // Import the cart icon
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Imprimarte",
  description: "Creá tus diseños personalizados",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} relative min-h-screen text-textPrimary`}>
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
              <Link href="/cart" className="relative">
                <FaShoppingCart className="text-2xl text-gray-600 hover:text-gray-900" />
              </Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-full">
          {children}
        </main>

        <footer className="mt-auto bg-gray-100">
          <div className="container mx-auto px-4 py-6 text-center text-gray-600">
            © 2024 Imprimarte. Todos los derechos reservados.
          </div>
        </footer>
      </body>
    </html>
  );
}
