import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "./contexts/CartContext";
import { Header } from "./design/Header";
import { CartDrawer } from "./cart/CartDrawer";
import "./globals.css"; // Ensure this path is correct
import { UserProvider } from "./contexts/UserContext";
import { ProductProvider } from "./contexts/ProductContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "customia",
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
        <UserProvider>
          <ProductProvider>
            <CartProvider>
              <Header />
              <CartDrawer /> {/* Ensure this is outside of the main content flow */}
              <main className="relative mx-auto max-w-full">
                {children}
              </main>
              <footer className="mt-auto bg-gray-100">
                <div className="container mx-auto flex items-center justify-between px-4 py-6 text-gray-600">
                  <span>© 2024 customia. Todos los derechos reservados.</span>
                  <a href="mailto:customia@gmail.com" className="text-sm hover:underline">
                  customia@gmail.com
                  </a>
                </div>
              </footer>
            </CartProvider>
          </ProductProvider>
        </UserProvider>
      </body>
    </html>
  );
}
