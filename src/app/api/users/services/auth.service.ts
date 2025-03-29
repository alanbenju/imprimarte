import jwt from "jsonwebtoken";
import { User } from "../entities/user.entity";
import { IUserRepository } from "../repositories/user.repository";

export interface IAuthService {
  register(data: { email: string; password: string; name?: string }): Promise<User>;
  login(email: string, password: string): Promise<{ user: User; token: string } | null>;
  generateResetToken(email: string): Promise<string | null>;
  resetPassword(token: string, newPassword: string): Promise<boolean>;
  verifyToken(token: string): Promise<User | null>;
}

export class AuthService implements IAuthService {
  constructor(private readonly userRepository: IUserRepository) {}

  async register(data: {
    email: string;
    password: string;
    name?: string;
  }): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    return this.userRepository.create(data);
  }

  async login(
    email: string,
    password: string
  ): Promise<{ user: User; token: string } | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return null;

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) return null;

    const token = this.generateJWT(user);
    return { user, token };
  }

  async generateResetToken(email: string): Promise<string | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return null;

    const resetToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "1h" }
    );

    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 1);

    await this.userRepository.updateResetToken(user.id, resetToken, expiry);
    return resetToken;
  }

  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "your-secret-key"
      ) as { userId: string };

      const user = await this.userRepository.findById(decoded.userId);
      if (!user || user.resetToken !== token) return false;

      const now = new Date();
      if (!user.resetTokenExpiry || user.resetTokenExpiry < now) return false;

      // Create a new user with the new password to ensure the password is hashed
      user.password = newPassword;
      await this.userRepository.update(user.id, { 
        password: user.password,
        resetToken: undefined,
        resetTokenExpiry: undefined
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  async verifyToken(token: string): Promise<User | null> {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "your-secret-key"
      ) as { userId: string };

      return this.userRepository.findById(decoded.userId);
    } catch (error) {
      return null;
    }
  }

  private generateJWT(user: User): string {
    return jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );
  }
} 