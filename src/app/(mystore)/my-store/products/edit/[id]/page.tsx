"use client";

import { useParams } from "next/navigation";

export default function EditProductPage() {
  const params = useParams();
  const productId = params.id as string;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Editar Producto</h1>
      <p className="text-gray-600">Esta página permitirá editar el producto con ID: {productId}</p>
    </div>
  );
} 