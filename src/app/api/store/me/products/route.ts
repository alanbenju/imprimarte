import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/app/api/middleware/auth";
import { StoreProductRepository } from "../../repositories/store-product.repository";
import { CompanyStoreRepository } from "../../repositories/company-store.repository";
import { getEM } from "@/app/api/database/connection";

// GET - Get products for the current user's store
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
    
    // Forward to controller to get products
    const { getStoreProducts } = await import("../../controllers/product.controller");
    return getStoreProducts(req, store.id);
  } catch (error: any) {
    console.error("Error getting store products:", error);
    return NextResponse.json(
      { error: error.message || "Failed to get store products" },
      { status: 500 }
    );
  }
}

// POST - Create a new product for the current user's store
export async function POST(req: NextRequest) {
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
    
    // Forward to controller
    const { createProduct } = await import("../../controllers/product.controller");
    return createProduct(req, store.id, user);
  } catch (error: any) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
} 