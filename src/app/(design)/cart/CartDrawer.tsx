"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiX, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useCartStore } from "@/store/cart";

export const CartDrawer = () => {
  const { items, isOpen, toggleCart, updateQuantity, removeItem } = useCartStore();
  const router = useRouter();
  const cartRef = useRef<HTMLDivElement>(null);

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  // Manage focus trap and escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        toggleCart();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, toggleCart]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
        onClick={toggleCart}
      />

      {/* Cart Panel */}
      <div
        ref={cartRef}
        className="fixed right-0 top-0 z-50 flex size-full flex-col bg-white shadow-xl transition-transform duration-300 ease-out sm:w-96"
        style={{ transform: isOpen ? "translateX(0)" : "translateX(100%)" }}
      >
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-5 text-white">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold">Tu Carrito</h2>
            <button
              className="rounded-full p-2 text-white transition-colors hover:bg-white/10"
              onClick={toggleCart}
              aria-label="Cerrar carrito"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center p-6 text-center">
              <div className="mb-4 flex size-20 items-center justify-center rounded-full bg-blue-100">
                <FiTrash2 size={32} className="text-blue-600" />
              </div>
              <h3 className="font-heading mb-2 text-lg font-semibold text-blue-900">
                Tu carrito está vacío
              </h3>
              <p className="mb-6 text-blue-700">Agrega algunos productos para comenzar</p>
              <button
                className="btn btn-primary rounded-full px-6"
                onClick={() => {
                  toggleCart();
                  router.push("/design");
                }}
              >
                Diseñar Ahora
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="premium-card animate-fadeIn border border-transparent hover:border-blue-200"
              >
                <div className="flex gap-3">
                  <div className="relative size-20 overflow-hidden rounded-md bg-gray-100">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-heading font-semibold text-blue-900">{item.name}</h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-blue-400 transition-colors hover:text-red-500"
                        aria-label="Eliminar producto"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                    {item.size && <p className="text-sm text-blue-700">Talle: {item.size}</p>}
                    {item.color && <p className="text-sm text-blue-700">Color: {item.color}</p>}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center space-x-2 rounded-full border border-blue-200 p-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, Math.max(1, item.quantity - 1))
                          }
                          className="flex size-6 items-center justify-center rounded-full text-blue-600 transition-colors hover:bg-blue-100"
                          aria-label="Disminuir cantidad"
                        >
                          <FiMinus size={14} />
                        </button>
                        <span className="w-6 text-center text-sm font-medium text-blue-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex size-6 items-center justify-center rounded-full text-blue-600 transition-colors hover:bg-blue-100"
                          aria-label="Aumentar cantidad"
                        >
                          <FiPlus size={14} />
                        </button>
                      </div>
                      <p className="font-bold text-blue-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-blue-100 p-5">
            <div className="mb-4 flex justify-between">
              <span className="font-heading text-blue-800">Subtotal</span>
              <span className="font-bold text-blue-900">${totalPrice.toFixed(2)}</span>
            </div>
            <button
              className="btn btn-primary font-heading w-full rounded-full py-3 font-semibold"
              onClick={() => {
                toggleCart();
                router.push("/checkout");
              }}
            >
              Proceder al Pago
            </button>
          </div>
        )}
      </div>
    </>
  );
};
