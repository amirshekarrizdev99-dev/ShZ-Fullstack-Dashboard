// src/tests/features/sales/useSales.test.tsx

import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  renderHook,
  waitFor,
} from "@testing-library/react";

import { wrapper } from "@/tests/utils/query-client-wrapper";

const mockUseOrders = vi.hoisted(() => vi.fn());

const mockCalculateSalesStats = vi.hoisted(() => vi.fn());
const mockCalculateMonthlySales = vi.hoisted(() => vi.fn());
const mockCalculateCategorySales = vi.hoisted(() => vi.fn());
const mockCalculateProductSales = vi.hoisted(() => vi.fn());

vi.mock("@/features/orders/hooks/useOrders", () => ({
  useOrders: mockUseOrders,
}));

vi.mock("@/features/sales/utils/salesAnalytics", () => ({
  calculateSalesStats: mockCalculateSalesStats,
  calculateMonthlySales: mockCalculateMonthlySales,
  calculateCategorySales: mockCalculateCategorySales,
  calculateProductSales: mockCalculateProductSales,
}));

import { useSales } from "@/features/sales/hooks/useSales";

describe("useSales", () => {
  beforeEach(() => {
    mockUseOrders.mockReset();

    mockCalculateSalesStats.mockReset();
    mockCalculateMonthlySales.mockReset();
    mockCalculateCategorySales.mockReset();
    mockCalculateProductSales.mockReset();
  });

  it("should return orders and calculated sales data", async () => {
    const orders = [
      {
        id: 1,
        total: 100,
        status: "Delivered",
      },
      {
        id: 2,
        total: 200,
        status: "Pending",
      },
    ];

    const stats = {
      totalSales: 300,
      totalOrders: 2,
    };

    const monthlySales = [
      {
        month: "January",
        sales: 300,
      },
    ];

    const categorySales = [
      {
        category: "Electronics",
        sales: 300,
      },
    ];

    const productSales = [
      {
        product: "Laptop",
        sales: 300,
      },
    ];

    mockUseOrders.mockReturnValue({
      data: orders,
      isLoading: false,
      isError: false,
      error: null,
    });

    mockCalculateSalesStats.mockReturnValue(stats);
    mockCalculateMonthlySales.mockReturnValue(monthlySales);
    mockCalculateCategorySales.mockReturnValue(categorySales);
    mockCalculateProductSales.mockReturnValue(productSales);

    const { result } = renderHook(
      () => useSales(),
      {
        wrapper,
      },
    );

    await waitFor(() => {
      expect(result.current.orders).toEqual(orders);
    });

    expect(mockCalculateSalesStats).toHaveBeenCalledTimes(1);
    expect(mockCalculateSalesStats).toHaveBeenCalledWith(orders);

    expect(mockCalculateMonthlySales).toHaveBeenCalledTimes(1);
    expect(mockCalculateMonthlySales).toHaveBeenCalledWith(orders);

    expect(mockCalculateCategorySales).toHaveBeenCalledTimes(1);
    expect(mockCalculateCategorySales).toHaveBeenCalledWith(orders);

    expect(mockCalculateProductSales).toHaveBeenCalledTimes(1);
    expect(mockCalculateProductSales).toHaveBeenCalledWith(orders);

    expect(result.current.orders).toEqual(orders);
    expect(result.current.stats).toEqual(stats);
    expect(result.current.monthlySales).toEqual(monthlySales);
    expect(result.current.categorySales).toEqual(categorySales);
    expect(result.current.productSales).toEqual(productSales);
  });

  it("should use empty orders when query has no data", () => {
    mockUseOrders.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    });

    const stats = {
      totalSales: 0,
      totalOrders: 0,
    };

    const monthlySales: unknown[] = [];
    const categorySales: unknown[] = [];
    const productSales: unknown[] = [];

    mockCalculateSalesStats.mockReturnValue(stats);
    mockCalculateMonthlySales.mockReturnValue(monthlySales);
    mockCalculateCategorySales.mockReturnValue(categorySales);
    mockCalculateProductSales.mockReturnValue(productSales);

    const { result } = renderHook(
      () => useSales(),
      {
        wrapper,
      },
    );

    expect(result.current.orders).toEqual([]);

    expect(mockCalculateSalesStats).toHaveBeenCalledWith([]);

    expect(mockCalculateMonthlySales).toHaveBeenCalledWith([]);

    expect(mockCalculateCategorySales).toHaveBeenCalledWith([]);

    expect(mockCalculateProductSales).toHaveBeenCalledWith([]);

    expect(result.current.stats).toEqual(stats);
    expect(result.current.monthlySales).toEqual(monthlySales);
    expect(result.current.categorySales).toEqual(categorySales);
    expect(result.current.productSales).toEqual(productSales);
  });

  it("should preserve the query state from useOrders", () => {
    const error = new Error("Failed to fetch orders");

    mockUseOrders.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error,
    });

    mockCalculateSalesStats.mockReturnValue({});
    mockCalculateMonthlySales.mockReturnValue([]);
    mockCalculateCategorySales.mockReturnValue([]);
    mockCalculateProductSales.mockReturnValue([]);

    const { result } = renderHook(
      () => useSales(),
      {
        wrapper,
      },
    );

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBe(error);
    expect(result.current.orders).toEqual([]);
  });
});