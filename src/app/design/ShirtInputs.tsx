"use client";

import React, { useContext, useState } from "react";
import SizeDetails from "./SizeDetails";
import { CartContext } from "../contexts/CartContext";
import { useRouter } from "next/navigation";

type ShirtInputsProps = {
    selectedColor: string;
    setSelectedColor: (color: string) => void;
    selectedSize: string;
    setSelectedSize: (size: string) => void;
    quantity: number;
    setQuantity: (quantity: number) => void;
    handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ShirtInputsComponent: React.FC<ShirtInputsProps> = ({
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    quantity,
    setQuantity,
    handleFileUpload,
}) => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const { addToCart } = useContext(CartContext);
    const router = useRouter(); // Inicializa useRouter


    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    const handleAddToCart = () => {
        addToCart({
            color: selectedColor,
            quantity: 1,
            id: "1",
            name: "Remera Regular Fit",
            price: "10000",
            size: selectedSize,
        });
    };

    const handleAddToCartAndBuy = () => {
        addToCart({
            color: selectedColor,
            quantity: 1,
            id: "1",
            name: "Remera Regular Fit",
            price: "10000",
            size: selectedSize,
        });
        router.push('design/checkout')
    };


    return (
        <div className="flex-1 p-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="rounded-lg bg-white p-8 shadow-lg">
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
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">Color</label>
                    <div className="mt-2 flex space-x-4">
                        <button
                            onClick={() => setSelectedColor("Negro")}
                            className={`size-16 rounded-md border bg-black px-6 py-3 ${selectedColor === "Negro" ? "border-4 border-yellow-400 text-black" : "border-gray-300"} transition-all duration-150 hover:border-gray-500 hover:shadow-lg`}
                        ></button>
                        <button
                            onClick={() => setSelectedColor("Blanco")}
                            className={`size-16 rounded-md border bg-white px-6 py-3 ${selectedColor === "Blanco" ? "border-4 border-yellow-400 bg-white text-black" : "border-gray-300"} transition-all duration-150 hover:border-gray-500 hover:shadow-lg`}
                        ></button>
                    </div>
                </div>

                <div className="mb-6 flex items-center space-x-4">
                    <div className="flex flex-col items-start">
                        <label className="block text-sm font-medium text-gray-700">Tamaño</label>
                        <select
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}
                            className="mt-2 block w-full rounded-md border border-gray-300 px-4 py-3 text-lg text-gray-900 transition-all duration-150 hover:border-gray-500 hover:shadow-lg focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                        >
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </select>
                    </div>

                    <div className="flex flex-col items-start">
                        <label className="block text-sm font-medium text-gray-700">Cantidad</label>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                            className="mt-2 block w-16 rounded-md border border-gray-300 px-4 py-2 text-lg text-gray-900 transition-all duration-150 hover:border-gray-500 hover:shadow-lg focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                        />
                    </div>
                    <div className="mt-6 flex grow space-x-4">
                        <button
                            className="w-1/2 rounded-md bg-green-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-150 hover:bg-green-700"
                            onClick={handleAddToCart}
                        >
                            Agregar Al Carrito
                        </button>
                        <button
                            className="w-1/2 rounded-md bg-red-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-150 hover:bg-orange-700"
                            onClick={handleAddToCartAndBuy}
                        >
                            Comprar Ya
                        </button>
                    </div>
                </div>
                <a
                    href="#"
                    onClick={openModal}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                    Ver Guia de Talles
                </a>

            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4" id="my-modal">
                    <div className="relative bg-white rounded-lg shadow-xl max-w-screen-md w-full max-h-[80vh] flex flex-col">
                        {/* Close button (X) in the top right corner */}
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                            aria-label="Close"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="p-6 overflow-y-auto flex-grow">
                            <div className="mt-2 py-3">
                                <SizeDetails></SizeDetails>
                            </div>
                            <div className="mt-4">
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
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
