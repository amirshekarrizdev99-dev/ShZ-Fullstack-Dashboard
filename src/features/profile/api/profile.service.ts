import type { Profile } from "../types/profile.type";
import { createClient } from "@/lib/supabase/client";

export const profileService = {
  getProfile: async () => {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    const { data, error } = await supabase
      .from("admins")
      .select("*")
      .limit(1)
      .single();

    if (error) {
      throw error;
    }

    return data as Profile | null;
  },
};
