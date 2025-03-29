import api from "./api";

export interface SignupParams {
  name: string;
  email: string;
  password: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    storeId?: string; // Optional store ID
  };
  token: string;
}

export interface ErrorResponse {
  error: string;
}

export const authService = {
  async signup(params: SignupParams): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/register", params);
    
    // Store the token
    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
    }
    
    return response.data;
  },
  
  async login(params: LoginParams): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", params);
    
    // Store the token
    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
    }
    
    return response.data;
  },
  
  logout(): void {
    localStorage.removeItem("authToken");
    localStorage.removeItem("storeId"); // Also clear storeId on logout
  },
  
  isAuthenticated(): boolean {
    return !!localStorage.getItem("authToken");
  },
  
  getToken(): string | null {
    return localStorage.getItem("authToken");
  }
}; 