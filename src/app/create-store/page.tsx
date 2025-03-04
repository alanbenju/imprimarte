import { ArrowRight, CheckCircle, Store, Truck, CreditCard, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CreateStorePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-blue-900 py-20 text-white md:py-32">
          <div className="absolute inset-0 z-0 opacity-20">
            <svg className="size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                  <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          {/* Floating elements */}
          <div className="left-1/5 animate-float-slow absolute top-1/4 size-32 rounded-full bg-blue-400/20 backdrop-blur-sm"></div>
          <div className="animate-float absolute bottom-1/3 right-1/4 size-48 rounded-full bg-blue-300/10 backdrop-blur-sm"></div>

          <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-8 flex size-20 items-center justify-center rounded-full bg-blue-700/50 backdrop-blur-md">
                <Store className="size-10 text-white" />
              </div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Crea Tu Propia Tienda Online
              </h1>
              <p className="mb-8 text-xl text-blue-100">
                Vende productos personalizados sin inversión inicial, stock o preocupaciones
                logísticas. Tú te encargas del diseño, nosotros del resto.
              </p>
              <div className="group relative mx-auto inline-block">
                <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-blue-400 to-blue-300 opacity-75 blur transition duration-500 group-hover:opacity-100"></div>
                <Link
                  href="/signup"
                  className="relative flex items-center rounded-lg bg-blue-800 px-8 py-4 text-lg font-medium text-white transition-all duration-300 hover:bg-blue-700"
                >
                  Crear Mi Tienda Ahora
                  <ArrowRight className="ml-2 size-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-blue-900 md:text-4xl">
                Cómo Funciona
              </h2>
              <p className="text-lg text-blue-700">
                Crear y gestionar tu tienda online es más fácil de lo que piensas
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center rounded-xl bg-blue-50 p-6 text-center transition-all duration-300 hover:bg-blue-100 hover:shadow-md">
                <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-blue-200">
                  <span className="text-2xl font-bold text-blue-800">1</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-blue-900">Regístrate</h3>
                <p className="text-blue-700">Crea tu cuenta en nuestra plataforma en minutos</p>
              </div>

              <div className="flex flex-col items-center rounded-xl bg-blue-50 p-6 text-center transition-all duration-300 hover:bg-blue-100 hover:shadow-md">
                <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-blue-200">
                  <span className="text-2xl font-bold text-blue-800">2</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-blue-900">Sube Tus Diseños</h3>
                <p className="text-blue-700">Carga tus diseños y aplícalos a nuestros productos</p>
              </div>

              <div className="flex flex-col items-center rounded-xl bg-blue-50 p-6 text-center transition-all duration-300 hover:bg-blue-100 hover:shadow-md">
                <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-blue-200">
                  <span className="text-2xl font-bold text-blue-800">3</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-blue-900">Personaliza Tu Tienda</h3>
                <p className="text-blue-700">Configura tu tienda con tu marca y estilo único</p>
              </div>

              <div className="flex flex-col items-center rounded-xl bg-blue-50 p-6 text-center transition-all duration-300 hover:bg-blue-100 hover:shadow-md">
                <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-blue-200">
                  <span className="text-2xl font-bold text-blue-800">4</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-blue-900">¡Empieza a Vender!</h3>
                <p className="text-blue-700">Comparte tu tienda y comienza a recibir pedidos</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-blue-50 py-20 md:py-32">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-blue-900 md:text-4xl">
                Beneficios de Crear Tu Tienda
              </h2>
              <p className="text-lg text-blue-700">
                Descubre por qué miles de emprendedores eligen nuestra plataforma
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl bg-white p-8 shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="mb-6 w-fit rounded-full bg-blue-100 p-3">
                  <CreditCard className="size-8 text-blue-700" />
                </div>
                <h3 className="mb-4 text-xl font-bold text-blue-900">Sin Inversión Inicial</h3>
                <p className="mb-6 text-blue-700">
                  No necesitas invertir en stock ni en equipamiento. Comienza a vender sin riesgos
                  financieros.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 size-5 shrink-0 text-blue-600" />
                    <span className="text-blue-800">Sin costos de producción anticipados</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 size-5 shrink-0 text-blue-600" />
                    <span className="text-blue-800">Modelo de negocio bajo demanda</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl bg-white p-8 shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="mb-6 w-fit rounded-full bg-blue-100 p-3">
                  <Truck className="size-8 text-blue-700" />
                </div>
                <h3 className="mb-4 text-xl font-bold text-blue-900">Logística Automatizada</h3>
                <p className="mb-6 text-blue-700">
                  Nos encargamos de la producción, empaque y envío de cada pedido directamente a tus
                  clientes.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 size-5 shrink-0 text-blue-600" />
                    <span className="text-blue-800">Envíos directos a tus clientes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 size-5 shrink-0 text-blue-600" />
                    <span className="text-blue-800">Sin preocupaciones de almacenamiento</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl bg-white p-8 shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="mb-6 w-fit rounded-full bg-blue-100 p-3">
                  <Users className="size-8 text-blue-700" />
                </div>
                <h3 className="mb-4 text-xl font-bold text-blue-900">Enfócate en lo Importante</h3>
                <p className="mb-6 text-blue-700">
                  Dedica tu tiempo a diseñar y promocionar. Nosotros nos encargamos del resto.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 size-5 shrink-0 text-blue-600" />
                    <span className="text-blue-800">Más tiempo para crear y vender</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 size-5 shrink-0 text-blue-600" />
                    <span className="text-blue-800">Soporte técnico incluido</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-blue-900 md:text-4xl">
                Productos Disponibles
              </h2>
              <p className="text-lg text-blue-700">
                Ofrece a tus clientes productos de alta calidad con tus diseños únicos
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="group rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="relative mb-6 aspect-square overflow-hidden rounded-lg bg-blue-50">
                  <Image
                    src="/remera-black-regular.png"
                    alt="Remera Regular"
                    fill
                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="mb-2 text-lg font-bold text-blue-900">Remera Regular</h3>
                <p className="text-blue-700">Remeras de algodón premium en varios colores</p>
              </div>

              <div className="group rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="relative mb-6 aspect-square overflow-hidden rounded-lg bg-blue-50">
                  <Image
                    src="/remera-oversize/topo.png"
                    alt="Remera Oversize"
                    fill
                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="mb-2 text-lg font-bold text-blue-900">Remera Oversize</h3>
                <p className="text-blue-700">Estilo moderno y cómodo en diversos colores</p>
              </div>

              <div className="group rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="relative mb-6 aspect-square overflow-hidden rounded-lg bg-blue-50">
                  <Image
                    src="/hoodie-oversize/azul-francia.png"
                    alt="Buzo Oversize"
                    fill
                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="mb-2 text-lg font-bold text-blue-900">Buzo Oversize</h3>
                <p className="text-blue-700">Buzos cómodos y espaciosos para cualquier ocasión</p>
              </div>

              <div className="group rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="relative mb-6 aspect-square overflow-hidden rounded-lg bg-blue-50">
                  <Image
                    src="/canguro/bordo.png"
                    alt="Buzo Canguro"
                    fill
                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="mb-2 text-lg font-bold text-blue-900">Buzo Canguro</h3>
                <p className="text-blue-700">
                  Con capucha y bolsillo frontal, ideal para el día a día
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-900 py-20 text-white md:py-32">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
                ¿Listo para Comenzar Tu Negocio Online?
              </h2>
              <p className="mb-8 text-xl text-blue-100">
                Únete a miles de emprendedores que ya están vendiendo sus diseños sin complicaciones
              </p>
              <div className="group relative mx-auto inline-block">
                <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-blue-400 to-blue-300 opacity-75 blur transition duration-500 group-hover:opacity-100"></div>
                <Link
                  href="/signup"
                  className="relative flex items-center rounded-lg bg-blue-800 px-8 py-4 text-lg font-medium text-white transition-all duration-300 hover:bg-blue-700"
                >
                  Crear Mi Tienda Ahora
                  <ArrowRight className="ml-2 size-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
