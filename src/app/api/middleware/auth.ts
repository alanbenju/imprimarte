import { NextRequest } from "next/server";
import { UserRepository } from "../users/repositories/user.repository";
import { AuthService } from "../users/services/auth.service";
import { User } from "../users/entities/user.entity";
import { getEM } from "../database/connection";
/**
 * Get the authenticated user from the request
 * @param req The Next.js request object
 * @returns The authenticated user or null if not authenticated
 */
export async function getAuthUser(req: NextRequest): Promise<User | null> {
  try {
    // Get the authorization header
    const authorization = req.headers.get("authorization");
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return null;
    }
    
    // Extract the token
    const token = authorization.split("Bearer ")[1];
    if (!token) {
      return null;
    }
    
    // Verify the token
    const em = await getEM();
    const userRepo = new UserRepository(em);
    const authService = new AuthService(userRepo);
    
    const user = await authService.verifyToken(token);
    return user;
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
}

/**
 * Get the user ID from the request, for use in routes
 * This doesn't verify the token validity
 * @param req The Next.js request object
 * @returns The user ID from the token or null
 */
export function getUserIdFromToken(req: NextRequest): string | null {
  try {
    const authorization = req.headers.get("authorization");
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return null;
    }
    
    const token = authorization.split("Bearer ")[1];
    if (!token) {
      return null;
    }
    
    // Decode the token (without verification)
    const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
    return payload.userId || null;
  } catch (error) {
    return null;
  }
} 