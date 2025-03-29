import { EntityManager } from "@mikro-orm/core";
import { User } from "../entities/user.entity";
import { IBaseRepository } from "../../database/base.repository";

export interface IUserRepository extends IBaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
  updateResetToken(id: string, token: string | undefined, expiry: Date | undefined): Promise<User>;
}

export class UserRepository implements IUserRepository {
  constructor(private readonly em: EntityManager) {}

  async create(data: {
    email: string;
    password: string;
    name?: string;
  }): Promise<User> {
    const user = new User({
      email: data.email,
      password: data.password,
      name: data.name,
    });
    await this.em.persistAndFlush(user);
    return user;
  }

  async findById(id: string): Promise<User | null> {
    return this.em.findOne(User, { id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.em.findOne(User, { email });
  }

  async findAll(): Promise<User[]> {
    return this.em.find(User, {});
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    
    this.em.assign(user, data);
    await this.em.flush();
    
    return user;
  }

  async updateResetToken(
    id: string,
    token: string | undefined,
    expiry: Date | undefined
  ): Promise<User> {
    return this.update(id, {
      resetToken: token,
      resetTokenExpiry: expiry,
    });
  }

  async delete(id: string): Promise<void> {
    const user = await this.findById(id);
    if (user) {
      await this.em.removeAndFlush(user);
    }
  }
} 