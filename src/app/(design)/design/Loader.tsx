// src/app/components/Loader.tsx
import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/70 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center rounded-lg bg-white/10 p-8 backdrop-blur-md">
        <div className="mb-4 size-16 animate-spin rounded-full border-4 border-blue-300 border-t-blue-600"></div>
        <p className="text-lg font-semibold text-white">Procesando...</p>
      </div>
    </div>
  );
};

export default Loader;
