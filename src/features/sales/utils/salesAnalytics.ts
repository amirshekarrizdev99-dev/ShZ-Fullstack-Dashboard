import type { Order } from "@/features/orders";
import type {
  CategorySales,
  MonthlySales,
  ProductSales,
  SalesStats,
} from "../types";

const VALID_SALES_STATUSES: Order["status"][] = [
  "Delivered",
  "Pending",
  "Processing",
];

function getValidSalesOrders(orders: Order[]) {
  return orders.filter((order) => VALID_SALES_STATUSES.includes(order.status));
}

export function calculateSalesStats(orders: Order[]): SalesStats {
  const salesOrders = getValidSalesOrders(orders);

  const totalRevenue = salesOrders.reduce(
    (sum, order) => sum + (order.total ?? 0),
    0,
  );

  const totalOrders = salesOrders.length;

  const averageOrderValue =
    salesOrders.length > 0 ? totalRevenue / salesOrders.length : 0;

  const deliveredRevenue = salesOrders
    .filter((order) => order.status === "Delivered")
    .reduce((sum, order) => sum + (order.total ?? 0), 0);

  return {
    totalRevenue,
    totalOrders,
    averageOrderValue,
    deliveredRevenue,
  };
}

export function calculateMonthlySales(orders: Order[]): MonthlySales[] {
  const salesOrders = getValidSalesOrders(orders);

  const monthlyData = new Map<string, { revenue: number; orders: number }>();

  salesOrders.forEach((order) => {
    // ← created_at نه createdAt
    const date = new Date(order.createdat);

    if (Number.isNaN(date.getTime())) return;

    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

    const current = monthlyData.get(monthKey) ?? {
      revenue: 0,
      orders: 0,
    };

    current.revenue += order.total ?? 0;
    current.orders += 1;

    monthlyData.set(monthKey, current);
  });

  return Array.from(monthlyData.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => ({
      month,
      revenue: data.revenue,
      orders: data.orders,
    }));
}

export function calculateCategorySales(orders: Order[]): CategorySales[] {
  const salesOrders = getValidSalesOrders(orders);

  const categoryMap = new Map<string, { revenue: number; orders: number }>();

  salesOrders.forEach((order) => {
    const category = order.category ?? "Uncategorized";

    const current = categoryMap.get(category) ?? {
      revenue: 0,
      orders: 0,
    };

    current.revenue += order.total ?? 0;
    current.orders += 1;

    categoryMap.set(category, current);
  });

  return Array.from(categoryMap.entries())
    .map(([category, data]) => ({
      category,
      revenue: data.revenue,
      orders: data.orders,
    }))
    .sort((a, b) => b.revenue - a.revenue);
}

export function calculateProductSales(orders: Order[]): ProductSales[] {
  const salesOrders = getValidSalesOrders(orders);

  const productMap = new Map<string, { revenue: number; quantity: number }>();

  salesOrders.forEach((order) => {
    const product = order.product ?? "Unknown";

    const current = productMap.get(product) ?? {
      revenue: 0,
      quantity: 0,
    };

    current.revenue += order.total ?? 0;
    current.quantity += order.quantity ?? 0;

    productMap.set(product, current);
  });

  return Array.from(productMap.entries())
    .map(([product, data]) => ({
      product,
      revenue: data.revenue,
      quantity: data.quantity,
    }))
    .sort((a, b) => b.revenue - a.revenue);
}
