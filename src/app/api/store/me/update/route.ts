"use server";

import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/app/api/middleware/auth";
import { CompanyStoreRepository } from "../../repositories/company-store.repository";
import { getEM } from "@/app/api/database/connection";
import { FirebaseImageStorage } from "@/app/api/storage/services/firebase-image-storage.service";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/app/api/upload/firebaseConfig";

// PUT - Update the current user's store
export async function PUT(req: NextRequest) {
  try {
    // Authenticate user
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the user's store ID
    const em = await getEM();
    const storeRepo = new CompanyStoreRepository(em);
    const stores = await storeRepo.findByUserId(user.id);

    if (stores.length === 0) {
      return NextResponse.json({ error: "Store not found" }, { status: 404 });
    }

    const store = stores[0];

    // Get form data using native formData() from NextRequest
    const formData = await req.formData();

    const updates: any = {};

    // Handle text fields
    updates.name = formData.get("name")?.toString() || store.name;
    updates.colorPanel = formData.get("colorPanel")?.toString() || store.colorPanel;
    updates.colorText = formData.get("colorText")?.toString() || store.colorText;
    updates.backgroundColor = formData.get("backgroundColor")?.toString() || store.backgroundColor;
    updates.buyButtonColor = formData.get("buyButtonColor")?.toString() || store.buyButtonColor;
    updates.productTextColor = formData.get("productTextColor")?.toString() || store.productTextColor;

    const showStoreName = formData.get("showStoreName");
    if (showStoreName !== null) {
      updates.showStoreName = showStoreName === "true";
    }

    // Initialize image storage service
    const imageStorage = new FirebaseImageStorage();
    
    // File upload promises
    const uploadPromises = [];

    // Logo upload
    const logo = formData.get("logo") as File;
    if (logo) {
      // Use the Firebase service for upload
      const uploadPromise = imageStorage
        .uploadImage(logo, `stores/${store.id}`)
        .then(result => {
          updates.logoImage = result.url;
        });
      
      uploadPromises.push(uploadPromise);
    }

    // Banner upload
    const banner = formData.get("banner") as File | null;
    if (banner) {
      // Use the Firebase service for upload
      const uploadPromise = imageStorage
        .uploadImage(banner, `stores/${store.id}`)
        .then(result => {
          updates.bannerImage = result.url;
        });
      
      uploadPromises.push(uploadPromise);
    }

    // Wait for all uploads to complete
    await Promise.all(uploadPromises);

    // Update the store in the database
    const updatedStore = await storeRepo.update(store.id, updates);

    return NextResponse.json(updatedStore);
  } catch (error: any) {
    console.error("Error updating store:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update store" },
      { status: 500 }
    );
  }
}
