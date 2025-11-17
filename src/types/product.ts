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
  image_url?: string;
  expiry_date?: string | null;
  lastUpdated: string;
}

// Update ProductFormData to accept string prices for form input
export interface ProductFormData {
  name: string;
  wholesale_price: number | string;
  retail_price: number | string;
  quantity: number;
  category: string;
  unit: string;
  wholesale_unit?: string;
  retail_unit?: string;
  image_url?: string;
  expiry_date?: string;
}