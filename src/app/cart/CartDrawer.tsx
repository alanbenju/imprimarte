"use client";

import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X, Minus, Plus, Trash2 } from "lucide-react";

export const CartDrawer = () => {
  const { getCart, toggleCart, isCartOpen, getTotalPrice, updateCartItemQuantity, removeFromCart } = useContext(CartContext);
  const router = useRouter();

  return (
    <div
      className={`fixed right-0 top-0 h-full w-full transform bg-teal-50 shadow-lg transition-transform duration-300 ease-in-out sm:w-96 ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      } z-50`}
      style={{ overflowY: "auto" }}
    >
      <div className="flex h-full flex-col">
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-4 text-white">
          <button className="absolute right-4 top-4 text-white hover:text-amber-400 transition-colors" onClick={toggleCart} aria-label="Close cart">
            <X size={24} />
          </button>
          <h2 className="text-xl font-bold">Tu Carrito</h2>
        </div>
        <div className="grow overflow-y-auto p-4">
          {getCart().map((item, index) => (
            <div key={index} className="mb-4 rounded-lg bg-white p-4 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex w-full space-x-2 mb-2">
                <div className="w-1/2 aspect-square relative">
                  <Image
                    src={item.imageUrl}
                    alt="Diseño cargado"
                    fill
                    className="rounded object-cover"
                  />
                </div>
                <div className="w-1/2 aspect-square relative">
                  <Image
                    src={item.shirtImage}
                    alt="Vista previa de la camiseta"
                    fill
                    className="rounded object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <p className="font-semibold text-teal-800">{item.name} - {item.color.toUpperCase()}</p>
                  <p className="text-sm text-teal-600">Talle: {item.size}</p>
                </div>
                <p className="font-bold text-teal-800 mt-2">ARS {(item.quantity * item.price).toFixed(2)}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-2">
                    <button
                      className="rounded-full bg-amber-400 p-1 text-teal-800 hover:bg-amber-300 transition-colors"
                      onClick={() => updateCartItemQuantity(item.id, Math.max(item.quantity - 1, 1))}
                      aria-label="Disminuir cantidad"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-medium text-teal-800">{item.quantity}</span>
                    <button
                      className="rounded-full bg-amber-400 p-1 text-teal-800 hover:bg-amber-300 transition-colors"
                      onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                      aria-label="Aumentar cantidad"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700 transition-colors"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Eliminar artículo"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-teal-200 bg-white p-4">
          <p className="mb-4 text-xl font-bold text-teal-800">Total: ARS {getTotalPrice().toFixed(2)}</p>
          <button
            className="w-full rounded bg-gradient-to-r from-teal-600 to-emerald-600 px-4 py-3 text-white font-semibold hover:from-teal-700 hover:to-emerald-700 transition-colors"
            onClick={() => {
              toggleCart();
              router.push("/checkout");
            }}
          >
            Proceder al Pago
          </button>
        </div>
      </div>
    </div>
  );
};