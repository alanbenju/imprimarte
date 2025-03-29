import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/app/api/middleware/auth";
import { CompanyStoreRepository } from "../repositories/company-store.repository";
import { getEM } from "@/app/api/database/connection";
import { FirebaseImageStorage } from "@/app/api/storage/services/firebase-image-storage.service";

// GET - Get the current user's store
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
    
    return NextResponse.json(stores[0]);
  } catch (error: any) {
    console.error("Error getting user store:", error);
    return NextResponse.json(
      { error: error.message || "Failed to get store" },
      { status: 500 }
    );
  }
}

// POST - Create a new store for the user
export async function POST(req: NextRequest) {
  try {
    // Authenticate user
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Get form data using native formData() from NextRequest
    const formData = await req.formData();
    
    // Validate required fields
    const name = formData.get("name")?.toString();
    if (!name) {
      return NextResponse.json(
        { error: "Store name is required" },
        { status: 400 }
      );
    }
    
    // Check if user already has a store
    const em = await getEM();
    const storeRepo = new CompanyStoreRepository(em);
    
    const existingStores = await storeRepo.findByUserId(user.id);
    if (existingStores.length > 0) {
      return NextResponse.json(
        { error: "User already has a store", store: existingStores[0] },
        { status: 400 }
      );
    }
    
    // Prepare store data
    const storeData: any = {
      name,
      user,
      colorPanel: formData.get("colorPanel")?.toString() || "#000000",
      colorText: formData.get("colorText")?.toString() || "#FFFFFF",
      backgroundColor: formData.get("backgroundColor")?.toString() || "#FFFFFF",
      buyButtonColor: formData.get("buyButtonColor")?.toString() || "#000000",
      productTextColor: formData.get("productTextColor")?.toString() || "#333333",
    };
    
    const showStoreName = formData.get("showStoreName");
    storeData.showStoreName = showStoreName === null ? true : showStoreName === "true";
        
    // Create the store in the database
    const store = await storeRepo.create(storeData);
    
    // Get the updated store
    const updatedStore = await storeRepo.findById(store.id);
    
    return NextResponse.json(updatedStore, { status: 201 });
  } catch (error: any) {
    console.error("Error creating store:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create store" },
      { status: 500 }
    );
  }
} 