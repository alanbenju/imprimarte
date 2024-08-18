import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Home: FC = () => {
  return (
    <main className="min-h-screen flex flex-col items-center bg-white">
      {/* Hero Section */}
      <section className="relative w-full">
        {/* Background GIF */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/carousel4.gif')",
          }}
        >
          {/* Overlay para oscurecer ligeramente el fondo */}
          <div className="absolute inset-0 bg-black opacity-80"></div>
        </div>

        <div className="relative flex flex-col md:flex-row items-center justify-between w-full max-w-7xl py-16 mx-auto z-10">
          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
              Creá y Comprá Remeras Personalizadas
            </h1>

            {/* Diseño Vertical con Pasos Numerados */}
            <div className="mt-8 flex flex-col items-start">
              <Image
                src="/pasos.png" alt={''} width={300} height={300}></Image>
            </div>

            <div className="mt-8 space-x-4">
              <Link href="/design" className="bg-blue-800 text-white py-3 px-6 rounded-md text-lg font-semibold">
                Probálo
              </Link>
            </div>
          </div>

          {/* Contenedor para las imágenes superpuestas */}
          <div className="flex-1 mt-12 md:mt-0 flex justify-center relative h-[600px] w-[450px]">
            {/* Primera Imagen en la Esquina Superior Izquierda */}
            <div className="absolute top-0 left-0">
              <Image
                src="/remera-negra.png"
                alt="Diseño de Remera Negra Personalizada"
                width={300}
                height={300}
                className="rounded-lg border border-gray-300 bg-white bg-opacity-30"
              />
            </div>

            {/* Segunda Imagen en la Esquina Inferior Derecha */}
            <div className="absolute bottom-0 right-0">
              <Image
                src="/remera-blanca.png"
                alt="Diseño de Remera Blanca Personalizada"
                width={300}
                height={300}
                className="rounded-lg border border-gray-300 bg-white bg-opacity-30"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-6xl px-8 py-16 mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
  <div className="flex items-start">
    <div className="mr-6">
      <img src="./icons/remera.svg" alt="Sin Límites de Compra" className="w-24 h-24" />
    </div>
    <div>
      <h3 className="text-2xl font-bold text-gray-900">Sin Límites de Compra</h3>
      <p className="mt-2 text-gray-700">
        Compra solo lo que necesitas, sin pedidos mínimos ni compromisos.
      </p>
    </div>
  </div>

  <div className="flex items-start">
    <div className="mr-6">
      <img src="./icons/inspirate.svg" alt="Inspírate y Crea" className="w-24 h-24" />
    </div>
    <div>
      <h3 className="text-2xl font-bold text-gray-900">Inspírate y Crea</h3>
      <p className="mt-2 text-gray-700">
        Explora y diseña tus remeras para cualquier ocasión, sin límites a tu creatividad.
      </p>
    </div>
  </div>

  <div className="flex items-start">
    <div className="mr-6">
      <img src="./icons/automatico.svg" alt="Completamente Automático" className="w-36 h-36" />
    </div>
    <div>
      <h3 className="text-2xl font-bold text-gray-900">Completamente Automático</h3>
      <p className="mt-2 text-gray-700">
        Nuestro proceso automatizado hace que la personalización y el envío sean rápidos y sin complicaciones.
      </p>
    </div>
  </div>

  <div className="flex items-start">
    <div className="mr-6">
      <img src="./icons/paga.svg" alt="Precios Accesibles" className="w-36 h-36" />
    </div>
    <div>
      <h3 className="text-2xl font-bold text-gray-900">Precios Accesibles</h3>
      <p className="mt-2 text-gray-700">
        Nuestros precios están diseñados para adaptarse a cualquier presupuesto, ya sea para un proyecto personal o un evento.
      </p>
    </div>
  </div>
</section>



    </main>
  );
};

export default Home;
