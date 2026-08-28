import { createClient } from "@/lib/supabase/client";
import type { Product } from "../types/product.type";

export const productsService = {
  async getProducts(): Promise<Product[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("createdat", { ascending: false });

    if (error) {
      throw error;
    }

    return data as Product[];
  },

  async createProduct(product: Omit<Product, "id">): Promise<Product> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("products")
      .insert({
        ...product,
        id: Date.now(),
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data as Product;
  },
};
