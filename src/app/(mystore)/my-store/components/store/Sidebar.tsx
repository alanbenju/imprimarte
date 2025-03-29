/* eslint-disable tailwindcss/migration-from-tailwind-2 */
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  FiHome, 
  FiShoppingBag, 
  FiSettings, 
  FiPackage, 
  FiLogOut,
  FiMenu,
  FiX,
  FiBarChart2
} from "react-icons/fi";
import { authService } from "@/services/auth.service";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    authService.logout();
    window.location.href = "/login";
  };
  
  const sidebarItems = [
    {
      href: "/my-store",
      icon: <FiHome size={20} />,
      label: "Dashboard",
      isActive: pathname === "/my-store",
    },
    {
      href: "/my-store/orders",
      icon: <FiShoppingBag size={20} />,
      label: "Pedidos",
      isActive: pathname === "/my-store/orders",
    },
    {
      href: "/my-store/products",
      icon: <FiPackage size={20} />,
      label: "Productos",
      isActive: pathname === "/my-store/products",
    },
    {
      href: "/my-store/settings",
      icon: <FiSettings size={20} />,
      label: "Configuración",
      isActive: pathname === "/my-store/settings",
    },
  ];
  
  return (
    <>
      {/* Mobile header */}
      <div className="fixed top-0 z-40 flex h-16 w-full items-center justify-between border-b bg-white px-4 md:hidden">
        <Link href="/my-store" className="flex items-center">
          <div className="mr-2 flex size-8 items-center justify-center rounded-full bg-blue-600 shadow-md">
            <span className="text-lg font-bold text-white">C</span>
          </div>
          <span className="font-heading text-lg font-bold text-blue-900">Mi Tienda</span>
        </Link>
        
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="rounded p-2 text-gray-500 hover:bg-gray-100"
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
      
      {/* Mobile sidebar */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          exit={{ x: -280 }}
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div 
            className="h-full w-[280px] bg-white pt-16" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-full flex-col justify-between">
              <div>
                {sidebarItems.map((item, index) => (
                  <SidebarItem
                    key={index}
                    {...item}
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                ))}
              </div>
              
              <div className="mb-8 border-t p-4">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center rounded p-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <FiLogOut className="mr-3" size={20} />
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Desktop sidebar */}
      <div className="hidden h-screen w-[280px] flex-shrink-0 flex-col justify-between border-r bg-white md:flex">
        <div>
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/my-store" className="flex items-center">
              <div className="mr-2 flex size-8 items-center justify-center rounded-full bg-blue-600 shadow-md">
                <span className="text-lg font-bold text-white">C</span>
              </div>
              <span className="font-heading text-lg font-bold text-blue-900">Mi Tienda</span>
            </Link>
          </div>
          
          <div className="py-4">
            {sidebarItems.map((item, index) => (
              <SidebarItem key={index} {...item} />
            ))}
          </div>
        </div>
        
        <div className="border-t p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center rounded p-2 text-sm text-red-600 hover:bg-red-50"
          >
            <FiLogOut className="mr-3" size={20} />
            Cerrar Sesión
          </button>
        </div>
      </div>
    </>
  );
} 