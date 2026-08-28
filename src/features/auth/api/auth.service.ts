import { createClient } from "@/lib/supabase/client";

export const authService = {
  async login(email: string, password: string) {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return data;
  },

  async logout() {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut({
      scope: "local",
    });

    if (error) {
      throw error;
    }
  },

  async getSession() {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    return data.session;
  },

  async isAdmin() {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return false;
    }

    const { data, error } = await supabase
      .from("admins")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return !!data;
  },
};
