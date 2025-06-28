"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiX, FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { useCart } from "./CartProvider";

type StoreData = {
  id: string;
  name: string;
  buyButtonColor?: string;
  colorText?: string;
};

export default function CartDrawer({ store }: { store: StoreData }) {
  const { 
    items, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeItem,
    totalPrice 
  } = useCart();
  
  const drawerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isCartOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(e.target as Node)
      ) {
        setIsCartOpen(false);
      }
    };
    
    document.addEventListener("keydown", handleEscKey);
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartOpen, setIsCartOpen]);
  
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);
  
  if (!isCartOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div
        ref={drawerRef}
        className="absolute right-0 top-0 size-full max-w-md transform bg-white shadow-xl transition-transform duration-300 ease-in-out sm:max-w-lg"
        style={{ transform: isCartOpen ? "translateX(0)" : "translateX(100%)" }}
      >
        <div className="flex size-full flex-col">
          <div className="flex items-center justify-between border-b border-gray-200 p-4">
            <h2 className="text-lg font-semibold">Carrito de compras</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="rounded-full p-1 transition hover:bg-gray-100"
              aria-label="Cerrar carrito"
            >
              <FiX size={24} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <p className="mb-4 text-gray-500">Tu carrito está vacío</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="rounded px-4 py-2 text-white transition hover:opacity-90"
                  style={{ backgroundColor: store.buyButtonColor || "#3b82f6" }}
                >
                  Continuar comprando
                </button>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="py-4">
                    <div className="flex items-start space-x-4">
                      {item.image && (
                        <div className="size-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="size-full object-cover object-center"
                          />
                        </div>
                      )}
                      
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium">{item.name}</h3>
                          <p className="text-sm font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          ${item.price.toFixed(2)} c/u
                        </p>
                        
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center rounded border border-gray-300">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-100"
                              aria-label="Disminuir cantidad"
                            >
                              <FiMinus size={16} />
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-100"
                              aria-label="Aumentar cantidad"
                            >
                              <FiPlus size={16} />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeItem(item.id)}
                            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                            aria-label="Eliminar"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-4">
              <div className="mb-3 flex justify-between">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              
              <Link
                href={`/store/${store.id}/checkout`}
                className="block w-full rounded py-2 text-center text-white transition hover:opacity-90"
                style={{ backgroundColor: store.buyButtonColor || "#3b82f6" }}
                onClick={() => setIsCartOpen(false)}
              >
                Finalizar compra
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 