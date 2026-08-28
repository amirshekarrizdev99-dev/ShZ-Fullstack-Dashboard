import type { Order } from "../types";
import { createClient } from "@/lib/supabase/client";

export const ordersService = {
  async getOrders(): Promise<Order[]> {
    const supabase = createClient();
    const { data, error } = await supabase.from("orders").select("*");

    if (error) {
      throw error;
    }

    return data ?? [];
  },
};
