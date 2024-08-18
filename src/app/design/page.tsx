"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Image as KonvaImage, Rect, Transformer } from 'react-konva';
import Konva from 'konva';

import useImage from 'use-image';
import { UploadedFile } from './types';
import ShirtComponent from './ShirtComponent';

const initialUploadedFile: UploadedFile = {
  url: '',
  width: 100,
  height: 100,
  id: '1',
  x: 1,
  y: 1,
  isDragging: false
}

const DesignPage = () => {

  const [uploadedFile, setUploadedFile] = useState<UploadedFile>(initialUploadedFile);

  const [selectedColor, setSelectedColor] = useState<string>('Negro');
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [quantity, setQuantity] = useState<number>(1);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const img = new Image();
      const url = URL.createObjectURL(event.target.files[0]);

      img.onload = () => {
        setUploadedFile({ ...uploadedFile, width: img.width, height: img.height, url })
      };
      img.src = url;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center">
      {/* Left Side: Image */}
      <ShirtComponent
        selectedColor={selectedColor}
        uploadedFile={uploadedFile}
        setUploadedFile={setUploadedFile}
      />

      {/* Right Side: Customization Options */}
      <div className="flex-1 p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-6 justify-start">
            <label
              htmlFor="uploadFile1"
              className="bg-white text-gray-500 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-11 mb-2 fill-gray-500"
                viewBox="0 0 32 32"
              >
                <path
                  d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                />
                <path
                  d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                />
              </svg>
              Upload file

              <input
                type="file"
                id="uploadFile1"
                onChange={handleFileUpload}
                className="hidden"
              />
              <p className="text-xs font-medium text-gray-400 mt-2">
                PNG, JPG, SVG, WEBP, and GIF are allowed.
              </p>
            </label>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Color</label>
            <div className="mt-2 flex space-x-4">
              <button
                onClick={() => setSelectedColor('Negro')}
                className={`w-16 h-16 px-6 py-3 rounded-md border bg-black ${selectedColor === 'Negro' ? 'border-4 border-yellow-400 text-black' : 'border-gray-300'} hover:border-gray-500 hover:shadow-lg transition-all duration-150`}
              >              </button>
              <button
                onClick={() => setSelectedColor('Blanco')}
                className={`w-16 h-16 px-6 py-3 rounded-md border bg-white ${selectedColor === 'Blanco' ? 'border-4 border-yellow-400 bg-white text-black' : 'border-gray-300'} hover:border-gray-500 hover:shadow-lg transition-all duration-150`}
              >
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Tamaño</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="mt-2 block w-full text-lg text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 hover:border-gray-500 hover:shadow-lg transition-all duration-150 px-4 py-3"
            >
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Cantidad</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="mt-2 block w-full text-lg text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 hover:border-gray-500 hover:shadow-lg transition-all duration-150 px-4 py-3"
            />
          </div>

          <div className="mt-8">
            <button
              className="w-full bg-green-600 text-white py-4 px-6 rounded-md text-lg font-semibold shadow-lg hover:bg-green-700 transition-all duration-150"
            >
              Agregar Al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignPage;
