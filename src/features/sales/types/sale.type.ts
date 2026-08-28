import type { Order } from "@/features/orders";

export interface SalesStats {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  deliveredRevenue: number;
}

export interface MonthlySales {
  month: string;
  revenue: number;
  orders: number;
}

export interface CategorySales {
  category: string;
  revenue: number;
  orders: number;
}

export interface ProductSales {
  product: string;
  revenue: number;
  quantity: number;
}

export type SalesOrder = Order;
