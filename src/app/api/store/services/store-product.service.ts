import { StoreProduct, ProductImageDetails } from "../entities/store-product.entity";
import { IStoreProductRepository } from "../repositories/store-product.repository";
import { BaseProduct, ProductSize } from "../entities/base-product.entity";
import { CompanyStore } from "../entities/company-store.entity";
import { IImageStorage } from "../../storage/services/image-storage.interface";

export interface IStoreProductService {
  create(data: {
    name: string;
    price: number;
    availableSizes: (keyof typeof ProductSize)[];
    frontImageBuffer: Buffer;
    backImageBuffer: Buffer;
    baseProduct: BaseProduct;
    companyStore: CompanyStore;
    description?: string;
    frontImageDetails?: ProductImageDetails;
    backImageDetails?: ProductImageDetails;
  }): Promise<StoreProduct>;
  
  findById(id: string): Promise<StoreProduct | null>;
  findByCompanyStoreId(companyStoreId: string): Promise<StoreProduct[]>;
  findByBaseProductId(baseProductId: string): Promise<StoreProduct[]>;
  findAll(): Promise<StoreProduct[]>;
  update(id: string, data: Partial<StoreProduct>): Promise<StoreProduct>;
  updateImages(
    id: string,
    data: {
      frontImageBuffer?: Buffer;
      backImageBuffer?: Buffer;
      frontImageDetails?: ProductImageDetails;
      backImageDetails?: ProductImageDetails;
    }
  ): Promise<StoreProduct>;
  generateFinalImages(id: string): Promise<StoreProduct>;
  delete(id: string): Promise<void>;
}

export class StoreProductService implements IStoreProductService {
  constructor(
    private readonly storeProductRepository: IStoreProductRepository,
    private readonly imageStorage: IImageStorage
  ) {}

  async create(data: {
    name: string;
    price: number;
    availableSizes: (keyof typeof ProductSize)[];
    frontImageBuffer: Buffer;
    backImageBuffer: Buffer;
    baseProduct: BaseProduct;
    companyStore: CompanyStore;
    description?: string;
    frontImageDetails?: ProductImageDetails;
    backImageDetails?: ProductImageDetails;
  }): Promise<StoreProduct> {
    // Upload images to storage
    const [frontImageResult, backImageResult] = await Promise.all([
      this.imageStorage.uploadImage(
        data.frontImageBuffer,
        `products/${data.companyStore.id}`
      ),
      this.imageStorage.uploadImage(
        data.backImageBuffer,
        `products/${data.companyStore.id}`
      ),
    ]);

    // Create the product with the uploaded image URLs
    return this.storeProductRepository.create({
      name: data.name,
      price: data.price,
      availableSizes: data.availableSizes,
      frontImage: frontImageResult.url,
      backImage: backImageResult.url,
      baseProduct: data.baseProduct,
      companyStore: data.companyStore,
      description: data.description,
      frontImageDetails: data.frontImageDetails,
      backImageDetails: data.backImageDetails,
    });
  }

  async findById(id: string): Promise<StoreProduct | null> {
    return this.storeProductRepository.findById(id);
  }

  async findByCompanyStoreId(companyStoreId: string): Promise<StoreProduct[]> {
    return this.storeProductRepository.findByCompanyStoreId(companyStoreId);
  }

  async findByBaseProductId(baseProductId: string): Promise<StoreProduct[]> {
    return this.storeProductRepository.findByBaseProductId(baseProductId);
  }

  async findAll(): Promise<StoreProduct[]> {
    return this.storeProductRepository.findAll();
  }

  async update(id: string, data: Partial<StoreProduct>): Promise<StoreProduct> {
    return this.storeProductRepository.update(id, data);
  }

  async updateImages(
    id: string,
    data: {
      frontImageBuffer?: Buffer;
      backImageBuffer?: Buffer;
      frontImageDetails?: ProductImageDetails;
      backImageDetails?: ProductImageDetails;
    }
  ): Promise<StoreProduct> {
    const product = await this.storeProductRepository.findById(id);
    if (!product) {
      throw new Error(`StoreProduct with ID ${id} not found`);
    }

    const updates: Partial<StoreProduct> = {};

    // Handle image uploads if provided
    if (data.frontImageBuffer) {
      const frontImageResult = await this.imageStorage.uploadImage(
        data.frontImageBuffer,
        `products/${product.companyStore.id}`
      );
      updates.frontImage = frontImageResult.url;
    }

    if (data.backImageBuffer) {
      const backImageResult = await this.imageStorage.uploadImage(
        data.backImageBuffer,
        `products/${product.companyStore.id}`
      );
      updates.backImage = backImageResult.url;
    }

    // Update image details if provided
    if (data.frontImageDetails) {
      updates.frontImageDetails = data.frontImageDetails;
    }

    if (data.backImageDetails) {
      updates.backImageDetails = data.backImageDetails;
    }

    // If we have any updates, apply them
    if (Object.keys(updates).length > 0) {
      return this.storeProductRepository.update(id, updates);
    }

    return product;
  }

  async generateFinalImages(id: string): Promise<StoreProduct> {
    // In a real implementation, this would generate the final images
    // based on the product image details and base product
    // For now, we'll just mark it as a placeholder
    const product = await this.storeProductRepository.findById(id);
    if (!product) {
      throw new Error(`StoreProduct with ID ${id} not found`);
    }

    // Placeholder - in real implementation, this would generate the images
    const updates: Partial<StoreProduct> = {
      finalFrontImage: `${product.frontImage}?generated=true`,
      finalBackImage: `${product.backImage}?generated=true`,
    };

    return this.storeProductRepository.update(id, updates);
  }

  async delete(id: string): Promise<void> {
    const product = await this.storeProductRepository.findById(id);
    if (!product) {
      return;
    }

    // Delete product from database
    await this.storeProductRepository.delete(id);

    // Extract image paths from URLs to delete from storage
    // This assumes the storage URLs follow a specific format
    // In a real implementation, you might want to store the storage paths alongside the URLs
    const extractPath = (url: string) => {
      const matches = url.match(/\/products\/(.+)$/);
      return matches ? matches[0] : null;
    };

    // Delete product images from storage
    const frontImagePath = extractPath(product.frontImage);
    const backImagePath = extractPath(product.backImage);
    const finalFrontImagePath = product.finalFrontImage ? extractPath(product.finalFrontImage) : null;
    const finalBackImagePath = product.finalBackImage ? extractPath(product.finalBackImage) : null;

    // Delete images that exist
    const deletePromises = [];
    if (frontImagePath) deletePromises.push(this.imageStorage.deleteImage(frontImagePath));
    if (backImagePath) deletePromises.push(this.imageStorage.deleteImage(backImagePath));
    if (finalFrontImagePath) deletePromises.push(this.imageStorage.deleteImage(finalFrontImagePath));
    if (finalBackImagePath) deletePromises.push(this.imageStorage.deleteImage(finalBackImagePath));

    await Promise.all(deletePromises);
  }
} 