import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/app/api/middleware/auth";
import { CompanyStoreRepository } from "../../repositories/company-store.repository";
import { getEM } from "@/app/api/database/connection";

// GET - Get a store's configuration by ID (authenticated, must be owner)
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const storeId = params.id;
    
    // Authenticate user
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Get the store
    const em = await getEM();
    const storeRepo = new CompanyStoreRepository(em);
    const store = await storeRepo.findById(storeId);
    
    if (!store) {
      return NextResponse.json({ error: "Store not found" }, { status: 404 });
    }
    
    // Check if user owns the store
    if (store.user.id !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    
    // Return only configuration-related fields
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
      showStoreName: store.showStoreName
    });
  } catch (error: any) {
    console.error("Error getting store configuration:", error);
    return NextResponse.json(
      { error: error.message || "Failed to get store configuration" },
      { status: 500 }
    );
  }
} 