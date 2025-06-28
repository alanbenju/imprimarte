"use client";

import Image from "next/image";
import { CustomiaProduct } from "./product-selector";
import { ImagePosition } from "./improved-image-editor";
import { DynamicImageEditor } from "./dynamic-image-editor";
import { useState } from "react";

interface ProductPreviewProps {
  product: CustomiaProduct | null;
  selectedColorId: string;
  imagePreview: string | null;
  onImagePositionChange: (position: ImagePosition | null) => void;
}

export function ProductPreview({ 
  product, 
  selectedColorId, 
  imagePreview,
  onImagePositionChange
}: ProductPreviewProps) {
  if (!product) return null;

  const selectedColor = product.colors.find(color => color.id === selectedColorId) || product.colors[0];
  const productImageUrl = `${product.folderPath}/${selectedColor.filename}`;
  
  // Handle image position changes from editor
  const handleImagePositionChange = (position: ImagePosition) => {
    onImagePositionChange(position);
  };

  return (
    <div className="mb-8 space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Vista previa</h2>
      <p className="text-sm text-gray-600">
        {imagePreview 
          ? "Personaliza tu diseño usando los controles interactivos" 
          : "Así es como se verá tu producto personalizado"}
      </p>

      <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-lg border border-gray-200 bg-white">
        {/* Base product image */}
        {!imagePreview && (
          <div className="relative size-full">
            <Image
              src={productImageUrl}
              alt={`${product.name} - ${selectedColor.name}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        {/* Use dynamic image editor when image is uploaded */}
        {imagePreview && (
          <div className="absolute inset-0">
            <DynamicImageEditor
              product={product}
              selectedColorId={selectedColorId}
              imageUrl={imagePreview}
              onImagePositionChange={handleImagePositionChange}
            />
          </div>
        )}
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        <p>
          {product.name} - {selectedColor.name} 
          {imagePreview ? " con diseño personalizado" : ""}
        </p>
      </div>
    </div>
  );
} 