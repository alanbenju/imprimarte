"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Moveable from "react-moveable";
import { CustomiaProduct } from "./product-selector";
import { productConfig } from "@/app/(design)/design/components/helpers/config";

// Map our CustomiaProduct IDs to config.ts IDs
const PRODUCT_CONFIG_MAP: Record<string, string> = {
  "regular-fit": "1", // Regular Fit
  "canguro": "3",     // Canguro
};

interface ImprovedImageEditorProps {
  product: CustomiaProduct;
  selectedColorId: string;
  imageUrl: string;
  onImagePositionChange: (position: ImagePosition) => void;
}

export interface ImagePosition {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  sizeInCm: {
    width: number;
    height: number;
  };
}

export function ImprovedImageEditor({ product, selectedColorId, imageUrl, onImagePositionChange }: ImprovedImageEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const moveableRef = useRef<any>(null);
  
  // Get product configuration
  const configId = PRODUCT_CONFIG_MAP[product.id] || "1";
  const config = productConfig[configId as keyof typeof productConfig];
  
  // Image boundaries
  const printableArea = {
    x: config.rectPosition.x,
    y: config.rectPosition.y,
    width: config.rectSizePixels.width,
    height: config.rectSizePixels.height
  };
  
  // Calculate initial position (centered in the printable area)
  const initialWidth = printableArea.width * 0.7;
  const initialHeight = printableArea.height * 0.7;
  const initialX = printableArea.x + (printableArea.width - initialWidth) / 2;
  const initialY = printableArea.y + (printableArea.height - initialHeight) / 2;
  
  // Track the current position
  const [position, setPosition] = useState<ImagePosition>({
    x: initialX,
    y: initialY,
    width: initialWidth,
    height: initialHeight,
    rotation: 0,
    sizeInCm: {
      width: 0,
      height: 0
    }
  });
  
  // Calculate dimensions in cm
  const pixelsToCm = (pixels: number, dimension: "width" | "height") => {
    const pixelDimension = config.rectSizePixels[dimension];
    const cmDimension = config.rectSizeCM[dimension];
    return (pixels / pixelDimension) * cmDimension;
  };
  
  // Update cm dimensions when pixel dimensions change
  useEffect(() => {
    const sizeInCm = {
      width: pixelsToCm(position.width, "width"),
      height: pixelsToCm(position.height, "height")
    };
    
    onImagePositionChange({
      ...position,
      sizeInCm
    });
  }, [position, onImagePositionChange]);
  
  // Update position from moveable events
  const updatePosition = (newPosition: Partial<ImagePosition>) => {
    setPosition(prev => ({
      ...prev,
      ...newPosition
    }));
  };
  
  // Show/hide design rectangle for debugging
  const showPrintableArea = false;

  // Keep track of mounted state to avoid attempting to use targetRef before it's ready
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  
  // Get the selected color or fallback to first color
  const selectedColor = product.colors.find(color => color.id === selectedColorId) || product.colors[0];
  
  return (
    <div 
      ref={containerRef}
      className="relative size-full overflow-hidden"
    >
      {/* Base product image */}
      <img 
        src={`${product.folderPath}/${selectedColor.filename}`}
        alt={`${product.name} - ${selectedColor.name}`}
        className="size-full object-contain"
      />
      
      {/* Printable area rectangle (for debugging) */}
      {showPrintableArea && (
        <div 
          className="pointer-events-none absolute border-2 border-dashed border-red-500 opacity-50"
          style={{
            left: `${printableArea.x}px`,
            top: `${printableArea.y}px`,
            width: `${printableArea.width}px`,
            height: `${printableArea.height}px`
          }}
        />
      )}
      
      {/* Target element that will be manipulated */}
      <div
        ref={targetRef}
        className="absolute"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${position.width}px`,
          height: `${position.height}px`,
          transform: `rotate(${position.rotation}deg)`,
          transformOrigin: "center center",
          touchAction: "none"
        }}
      >
        <img 
          src={imageUrl} 
          alt="Custom design"
          className="size-full object-contain"
        />
      </div>
      
      {/* Moveable controller - only render when component is mounted */}
      {isMounted && targetRef.current && (
        <Moveable
          ref={moveableRef}
          target={targetRef.current}
          draggable={true}
          resizable={true}
          rotatable={true}
          origin={false}
          keepRatio={false}
          
          // Use nullish coalescing for container
          container={containerRef.current ?? undefined}
          
          // Custom CSS classes
          className="moveable-controller"
          
          // Snappable options for better alignment
          snappable={true}
          snapCenter={true}
          verticalGuidelines={[
            printableArea.x,
            printableArea.x + printableArea.width / 2,
            printableArea.x + printableArea.width
          ]}
          horizontalGuidelines={[
            printableArea.y,
            printableArea.y + printableArea.height / 2,
            printableArea.y + printableArea.height
          ]}
          
          // Drag event handlers
          onDrag={({ target, transform }) => {
            target.style.transform = transform;
          }}
          onDragEnd={({ target }) => {
            const rect = target.getBoundingClientRect();
            const containerRect = containerRef.current!.getBoundingClientRect();
            
            // Convert to relative coordinates
            const x = rect.left - containerRect.left;
            const y = rect.top - containerRect.top;
            
            updatePosition({ x, y });
          }}
          
          // Resize event handlers
          onResize={({ target, width, height, delta }) => {
            // Update size when resizing
            target.style.width = `${width}px`;
            target.style.height = `${height}px`;
            
            // Keep the position stable during resize
            const beforeTranslate = [
              position.x + delta[0] / 2,
              position.y + delta[1] / 2
            ];
            
            target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px) rotate(${position.rotation}deg)`;
          }}
          onResizeEnd={({ target }) => {
            const rect = target.getBoundingClientRect();
            const containerRect = containerRef.current!.getBoundingClientRect();
            
            // Get final dimensions
            const width = rect.width;
            const height = rect.height;
            const x = rect.left - containerRect.left;
            const y = rect.top - containerRect.top;
            
            updatePosition({ x, y, width, height });
          }}
          
          // Rotation event handlers
          onRotate={({ target, transform }) => {
            target.style.transform = transform;
          }}
          onRotateEnd={({ target }) => {
            // Extract rotation from transform style
            const transform = target.style.transform;
            const rotateMatch = transform.match(/rotate\(([^)]+)\)/);
            const rotation = rotateMatch ? parseFloat(rotateMatch[1]) : position.rotation;
            
            // Update position with new rotation
            updatePosition({ rotation });
            
            // Get updated position after rotation
            const rect = target.getBoundingClientRect();
            const containerRect = containerRef.current!.getBoundingClientRect();
            
            // Update position after rotation
            const x = rect.left - containerRect.left;
            const y = rect.top - containerRect.top;
            
            updatePosition({ x, y });
          }}
        />
      )}
      
      {/* Instructions tooltip */}
      <div className="absolute bottom-4 right-4 rounded-md bg-blue-600/80 px-3 py-1.5 text-xs text-white">
        <div className="flex items-center space-x-1">
          <span>• Arrastrar: mover</span>
          <span>• Esquinas: redimensionar</span>
          <span>• Círculo: rotar</span>
        </div>
      </div>
    </div>
  );
} 