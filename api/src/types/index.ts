// Shared types for the hanacards API

export interface AuthUser {
  uid: string;
  email?: string;
  role: "ADMIN" | "CUSTOMER";
}

export interface CreateProductBody {
  name: string;
  description: string;
  price: number;
  category: string;
  primaryImage: string;
  hoverImage: string;
  stock?: number;
}

export interface UpdateProductBody {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  primaryImage?: string;
  hoverImage?: string;
  stock?: number;
  active?: boolean;
}

export interface OrderItemInput {
  productId: string;
  quantity: number;
}

export interface CreateOrderBody {
  items: OrderItemInput[];
  address?: {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface ApiError {
  message: string;
  code?: string;
}
