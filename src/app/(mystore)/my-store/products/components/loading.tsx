export function Loading() {
  return (
    <div className="flex h-60 items-center justify-center">
      <div className="text-center">
        <div className="mb-2 size-6 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        <p className="text-gray-600">Cargando productos...</p>
      </div>
    </div>
  );
} 