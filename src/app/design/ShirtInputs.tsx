/* eslint-disable tailwindcss/migration-from-tailwind-2 */
"use client";

import React, { useState } from "react";
import SizeDetails from "./SizeDetails";
import { v4 as uuidv4 } from "uuid";

import { useRouter } from "next/navigation";
import { ColorOption, Product } from "./types";

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
    addToCart: (item: any) => void
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
    addToCart
}) => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const router = useRouter(); // Inicializa useRouter


    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    const handleAddToCart = async () => {
        await addToCart({
            color: selectedColor.color,
            quantity,
            id: uuidv4() as string,
            name: selectedProduct.name,
            productId: selectedProduct.id,
            price: selectedProduct.price,
            size: selectedSize,
        });
    };

    const handleAddToCartAndBuy = async () => {
        await addToCart({
            color: selectedColor.color,
            quantity,
            id: uuidv4() as string,
            name: selectedProduct.name,
            price: selectedProduct.price,
            size: selectedSize,
            productId: selectedProduct.id
        });
        router.push("design/checkout")
    };

    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="rounded-lg bg-white p-4 shadow-lg md:p-8">
                <div className="mb-6 justify-start">
                    <label
                        htmlFor="uploadFile1"
                        className="mx-auto flex h-52 max-w-md cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed border-gray-300 bg-white font-[sans-serif] text-base font-semibold text-gray-500"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mb-2 w-11 fill-gray-500"
                            viewBox="0 0 32 32"
                        >
                            <path
                                d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                            />
                            <path
                                d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                            />
                        </svg>
                        Cargá tu diseño

                        <input
                            type="file"
                            id="uploadFile1"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                        <p className="mt-2 text-xs font-medium text-gray-400">
                            PNG, JPG, SVG, WEBP, and GIF are allowed.
                        </p>
                    </label>
                </div>
                <div className="mb-6 w-full">
                    <label className="block text-sm font-medium text-gray-700">Producto</label>
                    {/* Wrapper div with fixed width and overflow-x-auto */}
                    <div className="mt-2 w-full max-w-[calc(100vw-2rem)] overflow-x-auto sm:max-w-[calc(100vw-4rem)] md:max-w-[calc(100vw-8rem)]">
                        {/* Flex container for items with flex-nowrap */}
                        <div className="flex flex-nowrap gap-4 pb-4">
                            {products.map((product) => (
                                <div key={product.id} className="flex flex-col items-center">
                                    <button
                                        onClick={() => setProduct(product)}
                                        className={`size-32 flex-shrink-0 rounded-md border bg-cover bg-center bg-no-repeat ${selectedProduct.id === product.id ? "border-4 border-yellow-400" : "border-gray-300"
                                            } relative transition-all duration-150 hover:border-gray-500 hover:shadow-lg`}
                                        style={{ backgroundImage: `url(${product.previewImage})` }}
                                    >
                                        <span className="absolute inset-x-0 bottom-0 bg-black bg-opacity-50 p-2 text-sm text-white">
                                            {product.name}
                                        </span>
                                    </button>
                                    <span className="mt-1 rounded-md bg-yellow-400 px-2 py-1 text-xs font-bold text-black">
                                        ARS ${product.price.toLocaleString("es-AR")}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">Color</label>
                    <div className="mt-2 flex flex-wrap gap-4">
                        {selectedProduct.colors.map((color) => (
                            <button
                                key={color.color}
                                onClick={() => setSelectedColor(color)}
                                className={`size-16 rounded-md border ${selectedColor.color === color.color ? "border-4 border-yellow-400" : "border-gray-300"
                                    } transition-all duration-150 hover:border-gray-500 hover:shadow-lg`}
                                style={{ backgroundColor: color.background }}
                            ></button>
                        ))}
                    </div>
                </div>

                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                    <div className="mb-4 flex flex-col items-start sm:mb-0">
                        <label className="block text-sm font-medium text-gray-700">Tamaño</label>
                        <select
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}
                            className="mt-2 block w-full rounded-md border border-gray-300 px-4 py-3 text-lg text-gray-900 transition-all duration-150 hover:border-gray-500 hover:shadow-lg focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:w-20"
                        >
                            {selectedColor.availableSizes.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4 flex flex-col items-start sm:mb-0">
                        <label className="block text-sm font-medium text-gray-700">Cantidad</label>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                            className="mt-2 block w-full rounded-md border border-gray-300 px-4 py-2 text-lg text-gray-900 transition-all duration-150 hover:border-gray-500 hover:shadow-lg focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:w-20"
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
                        className="grow rounded-md bg-green-600 px-6 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-150 hover:bg-green-700"
                        onClick={handleAddToCart}
                    >
                        Agregar Al Carrito
                    </button>
                    <button
                        className="grow rounded-md bg-red-600 px-6 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-150 hover:bg-orange-700"
                        onClick={handleAddToCartAndBuy}
                    >
                        Comprar Ya
                    </button>
                </div>

            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex size-full items-center justify-center overflow-y-auto bg-gray-600 bg-opacity-50 p-4" id="my-modal">
                    <div className="relative flex max-h-[80vh] w-full max-w-screen-md flex-col rounded-lg bg-white shadow-xl">
                        {/* Close button (X) in the top right corner */}
                        <button
                            onClick={closeModal}
                            className="absolute right-2 top-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                            aria-label="Close"
                        >
                            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="grow overflow-y-auto p-6">
                            <div className="mt-2 py-3">
                                <SizeDetails selectedProduct={selectedProduct}></SizeDetails>
                            </div>
                            <div className="mt-4">
                                <button
                                    className="rounded-md bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
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
