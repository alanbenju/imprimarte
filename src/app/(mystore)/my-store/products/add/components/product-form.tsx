"use client";

import { FiSave } from "react-icons/fi";

interface ProductFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
}

export function ProductForm({
  onSubmit,
  isSubmitting
}: ProductFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Información del producto</h2>
        <p className="text-sm text-gray-600">Ingresa los detalles de tu producto</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
            Nombre del producto*
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Ej: Remera Custom Designs"
            required
          />
        </div>
        
        <div>
          <label htmlFor="price" className="mb-1 block text-sm font-medium text-gray-700">
            Precio (€)*
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="29.99"
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
            Descripción del producto
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Describe tu producto..."
          />
        </div>

        <div className="flex items-center">
          <input
            id="isPublished"
            name="isPublished"
            type="checkbox"
            className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-700">
            Publicar en mi tienda inmediatamente
          </label>
        </div>
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className={`flex w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition 
          ${!isSubmitting ? "bg-blue-600 hover:bg-blue-700" : "cursor-not-allowed bg-blue-300"}`}
      >
        {isSubmitting ? (
          <>
            <span className="mr-2 size-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
            Guardando...
          </>
        ) : (
          <>
            <FiSave className="mr-2 size-4" />
            Crear Producto
          </>
        )}
      </button>
    </form>
  );
} 