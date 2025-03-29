interface ProductProps {
  product: {
    id: number;
    name: string;
    price: string;
    views: number;
    image: string;
  };
}

export function RecentProductRow({ product }: ProductProps) {
  return (
    <div className="flex items-center justify-between rounded-md border border-gray-200 p-3">
      <div className="flex items-center space-x-3">
        <div className="size-10 overflow-hidden rounded-md bg-gray-100">
          <img src={product.image} alt={product.name} className="size-full object-cover" />
        </div>
        <div>
          <h4 className="font-medium text-gray-800">{product.name}</h4>
          <p className="text-xs text-gray-500">{product.views} vistas</p>
        </div>
      </div>
      <p className="text-sm font-medium">${product.price}</p>
    </div>
  );
}

export default RecentProductRow; 