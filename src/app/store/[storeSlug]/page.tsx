"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/products/ProductCard";
import { storeService, StoreDetails } from "@/services/store.service";
import { useParams } from "next/navigation";
import CartProvider from "./components/cart/CartProvider";
import Header from "./components/layout/Header";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category?: string;
};

// Extend StoreDetails interface to include properties returned by the API
interface ExtendedStoreDetails extends StoreDetails {
  products?: Product[];
  description?: string;
}

// Mock products for demo purposes
const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod_1",
    name: "Camiseta Premium",
    description: "Camiseta 100% algodón de alta calidad con diseño exclusivo.",
    price: 2500,
    images: ["/images/mock/product1.jpg"],
    category: "ropa",
  },
  {
    id: "prod_2",
    name: "Taza Personalizada",
    description: "Taza de cerámica resistente con tu diseño favorito.",
    price: 1200,
    images: ["/images/mock/product2.jpg"],
    category: "accesorios",
  },
  {
    id: "prod_3",
    name: "Póster Artístico",
    description: "Póster impreso en papel fotográfico de alta calidad.",
    price: 800,
    images: ["/images/mock/product3.jpg"],
    category: "decoración",
  },
];

export default function StorePage() {
  const params = useParams();
  const storeSlug = params.storeSlug as string;
  
  const [store, setStore] = useState<ExtendedStoreDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchStoreData() {
      try {
        setIsLoading(true);
        const storeData = await storeService.getStore(storeSlug);
        setStore(storeData);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch store data:", err);
        setError("Unable to load store information. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    
    if (storeSlug) {
      fetchStoreData();
    }
  }, [storeSlug]);
  
  if (isLoading) {
    return <div className="flex items-center justify-center p-12">Loading store information...</div>;
  }
  
  if (error || !store) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <h2 className="mb-4 text-xl font-semibold">Store Not Found</h2>
        <p className="mb-6">{error || `The store "${storeSlug}" could not be found.`}</p>
        <Link href="/" className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Return Home
        </Link>
      </div>
    );
  }
  
  // Use API products if available, otherwise use mock data
  const products = store.products && store.products.length > 0 ? store.products : MOCK_PRODUCTS;
  
  return (
    <CartProvider storeId={store.id}>
      <div 
        className="flex min-h-screen flex-col"
        style={{ backgroundColor: store.backgroundColor || "#ffffff" }}
      >
        <Header store={store} />
        <main className="container mx-auto flex-1 px-4 py-8">
          <div className="space-y-8">
            {/* Hero Banner */}
            {store.bannerImage && (
              <div className="relative -mx-4 h-60 overflow-hidden sm:h-80 md:h-96 lg:h-[400px]">
                <Image
                  src={store.bannerImage}
                  alt={`${store.name} banner`}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-b from-transparent to-black/50 p-6 text-white">
                  <h1 className="text-2xl font-bold sm:text-4xl">{store.name}</h1>
                </div>
              </div>
            )}
            
            {/* Products Section */}
            <section>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold sm:text-2xl" style={{ color: store.colorText }}>
                  Productos Destacados
                </h2>
              </div>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product: Product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    storeSlug={storeSlug}
                    storeColors={{
                      buyButtonColor: store.buyButtonColor,
                      productTextColor: store.productTextColor,
                    }}
                  />
                ))}
              </div>
            </section>
            
            {/* Store Info Section */}
            <section className="rounded-lg p-6" style={{ backgroundColor: store.colorPanel || "#f3f4f6" }}>
              <h2 
                className="mb-4 text-xl font-semibold" 
                style={{ color: store.colorText || "#374151" }}
              >
                Sobre Nosotros
              </h2>
              <p style={{ color: store.colorText || "#374151" }}>
                {store.description || `¡Bienvenido a ${store.name}! Somos una tienda dedicada a ofrecer productos de alta calidad con los mejores precios. Explora nuestra selección y encuentra lo que estás buscando.`}
              </p>
            </section>
          </div>
        </main>
        <footer 
          className="py-6 text-center text-sm"
          style={{ 
            backgroundColor: store.colorPanel || "#f3f4f6",
            color: store.colorText || "#374151" 
          }}
        >
          <div className="container mx-auto px-4">
            &copy; {new Date().getFullYear()} {store.name}
          </div>
        </footer>
      </div>
    </CartProvider>
  );
} 