import Link from "next/link";
import Image from "next/image";
import { FiEdit, FiTrash, FiEye, FiMoreVertical } from "react-icons/fi";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface StoreProduct {
  id: string;
  name: string;
  status: "live" | "draft";
  price: number;
  imageUrl: string;
  colorsCount: number;
}

interface ProductCardProps {
  product: StoreProduct;
  storeId: string;
}

export function ProductCard({ product, storeId }: ProductCardProps) {
  const statusColors = {
    live: "bg-green-100 text-green-800",
    draft: "bg-amber-100 text-amber-800"
  };
  
  const statusLabels = {
    live: "En venta",
    draft: "En preparación"
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute right-2 top-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex size-8 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm hover:bg-white">
              <FiMoreVertical className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/store/${storeId}/product/${product.id}`} className="flex w-full cursor-pointer items-center">
                  <FiEye className="mr-2 size-4" />
                  <span>Ver producto</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/my-store/products/edit/${product.id}`} className="flex w-full cursor-pointer items-center">
                  <FiEdit className="mr-2 size-4" />
                  <span>Editar producto</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex cursor-pointer items-center text-red-600 focus:text-red-600" 
                onSelect={() => console.log("Delete product", product.id)}>
                <FiTrash className="mr-2 size-4" />
                <span>Eliminar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
            statusColors[product.status]
          )}>
            {statusLabels[product.status]}
          </span>
          <span className="text-sm font-medium text-gray-500">
            {product.colorsCount} {product.colorsCount === 1 ? "color" : "colores"}
          </span>
        </div>
        
        <h3 className="mb-1 flex-1 font-medium text-gray-900">{product.name}</h3>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="font-medium text-gray-900">€{product.price.toFixed(2)}</span>
          <Link 
            href={`/my-store/products/edit/${product.id}`}
            className="rounded-md px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50"
          >
            Editar
          </Link>
        </div>
      </div>
    </div>
  );
} 