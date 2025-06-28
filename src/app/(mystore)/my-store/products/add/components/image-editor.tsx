"use client";

import { useState, useRef, useEffect } from "react";
import { Stage, Layer, Image as KonvaImage, Rect } from "react-konva";
import useImage from "use-image";
import { CustomiaProduct } from "./product-selector";
import { productConfig } from "@/app/(design)/design/components/helpers/config";
import Konva from "konva";

// Map our CustomiaProduct IDs to config.ts IDs
const PRODUCT_CONFIG_MAP: Record<string, string> = {
  "regular-fit": "1", // Regular Fit
  "canguro": "3",     // Canguro
};

interface ImageEditorProps {
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

interface DraggableImageProps {
  image: HTMLImageElement;
  rectX: number;
  rectY: number;
  rectWidth: number;
  rectHeight: number;
  onPositionChange: (position: ImagePosition) => void;
  config: any;
  scaleFactor: number;
}

function DraggableImage({ 
  image, 
  rectX, 
  rectY, 
  rectWidth, 
  rectHeight, 
  onPositionChange,
  config,
  scaleFactor
}: DraggableImageProps) {
  const imageRef = useRef<Konva.Image>(null);
  
  // Calculate initial size maintaining aspect ratio
  const aspectRatio = image.naturalWidth / image.naturalHeight;
  const maxWidth = rectWidth * 0.5;
  const maxHeight = rectHeight * 0.5;
  
  let initialWidth = maxWidth;
  let initialHeight = maxWidth / aspectRatio;
  
  if (initialHeight > maxHeight) {
    initialHeight = maxHeight;
    initialWidth = maxHeight * aspectRatio;
  }
  
  // Initialize image properties - start at rectangle center
  const [imageData, setImageData] = useState({
    x: rectX + rectWidth / 2,
    y: rectY + rectHeight / 2,
    width: initialWidth,
    height: initialHeight,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
  });

  // Calculate dimensions in cm based on original config (not scaled)
  const pixelsToCm = (pixels: number, dimension: "width" | "height") => {
    const scaledPixels = pixels / scaleFactor;
    const pixelDimension = config.rectSizePixels[dimension];
    const cmDimension = config.rectSizeCM[dimension];
    return (scaledPixels / pixelDimension) * cmDimension;
  };

  const handleTransform = () => {
    const node = imageRef.current;
    if (!node) return;

    const newAttrs = {
      x: node.x(),
      y: node.y(),
      width: node.width() * node.scaleX(),
      height: node.height() * node.scaleY(),
      rotation: node.rotation(),
      scaleX: 1,
      scaleY: 1,
    };

    // Update image properties
    node.setAttrs(newAttrs);
    setImageData(newAttrs);

    // Calculate size in cm and notify parent
    const sizeInCm = {
      width: pixelsToCm(newAttrs.width, "width"),
      height: pixelsToCm(newAttrs.height, "height")
    };
    
    onPositionChange({
      x: newAttrs.x / scaleFactor,
      y: newAttrs.y / scaleFactor,
      width: newAttrs.width / scaleFactor,
      height: newAttrs.height / scaleFactor,
      rotation: newAttrs.rotation,
      sizeInCm
    });
  };

  useEffect(() => {
    const node = imageRef.current;
    if (!node) return;

    // Add transformer with more permissive bounds
    const transformer = new Konva.Transformer({
      nodes: [node],
      keepRatio: false,
      enabledAnchors: ["top-left", "top-right", "bottom-left", "bottom-right"],
      boundBoxFunc: (oldBox, newBox) => {
        // Prevent the image from being resized too small
        const minSize = 20;
        if (newBox.width < minSize || newBox.height < minSize) {
          return oldBox;
        }
        
        // More permissive bounds checking - allow some overflow during resize
        // The drag bounds will ensure it stays within bounds after resize
        const margin = 10; // Allow 10px margin for easier resizing
        if (newBox.x < rectX - margin || 
            newBox.y < rectY - margin || 
            newBox.x + newBox.width > rectX + rectWidth + margin || 
            newBox.y + newBox.height > rectY + rectHeight + margin) {
          
          // If we're way outside bounds, restrict it
          if (newBox.x < rectX - 50 || 
              newBox.y < rectY - 50 || 
              newBox.x + newBox.width > rectX + rectWidth + 50 || 
              newBox.y + newBox.height > rectY + rectHeight + 50) {
            return oldBox;
          }
        }
        
        return newBox;
      },
    });

    const layer = node.getLayer();
    if (layer) {
      layer.add(transformer);
      
      // Handle selection
      const handleStageClick = (e: any) => {
        if (e.target === node) {
          transformer.nodes([node]);
        } else {
          transformer.nodes([]);
        }
        layer.batchDraw();
      };

      const stage = layer.getStage();
      if (stage) {
        stage.on("click tap", handleStageClick);
        
        // Auto-select the image initially
        transformer.nodes([node]);
        layer.batchDraw();

        return () => {
          stage.off("click tap", handleStageClick);
          transformer.destroy();
        };
      }
    }
  }, [rectX, rectY, rectWidth, rectHeight]);

  // Initialize position after mount
  useEffect(() => {
    if (imageRef.current) {
      handleTransform();
    }
  }, []);

  return (
    <KonvaImage
      ref={imageRef}
      image={image}
      x={imageData.x}
      y={imageData.y}
      width={imageData.width}
      height={imageData.height}
      offsetX={imageData.width / 2}
      offsetY={imageData.height / 2}
      rotation={imageData.rotation}
      scaleX={imageData.scaleX}
      scaleY={imageData.scaleY}
      draggable
      onDragEnd={handleTransform}
      onTransformEnd={handleTransform}
      dragBoundFunc={(pos) => {
        // Get current image dimensions
        const node = imageRef.current;
        if (!node) return pos;
        
        const width = node.width() * node.scaleX();
        const height = node.height() * node.scaleY();
        
        // Since we're using offset (center-based positioning)
        const halfWidth = width / 2;
        const halfHeight = height / 2;
        
        // Calculate bounds to keep entire image within rectangle
        const minX = rectX + halfWidth;
        const maxX = rectX + rectWidth - halfWidth;
        const minY = rectY + halfHeight;
        const maxY = rectY + rectHeight - halfHeight;
        
        return {
          x: Math.max(minX, Math.min(maxX, pos.x)),
          y: Math.max(minY, Math.min(maxY, pos.y)),
        };
      }}
    />
  );
}

export function ImageEditor({ product, selectedColorId, imageUrl, onImagePositionChange }: ImageEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stageSize, setStageSize] = useState<{ width: number; height: number } | null>(null);
  
