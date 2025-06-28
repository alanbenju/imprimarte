"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Store, Palette } from "lucide-react";
import { ProductCarousel } from "./components/ProductCarousel";
import Header from "./(design)/design/Header";
import { CartDrawer } from "./(design)/cart/CartDrawer";

// Define product image arrays
const tshirtImages = [
  "/prendas/remera-regular-fit/black.png",
  "/prendas/remera-regular-fit/white.png",
  "/prendas/remera-regular-fit/azul-francia.png",
  "/prendas/remera-regular-fit/bossa-nova.png",
  "/prendas/remera-regular-fit/cinnamon.png",
  "/prendas/remera-regular-fit/marron-seta.png",
  "/prendas/remera-regular-fit/pensamiento.png",
  "/prendas/remera-regular-fit/petroleo.png",
  "/prendas/remera-regular-fit/rosa-w.png",
  "/prendas/remera-oversize/cinnamon.png",
  "/prendas/remera-oversize/rojo.png",
  "/prendas/remera-oversize/rosa.png",
  "/prendas/remera-oversize/toffee.png",
  "/prendas/remera-oversize/topo.png",
  "/prendas/remera-oversize/verde-tanque.png",
];

const hoodieImages = [
  "/prendas/canguro/bordo.png",
  "/prendas/canguro/lead-gray.png",
  "/prendas/canguro/suavidad-lila.png",
  "/prendas/hoodie-oversize/azul-francia.png",
  "/prendas/hoodie-oversize/negro.png",
];

export default function Home() {
  const [hoveredSection, setHoveredSection] = useState<"store" | "design" | null>(null);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Header />
      <CartDrawer />
      <div className="flex min-h-screen flex-col pt-16">
        {/* Hero Section with Split Design */}
        <section className="flex min-h-[calc(100vh-4rem)] w-full flex-col pt-16 md:flex-row md:pt-0">
          {/* Create Store Section */}
          <div
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
            {/* Content Container */}
            <div className="relative z-10 mx-auto w-full max-w-xl py-8 md:py-0">
              <div className="flex flex-col items-center justify-center">
                <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-blue-700/50">
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
                className={`absolute left-1/4 top-1/4 size-20 rounded-full bg-blue-400/20 transition-opacity duration-500 ${
                  hoveredSection === "store" ? "animate-float-slow opacity-100" : "opacity-50"
                }`}
              ></div>
              <div
                className={`absolute bottom-1/3 right-1/4 size-32 rounded-full bg-blue-300/10 transition-opacity duration-500 ${
                  hoveredSection === "store" ? "animate-float opacity-100" : "opacity-50"
                }`}
              ></div>
            </div>
          </div>

          {/* Separator */}
          <div className="hidden h-full w-[2px] bg-white/20 md:block"></div>

          {/* Design Section */}
          <div
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
            {/* Content Container */}
            <div className="relative z-10 mx-auto w-full max-w-2xl py-8 md:py-0">
              <div className="flex flex-col items-center justify-center">
                <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-red-700/50">
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
                    <span>Envío rápido</span>
                  </div>
                </div>
              </div>

              {/* Floating elements for visual interest */}
              <div
                className={`absolute left-1/4 top-1/4 size-20 rounded-full bg-red-400/20 transition-opacity duration-500 ${
                  hoveredSection === "design" ? "animate-float-slow opacity-100" : "opacity-50"
                }`}
              ></div>
              <div
                className={`absolute bottom-1/3 right-1/4 size-32 rounded-full bg-red-300/10 transition-opacity duration-500 ${
                  hoveredSection === "design" ? "animate-float opacity-100" : "opacity-50"
                }`}
              ></div>
            </div>
          </div>
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

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
              <div className="overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg">
                <div className="relative h-64 bg-gray-100">
                  <ProductCarousel images={tshirtImages} productName="Remeras" />
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
                  <ProductCarousel images={hoodieImages} productName="Buzos" />
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

        {/* Footer */}
        <footer className="mt-auto bg-blue-50">
          <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div>
                <h3 className="font-heading mb-4 text-lg font-bold text-blue-800">Customia</h3>
                <p className="mb-4 text-blue-700">
                  Diseña y personaliza tus propias prendas o crea tu tienda online sin inversión
                  inicial.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    <span className="sr-only">Facebook</span>
                    <svg
                      className="size-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    <span className="sr-only">Instagram</span>
                    <svg
                      className="size-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772a4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="font-heading mb-4 text-lg font-bold text-blue-800">
                  Enlaces Rápidos
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/#products" className="text-blue-700 hover:text-blue-900">
                      Productos
                    </a>
                  </li>
                  <li>
                    <a href="/create-store" className="text-blue-700 hover:text-blue-900">
                      Crear Tienda
                    </a>
                  </li>
                  <li>
                    <a href="/design" className="text-blue-700 hover:text-blue-900">
                      Diseñar Ahora
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-heading mb-4 text-lg font-bold text-blue-800">Contacto</h3>
                <p className="mb-2 text-blue-700">
                  <a href="mailto:customia@gmail.com" className="hover:underline">
                    customia@gmail.com
                  </a>
                </p>
                <p className="text-blue-700">
                  <a href="tel:+5491112345678" className="hover:underline">
                    +54 9 11 1234-5678
                  </a>
                </p>
                <p className="mt-4 text-blue-700">
                  © 2024 Customia. Todos los derechos reservados.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
