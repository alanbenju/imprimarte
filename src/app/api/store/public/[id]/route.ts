import { NextRequest, NextResponse } from "next/server";
import { CompanyStoreRepository } from "../../repositories/company-store.repository";
import { StoreProductRepository } from "../../repositories/store-product.repository";
import { getEM } from "@/app/api/database/connection";

// GET - Get a public store by ID (no authentication required)
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const storeId = params.id;
    
    // Get the store
    const em = await getEM();
    const storeRepo = new CompanyStoreRepository(em);
    const productRepo = new StoreProductRepository(em);
    
    const store = await storeRepo.findById(storeId);
    
    if (!store) {
      return NextResponse.json({ error: "Store not found" }, { status: 404 });
    }
    
    // Get products for the store
    const products = await productRepo.findByCompanyStoreId(storeId);
    
    // Return the store with its products
    return NextResponse.json({
      id: store.id,
      name: store.name,
      bannerImage: store.bannerImage,
      logoImage: store.logoImage,
      colorPanel: store.colorPanel,
      colorText: store.colorText,
      backgroundColor: store.backgroundColor,
      buyButtonColor: store.buyButtonColor,
      productTextColor: store.productTextColor,
      showStoreName: store.showStoreName,
      products: products
    });
  } catch (error: any) {
    console.error("Error getting public store:", error);
    return NextResponse.json(
      { error: error.message || "Failed to get store" },
      { status: 500 }
    );
  }
} 