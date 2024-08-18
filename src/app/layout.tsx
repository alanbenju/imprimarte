import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from 'next/image';
import Link from 'next/link';
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
      <body className={`${inter.className} text-textPrimary relative min-h-screen`}>
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary">
              Imprimarte
            </Link>
            <nav className="flex items-center space-x-4">
              <Link href="/faq" className="text-gray-600 hover:text-gray-900">
                FAQ
              </Link>
              <Link href="/design" className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded transition duration-300">
                Diseña
              </Link>
            </nav>
          </div>
        </header>

        <main className="max-w-full mx-auto">
          {children}
        </main>

        <footer className="bg-gray-100 mt-auto">
          <div className="container mx-auto px-4 py-6 text-center text-gray-600">
            © 2024 Imprimarte. Todos los derechos reservados.
          </div>
        </footer>
      </body>
    </html>
  );
}