"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { storeService } from "@/services/store.service";

// Import components
import { ProductSelector, CustomiaProduct } from "./components/product-selector";
import { ColorSelector } from "./components/color-selector";
import { ImageUploader } from "./components/image-uploader";
import { ProductForm } from "./components/product-form";
import { ImagePosition } from "./components/image-editor";
import { DesignInstructions } from "./components/design-instructions";
import Image from "next/image";

// Dynamically import ImageEditor to avoid SSR issues with react-moveable
const DynamicImageEditor = dynamic(
  () => import("./components/image-editor").then((mod) => mod.ImageEditor),
  { ssr: false }
);

export default function AddProductPage() {
  const router = useRouter();

  // Product selection state
  const [selectedProduct, setSelectedProduct] = useState<CustomiaProduct | null>(null);
  const [selectedColorId, setSelectedColorId] = useState<string>("");
  const [selectedColors, setSelectedColors] = useState<Set<string>>(new Set());

  // Image upload state
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imagePosition, setImagePosition] = useState<ImagePosition | null>(null);

  // Product details state
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLive, setIsLive] = useState(false);


  console.log("AddProductPage", {selectedProduct, selectedColorId, selectedColors, uploadedImage, imagePosition})

  // Update selected colors when product changes
  useEffect(() => {
    if (selectedProduct) {
      // Default first color
      if (selectedProduct.colors.length > 0) {
        const firstColorId = selectedProduct.colors[0].id;
        setSelectedColorId(firstColorId);
        setSelectedColors(new Set([firstColorId]));
      }
    }
  }, [selectedProduct]);

  // Handle product selection
  const handleProductSelect = (product: CustomiaProduct | null) => {
    setSelectedProduct(product);
  };

  // Handle color selection
  const handleColorChange = (colorId: string) => {
    setSelectedColorId(colorId);
  };

  // Handle color toggle for multiple selection
  const handleColorToggle = (colorId: string, isSelected: boolean) => {
    const newSelectedColors = new Set(selectedColors);

    if (isSelected) {
      newSelectedColors.add(colorId);
    } else {
      newSelectedColors.delete(colorId);
    }

    setSelectedColors(newSelectedColors);
  };

  // Handle image change
  const handleImageChange = (file: File | null, preview: string | null) => {
    setUploadedImage(file ? URL.createObjectURL(file) : null);
    setImagePreview(preview);
    // Reset position when image changes
    setImagePosition(null);
  };

  // Handle image position change
  const handleImagePositionChange = (position: ImagePosition) => {
    setImagePosition(position);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Get data from form
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const isPublished = formData.get("isPublished") === "on";

    setIsSubmitting(true);

    try {
      // Add validation here
      if (!selectedProduct || !uploadedImage || !imagePosition || selectedColors.size === 0) {
        alert("Por favor completa todos los campos requeridos");
        setIsSubmitting(false);
        return;
      }

      // Create FormData for API call
      const apiFormData = new FormData();
      apiFormData.append("name", name);
      apiFormData.append("description", description);
      apiFormData.append("price", price.toString());
      apiFormData.append("isPublished", isPublished.toString());
      apiFormData.append("baseProductId", selectedProduct.id);
      apiFormData.append("imagePosition", JSON.stringify(imagePosition));
      apiFormData.append("selectedColors", JSON.stringify(Array.from(selectedColors)));

      // Save product to API
      await storeService.createProduct(apiFormData);

      router.push("/my-store/products");
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Error al crear el producto. Por favor intenta nuevamente.");
      setIsSubmitting(false);
    }
  };

  // Current color
  const currentColor = selectedProduct?.colors.find(color => color.id === selectedColorId);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/my-store/products"
            className="mb-2 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            <FiArrowLeft className="mr-1" />
            Volver a productos
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Agregar Producto</h1>
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-sm">
        <div className="grid gap-8 p-6 md:grid-cols-2">
          {/* Left Column: Product Selection & Design */}
          <div className="space-y-8">
            {/* Product selector */}
            <ProductSelector
              onSelect={handleProductSelect}
              selectedId={selectedProduct?.id || null}
            />

            {/* Color selector (displayed only when product is selected) */}
            {selectedProduct && (
              <ColorSelector
                product={selectedProduct}
                selectedColorId={selectedColorId}
                selectedColors={selectedColors}
                onColorChange={handleColorChange}
                onToggleColor={handleColorToggle}
              />
            )}

            {/* Image uploader */}
            <ImageUploader
              onChange={handleImageChange}
              disabled={!selectedProduct}
            />

            {/* Design instructions */}
            {selectedProduct && !uploadedImage && (
              <DesignInstructions />
            )}
          </div>

          {/* Right Column: Preview & Form */}
          <div className="space-y-8">
            {/* Preview Area */}
            <div>
              <h2 className="mb-3 text-lg font-medium text-gray-900">Vista Previa</h2>
              <div className="relative aspect-square overflow-hidden rounded-lg border bg-gray-100">
                {selectedProduct ? (
                  <>
                    <DynamicImageEditor
                      product={selectedProduct}
                      imageUrl={uploadedImage || ""} // Pass empty string when no image uploaded
                      onImagePositionChange={handleImagePositionChange}
                      selectedColorId={selectedColorId}
                    />
                  </>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                    <div className="size-16 rounded-full bg-blue-100 p-4 text-blue-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="mt-3 text-sm font-medium text-gray-900">Vista previa no disponible</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Selecciona un producto base primero
                    </p>
                  </div>
                )}
              </div>

              {/* Display image dimensions (if available) */}
              {imagePosition && (
                <div className="mt-2 flex flex-wrap justify-between rounded-lg bg-blue-50 p-3 text-sm">
                  <div>
                    <span className="font-medium text-blue-700">Dimensiones: </span>
                    <span className="text-blue-600">
                      {imagePosition.sizeInCm.width.toFixed(1)} × {imagePosition.sizeInCm.height.toFixed(1)} cm
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-blue-700">Rotación: </span>
                    <span className="text-blue-600">{Math.round(imagePosition.rotation)}°</span>
                  </div>
                </div>
              )}
            </div>

            {/* Product Form */}
            <ProductForm
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 