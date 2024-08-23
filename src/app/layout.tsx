import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "./contexts/CartContext";
import { Header } from "./design/Header";
import { CartDrawer } from "./cart/CartDrawer";
import './globals.css'; // Ensure this path is correct

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
        <CartProvider>
          <Header />
          <CartDrawer /> {/* Ensure this is outside of the main content flow */}
          <main className="mx-auto max-w-full relative">
            {children}
          </main>
          <footer className="mt-auto bg-gray-100">
            <div className="container mx-auto px-4 py-6 text-center text-gray-600">
              © 2024 Imprimarte. Todos los derechos reservados.
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
