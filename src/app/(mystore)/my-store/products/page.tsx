"use client";

import { useState, useEffect } from "react";
import { FiPlus, FiEdit, FiTrash, FiEye, FiSearch } from "react-icons/fi";
import Link from "next/link";
import { storeService } from "@/services/store.service";

interface Product {
  id: string;
  name: string;
  price: number;
  views: number;
  imageUrl: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [storeId, setStoreId] = useState<string | null>(null);

  useEffect(() => {
    const loadStore = async () => {
      try {
        const store = await storeService.getMyStore();
        setStoreId(store.id);
      } catch (error) {
        console.error("Error loading store ID:", error);
      }
    };
    
    loadStore();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        // Get products for the current user's store
        const products = await storeService.getMyStoreProducts();
        setProducts(products);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Productos</h1>
          <p className="text-gray-600">Gestiona los productos de tu tienda</p>
        </div>
        <Link 
          href="/my-store/products/add"
          className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          <FiPlus className="mr-2" />
          Añadir Producto
        </Link>
      </div>

      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full rounded-md border border-gray-300 p-2 pl-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-60 items-center justify-center">
          <div className="text-center">
            <div className="mb-2 size-6 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            <p className="text-gray-600">Cargando productos...</p>
          </div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
          <p className="mb-2 text-lg font-medium text-gray-700">No hay productos</p>
          <p className="text-gray-500">
            {searchTerm ? "No se encontraron productos con ese término de búsqueda." : "Comienza añadiendo tu primer producto a tu tienda."}
          </p>
          {!searchTerm && (
            <Link 
              href="/my-store/products/add"
              className="mt-4 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            >
              <FiPlus className="mr-2" />
              Añadir Producto
            </Link>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Producto</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Precio</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Vistas</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div className="size-10 shrink-0 overflow-hidden rounded-md bg-gray-200">
                        <img src={product.imageUrl} alt={product.name} className="size-full object-cover" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">ID: {product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    €{product.price.toFixed(2)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {product.views}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-center text-sm font-medium">
                    <div className="flex items-center justify-center space-x-2">
                      <Link href={`/store/${storeId}/product/${product.id}`} className="text-gray-500 hover:text-blue-600">
                        <FiEye className="size-5" title="Ver producto" />
                      </Link>
                      <Link href={`/my-store/products/edit/${product.id}`} className="text-gray-500 hover:text-green-600">
                        <FiEdit className="size-5" title="Editar producto" />
                      </Link>
                      <button onClick={() => console.log("Delete product", product.id)} className="text-gray-500 hover:text-red-600">
                        <FiTrash className="size-5" title="Eliminar producto" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 