"use client";

import { useState } from "react";
import { FiCheck } from "react-icons/fi";

// Hardcoded shipping costs by postal code ranges (simplified for demo)
const SHIPPING_COSTS: Record<string, number> = {
  "1000-1499": 800,   // CABA
  "1500-1999": 1000,  // Gran Buenos Aires Zona Norte
  "2000-2999": 1200,  // Santa Fe
  "3000-3999": 1500,  // Entre Ríos, Corrientes
  "4000-4999": 1800,  // Salta, Jujuy
  "5000-5999": 1500,  // Córdoba
  "6000-6999": 1300,  // Buenos Aires interior
  "7000-7999": 1400,  // Buenos Aires sur
  "8000-8999": 1700,  // Río Negro, Neuquén
  "9000-9999": 2000,  // Chubut, Santa Cruz, Tierra del Fuego
};

export default function ShippingCalculator({
  onShippingCalculated,
  buyButtonColor,
}: {
  onShippingCalculated: (cost: number) => void;
  buyButtonColor?: string;
}) {
  const [postalCode, setPostalCode] = useState("");
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  
  const calculateShipping = () => {
    if (!postalCode || postalCode.length < 4) {
      alert("Por favor ingrese un código postal válido");
      return;
    }
    
    setIsCalculating(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const code = parseInt(postalCode);
      let cost = 1500; // Default cost
      
      // Find matching postal code range
      for (const range in SHIPPING_COSTS) {
        const [min, max] = range.split("-").map(Number);
        if (code >= min && code <= max) {
          cost = SHIPPING_COSTS[range];
          break;
        }
      }
      
      setShippingCost(cost);
      onShippingCalculated(cost);
      setIsCalculating(false);
    }, 500);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
        <div className="flex-1">
          <label htmlFor="shipping-postal-code" className="mb-1 block text-sm font-medium text-gray-700">
            Código Postal *
          </label>
          <input
            type="text"
            id="shipping-postal-code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Ej: 1425"
          />
        </div>
        <div className="flex items-end">
          <button
            type="button"
            onClick={calculateShipping}
            disabled={isCalculating}
            className="rounded px-4 py-2 text-white transition hover:opacity-90 disabled:opacity-70"
            style={{ backgroundColor: buyButtonColor || "#3b82f6" }}
          >
            {isCalculating ? "Calculando..." : "Calcular Envío"}
          </button>
        </div>
      </div>
      
      {shippingCost !== null && (
        <div className="mt-4 rounded-lg bg-green-50 p-3">
          <div className="flex">
            <div className="flex-shrink-0">
              <FiCheck className="size-5 text-green-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-800">
                El costo de envío es: <strong>${shippingCost.toFixed(2)}</strong>
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-2 rounded-lg bg-gray-50 p-3">
        <h3 className="text-sm font-medium text-gray-700">Información sobre envíos</h3>
        <ul className="mt-1 list-inside list-disc text-sm text-gray-600">
          <li>El tiempo estimado de entrega es de 3-5 días hábiles</li>
          <li>Los envíos se realizan de lunes a viernes</li>
          <li>Se envía por Correo Argentino o servicio de mensajería según la zona</li>
        </ul>
      </div>
    </div>
  );
} 