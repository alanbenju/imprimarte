"use client";

import { useState } from "react";
import { FiShoppingCart, FiMinus, FiPlus } from "react-icons/fi";
import { useCart } from "../cart/CartProvider";

type Product = {
  id: string;
  name: string;
  price: number;
  images?: string[];
};

export default function AddToCartButton({
  product,
  buyButtonColor,
}: {
  product: Product;
  buyButtonColor?: string;
}) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images?.[0],
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <span className="mr-3 text-sm font-medium text-gray-700">Cantidad</span>
        <div className="flex items-center rounded border border-gray-300">
          <button
            type="button"
            onClick={decrementQuantity}
            className="flex size-8 items-center justify-center text-gray-600 hover:bg-gray-100"
            aria-label="Disminuir cantidad"
          >
            <FiMinus size={16} />
          </button>
          <span className="w-10 text-center font-medium">{quantity}</span>
          <button
            type="button"
            onClick={incrementQuantity}
            className="flex size-8 items-center justify-center text-gray-600 hover:bg-gray-100"
            aria-label="Aumentar cantidad"
          >
            <FiPlus size={16} />
          </button>
        </div>
      </div>
      
      <button
        type="button"
        onClick={handleAddToCart}
        className="flex w-full items-center justify-center gap-2 rounded py-3 text-white transition hover:opacity-90"
        style={{ backgroundColor: buyButtonColor || "#3b82f6" }}
      >
        <FiShoppingCart size={20} />
        <span>Agregar al carrito</span>
      </button>
    </div>
  );
} 