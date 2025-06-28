"use client";

import { useState, useEffect } from "react";
import { storeService } from "@/services/store.service";

// Import components
import { PageHeader } from "./components/page-header";
import { ProductFilters } from "./components/product-filters";
import { ProductCard, StoreProduct } from "./components/product-card";
import { EmptyState } from "./components/empty-state";
import { Loading } from "./components/loading";

export default function ProductsPage() {
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [storeId, setStoreId] = useState<string | null>(null);

  useEffect(() => {
    const loadStore = async () => {
      try {
        const store = await storeService.getMyStore();
        setStoreId(store.id);
      } catch (error) {
        console.error("Error loading store ID:", error);
      }
    };
    
    loadStore();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        // This is a placeholder - we need to modify the API to return products with status
        const productsData = await storeService.getMyStoreProducts();
        
        // Transform API data to match our product interface
        // In a real app, the API would return data in the required format
        const transformedProducts: StoreProduct[] = productsData.map((product: any) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          status: product.status || (Math.random() > 0.5 ? "live" : "draft"), // Simulated for this example
          colorsCount: product.colorsCount || Math.floor(Math.random() * 5) + 1 // Simulated for this example
        }));
        
        setProducts(transformedProducts);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filter products by search term and status
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const isFiltering = searchTerm !== "" || statusFilter !== "all";

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader />
      
      <ProductFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedStatus={statusFilter}
        onStatusChange={setStatusFilter}
      />

      {isLoading ? (
        <Loading />
      ) : filteredProducts.length === 0 ? (
        <EmptyState isFiltering={isFiltering} filterTerm={searchTerm} />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              storeId={storeId || ""}
            />
          ))}
        </div>
      )}
    </div>
  );
} 