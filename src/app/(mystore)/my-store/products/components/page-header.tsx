import Link from "next/link";
import { FiPlus } from "react-icons/fi";

export function PageHeader() {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Productos</h1>
        <p className="text-gray-600">Gestiona los productos de tu tienda</p>
      </div>
      
      <Link 
        href="/my-store/products/add"
        className="flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 md:w-auto"
      >
        <FiPlus className="mr-2 size-4" />
        Añadir Producto
      </Link>
    </div>
  );
} 