  // Get product configuration
  const configId = PRODUCT_CONFIG_MAP[product.id] || "1";
  const config = productConfig[configId as keyof typeof productConfig];
  
  // Get the selected color or fallback to first color
  const selectedColor = product.colors.find(color => color.id === selectedColorId) || product.colors[0];
  
  // Load images with error handling
  const [productImage, productImageStatus] = useImage(`${product.folderPath}/${selectedColor.filename}`);
  const [uploadedImage, uploadedImageStatus] = useImage(imageUrl ? imageUrl : ""); // Only load if imageUrl exists
    console.log(productImage)
  // Set stage size based on the actual product image dimensions
  useEffect(() => {
    console.log("productImage changed")
    if (productImage) {
      // Use the product image's actual aspect ratio
      const imageAspectRatio = productImage.height / productImage.width;
      
      // Get initial container width or use window width for mobile-first approach
      const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 375;
      const isMobile = viewportWidth < 768;
      
      // Set mobile-friendly initial width
      const defaultMaxWidth = isMobile ? Math.min(viewportWidth - 40, 350) : 500;
      let stageWidth = defaultMaxWidth;
      let stageHeight = defaultMaxWidth * imageAspectRatio;
      
      // If height becomes too large, limit it and adjust width
      const maxHeight = isMobile ? 600 : 800;
      if (stageHeight > maxHeight) {
        stageHeight = maxHeight;
        stageWidth = maxHeight / imageAspectRatio;
      }
      
      setStageSize({
        width: stageWidth,
        height: stageHeight
      });
    }
  }, [productImage]);

