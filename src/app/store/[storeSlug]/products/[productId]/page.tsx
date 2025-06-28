import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "../../components/products/AddToCartButton";

async function getStoreData(storeSlug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/store/public/${storeSlug}`, {
      cache: "no-store",
    });
    
    if (!res.ok) {
      return null;
    }
    
    return res.json();
  } catch (error) {
    console.error("Failed to fetch store data:", error);
    return null;
  }
}

// Mock products for demo purposes
const MOCK_PRODUCTS = [
  {
    id: "prod_1",
    name: "Camiseta Premium",
    description: "Camiseta 100% algodón de alta calidad con diseño exclusivo. Ideal para uso diario, esta prenda combina comodidad y estilo. Disponible en varios colores y tallas. Lavable a máquina, no usar blanqueador.",
    price: 2500,
    images: ["/images/mock/product1.jpg"],
    category: "ropa",
  },
  {
    id: "prod_2",
    name: "Taza Personalizada",
    description: "Taza de cerámica resistente con tu diseño favorito. Perfecta para café, té o chocolate caliente. Capacidad de 330ml. Apta para microondas y lavavajillas. Un regalo ideal para cualquier ocasión.",
    price: 1200,
    images: ["/images/mock/product2.jpg"],
    category: "accesorios",
  },
  {
    id: "prod_3",
    name: "Póster Artístico",
    description: "Póster impreso en papel fotográfico de alta calidad. Diseños exclusivos que darán vida a cualquier espacio. Disponible en varios tamaños. Se recomienda enmarcar para una mayor durabilidad y mejor presentación.",
    price: 800,
    images: ["/images/mock/product3.jpg"],
    category: "decoración",
  },
];

export default async function ProductPage({
  params,
}: {
  params: { storeSlug: string; productId: string };
}) {
  const store = await getStoreData(params.storeSlug);
  
  if (!store) {
    notFound();
  }
  
  // Find the product in the store's products or in mock data
  let product;
  
  if (store.products?.length > 0) {
    product = store.products.find((p: any) => p.id === params.productId);
  }
  
  if (!product) {
    product = MOCK_PRODUCTS.find((p) => p.id === params.productId);
  }
  
  if (!product) {
    notFound();
  }
  
  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-lg border border-gray-200">
          {product.images && product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-gray-100">
              <span className="text-gray-500">Sin imagen</span>
            </div>
          )}
        </div>
        
        {/* Product Details */}
        <div className="flex flex-col">
          <h1 
            className="mb-2 text-2xl font-bold md:text-3xl"
            style={{ color: store.productTextColor || "#111827" }}
          >
            {product.name}
          </h1>
          
          <div className="mb-6 flex items-center">
            <p 
              className="text-2xl font-bold" 
              style={{ color: store.productTextColor || "#111827" }}
            >
              ${product.price.toFixed(2)}
            </p>
          </div>
          
          <div className="mb-6">
            <h2 className="mb-2 font-medium" style={{ color: store.colorText || "#374151" }}>
              Descripción
            </h2>
            <p className="text-gray-600">
              {product.description}
            </p>
          </div>
          
          <div className="mt-auto">
            <AddToCartButton
              product={product}
              buyButtonColor={store.buyButtonColor}
            />
          </div>
          
          {/* Additional Info */}
          <div className="mt-8 rounded-lg border border-gray-200 p-4">
            <h3 className="mb-2 font-medium" style={{ color: store.colorText || "#374151" }}>
              Información de envío
            </h3>
            <p className="text-sm text-gray-600">
              Realizamos envíos a todo el país. El tiempo de entrega varía según tu ubicación.
              Consulta los detalles en la página de checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 