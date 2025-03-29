import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/app/api/middleware/auth";
import { CompanyStoreRepository } from "../../repositories/company-store.repository";
import { StoreProductRepository } from "../../repositories/store-product.repository";
import { getEM } from "@/app/api/database/connection";

// GET - Get dashboard data for the current user's store
export async function GET(req: NextRequest) {
  try {
    // Authenticate user
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Get the user's store
    const em = await getEM();
    const storeRepo = new CompanyStoreRepository(em);
    
    const stores = await storeRepo.findByUserId(user.id);
    
    if (stores.length === 0) {
      return NextResponse.json({ error: "Store not found" }, { status: 404 });
    }
    
    const store = stores[0];
    const productRepo = new StoreProductRepository(em);
    
    // Get products for the store
    const products = await productRepo.findByCompanyStoreId(store.id);
    
    // For now, we'll return basic stats - in the future, this could include analytics
    return NextResponse.json({
      storeName: store.name,
      productCount: products.length,
      // Placeholder analytics data - replace with real data in the future
      analytics: {
        visits: {
          value: "0",
          change: "0%",
          isPositive: true
        },
        views: {
          value: "0",
          change: "0%",
          isPositive: true
        },
        sales: {
          value: "0",
          change: "0%",
          isPositive: true
        },
        revenue: {
          value: "$0.00",
          change: "0%",
          isPositive: true
        }
      },
      recentProducts: products.slice(0, 5) // First 5 products
    });
  } catch (error: any) {
    console.error("Error getting store dashboard:", error);
    return NextResponse.json(
      { error: error.message || "Failed to get store dashboard" },
      { status: 500 }
    );
  }
} 