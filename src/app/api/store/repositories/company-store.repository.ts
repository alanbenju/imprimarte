import { EntityManager } from "@mikro-orm/core";
import { CompanyStore } from "../entities/company-store.entity";
import { IBaseRepository } from "../../database/base.repository";
import { User } from "../../users/entities/user.entity";

export interface ICompanyStoreRepository extends IBaseRepository<CompanyStore> {
  findByUserId(userId: string): Promise<CompanyStore[]>;
}

export class CompanyStoreRepository implements ICompanyStoreRepository {
  constructor(private readonly em: EntityManager) {}

  async create(data: {
    name: string;
    user: User;
    bannerImage?: string;
    logoImage?: string;
    colorPanel?: string;
    colorText?: string;
    backgroundColor?: string;
    buyButtonColor?: string;
    productTextColor?: string;
    showStoreName?: boolean;
  }): Promise<CompanyStore> {
    const store = new CompanyStore(data);
    await this.em.persistAndFlush(store);
    return store;
  }

  async findById(id: string): Promise<CompanyStore | null> {
    return this.em.findOne(CompanyStore, { id });
  }

  async findByUserId(userId: string): Promise<CompanyStore[]> {
    return this.em.find(CompanyStore, { user: { id: userId } });
  }

  async findAll(): Promise<CompanyStore[]> {
    return this.em.find(CompanyStore, {});
  }

  async update(id: string, data: Partial<CompanyStore>): Promise<CompanyStore> {
    const store = await this.findById(id);
    if (!store) {
      throw new Error(`CompanyStore with ID ${id} not found`);
    }
    
    this.em.assign(store, data);
    await this.em.flush();
    
    return store;
  }

  async delete(id: string): Promise<void> {
    const store = await this.findById(id);
    if (store) {
      await this.em.removeAndFlush(store);
    }
  }
} 