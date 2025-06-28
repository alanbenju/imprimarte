"use client";

import Image from "next/image";
import { CustomiaProduct } from "./product-selector";
import { FiCheck } from "react-icons/fi";

interface ColorSelectorProps {
  product: CustomiaProduct;
  selectedColorId: string;
  selectedColors: Set<string>;
  onColorChange: (colorId: string) => void;
  onToggleColor: (colorId: string, isSelected: boolean) => void;
}

export function ColorSelector({
  product,
  selectedColorId,
  selectedColors,
  onColorChange,
  onToggleColor,
}: ColorSelectorProps) {
  if (!product) return null;

  return (
    <div className="mb-8 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Colores disponibles</h2>
        <span className="text-sm text-gray-500">
          {selectedColors.size} de {product.colors.length} seleccionados
        </span>
      </div>
      <p className="text-sm text-gray-600">
        Selecciona los colores que estarán disponibles para tu producto y haz clic en uno para previsualizar
      </p>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        {product.colors.map((color) => {
          const isActive = selectedColorId === color.id;
          const isSelected = selectedColors.has(color.id);
          
          return (
            <div key={color.id} className="relative">
              <div 
                className={`
                  group relative cursor-pointer overflow-hidden rounded-md border-2 transition
                  ${isActive ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200"}
                `}
                onClick={() => onColorChange(color.id)}
              >
                <div className="relative aspect-square">
                  <Image
                    src={`${product.folderPath}/${color.filename}`}
                    alt={color.name}
                    fill
                    className="object-contain p-1"
                    sizes="100px"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/5" />
              </div>
              
              <button
                type="button"
                className={`
                  absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full border transition-all
                  ${isSelected 
                    ? "border-green-500 bg-green-500 text-white" 
                    : "border-gray-300 bg-white text-gray-400 hover:border-gray-400"
                  }
                `}
                onClick={() => onToggleColor(color.id, !isSelected)}
              >
                <FiCheck className={`size-4 ${isSelected ? "opacity-100" : "opacity-0"}`} />
              </button>
              
              <p className="mt-1 truncate text-center text-xs font-medium text-gray-700">
                {color.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
} 