"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { CustomiaProduct } from "./product-selector";
import { ImagePosition } from "./image-editor";

// Dynamically import ImageEditor with SSR disabled
const ImageEditorComponent = dynamic(
  () => import("./image-editor").then((mod) => mod.ImageEditor),
  { 
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center">
        <div className="size-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
      </div>
    )
  }
);

interface DynamicImageEditorWrapperProps {
  product: CustomiaProduct;
  selectedColorId: string;
  imageUrl: string;
  onImagePositionChange: (position: ImagePosition) => void;
}

export default function DynamicImageEditorWrapper({
  product,
  selectedColorId,
  imageUrl,
  onImagePositionChange
}: DynamicImageEditorWrapperProps) {
  return (
    <ImageEditorComponent
      product={product}
      selectedColorId={selectedColorId}
      imageUrl={imageUrl}
      onImagePositionChange={onImagePositionChange}
    />
  );
}

// Named export for convenience
export { DynamicImageEditorWrapper as DynamicImageEditor }; 