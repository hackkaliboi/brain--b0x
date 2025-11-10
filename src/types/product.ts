export interface Product {
  id: string;
  name: string;
  wholesale_price: number;
  retail_price: number;
  quantity: number;
  category: string;
  unit: string;
  wholesale_unit?: string;
  retail_unit?: string;
  expiry_date?: string | null;
  lastUpdated: string;
}

export interface Category {
  id: string;
  name: string;
  created_at: string;
}

export type ProductFormData = Omit<Product, "id" | "lastUpdated">;
