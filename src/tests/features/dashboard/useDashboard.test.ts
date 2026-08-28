// src/tests/features/dashboard/useDashboard.test.tsx

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

const mockGetStats = vi.hoisted(() => vi.fn());
const mockGetSales = vi.hoisted(() => vi.fn());
const mockGetRevenue = vi.hoisted(() => vi.fn());
const mockGetTarget = vi.hoisted(() => vi.fn());
const mockGetVisitors = vi.hoisted(() => vi.fn());
const mockGetDemographics = vi.hoisted(() => vi.fn());
const mockGetRecentOrders = vi.hoisted(() => vi.fn());
const mockGetLatestUsers = vi.hoisted(() => vi.fn());
const mockGetTopProducts = vi.hoisted(() => vi.fn());

vi.mock("@/features/dashboard/api", () => ({
  dashboardService: {
    getStats: mockGetStats,
    getSales: mockGetSales,
    getRevenue: mockGetRevenue,
    getTarget: mockGetTarget,
    getVisitors: mockGetVisitors,
    getDemographics: mockGetDemographics,
    getRecentOrders: mockGetRecentOrders,
    getLatestUsers: mockGetLatestUsers,
    getTopProducts: mockGetTopProducts,
  },
}));

import {
  useDashboardStats,
  useDashboardSales,
  useDashboardRevenue,
  useDashboardTarget,
  useDashboardVisitors,
  useDashboardDemographics,
  useRecentOrders,
  useLatestUsers,
  useTopProducts,
} from "@/features/dashboard/hooks";

describe("Dashboard hooks", () => {
  beforeEach(() => {
    mockGetStats.mockReset();
    mockGetSales.mockReset();
    mockGetRevenue.mockReset();
    mockGetTarget.mockReset();
    mockGetVisitors.mockReset();
    mockGetDemographics.mockReset();
    mockGetRecentOrders.mockReset();
    mockGetLatestUsers.mockReset();
    mockGetTopProducts.mockReset();
  });

  it("should fetch dashboard stats", async () => {
    const data = {
      revenue: 12000,
      sales: 400,
    };

    mockGetStats.mockResolvedValue(data);

    const { result } = renderHook(
      () => useDashboardStats(),
      { wrapper },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockGetStats).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(data);
  });

  it("should fetch dashboard sales", async () => {
    const data = [
      {
        month: "Jan",
        value: 200,
      },
    ];

    mockGetSales.mockResolvedValue(data);

    const { result } = renderHook(
      () => useDashboardSales(),
      { wrapper },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockGetSales).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(data);
  });

  it("should fetch dashboard revenue", async () => {
    const data = [
      {
        month: "Jan",
        revenue: 500,
      },
    ];

    mockGetRevenue.mockResolvedValue(data);

    const { result } = renderHook(
      () => useDashboardRevenue(),
      { wrapper },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockGetRevenue).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(data);
  });

  it("should fetch dashboard target", async () => {
    const data = {
      target: 90,
    };

    mockGetTarget.mockResolvedValue(data);

    const { result } = renderHook(
      () => useDashboardTarget(),
      { wrapper },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockGetTarget).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(data);
  });

  it("should fetch dashboard visitors", async () => {
    const data = [
      {
        day: "Mon",
        value: 150,
      },
    ];

    mockGetVisitors.mockResolvedValue(data);

    const { result } = renderHook(
      () => useDashboardVisitors(),
      { wrapper },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockGetVisitors).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(data);
  });

  it("should fetch dashboard demographics", async () => {
    const data = [
      {
        country: "USA",
        users: 100,
      },
    ];

    mockGetDemographics.mockResolvedValue(data);

    const { result } = renderHook(
      () => useDashboardDemographics(),
      { wrapper },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockGetDemographics).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(data);
  });

  it("should fetch recent orders", async () => {
    const data = [
      {
        id: 1,
      },
    ];

    mockGetRecentOrders.mockResolvedValue(data);

    const { result } = renderHook(
      () => useRecentOrders(),
      { wrapper },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockGetRecentOrders).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(data);
  });

  it("should fetch latest users", async () => {
    const data = [
      {
        id: "user-1",
        full_name: "Amir",
      },
    ];

    mockGetLatestUsers.mockResolvedValue(data);

    const { result } = renderHook(
      () => useLatestUsers(),
      { wrapper },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockGetLatestUsers).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(data);
  });

  it("should fetch top products", async () => {
    const data = [
      {
        id: "product-1",
        name: "Product 1",
      },
    ];

    mockGetTopProducts.mockResolvedValue(data);

    const { result } = renderHook(
      () => useTopProducts(),
      { wrapper },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockGetTopProducts).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(data);
  });

  it("should handle dashboard stats error", async () => {
    const error = new Error("Failed to fetch dashboard stats");

    mockGetStats.mockRejectedValue(error);

    const { result } = renderHook(
      () => useDashboardStats(),
      { wrapper },
    );

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(mockGetStats).toHaveBeenCalledTimes(1);
    expect(result.current.error).toBe(error);
  });
});