  // Separate useEffect for responsive adjustments after component is mounted
  useEffect(() => {
    const updateStageSize = () => {
      if (containerRef.current && productImage && stageSize) {
        const containerWidth = containerRef.current.offsetWidth;
        const viewportWidth = window.innerWidth;
        const isMobile = viewportWidth < 768;
        
        // Mobile-first responsive sizing
        let maxWidth;
        if (isMobile) {
          maxWidth = Math.min(containerWidth - 20, viewportWidth - 40, 350);
        } else {
          maxWidth = Math.min(containerWidth - 32, 600);
        }
        
        // Use the product image's actual aspect ratio
        const imageAspectRatio = productImage.height / productImage.width;
        
        // Calculate stage dimensions maintaining the image's aspect ratio
        let stageWidth = maxWidth;
        let stageHeight = maxWidth * imageAspectRatio;
        
        // If height becomes too large, limit it and adjust width
        const maxHeight = isMobile ? 600 : 800;
        if (stageHeight > maxHeight) {
          stageHeight = maxHeight;
          stageWidth = maxHeight / imageAspectRatio;
        }
        
        // Only update if dimensions actually changed
        if (Math.abs(stageSize.width - stageWidth) > 5 || Math.abs(stageSize.height - stageHeight) > 5) {
          setStageSize({
            width: stageWidth,
            height: stageHeight
          });
        }
      }
    };

    if (productImage && stageSize) {
      window.addEventListener("resize", updateStageSize);
      return () => window.removeEventListener("resize", updateStageSize);
    }
  }, [productImage, stageSize]);
  
  // Don't render until we have both the product image and calculated stage size
  console.log(product, productImageStatus, uploadedImageStatus, stageSize);
  if (productImageStatus === "loading" || (imageUrl && uploadedImageStatus === "loading") || !stageSize) {
    return (
      <div className="mb-8 space-y-4">
        <div className="flex h-[400px] items-center justify-center">
          <div className="text-gray-500">Cargando editor...</div>
        </div>
      </div>
    );
  }
  
  // Calculate scale factor based on how much we've scaled the original image
  const scaleFactor = productImage ? stageSize.width / productImage.width : 1;
  
  // Calculate rectangle position and size using percentage-based values
  const rectWidth = (stageSize.width * config.rectSizePercentage.width) / 100;
  const rectHeight = (stageSize.height * config.rectSizePercentage.height) / 100;
  const rectX = (stageSize.width * config.rectPositionPercentage.x) / 100;
  const rectY = (stageSize.height * config.rectPositionPercentage.y) / 100;

  return (
    <div className="mb-8 space-y-4">
      <div ref={containerRef} className="w-full">
        <div className="mx-auto flex justify-center">
          <div className="max-w-full overflow-hidden">
            <Stage width={stageSize.width} height={stageSize.height}>
              <Layer>
                {/* Product background image - use its natural size scaled to fit stage */}
                {productImage && (
                  <KonvaImage 
                    image={productImage} 
                    width={stageSize.width}
                    height={stageSize.height}
                    x={0}
                    y={0}
                  />
                )}
                
                {/* Design area rectangle (visual guide) */}
                <Rect
                  x={rectX}
                  y={rectY}
                  width={rectWidth}
                  height={rectHeight}
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dash={[10, 5]}
                  opacity={0.7}
                />
                
                {/* Draggable uploaded image */}
                {uploadedImage && (
                  <DraggableImage
                    image={uploadedImage}
                    rectX={rectX}
                    rectY={rectY}
                    rectWidth={rectWidth}
                    rectHeight={rectHeight}
                    onPositionChange={onImagePositionChange}
                    config={config}
                    scaleFactor={scaleFactor}
                  />
                )}
              </Layer>
            </Stage>
          </div>
        </div>
      </div>
    </div>
  );
} 