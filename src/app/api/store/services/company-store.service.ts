import { CompanyStore } from "../entities/company-store.entity";
import { ICompanyStoreRepository } from "../repositories/company-store.repository";
import { User } from "../../users/entities/user.entity";

export interface ICompanyStoreService {
  create(data: {
    name: string;
    user: User;
    bannerImage?: string;
    logoImage?: string;
    colorPanel?: string;
    colorText?: string;
    backgroundColor?: string;
    buyButtonColor?: string;
  }): Promise<CompanyStore>;
  findById(id: string): Promise<CompanyStore | null>;
  findByUserId(userId: string): Promise<CompanyStore[]>;
  findAll(): Promise<CompanyStore[]>;
  update(id: string, data: Partial<CompanyStore>): Promise<CompanyStore>;
  delete(id: string): Promise<void>;
}

export class CompanyStoreService implements ICompanyStoreService {
  constructor(private readonly companyStoreRepository: ICompanyStoreRepository) {}

  async create(data: {
    name: string;
    user: User;
    bannerImage?: string;
    logoImage?: string;
    colorPanel?: string;
    colorText?: string;
    backgroundColor?: string;
    buyButtonColor?: string;
  }): Promise<CompanyStore> {
    return this.companyStoreRepository.create(data);
  }

  async findById(id: string): Promise<CompanyStore | null> {
    return this.companyStoreRepository.findById(id);
  }

  async findByUserId(userId: string): Promise<CompanyStore[]> {
    return this.companyStoreRepository.findByUserId(userId);
  }

  async findAll(): Promise<CompanyStore[]> {
    return this.companyStoreRepository.findAll();
  }

  async update(id: string, data: Partial<CompanyStore>): Promise<CompanyStore> {
    return this.companyStoreRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return this.companyStoreRepository.delete(id);
  }
} 