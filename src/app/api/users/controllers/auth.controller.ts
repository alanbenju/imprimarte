import { NextRequest, NextResponse } from "next/server";
import { getEM } from "../../database/connection";
import { UserRepository } from "../repositories/user.repository";
import { CompanyStoreRepository } from "../../store/repositories/company-store.repository";

export interface RegisterBody {
  email: string;
  password: string;
  name?: string;
}

export interface LoginBody {
  email: string;
  password: string;
}

export async function register(req: NextRequest) {
  try {
    const em = await getEM();
    const userRepository = new UserRepository(em);
    const storeRepository = new CompanyStoreRepository(em);
    const authService = new AuthServiceImpl(userRepository);

    const body = await req.json() as RegisterBody;
    
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await authService.register(body);

    // Create a store for the user - now including all fields
    const storeName = `Tienda de ${user.name || user.email.split("@")[0]}`;
    
    const store = await storeRepository.create({
      name: storeName,
      user,
      colorPanel: "#0077FF",
      colorText: "#FFFFFF",
      backgroundColor: "#F0F9FF",
      buyButtonColor: "#FF5500",
      productTextColor: "#333333",
      showStoreName: true
    });

    // Generate token for authentication
    const token = authService.login(body.email, body.password).then(result => result?.token || "");

    return NextResponse.json(
      { 
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          storeId: store.id // Include the storeId in the response
        },
        token: await token
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to register user" },
      { status: 400 }
    );
  }
}

export async function login(req: NextRequest) {
  try {
    const em = await getEM();
    const userRepository = new UserRepository(em);
    const storeRepository = new CompanyStoreRepository(em);
    const authService = new AuthServiceImpl(userRepository);

    const body = await req.json() as LoginBody;
    
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const result = await authService.login(body.email, body.password);
    
    if (!result) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const { user, token } = result;
    
    // Find user's store
    const stores = await storeRepository.findByUserId(user.id);
    const storeId = stores.length > 0 ? stores[0].id : undefined;

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        storeId // Include the storeId in the response
      },
      token,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to login" },
      { status: 400 }
    );
  }
}

// Import the actual implementation
import { AuthService as AuthServiceImpl } from "../services/auth.service"; 