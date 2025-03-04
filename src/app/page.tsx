"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Store, Palette, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

export default function Component() {
  const [hoveredSection, setHoveredSection] = useState<"store" | "design" | null>(null);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section with Split Design */}
      <section className="flex min-h-[calc(100vh-4rem)] w-full flex-col pt-16 md:flex-row md:pt-0">
        {/* Create Store Section */}
        <motion.div
          className={`relative flex items-center justify-center overflow-hidden px-6 py-16 transition-all duration-500 ease-in-out md:px-8 md:py-0 ${
            hoveredSection === "store"
              ? "md:w-3/5"
              : hoveredSection === "design"
                ? "md:w-2/5"
                : "md:w-1/2"
          }`}
          style={{
            backgroundImage: "url('/lighter_blue_image.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onMouseEnter={() => setHoveredSection("store")}
          onMouseLeave={() => setHoveredSection(null)}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-blue-950/95"></div>

          {/* Content Container */}
          <div className="relative z-10 mx-auto w-full max-w-xl py-8 md:py-0">
            <div className="flex flex-col items-center justify-center">
              <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-blue-700/50 backdrop-blur-md">
                <Store className="size-10 text-white" />
              </div>
              <h1 className="font-heading mb-4 text-center text-3xl font-bold text-white md:text-4xl">
                Crea Tu Tienda Online
              </h1>
              <p className="mb-8 max-w-lg text-center text-lg text-blue-100 md:text-xl">
                Vende productos personalizados sin inversión inicial, sin stock y sin preocupaciones
                logísticas. Tú te encargas del diseño, nosotros del resto.
              </p>

              <div className="group relative mx-auto w-fit">
                <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-blue-400 to-blue-300 opacity-75 blur transition duration-500 group-hover:opacity-100"></div>
                <button
                  onClick={() => scrollToSection("store-info")}
                  className="relative flex items-center rounded-lg bg-blue-800 px-6 py-3 text-lg font-medium text-white transition-all duration-300 hover:bg-blue-700"
                >
                  Crear Mi Tienda
                  <ArrowRight className="ml-2 size-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-6">
                <div className="flex items-center space-x-2 text-blue-200">
                  <svg
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Sin inversión inicial</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-200">
                  <svg
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Sin stock</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-200">
                  <svg
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Envíos automáticos</span>
                </div>
              </div>
            </div>

            {/* Floating elements for visual interest */}
            <div
              className={`absolute left-1/4 top-1/4 size-20 rounded-full bg-blue-400/20 backdrop-blur-sm transition-opacity duration-500 ${
                hoveredSection === "store" ? "animate-float-slow opacity-100" : "opacity-50"
              }`}
            ></div>
            <div
              className={`absolute bottom-1/3 right-1/4 size-32 rounded-full bg-blue-300/10 backdrop-blur-sm transition-opacity duration-500 ${
                hoveredSection === "store" ? "animate-float opacity-100" : "opacity-50"
              }`}
            ></div>
          </div>
        </motion.div>

        {/* Separator */}
        <div className="hidden h-full w-[2px] bg-white/20 md:block"></div>

        {/* Design Section */}
        <motion.div
          className={`relative flex items-center justify-center overflow-hidden px-6 py-16 transition-all duration-500 ease-in-out md:px-8 md:py-0 ${
            hoveredSection === "design"
              ? "md:w-3/5"
              : hoveredSection === "store"
                ? "md:w-2/5"
                : "md:w-1/2"
          }`}
          style={{
            backgroundImage: "url('/red_gradient_image.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onMouseEnter={() => setHoveredSection("design")}
          onMouseLeave={() => setHoveredSection(null)}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/80 to-red-950/90"></div>

          {/* Content Container */}
          <div className="relative z-10 mx-auto w-full max-w-xl py-8 md:py-0">
            <div className="flex flex-col items-center justify-center">
              <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-red-700/50 backdrop-blur-md">
                <Palette className="size-10 text-white" />
              </div>
              <h2 className="font-heading mb-4 text-center text-3xl font-bold text-white md:text-4xl">
                Diseña y Compra Ahora
              </h2>
              <p className="mb-8 max-w-lg text-center text-lg text-red-100 md:text-xl">
                Crea diseños personalizados y recíbelos en la puerta de tu casa. Elige entre
                diferentes productos, colores y estilos.
              </p>

              <div className="group relative mx-auto w-fit">
                <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-red-400 to-red-300 opacity-75 blur transition duration-500 group-hover:opacity-100"></div>
                <Link
                  href="/design"
                  className="relative flex items-center rounded-lg bg-red-800 px-6 py-3 text-lg font-medium text-white transition-all duration-300 hover:bg-red-700"
                >
                  Diseñar Ahora
                  <ArrowRight className="ml-2 size-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-6">
                <div className="flex items-center space-x-2 text-red-200">
                  <svg
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Diseños personalizados</span>
                </div>
                <div className="flex items-center space-x-2 text-red-200">
                  <svg
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Múltiples productos</span>
                </div>
                <div className="flex items-center space-x-2 text-red-200">
                  <svg
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Envío a domicilio</span>
                </div>
              </div>
            </div>

            {/* Floating elements for visual interest */}
            <div
              className={`absolute right-1/4 top-1/3 size-24 rounded-full bg-red-400/20 backdrop-blur-sm transition-opacity duration-500 ${
                hoveredSection === "design" ? "animate-float opacity-100" : "opacity-50"
              }`}
            ></div>
            <div
              className={`absolute bottom-1/4 left-1/3 size-16 rounded-full bg-red-300/10 backdrop-blur-sm transition-opacity duration-500 ${
                hoveredSection === "design" ? "animate-float-slow opacity-100" : "opacity-50"
              }`}
            ></div>
          </div>
        </motion.div>
      </section>

      {/* Store Information Section */}
      <section id="store-info" className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="font-heading mb-12 text-center text-3xl font-bold text-blue-900 md:text-4xl">
            Crea tu propia tienda de productos personalizados
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-blue-50 p-6 shadow-md transition-all hover:shadow-lg">
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-blue-600 text-white">
                <span className="font-bold">1</span>
              </div>
              <h3 className="font-heading mb-2 text-xl font-bold text-blue-800">
                Regístrate gratis
              </h3>
              <p className="text-blue-700">
                Crea tu cuenta en Customia sin ningún costo ni compromiso. No necesitas tarjeta de
                crédito.
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 p-6 shadow-md transition-all hover:shadow-lg">
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-blue-600 text-white">
                <span className="font-bold">2</span>
              </div>
              <h3 className="font-heading mb-2 text-xl font-bold text-blue-800">
                Sube tus diseños
              </h3>
              <p className="text-blue-700">
                Carga tus diseños y personaliza los productos que quieres vender en tu tienda
                online.
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 p-6 shadow-md transition-all hover:shadow-lg">
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-blue-600 text-white">
                <span className="font-bold">3</span>
              </div>
              <h3 className="font-heading mb-2 text-xl font-bold text-blue-800">
                Configura tu tienda
              </h3>
              <p className="text-blue-700">
                Personaliza tu tienda con tu marca, establece precios y configura tus métodos de
                pago.
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 p-6 shadow-md transition-all hover:shadow-lg">
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-blue-600 text-white">
                <span className="font-bold">4</span>
              </div>
              <h3 className="font-heading mb-2 text-xl font-bold text-blue-800">
                Comienza a vender
              </h3>
              <p className="text-blue-700">
                Promociona tu tienda y comienza a recibir pedidos. Nosotros nos encargamos de la
                producción y envío.
              </p>
            </div>
          </div>

          <div className="mt-16 rounded-xl bg-gradient-to-r from-blue-800 to-blue-900 p-8 shadow-lg md:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <h3 className="font-heading mb-4 text-2xl font-bold text-white md:text-3xl">
                Inicia tu marca de ropa sin inversión inicial
              </h3>
              <p className="mb-8 text-lg text-blue-100">
                Con nuestro servicio de impresión bajo demanda (print on demand), puedes crear y
                vender productos personalizados sin stock ni inversión inicial. Ideal para
                emprendedores, diseñadores y creadores de contenido.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-medium text-blue-800 transition-colors hover:bg-blue-50"
              >
                Comenzar ahora
                <ArrowRight className="ml-2 size-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="bg-blue-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="font-heading mb-4 text-center text-3xl font-bold text-blue-900 md:text-4xl">
            Productos personalizados de alta calidad
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-blue-700">
            Ofrecemos una amplia variedad de productos para personalizar y vender en tu tienda
            online o comprar directamente.
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg">
              <div className="relative h-64 bg-gray-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShoppingBag className="size-24 text-blue-200" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading mb-2 text-xl font-bold text-blue-800">Remeras</h3>
                <p className="mb-4 text-blue-700">
                  Remeras de alta calidad en diferentes estilos, colores y tallas para personalizar
                  con tus diseños.
                </p>
                <Link
                  href="/design"
                  className="font-medium text-blue-600 transition-colors hover:text-blue-800"
                >
                  Diseñar remera →
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg">
              <div className="relative h-64 bg-gray-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShoppingBag className="size-24 text-blue-200" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading mb-2 text-xl font-bold text-blue-800">Buzos</h3>
                <p className="mb-4 text-blue-700">
                  Buzos cómodos y duraderos, perfectos para personalizar con tus diseños y logos.
                </p>
                <Link
                  href="/design"
                  className="font-medium text-blue-600 transition-colors hover:text-blue-800"
                >
                  Diseñar buzo →
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg">
              <div className="relative h-64 bg-gray-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShoppingBag className="size-24 text-blue-200" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading mb-2 text-xl font-bold text-blue-800">Accesorios</h3>
                <p className="mb-4 text-blue-700">
                  Complementa tu catálogo con accesorios personalizados como gorras, tazas y más.
                </p>
                <Link
                  href="/design"
                  className="font-medium text-blue-600 transition-colors hover:text-blue-800"
                >
                  Ver accesorios →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Keywords Section (Hidden visually but available for search engines) */}
      <section className="sr-only">
        <h2>Print on Demand y Dropshipping en Argentina</h2>
        <p>
          Impresión en demanda, print on demand, dropshipping, vender sin inversión, vender sin
          stock, impresión personalizada, productos personalizados, tienda en línea, vende productos
          personalizados, inicia tu marca de ropa, gana dinero con print on demand, print on demand
          gratis
        </p>
      </section>
    </div>
  );
}
