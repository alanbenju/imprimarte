import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col bg-blue-50">
      <main className="flex-1">
        <div className="mx-auto max-w-md px-4 py-16 sm:px-6 sm:py-24 lg:max-w-lg lg:px-8">
          <div className="rounded-2xl bg-white p-8 shadow-lg sm:p-10">
            <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-blue-900">
              Crea Tu Cuenta
            </h1>
            <p className="mb-8 text-center text-blue-700">
              Comienza a vender tus diseños sin inversión inicial
            </p>

            <form className="space-y-6">
              <div className="space-y-1">
                <label htmlFor="name" className="block text-sm font-medium text-blue-900">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="block w-full rounded-md border border-blue-200 bg-blue-50 px-4 py-3 text-blue-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Tu nombre completo"
                  required
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-medium text-blue-900">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="block w-full rounded-md border border-blue-200 bg-blue-50 px-4 py-3 text-blue-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="password" className="block text-sm font-medium text-blue-900">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="block w-full rounded-md border border-blue-200 bg-blue-50 px-4 py-3 text-blue-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Mínimo 8 caracteres"
                  required
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="store-name" className="block text-sm font-medium text-blue-900">
                  Nombre de Tu Tienda
                </label>
                <input
                  type="text"
                  id="store-name"
                  name="store-name"
                  className="block w-full rounded-md border border-blue-200 bg-blue-50 px-4 py-3 text-blue-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Nombre de tu tienda"
                  required
                />
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  className="size-5 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-blue-700">
                  Acepto los{" "}
                  <a href="#" className="font-medium text-blue-600 hover:underline">
                    Términos y Condiciones
                  </a>{" "}
                  y la{" "}
                  <a href="#" className="font-medium text-blue-600 hover:underline">
                    Política de Privacidad
                  </a>
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full rounded-md bg-blue-600 px-4 py-3 text-base font-medium text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Crear Cuenta
                </button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm text-blue-700">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="font-medium text-blue-600 hover:underline">
                Inicia Sesión
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
