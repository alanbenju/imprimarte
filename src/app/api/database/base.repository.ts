export interface IBaseRepository<T> {
  create(data: any): Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(id: string, data: any): Promise<T>;
  delete(id: string): Promise<void>;
}

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  abstract create(data: any): Promise<T>;
  abstract findById(id: string): Promise<T | null>;
  abstract findAll(): Promise<T[]>;
  abstract update(id: string, data: any): Promise<T>;
  abstract delete(id: string): Promise<void>;
} 