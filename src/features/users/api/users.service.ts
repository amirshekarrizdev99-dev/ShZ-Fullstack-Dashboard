import type { User } from "../types";
import { createClient } from "@/lib/supabase/client";

export const usersService = {
  async getUsers(): Promise<User[]> {
    const supabase = createClient();
    const { data, error } = await supabase.from("profiles").select("*");

    if (error) {
      throw error;
    }

    return data ?? [];
  },
};
