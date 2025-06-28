"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "../cart/CartProvider";

type StoreColors = {
  buyButtonColor?: string;
  colorText?: string;
  colorPanel?: string;
};

export default function CheckoutSummary({
  storeColors,
}: {
  storeColors: StoreColors;
}) {
  const { items, totalPrice } = useCart();
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  
  // Get shipping cost from localStorage if it exists
  useEffect(() => {
    const savedShippingCost = localStorage.getItem("shipping-cost");
    if (savedShippingCost) {
      setShippingCost(parseFloat(savedShippingCost));
    }
  }, []);
  
  const totalWithShipping = shippingCost !== null
    ? totalPrice + shippingCost
    : totalPrice;
  
  if (items.length === 0) {
    return (
      <div 
        className="rounded-lg p-6 text-center"
        style={{ backgroundColor: storeColors.colorPanel || "#f3f4f6" }}
      >
        <p className="mb-4" style={{ color: storeColors.colorText || "#374151" }}>
          Tu carrito está vacío
        </p>
        <Link
          href="/"
          className="inline-block rounded px-4 py-2 text-white transition hover:opacity-90"
          style={{ backgroundColor: storeColors.buyButtonColor || "#3b82f6" }}
        >
          Volver a la tienda
        </Link>
      </div>
    );
  }
  
  return (
    <div className="sticky top-24 rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="p-6">
        <h2 
          className="mb-4 text-lg font-semibold"
          style={{ color: storeColors.colorText || "#374151" }}
        >
          Resumen del Pedido
        </h2>
        
        <div className="mb-6 max-h-80 overflow-y-auto">
          <ul className="divide-y divide-gray-200">
            {items.map((item) => (
              <li key={item.id} className="py-3">
                <div className="flex items-start space-x-3">
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
                  
                  <div className="flex-1">
                    <p className="font-medium" style={{ color: storeColors.colorText || "#374151" }}>
                      {item.name}
                    </p>
                    <div className="mt-1 flex justify-between text-sm">
                      <p className="text-gray-500">Cantidad: {item.quantity}</p>
                      <p className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="space-y-2 border-t border-gray-200 pt-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">${totalPrice.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Envío</span>
            <span className="font-medium">
              {shippingCost !== null
                ? `$${shippingCost.toFixed(2)}`
                : "A calcular"}
            </span>
          </div>
          
          <div className="border-t border-gray-200 pt-2">
            <div className="flex justify-between">
              <span className="text-lg font-bold" style={{ color: storeColors.colorText || "#374151" }}>
                Total
              </span>
              <span className="text-lg font-bold" style={{ color: storeColors.buyButtonColor || "#3b82f6" }}>
                ${totalWithShipping.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 p-6">
        <p className="mb-2 text-sm text-gray-500">
          Al finalizar su compra, estás aceptando nuestros términos y condiciones.
        </p>
        <p className="text-sm text-gray-500">
          El tiempo de entrega estimado es de 3-5 días hábiles después de la confirmación del pago.
        </p>
      </div>
    </div>
  );
} 