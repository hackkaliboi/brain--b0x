import { Product } from "@/types/product";

const STORAGE_KEY = "wellx-products";

export const storage = {
  getProducts: (): Product[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error reading from storage:", error);
      return [];
    }
  },

  saveProducts: (products: Product[]): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (error) {
      console.error("Error saving to storage:", error);
    }
  },

  addProduct: (product: Omit<Product, "id" | "lastUpdated">): Product => {
    const products = storage.getProducts();
    const newProduct: Product = {
      ...product,
      id: crypto.randomUUID(),
      lastUpdated: new Date().toISOString(),
    };
    products.push(newProduct);
    storage.saveProducts(products);
    return newProduct;
  },

  updateProduct: (id: string, updates: Partial<Product>): void => {
    const products = storage.getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index !== -1) {
      products[index] = {
        ...products[index],
        ...updates,
        lastUpdated: new Date().toISOString(),
      };
      storage.saveProducts(products);
    }
  },

  deleteProduct: (id: string): void => {
    const products = storage.getProducts();
    storage.saveProducts(products.filter((p) => p.id !== id));
  },
};
