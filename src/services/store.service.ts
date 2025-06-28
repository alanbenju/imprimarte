import api from "./api";
import publicApi from "./public-api";

export interface StoreDetails {
  id: string;
  name: string;
  bannerImage?: string;
  logoImage?: string;
  colorPanel: string;
  colorText: string;
  backgroundColor: string;
  buyButtonColor: string;
  productTextColor?: string;
  showStoreName?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStoreParams {
  name: string;
  colorPanel?: string;
  colorText?: string;
  backgroundColor?: string;
  buyButtonColor?: string;
  productTextColor?: string;
  showStoreName?: boolean;
  banner?: File;
  logo?: File;
}

export interface UpdateStoreParams {
  name?: string;
  colorPanel?: string;
  colorText?: string;
  backgroundColor?: string;
  buyButtonColor?: string;
  productTextColor?: string;
  showStoreName?: boolean;
  banner?: File;
  logo?: File;
}

export interface DashboardData {
  storeName: string;
  productCount: number;
  analytics: {
    visits: AnalyticItem;
    views: AnalyticItem;
    sales: AnalyticItem;
    revenue: AnalyticItem;
  };
  recentProducts: any[];
}

interface AnalyticItem {
  value: string;
  change: string;
  isPositive: boolean;
}

export const storeService = {
  // Get public store details by ID
  async getPublicStore(storeId: string): Promise<StoreDetails> {
    const response = await api.get<StoreDetails>(`/store/${storeId}`);
    return response.data;
  },
  
  // Get current user's store
  async getMyStore(): Promise<StoreDetails> {
    const response = await api.get<StoreDetails>("/store/me");
    return response.data;
  },

  async getStore(storeName: string): Promise<StoreDetails> {
    const response = await api.get<StoreDetails>(`/store/public/${storeName}`);
    return response.data;
  },
  
  // Get store configuration
  async getStoreConfiguration(): Promise<StoreDetails> {
    const response = await api.get<StoreDetails>("/store/me/configuration");
    return response.data;
  },
  
  // Create a new store for the current user
  async createStore(params: CreateStoreParams): Promise<StoreDetails> {
    // Using FormData for file uploads
    const formData = new FormData();
    
    // Add text fields
    formData.append("name", params.name);
    if (params.colorPanel) formData.append("colorPanel", params.colorPanel);
    if (params.colorText) formData.append("colorText", params.colorText);
    if (params.backgroundColor) formData.append("backgroundColor", params.backgroundColor);
    if (params.buyButtonColor) formData.append("buyButtonColor", params.buyButtonColor);
    if (params.productTextColor) formData.append("productTextColor", params.productTextColor);
    if (params.showStoreName !== undefined) formData.append("showStoreName", String(params.showStoreName));
    
    // Add files if provided
    if (params.banner) formData.append("banner", params.banner);
    if (params.logo) formData.append("logo", params.logo);
    
    const response = await api.post<StoreDetails>("/store/me", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    return response.data;
  },
  
  // Update current user's store
  async updateStore(params: UpdateStoreParams): Promise<StoreDetails> {
    // Using FormData for file uploads
    const formData = new FormData();
    
    // Add text fields if provided
    if (params.name) formData.append("name", params.name);
    if (params.colorPanel) formData.append("colorPanel", params.colorPanel);
    if (params.colorText) formData.append("colorText", params.colorText);
    if (params.backgroundColor) formData.append("backgroundColor", params.backgroundColor);
    if (params.buyButtonColor) formData.append("buyButtonColor", params.buyButtonColor);
    if (params.productTextColor) formData.append("productTextColor", params.productTextColor);
    if (params.showStoreName !== undefined) formData.append("showStoreName", String(params.showStoreName));
    
    // Add files if provided
    if (params.banner) formData.append("banner", params.banner);
    if (params.logo) formData.append("logo", params.logo);
    
    const response = await api.put<StoreDetails>("/store/me/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    return response.data;
  },
  
  // Get products for a public store
  async getStoreProducts(storeId: string): Promise<any[]> {
    const response = await api.get(`/store/${storeId}/products`);
    return response.data;
  },
  
  // Get products for the current user's store
  async getMyStoreProducts(): Promise<any[]> {
    const response = await api.get("/store/me/products");
    return response.data;
  },
  
  // Create a product for the current user's store
  async createProduct(productData: FormData): Promise<any> {
    const response = await api.post("/store/me/products", productData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  
  // Get dashboard data for the current user's store
  async getDashboardData(): Promise<DashboardData> {
    const response = await api.get<DashboardData>("/store/me/dashboard");
    return response.data;
  }
}; 