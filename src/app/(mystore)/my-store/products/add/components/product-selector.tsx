import { useState } from "react";
import Image from "next/image";

export interface CustomiaProduct {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  folderPath: string;
  colors: {
    id: string;
    name: string;
    filename: string;
  }[];
}

// Define our two Customia products
export const CUSTOMIA_PRODUCTS: CustomiaProduct[] = [
  {
    id: "regular-fit",
    name: "Remera Regular Fit",
    description: "Remera de algodón con corte regular",
    imageUrl: "/regular-fit/black.png",
    folderPath: "/regular-fit",
    colors: [
      { id: "azul-francia", name: "Azul Francia", filename: "azul-francia.png" },
      { id: "black", name: "Negro", filename: "black.png" },
      { id: "bossa-nova", name: "Bossa Nova", filename: "bossa-nova.png" },
      { id: "cinnamon", name: "Canela", filename: "cinnamon.png" },
      { id: "marron-seta", name: "Marrón Seta", filename: "marron-seta.png" },
      { id: "pensamiento", name: "Pensamiento", filename: "pensamiento.png" },
      { id: "petroleo", name: "Petróleo", filename: "petroleo.png" },
      { id: "rosa-w", name: "Rosa", filename: "rosa-w.png" },
      { id: "white", name: "Blanco", filename: "white.png" }
    ]
  },
  {
    id: "canguro",
    name: "Canguro",
    description: "Buzo canguro con capucha y bolsillo frontal",
    imageUrl: "/canguro/bordo.png",
    folderPath: "/canguro",
    colors: [
      { id: "bordo", name: "Bordó", filename: "bordo.png" },
      { id: "lead-gray", name: "Gris Plomo", filename: "lead-gray.png" },
      { id: "suavidad-lila", name: "Lila Suave", filename: "suavidad-lila.png" }
    ]
  }
];

interface ProductSelectorProps {
  selectedId: string | null;
  onSelect: (product: CustomiaProduct) => void;
}

export function ProductSelector({ selectedId, onSelect }: ProductSelectorProps) {
  return (
    <div className="mb-8 space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Selecciona un producto base</h2>
      <p className="text-sm text-gray-600">Elige el tipo de producto que quieres personalizar</p>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {CUSTOMIA_PRODUCTS.map((product) => (
          <div
            key={product.id}
            className={`cursor-pointer rounded-lg border p-4 transition-all hover:border-blue-500 hover:shadow-md ${
              selectedId === product.id ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200"
            }`}
            onClick={() => onSelect(product)}
          >
            <div className="relative mb-4 aspect-square overflow-hidden rounded-md bg-gray-100">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <h3 className="font-medium text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 