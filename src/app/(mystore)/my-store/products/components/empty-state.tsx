import Link from "next/link";
import { FiPlus, FiPackage } from "react-icons/fi";

interface EmptyStateProps {
  isFiltering: boolean;
  filterTerm?: string;
}

export function EmptyState({ isFiltering, filterTerm }: EmptyStateProps) {
  return (
    <div className="mt-8 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
      <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-gray-100">
        <FiPackage className="size-8 text-gray-500" />
      </div>
      
      <h3 className="mt-4 text-lg font-medium text-gray-900">
        {isFiltering ? "No se encontraron productos" : "No hay productos"}
      </h3>
      
      <p className="mt-2 text-sm text-gray-500">
        {isFiltering 
          ? `No hay resultados para "${filterTerm}". Intenta con otro término o estado.` 
          : "Comienza añadiendo tu primer producto a tu tienda."}
      </p>
      
      {!isFiltering && (
        <Link
          href="/my-store/products/add"
          className="mt-6 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <FiPlus className="mr-2 size-4" />
          Añadir Producto
        </Link>
      )}
    </div>
  );
} 