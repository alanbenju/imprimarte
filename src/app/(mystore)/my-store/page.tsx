"use client";

import { useState, useEffect } from "react";
import { FiUsers, FiEye, FiShoppingBag, FiDollarSign, FiPlus, FiEdit, FiTrash, FiSearch } from "react-icons/fi";
import Link from "next/link";
import { storeService, DashboardData } from "@/services/store.service";
import AnalyticsCard from "@/app/(mystore)/my-store/components/store/dashboard/AnalyticsCard";
import RecentProductRow from "@/app/(mystore)/my-store/components/store/dashboard/RecentProductRow";

export default function StoreDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setIsLoading(true);
        const data = await storeService.getDashboardData();
        setDashboardData(data);
        setError(null);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
        setError("No se pudieron cargar los datos del dashboard");
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mb-2 size-6 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="rounded-lg bg-red-50 p-6 text-center text-red-800">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Use placeholder data if no real data yet
  const analytics = dashboardData?.analytics || {
    visits: { value: "0", change: "0%", isPositive: true },
    views: { value: "0", change: "0%", isPositive: true },
    sales: { value: "0", change: "0%", isPositive: true },
    revenue: { value: "$0.00", change: "0%", isPositive: true }
  };

  const recentProducts = dashboardData?.recentProducts || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <AnalyticsCard
          title="Visitantes"
          value={analytics.visits.value}
          change={analytics.visits.change}
          icon={<FiUsers size={18} />}
          isPositive={analytics.visits.isPositive}
        />
        <AnalyticsCard
          title="Vistas de Productos"
          value={analytics.views.value}
          change={analytics.views.change}
          icon={<FiEye size={18} />}
          isPositive={analytics.views.isPositive}
        />
        <AnalyticsCard
          title="Ventas"
          value={analytics.sales.value}
          change={analytics.sales.change}
          icon={<FiShoppingBag size={18} />}
          isPositive={analytics.sales.isPositive}
        />
        <AnalyticsCard
          title="Ingresos"
          value={analytics.revenue.value}
          change={analytics.revenue.change}
          icon={<FiDollarSign size={18} />}
          isPositive={analytics.revenue.isPositive}
        />
      </div>

      {/* Recent Products */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">Productos Destacados</h2>
          <Link href="/my-store/products" className="text-sm text-blue-600 hover:underline">
            Ver todos
          </Link>
        </div>
        <div className="space-y-3">
          {recentProducts.length > 0 ? (
            recentProducts.map((product) => (
              <RecentProductRow key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-500">No hay productos para mostrar</p>
          )}
        </div>
      </div>
    </div>
  );
} 