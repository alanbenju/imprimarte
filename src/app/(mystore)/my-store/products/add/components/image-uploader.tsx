"use client";

import { useState, useRef } from "react";
import { FiUpload, FiX } from "react-icons/fi";

interface ImageUploaderProps {
  onChange: (file: File | null, preview: string | null) => void;
  disabled?: boolean;
}

export function ImageUploader({ onChange, disabled = false }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const preview = reader.result as string;
        setImagePreview(preview);
        onChange(file, preview);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      onChange(null, null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (disabled) return;
    
    const file = e.dataTransfer.files?.[0] || null;
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        const preview = reader.result as string;
        setImagePreview(preview);
        onChange(file, preview);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImagePreview(null);
    onChange(null, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="mb-8 space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Diseño personalizado</h2>
      <p className="text-sm text-gray-600">Sube la imagen que se aplicará al producto</p>

      {imagePreview ? (
        <div className="relative">
          <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-lg border border-gray-200 bg-white">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="size-full object-contain p-4" 
            />
          </div>
          <button
            type="button"
            onClick={clearImage}
            className="absolute right-2 top-2 rounded-full bg-gray-800/70 p-1 text-white transition hover:bg-gray-800"
          >
            <FiX className="size-5" />
          </button>
        </div>
      ) : (
        <div
          className={`flex aspect-square w-full max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : disabled 
                ? "cursor-not-allowed border-gray-300 bg-gray-100 opacity-70" 
                : "border-gray-300 bg-gray-50 hover:bg-gray-100"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !disabled && fileInputRef.current?.click()}
        >
          <FiUpload className="mb-3 size-10 text-gray-400" />
          <p className="mb-2 text-sm font-medium text-gray-700">
            {disabled 
              ? "Selecciona un producto primero" 
              : "Arrastra tu imagen aquí o haz clic para seleccionar"
            }
          </p>
          <p className="text-xs text-gray-500">
            {!disabled && "PNG, JPG o SVG (Max. 5MB)"}
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            disabled={disabled}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  );
} 