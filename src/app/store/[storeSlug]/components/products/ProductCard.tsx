"use client";

import Image from "next/image";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "../cart/CartProvider";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category?: string;
};

type StoreColors = {
  buyButtonColor?: string;
  productTextColor?: string;
};

export default function ProductCard({
  product,
  storeSlug,
  storeColors,
}: {
  product: Product;
  storeSlug: string;
  storeColors: StoreColors;
}) {
  const { addItem } = useCart();
  
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
    });
  };
  
  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      <Link
        href={`/store/${storeSlug}/products/${product.id}`}
        className="relative aspect-square overflow-hidden"
      >
        {product.images && product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-gray-100">
            <span className="text-sm text-gray-500">Sin imagen</span>
          </div>
        )}
      </Link>
      
      <div className="flex flex-1 flex-col p-4">
        <Link
          href={`/store/${storeSlug}/products/${product.id}`}
          className="mb-1 text-lg font-medium group-hover:underline"
          style={{ color: storeColors.productTextColor || "#111827" }}
        >
          {product.name}
        </Link>
        
        <p className="mb-4 flex-1 text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <span 
            className="text-lg font-bold"
            style={{ color: storeColors.productTextColor || "#111827" }}
          >
            ${product.price.toFixed(2)}
          </span>
          
          <button
            onClick={handleAddToCart}
            className="flex items-center rounded-full p-2.5 text-white transition hover:opacity-90"
            style={{ backgroundColor: storeColors.buyButtonColor || "#3b82f6" }}
            aria-label="Agregar al carrito"
          >
            <FiShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
} 