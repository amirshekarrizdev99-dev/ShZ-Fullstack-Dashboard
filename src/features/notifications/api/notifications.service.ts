import type { Notification } from "../types/notification.type";
import { createClient } from "@/lib/supabase/client";

export const notificationsService = {
  
  async getNotifications(): Promise<Notification[]> {
    const supabase = createClient();
    const { data, error } = await supabase.from("notifications").select("*");
    if (error) {
      throw error;
    }
    return data;
  },
};
