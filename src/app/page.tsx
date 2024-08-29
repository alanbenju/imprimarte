/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import { Upload, Palette, Truck, ShoppingBag, Zap, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Component() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-teal-50 to-teal-100">
      <main className="flex-1">
        <section className="w-full bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 py-12 text-white md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Tu Diseño, Tu Arte, Tu Estilo
                  </h1>
                  <p className="max-w-[600px] text-teal-100 md:text-xl">
                    Sube tus diseños únicos y dales vida en camisetas y sudaderas premium. Rápido, fácil y totalmente tú.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <a href="#" className="inline-flex items-center justify-center rounded-md bg-amber-400 px-4 py-2 text-sm font-medium text-teal-900 hover:bg-amber-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    Empieza a Diseñar
                  </a>
                  <a href="#" className="inline-flex items-center justify-center rounded-md border border-white px-4 py-2 text-sm font-medium text-white hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    Ver Productos
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative size-[300px] sm:size-[400px]">
                  <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-emerald-400 to-teal-300"></div>
                  <Image
                    alt="Camiseta con diseño artístico"
                    className="absolute inset-4 rounded-full object-cover"
                    height={400}
                    src="/placeholder.svg"
                    width={400}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full bg-white py-12 md:py-24 lg:py-32">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tighter text-teal-600 sm:text-5xl">
              Cómo Funciona
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="rounded-full bg-teal-100 p-3">
                  <Upload className="size-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">1. Sube Tu Diseño</h3>
                <p className="text-gray-600">
                  Simplemente sube tu obra de arte o usa nuestra herramienta de diseño fácil para crear tu obra maestra.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="rounded-full bg-teal-100 p-3">
                  <Palette className="size-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">2. Elige Tu Producto</h3>
                <p className="text-gray-600">
                  Selecciona entre nuestra gama de camisetas y sudaderas de alta calidad en varios estilos y colores.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="rounded-full bg-teal-100 p-3">
                  <Truck className="size-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">3. Imprimimos y Enviamos</h3>
                <p className="text-gray-600">
                  Imprimiremos tu diseño y enviaremos tu producto personalizado directamente a tu puerta.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="products" className="w-full bg-teal-50 py-12 md:py-24 lg:py-32">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tighter text-teal-800 sm:text-5xl">
              Nuestros Productos
            </h2>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl">
                <div className="flex flex-col items-center space-y-4 p-6">
                  <div className="relative h-64 w-full overflow-hidden rounded-lg">
                    <div className="animate-gradient absolute inset-0 bg-gradient-to-br from-teal-400 to-emerald-500"></div>
                    <Image
                      alt="Camiseta"
                      className="absolute inset-0 size-full object-cover mix-blend-overlay"
                      height={400}
                      src="/placeholder.svg"
                      width={320}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-teal-800">Camisetas</h3>
                  <p className="text-center text-gray-600">
                    Camisetas de algodón premium en varios estilos y colores. El lienzo perfecto para tus diseños.
                  </p>
                  <a href="#" className="inline-flex items-center justify-center rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    Personalizar Ahora
                  </a>
                </div>
              </div>
              <div className="rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl">
                <div className="flex flex-col items-center space-y-4 p-6">
                  <div className="relative h-64 w-full overflow-hidden rounded-lg">
                    <div className="animate-gradient absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500"></div>
                    <Image
                      alt="Sudadera"
                      className="absolute inset-0 size-full object-cover mix-blend-overlay"
                      height={400}
                      src="/placeholder.svg"
                      width={320}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-teal-800">Sudaderas</h3>
                  <p className="text-center text-gray-600">
                    Sudaderas cómodas y con estilo que hacen que tus diseños resalten. Mantente abrigado y luce genial.
                  </p>
                  <a href="#" className="inline-flex items-center justify-center rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    Personalizar Ahora
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section  className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 py-12 text-white md:py-24 lg:py-32">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  ¿Listo para Dar Vida a Tus Diseños?
                </h2>
                <p className="text-teal-100 md:text-xl">
                  Únete a miles de clientes satisfechos que han convertido su creatividad en arte para vestir.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <a href="#" className="inline-flex items-center justify-center rounded-md bg-amber-400 px-4 py-2 text-sm font-medium text-teal-900 hover:bg-amber-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    Empieza a Diseñar Ahora
                  </a>
                  <a href="#" className="inline-flex items-center justify-center rounded-md border border-white px-4 py-2 text-sm font-medium text-white hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    Saber Más
                  </a>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="grid w-full max-w-md grid-cols-2 gap-4">
                  <div className="rounded-lg bg-white/10 p-4 backdrop-blur-lg">
                    <Zap className="mb-2 size-8 text-amber-400" />
                    <h3 className="font-bold">Entrega Rápida</h3>
                    <p className="text-sm text-teal-100">Recibe tu ropa personalizada en días, no semanas</p>
                  </div>
                  <div className="rounded-lg bg-white/10 p-4 backdrop-blur-lg">
                    <Star className="mb-2 size-8 text-amber-400" />
                    <h3 className="font-bold">Calidad Premium</h3>
                    <p className="text-sm text-teal-100">Impresiones duraderas en telas cómodas</p>
                  </div>
                  <div className="col-span-2 rounded-lg bg-white/10 p-4 backdrop-blur-lg">
                    <Palette className="mb-2 size-8 text-amber-400" />
                    <h3 className="font-bold">Creatividad Ilimitada</h3>
                    <p className="text-sm text-teal-100">Sin límites de diseño - si puedes imaginarlo, podemos imprimirlo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}