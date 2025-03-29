import { EntityManager } from "@mikro-orm/core";
import { StoreProduct, ProductImageDetails } from "../entities/store-product.entity";
import { BaseProduct, ProductSize } from "../entities/base-product.entity";
import { CompanyStore } from "../entities/company-store.entity";

export interface IStoreProductRepository {
  create(data: {
    name: string;
    price: number;
    availableSizes: (keyof typeof ProductSize)[];
    frontImage: string;
    backImage: string;
    baseProduct: BaseProduct;
    companyStore: CompanyStore;
    description?: string;
    frontImageDetails?: ProductImageDetails;
    backImageDetails?: ProductImageDetails;
    finalFrontImage?: string;
    finalBackImage?: string;
  }): Promise<StoreProduct>;
  
  findById(id: string): Promise<StoreProduct | null>;
  findByCompanyStoreId(companyStoreId: string): Promise<StoreProduct[]>;
  findByBaseProductId(baseProductId: string): Promise<StoreProduct[]>;
  findAll(): Promise<StoreProduct[]>;
  update(id: string, data: Partial<StoreProduct>): Promise<StoreProduct>;
  delete(id: string): Promise<void>;
}

export class StoreProductRepository implements IStoreProductRepository {
  constructor(private readonly em: EntityManager) {}

  async create(data: {
    name: string;
    price: number;
    availableSizes: (keyof typeof ProductSize)[];
    frontImage: string;
    backImage: string;
    baseProduct: BaseProduct;
    companyStore: CompanyStore;
    description?: string;
    frontImageDetails?: ProductImageDetails;
    backImageDetails?: ProductImageDetails;
    finalFrontImage?: string;
    finalBackImage?: string;
  }): Promise<StoreProduct> {
    const product = new StoreProduct(data);
    await this.em.persistAndFlush(product);
    return product;
  }

  async findById(id: string): Promise<StoreProduct | null> {
    return this.em.findOne(StoreProduct, { id }, {
      populate: ["baseProduct", "companyStore"]
    });
  }

  async findByCompanyStoreId(companyStoreId: string): Promise<StoreProduct[]> {
    return this.em.find(StoreProduct, { companyStore: { id: companyStoreId } }, {
      populate: ["baseProduct"]
    });
  }

  async findByBaseProductId(baseProductId: string): Promise<StoreProduct[]> {
    return this.em.find(StoreProduct, { baseProduct: { id: baseProductId } }, {
      populate: ["companyStore"]
    });
  }

  async findAll(): Promise<StoreProduct[]> {
    return this.em.find(StoreProduct, {}, {
      populate: ["baseProduct", "companyStore"]
    });
  }

  async update(id: string, data: Partial<StoreProduct>): Promise<StoreProduct> {
    const product = await this.findById(id);
    if (!product) {
      throw new Error(`StoreProduct with ID ${id} not found`);
    }
    
    this.em.assign(product, data);
    await this.em.flush();
    
    return product;
  }

  async delete(id: string): Promise<void> {
    const product = await this.findById(id);
    if (product) {
      await this.em.removeAndFlush(product);
    }
  }
} 