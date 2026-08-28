"use client";

import { OrdersTable } from "./OrdersTable";
import { useOrders } from "../hooks/useOrders";
import OrdersDashboard from "./OrdersDashboard";
import { useErrorHandler } from "@/shared/hooks";

export function OrdersPageClient() {
  const { isError, error: ordersErrorData } = useOrders();

  useErrorHandler(isError, ordersErrorData);

  if (isError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Orders
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage and track customer orders.
          </p>
        </div>

        <div className="p-6 bg-white border border-gray-200 rounded-xl dark:border-gray-800 dark:bg-gray-900 animate-pulse">
          <div className="w-24 h-4 mb-4 bg-gray-200 rounded dark:bg-gray-800"></div>
          <div className="w-full h-4 mb-2 bg-gray-200 rounded dark:bg-gray-800"></div>
          <div className="w-full h-4 mb-2 bg-gray-200 rounded dark:bg-gray-800"></div>
          <div className="w-3/4 h-4 bg-gray-200 rounded dark:bg-gray-800"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Orders
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage and track customer orders.
        </p>
      </div>

      <OrdersDashboard />

      <OrdersTable />
    </div>
  );
}
