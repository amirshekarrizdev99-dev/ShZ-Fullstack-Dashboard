import type {
  DashboardStats,
  DashboardTarget,
  SalesData,
  RevenueData,
  VisitorsData,
  DemographicData,
  RecentOrder,
  TopProduct,
} from "../types";
import { User } from "@/features/users";
import { createClient } from "@/lib/supabase/client";

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const supabase = createClient();  
    const { data, error } = await supabase
      .from("dashboardstats")
      .select("*")
      .single();

    if (error) {
      throw error;
    }
    return data;
  },

  async getSales(): Promise<SalesData[]> {
    const supabase = createClient();
    const { data, error } = await supabase.from("dashboardsales").select("*");

    if (error) {
      throw error;
    }
    return data;
  },

  async getRevenue(): Promise<RevenueData[]> {
    const supabase = createClient(); 
    const { data, error } = await supabase.from("dashboardrevenue").select("*");

    if (error) {
      throw error;
    }
    return data;
  },

  getTarget: async (): Promise<DashboardTarget> => {
    const supabase = createClient(); 
    const { data, error } = await supabase
      .from("dashboardtarget")
      .select("*")
      .single();

    if (error) {
      throw error;
    }
    return data;
  },

  async getVisitors(): Promise<VisitorsData[]> {
    const supabase = createClient(); 
    const { data, error } = await supabase
      .from("dashboardvisitors")
      .select("*");
    if (error) {
      throw error;
    }
    return data;
  },

  getDemographics: async (): Promise<DemographicData[]> => {
    const supabase = createClient(); 
    const { data, error } = await supabase
      .from("dashboarddemographics")
      .select("*");
    if (error) {
      throw error;
    }
    return data;
  },

  async getRecentOrders(): Promise<RecentOrder[]> {
    const supabase = createClient(); 
    const { data, error } = await supabase.from("recentorders").select("*");

    if (error) {
      throw error;
    }
    return data;
  },

  async getTopProducts(): Promise<TopProduct[]> {
    const supabase = createClient(); 
    const { data, error } = await supabase.from("topproducts").select("*");

    if (error) {
      throw error;
    }
    return data;
  },

  async getLatestUsers(): Promise<User[]> {
    const supabase = createClient(); 
    const { data, error } = await supabase.from("profiles").select("*");
    if (error) {
      throw error;
    }
    return data;
  },
};
