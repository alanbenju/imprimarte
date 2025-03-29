import { NextRequest, NextResponse } from "next/server";
import { User } from "../../users/entities/user.entity";
import { CompanyStore } from "../entities/company-store.entity";
import { CompanyStoreRepository } from "../repositories/company-store.repository";
import { FirebaseImageStorage } from "../../storage/services/firebase-image-storage.service";
import formidable from "formidable";
import { readFile } from "fs/promises";
import { getEM } from "@/app/api/database/connection";
import { Readable } from "stream";

// Next.js API routes config - enable form data parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

// Convert NextRequest to a format compatible with formidable
function requestToNodeStream(req: NextRequest): NodeJS.ReadableStream {
  const duplex = new Readable();
  const blob = req.clone().blob();
  
  blob.then(blob => {
    return blob.arrayBuffer();
  }).then(arrayBuffer => {
    const buffer = Buffer.from(arrayBuffer);
    duplex.push(buffer);
    duplex.push(null);
  }).catch(err => {
    duplex.destroy(err);
  });
  
  return duplex;
}

// Parse form data with files
async function parseFormData(req: NextRequest) {
  console.log("Parse form data controller", req)
  const form = formidable({ multiples: true });
  const stream = requestToNodeStream(req);
  
  console.log("Before enhancedStream")
  // Add minimal IncomingMessage compatible properties
  const enhancedStream = Object.assign(stream, {
    headers: req.headers,
    method: req.method,
    url: req.url
  });
  console.log("After enhancedStream", enhancedStream)
  return new Promise<{ fields: any; files: any }>((resolve, reject) => {
    form.parse(enhancedStream as any, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
}

// Check if user already has a store
export async function checkUserStore(req: NextRequest, user: User) {
  const em = await getEM();
  const companyStoreRepo = new CompanyStoreRepository(em);
  
  const existingStores = await companyStoreRepo.findByUserId(user.id);
  
  if (existingStores.length > 0) {
    return NextResponse.json(
      { error: "User already has a store", store: existingStores[0] },
      { status: 400 }
    );
  }
  
  return null;
}

// Create a new store for the current user
export async function createStore(req: NextRequest, user: User) {
  try {
    // Parse form data
    const { fields, files } = await parseFormData(req);
    console.log("After parseFormData", fields, files)
    // Validate required fields
    if (!fields.name) {
      return NextResponse.json(
        { error: "Store name is required" },
        { status: 400 }
      );
    }
    
    // Check if user already has a store
    const storeCheckResponse = await checkUserStore(req, user);
    if (storeCheckResponse) return storeCheckResponse;
    
    const em = await getEM();
    const companyStoreRepo = new CompanyStoreRepository(em);
    const imageStorage = new FirebaseImageStorage();
    
    // Upload images if provided
    let bannerImage: string | undefined;
    let logoImage: string | undefined;
    
    if (files.banner) {
      const bannerBuffer = await readFile(files.banner.path);
      const bannerResult = await imageStorage.uploadImage(
        bannerBuffer,
        `stores/${user.id}`,
        "banner"
      );
      bannerImage = bannerResult.url;
    }
    
    if (files.logo) {
      const logoBuffer = await readFile(files.logo.path);
      const logoResult = await imageStorage.uploadImage(
        logoBuffer,
        `stores/${user.id}`,
        "logo"
      );
      logoImage = logoResult.url;
    }
    
    // Create store with basic fields (ensure they exist in DB)
    const store = await companyStoreRepo.create({
      name: fields.name,
      user,
      bannerImage,
      logoImage,
      colorPanel: fields.colorPanel || "#000000",
      colorText: fields.colorText || "#FFFFFF",
      backgroundColor: fields.backgroundColor || "#FFFFFF",
      buyButtonColor: fields.buyButtonColor || "#000000",
      productTextColor: fields.productTextColor || "#333333",
      showStoreName: fields.showStoreName !== undefined 
        ? fields.showStoreName === "true" || fields.showStoreName === true 
        : true,
    });
    
    // Get the updated store
    const updatedStore = await companyStoreRepo.findById(store.id);
    
    return NextResponse.json(updatedStore, { status: 201 });
  } catch (error: any) {
    console.error("Error creating store:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create store" },
      { status: 500 }
    );
  }
}

// Get store details
export async function getStore(req: NextRequest, storeId: string) {
  try {
    const em = await getEM();
    const companyStoreRepo = new CompanyStoreRepository(em);
    
    const store = await companyStoreRepo.findById(storeId);
    
    if (!store) {
      return NextResponse.json(
        { error: "Store not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(store);
  } catch (error: any) {
    console.error("Error getting store:", error);
    return NextResponse.json(
      { error: error.message || "Failed to get store" },
      { status: 500 }
    );
  }
} 