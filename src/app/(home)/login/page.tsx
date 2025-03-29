"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService, LoginParams } from "@/services/auth.service";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginParams>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is already authenticated on component mount
  useEffect(() => {
    if (authService.isAuthenticated()) {
      // Redirect to user's store if already logged in
      router.push("/my-store");
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await authService.login(formData);
      
      // Store the storeId from the response if available
      if (response.user?.storeId) {
        localStorage.setItem("storeId", response.user.storeId);
      }
      
      // Redirect to user's store after successful login
      router.push("/my-store");
    } catch (err: any) {
      setError(err.response?.data?.error || "Error al iniciar sesión. Intenta de nuevo.");
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
              Inicia Sesión
            </h1>
            <p className="mb-8 text-center text-blue-700">
              Accede a tu cuenta y administra tu tienda
            </p>

            {error && (
              <div className="mb-4 rounded-md bg-red-50 p-4 text-red-700">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
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
                  placeholder="Tu contraseña"
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-md bg-blue-600 px-4 py-3 text-base font-medium text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
                >
                  {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm text-blue-700">
              ¿No tienes una cuenta?{" "}
              <Link href="/signup" className="font-medium text-blue-600 hover:underline">
                Regístrate
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 