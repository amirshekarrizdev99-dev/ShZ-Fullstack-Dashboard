import { Order } from "@/features/orders";
import { Product } from "@/features/products";
import { User } from "@/features/users";

export interface SalesData {
  id: string;
  month: string;
  sales: number;
}

export interface RevenueData {
  id: string;
  month: string;
  value: number;
}

export interface VisitorsData {
  id: string;
  month: string;
  visitors: number;
}

export interface DemographicData {
  id: string;
  country: string;
  customers: number;
  percentage: number;
  flag: string;
}
export interface DashboardStats {
  ordergrowth: number;
  customergrowth: number;
  users: number;
  customers: number;
  orders: number;
  products: number;
  revenue: number;

  customerGrowth: number;
  orderGrowth: number;
  revenueGrowth: number;
  productGrowth: number;

  totalUsers?: number;
  totalOrders?: number;
  totalProducts?: number;

  latestUsers?: User[];
  latestOrders?: Order[];
  topProducts?: Product[];
}
export interface DashboardData {
  stats: DashboardStats;
  sales: SalesData[];
}

export interface DashboardTarget {
  target: number;
  revenue: number;
  today: number;
  progress: number;
  growth: number;
}
export interface TopProduct {
  id: string;
  name: string;
  image: string;
  category: string;
  sold: number;
  revenue: number;
}

export type RecentOrder = Order;
