"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService, SignupParams } from "@/services/auth.service";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignupParams>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Check if user is already authenticated on component mount
  useEffect(() => {
    if (authService.isAuthenticated()) {
      // Redirect to user's store if already logged in
      router.push("/my-store");
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "terms") {
      setTermsAccepted(e.target.checked);
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await authService.signup(formData);
      // Store the storeId from the response if available
      if (response.user?.storeId) {
        localStorage.setItem("storeId", response.user.storeId);
      }
      // Redirect to dashboard after successful signup
      router.push("/my-store");
    } catch (err: any) {
      setError(err.response?.data?.error || "Error al crear cuenta. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

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

            {error && (
              <div className="mb-4 rounded-md bg-red-50 p-4 text-red-700">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <label htmlFor="name" className="block text-sm font-medium text-blue-900">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
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
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-blue-200 bg-blue-50 px-4 py-3 text-blue-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Mínimo 8 caracteres"
                  required
                />
              </div>
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={termsAccepted}
                  onChange={handleChange}
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
                  disabled={isLoading || !termsAccepted}
                  className="w-full rounded-md bg-blue-600 px-4 py-3 text-base font-medium text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
                >
                  {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
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
