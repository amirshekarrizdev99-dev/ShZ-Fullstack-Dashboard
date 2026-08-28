"use client";

import { useMemo } from "react";

import { useOrders } from "@/features/orders/hooks/useOrders";
import {
  calculateCategorySales,
  calculateMonthlySales,
  calculateProductSales,
  calculateSalesStats,
} from "../utils/salesAnalytics";

export function useSales() {
  const query = useOrders();

  const orders = query.data ?? [];

  const stats = useMemo(() => calculateSalesStats(orders), [orders]);

  const monthlySales = useMemo(() => calculateMonthlySales(orders), [orders]);

  const categorySales = useMemo(() => calculateCategorySales(orders), [orders]);

  const productSales = useMemo(() => calculateProductSales(orders), [orders]);

  return {
    ...query,

    orders,

    stats,

    monthlySales,

    categorySales,

    productSales,
  };
}
