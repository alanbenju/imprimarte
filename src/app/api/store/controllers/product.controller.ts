import { NextRequest, NextResponse } from "next/server";
import { User } from "../../users/entities/user.entity";
import { StoreProductRepository } from "../repositories/store-product.repository";
import { CompanyStoreRepository } from "../repositories/company-store.repository";
import { BaseProductRepository } from "../repositories/base-product.repository";
import { StoreProductService } from "../services/store-product.service";
import { FirebaseImageStorage } from "../../storage/services/firebase-image-storage.service";
import { ProductImageDetails } from "../entities/store-product.entity";
import { ProductSize } from "../entities/base-product.entity";
import formidable from "formidable";
import { readFile } from "fs/promises";
import { getEM } from "@/app/api/database/connection";
// Next.js API routes config - enable form data parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

// Parse form data with files
async function parseFormData(req: NextRequest) {
  const form = formidable({ multiples: true });
  return new Promise<{ fields: any; files: any }>((resolve, reject) => {
    form.parse(req as any, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ fields, files });
    });
  });
}

// Create a new product for a store
export async function createProduct(req: NextRequest, storeId: string, user: User) {
  try {
    // Parse form data
    const { fields, files } = await parseFormData(req);
    
    // Validate required fields
    if (!fields.name || !fields.price || !fields.baseProductId || !files.frontImage || !files.backImage) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Parse sizes
    let availableSizes: (keyof typeof ProductSize)[] = [];
    if (fields.availableSizes) {
      try {
        availableSizes = JSON.parse(fields.availableSizes);
      } catch (e) {
        return NextResponse.json(
          { error: "Invalid availableSizes format" },
          { status: 400 }
        );
      }
    }
    
    // Parse image details if provided
    let frontImageDetails: ProductImageDetails | undefined;
    if (fields.frontImageDetails) {
      try {
        frontImageDetails = JSON.parse(fields.frontImageDetails);
      } catch (e) {
        return NextResponse.json(
          { error: "Invalid frontImageDetails format" },
          { status: 400 }
        );
      }
    }
    
    let backImageDetails: ProductImageDetails | undefined;
    if (fields.backImageDetails) {
      try {
        backImageDetails = JSON.parse(fields.backImageDetails);
      } catch (e) {
        return NextResponse.json(
          { error: "Invalid backImageDetails format" },
          { status: 400 }
        );
      }
    }
    
    const em = await getEM();
    
    // Get repositories
    const storeRepo = new CompanyStoreRepository(em);
    const baseProductRepo = new BaseProductRepository(em);
    const productRepo = new StoreProductRepository(em);
    
    // Check if store exists and belongs to user
    const store = await storeRepo.findById(storeId);
    
    if (!store) {
      return NextResponse.json(
        { error: "Store not found" },
        { status: 404 }
      );
    }
    
    if (store.user.id !== user.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }
    
    // Get base product
    const baseProduct = await baseProductRepo.findById(fields.baseProductId);
    
    if (!baseProduct) {
      return NextResponse.json(
        { error: "Base product not found" },
        { status: 404 }
      );
    }
    
    // Create service with repositories
    const imageStorage = new FirebaseImageStorage();
    const productService = new StoreProductService(productRepo, imageStorage);
    
    // Read image files
    const frontImageBuffer = await readFile(files.frontImage.path);
    const backImageBuffer = await readFile(files.backImage.path);
    
    // Create product
    const product = await productService.create({
      name: fields.name,
      price: parseFloat(fields.price),
      availableSizes: availableSizes.length ? availableSizes : baseProduct.availableSizes,
      frontImageBuffer,
      backImageBuffer,
      baseProduct,
      companyStore: store,
      description: fields.description,
      frontImageDetails,
      backImageDetails,
    });
    
    // Generate final images if details provided
    if (frontImageDetails || backImageDetails) {
      await productService.generateFinalImages(product.id);
    }
    
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
}

// Get products for a store
export async function getStoreProducts(req: NextRequest, storeId: string) {
  try {
    const em = await getEM();
    const productRepo = new StoreProductRepository(em);
    
    const products = await productRepo.findByCompanyStoreId(storeId);
    
    return NextResponse.json(products);
  } catch (error: any) {
    console.error("Error getting store products:", error);
    return NextResponse.json(
      { error: error.message || "Failed to get store products" },
      { status: 500 }
    );
  }
}

// Get a specific product
export async function getProduct(req: NextRequest, productId: string) {
  try {
    const em = await getEM();
    const productRepo = new StoreProductRepository(em);
    
    const product = await productRepo.findById(productId);
    
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(product);
  } catch (error: any) {
    console.error("Error getting product:", error);
    return NextResponse.json(
      { error: error.message || "Failed to get product" },
      { status: 500 }
    );
  }
}

// Update product images and details
export async function updateProductImages(req: NextRequest, productId: string, user: User) {
  try {
    // Parse form data
    const { fields, files } = await parseFormData(req);
    
    const em = await getEM();
    
    // Get repositories and services
    const productRepo = new StoreProductRepository(em);
    const imageStorage = new FirebaseImageStorage();
    const productService = new StoreProductService(productRepo, imageStorage);
    
    // Get product
    const product = await productRepo.findById(productId);
    
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }
    
    // Check if user owns the store
    if (product.companyStore.user.id !== user.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }
    
    // Parse image details if provided
    let frontImageDetails: ProductImageDetails | undefined;
    if (fields.frontImageDetails) {
      try {
        frontImageDetails = JSON.parse(fields.frontImageDetails);
      } catch (e) {
        return NextResponse.json(
          { error: "Invalid frontImageDetails format" },
          { status: 400 }
        );
      }
    }
    
    let backImageDetails: ProductImageDetails | undefined;
    if (fields.backImageDetails) {
      try {
        backImageDetails = JSON.parse(fields.backImageDetails);
      } catch (e) {
        return NextResponse.json(
          { error: "Invalid backImageDetails format" },
          { status: 400 }
        );
      }
    }
    
    // Read image files if provided
    let frontImageBuffer: Buffer | undefined;
    let backImageBuffer: Buffer | undefined;
    
    if (files.frontImage) {
      frontImageBuffer = await readFile(files.frontImage.path);
    }
    
    if (files.backImage) {
      backImageBuffer = await readFile(files.backImage.path);
    }
    
    // Update product
    const updatedProduct = await productService.updateImages(productId, {
      frontImageBuffer,
      backImageBuffer,
      frontImageDetails,
      backImageDetails,
    });
    
    // Generate final images if details were updated
    if (frontImageDetails || backImageDetails) {
      await productService.generateFinalImages(productId);
    }
    
    return NextResponse.json(updatedProduct);
  } catch (error: any) {
    console.error("Error updating product images:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update product images" },
      { status: 500 }
    );
  }
} 