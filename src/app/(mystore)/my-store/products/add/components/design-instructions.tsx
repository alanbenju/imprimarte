"use client";

import { 
  FiMove, 
  FiCornerRightDown, 
  FiRotateCw, 
  FiMaximize2, 
  FiInfo 
} from "react-icons/fi";

export function DesignInstructions() {
  return (
    <div className="mb-8 rounded-lg border border-blue-100 bg-blue-50 p-4">
      <div className="mb-2 flex items-center text-blue-800">
        <FiInfo className="mr-2 size-5" />
        <h3 className="font-medium">Cómo posicionar tu diseño</h3>
      </div>
      
      <ul className="space-y-2 text-sm text-blue-700">
        <li className="flex items-center">
          <span className="mr-2 flex size-6 items-center justify-center rounded-full bg-blue-100">
            <FiMove className="size-3.5" />
          </span>
          <span>Arrastra el diseño para moverlo a la posición deseada</span>
        </li>
        
        <li className="flex items-center">
          <span className="mr-2 flex size-6 items-center justify-center rounded-full bg-blue-100">
            <FiCornerRightDown className="size-3.5" />
          </span>
          <span>Usa la esquina inferior derecha para redimensionar manteniendo la proporción</span>
        </li>
        
        <li className="flex items-center">
          <span className="mr-2 flex size-6 items-center justify-center rounded-full bg-blue-100">
            <FiMaximize2 className="size-3.5" />
          </span>
          <span>Utiliza los controladores laterales para ajustar el ancho y alto</span>
        </li>
        
        <li className="flex items-center">
          <span className="mr-2 flex size-6 items-center justify-center rounded-full bg-blue-100">
            <FiRotateCw className="size-3.5" />
          </span>
          <span>Utiliza el controlador superior para rotar el diseño</span>
        </li>
      </ul>
    </div>
  );
} 