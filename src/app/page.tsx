import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

const Home: FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
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

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-between py-16 md:flex-row">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white drop-shadow-lg md:text-5xl">
              Creá y Comprá Remeras Personalizadas
            </h1>

            {/* Diseño Vertical con Pasos Numerados */}
            <div className="mt-8 flex flex-col items-start">
              <Image
                src="/pasos.png" alt={""} width={300} height={300}></Image>
            </div>

            <div className="mt-8 space-x-4">
              <Link href="/design" className="rounded-md bg-blue-800 px-6 py-3 text-lg font-semibold text-white">
                Probálo
              </Link>
            </div>
          </div>

          {/* Contenedor para las imágenes superpuestas */}
          <div className="relative mt-12 flex h-[600px] w-[450px] flex-1 justify-center md:mt-0">
            {/* Primera Imagen en la Esquina Superior Izquierda */}
            <div className="absolute left-0 top-0">
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

      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-8 py-16 md:grid-cols-2">
  <div className="flex items-start">
    <div className="mr-6">
      <img src="./icons/remera.svg" alt="Sin Límites de Compra" className="size-24" />
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
      <img src="./icons/inspirate.svg" alt="Inspírate y Crea" className="size-24" />
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
      <img src="./icons/automatico.svg" alt="Completamente Automático" className="size-36" />
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
      <img src="./icons/paga.svg" alt="Precios Accesibles" className="size-36" />
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
