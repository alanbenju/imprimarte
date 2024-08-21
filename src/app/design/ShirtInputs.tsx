"use client";

import React from "react";

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
    return (
        <div className="flex-1 p-8">
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

                {/* Quantity and Add to Cart Button Row */}
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
                        >
                            Agregar Al Carrito
                        </button>
                        <button
                            className="w-1/2 rounded-md bg-red-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-150 hover:bg-orange-700"
                        >
                            Comprar Ya
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShirtInputsComponent;
