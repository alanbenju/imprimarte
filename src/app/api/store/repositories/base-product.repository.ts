import { EntityManager } from "@mikro-orm/core";
import { BaseProduct, ProductSize, ProductType } from "../entities/base-product.entity";

export interface IBaseProductRepository {
  create(data: {
    type: keyof typeof ProductType;
    name: string;
    color: string;
    availableSizes: (keyof typeof ProductSize)[];
    price: number;
    frontImage: string;
    backImage: string;
  }): Promise<BaseProduct>;
  
  findById(id: string): Promise<BaseProduct | null>;
  findByType(type: keyof typeof ProductType): Promise<BaseProduct[]>;
  findAll(): Promise<BaseProduct[]>;
  update(id: string, data: Partial<BaseProduct>): Promise<BaseProduct>;
  delete(id: string): Promise<void>;
}

export class BaseProductRepository implements IBaseProductRepository {
  constructor(private readonly em: EntityManager) {}

  async create(data: {
    type: keyof typeof ProductType;
    name: string;
    color: string;
    availableSizes: (keyof typeof ProductSize)[];
    price: number;
    frontImage: string;
    backImage: string;
  }): Promise<BaseProduct> {
    const baseProduct = new BaseProduct(data);
    await this.em.persistAndFlush(baseProduct);
    return baseProduct;
  }

  async findById(id: string): Promise<BaseProduct | null> {
    return this.em.findOne(BaseProduct, { id });
  }

  async findByType(type: keyof typeof ProductType): Promise<BaseProduct[]> {
    return this.em.find(BaseProduct, { type });
  }

  async findAll(): Promise<BaseProduct[]> {
    return this.em.find(BaseProduct, {});
  }

  async update(id: string, data: Partial<BaseProduct>): Promise<BaseProduct> {
    const baseProduct = await this.findById(id);
    if (!baseProduct) {
      throw new Error(`BaseProduct with ID ${id} not found`);
    }
    
    this.em.assign(baseProduct, data);
    await this.em.flush();
    
    return baseProduct;
  }

  async delete(id: string): Promise<void> {
    const baseProduct = await this.findById(id);
    if (baseProduct) {
      await this.em.removeAndFlush(baseProduct);
    }
  }
} 