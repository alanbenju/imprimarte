/* eslint-disable tailwindcss/migration-from-tailwind-2 */
"use client";

import React, { useState } from "react";
import SizeDetails from "./SizeDetails";
import { v4 as uuidv4 } from "uuid";

import { useRouter } from "next/navigation";
import { ColorOption, Product } from "./types";
import { ShoppingCart, Upload } from "lucide-react";

type ShirtInputsProps = {
  selectedColor: ColorOption;
  setSelectedColor: (color: ColorOption) => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedProduct: Product;
  products: Product[];
  setProduct: (product: Product) => void;
  addToCart: (item: any) => Promise<void>;
};

const ShirtInputsComponent: React.FC<ShirtInputsProps> = ({
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
  handleFileUpload,
  selectedProduct,
  products,
  setProduct,
  addToCart,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  const router = useRouter();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddToCart = async (e: any) => {
    e.preventDefault();
    setIsBouncing(true); // Trigger the animation
    await addToCart({
      color: selectedColor.color,
      quantity,
      id: uuidv4() as string,
      name: selectedProduct.name,
      productId: selectedProduct.id,
      price: selectedProduct.price,
      size: selectedSize,
    });
    setTimeout(() => setIsBouncing(false), 500); // Remove the animation after 0.5s
  };

  const handleAddToCartAndBuy = async () => {
    await addToCart({
      color: selectedColor.color,
      quantity,
      id: uuidv4() as string,
      name: selectedProduct.name,
      price: selectedProduct.price,
      size: selectedSize,
      productId: selectedProduct.id,
    });
    router.push("design/checkout");
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="rounded-lg bg-white/95 p-4 shadow-lg backdrop-blur-sm md:p-8">
        <div className="mb-6 justify-start">
          <label
            htmlFor="uploadFile1"
            className="mx-auto flex h-52 max-w-md cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed border-blue-300 bg-blue-50/80 font-[sans-serif] text-base font-semibold text-blue-700 transition-all hover:bg-blue-50"
          >
            <Upload className="mb-2 size-11 text-blue-600" />
            Cargá tu diseño
            <input
              type="file"
              id="uploadFile1"
              onChange={handleFileUpload}
              className="hidden"
              accept=".png"
            />
            <p className="mt-2 text-xs font-medium text-blue-600">Solo PNG esta permitido.</p>
            <p className="mt-2 text-xs font-medium text-blue-600">
              Recomendamos que tenga un DPI mayor a 300 para mejor calidad de imagen
            </p>
          </label>
        </div>
        <div className="mb-6 w-full">
          <label className="block text-sm font-medium text-blue-800">Producto</label>
          {/* Wrapper div with fixed width and overflow-x-auto */}
          <div className="mt-2 w-full max-w-[calc(100vw-2rem)] overflow-x-auto sm:max-w-[calc(100vw-4rem)] md:max-w-[calc(100vw-8rem)]">
            {/* Flex container for items with flex-nowrap */}
            <div className="flex flex-nowrap gap-4 pb-4">
              {products.map((product) => (
                <div key={product.id} className="flex flex-col items-center">
                  <button
                    onClick={() => setProduct(product)}
                    className={`size-32 flex-shrink-0 rounded-md border bg-cover bg-center bg-no-repeat ${
                      selectedProduct.id === product.id
                        ? "border-4 border-blue-600"
                        : "border-gray-300"
                    } relative transition-all duration-150 hover:border-blue-400 hover:shadow-lg`}
                    style={{ backgroundImage: `url(${product.previewImage})` }}
                  >
                    <span className="absolute inset-x-0 bottom-0 bg-blue-900/80 p-2 text-sm text-white">
                      {product.name}
                    </span>
                  </button>
                  <span className="mt-1 rounded-md bg-blue-600 px-2 py-1 text-xs font-bold text-white">
                    ARS ${product.price.toLocaleString("es-AR")}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-2 text-blue-700">{selectedProduct.description}</p>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-blue-800">Color</label>
          <div className="mt-2 flex flex-wrap gap-4">
            {selectedProduct.colors.map((color) => (
              <button
                key={color.color}
                onClick={() => setSelectedColor(color)}
                className={`size-16 rounded-md border ${
                  selectedColor.color === color.color
                    ? "border-4 border-blue-600"
                    : "border-gray-300"
                } transition-all duration-150 hover:border-blue-400 hover:shadow-lg`}
                style={{ backgroundColor: color.background }}
              ></button>
            ))}
          </div>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
          <div className="mb-4 flex flex-col items-start sm:mb-0">
            <label className="block text-sm font-medium text-blue-800">Tamaño</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-lg text-gray-900 transition-all duration-150 hover:border-blue-400 hover:shadow-lg focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:w-20"
            >
              {selectedColor.availableSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4 flex flex-col items-start sm:mb-0">
            <label className="block text-sm font-medium text-blue-800">Cantidad</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-lg text-gray-900 transition-all duration-150 hover:border-blue-400 hover:shadow-lg focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:w-20"
            />
          </div>
        </div>
        <a
          href="#"
          onClick={openModal}
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          Ver Guia de Talles
        </a>

        <div className="mt-6 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <button
            className={`group relative flex flex-1 items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-white transition-all hover:bg-blue-700 ${
              isBouncing ? "bounce" : ""
            }`}
            onClick={handleAddToCart}
          >
            <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-blue-400 to-blue-300 opacity-0 blur transition duration-500 group-hover:opacity-75"></div>
            <div className="relative flex items-center justify-center">
              <ShoppingCart className="mr-2" />
              Agregar Al Carrito
            </div>
          </button>
          <button
            className="group relative flex flex-1 items-center justify-center rounded-lg bg-red-800 px-4 py-3 text-white transition-all hover:bg-red-700"
            onClick={handleAddToCartAndBuy}
          >
            <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-red-400 to-red-300 opacity-0 blur transition duration-500 group-hover:opacity-75"></div>
            <div className="relative">Comprar Ya</div>
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex size-full items-center justify-center overflow-y-auto bg-blue-950/70 p-4 backdrop-blur-sm"
          id="my-modal"
        >
          <div className="relative flex max-h-[80vh] w-full max-w-screen-md flex-col rounded-lg bg-white shadow-xl">
            {/* Close button (X) in the top right corner */}
            <button
              onClick={closeModal}
              className="absolute right-2 top-2 text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label="Close"
            >
              <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="grow overflow-y-auto p-6">
              <div className="mt-2 py-3">
                <SizeDetails selectedProduct={selectedProduct}></SizeDetails>
              </div>
              <div className="mt-4">
                <button
                  className="rounded-md bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={closeModal}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShirtInputsComponent;
