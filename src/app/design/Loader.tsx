// src/app/components/Loader.tsx
import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="loader size-12 animate-spin rounded-full border-t-4 border-blue-500"></div>
    </div>
  );
};

export default Loader;
