import { dashboardService } from "@/features/dashboard";
import { beforeEach, expect, it, vi } from "vitest";

const mockSingle = vi.fn();
const mockSelect = vi.fn();
const mockFrom = vi.fn();

vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    from: mockFrom,
  }),
}));

beforeEach(() => {
  vi.clearAllMocks();

  mockFrom.mockImplementation(() => ({
    select: mockSelect,
  }));
});

it("should get dashboard stats", async () => {
  const stats = {
    revenue: 12000,
    sales: 400,
  };

  mockSelect.mockReturnValue({
    single: mockSingle,
  });

  mockSingle.mockResolvedValue({
    data: stats,
    error: null,
  });

  const result = await dashboardService.getStats();

  expect(mockFrom).toHaveBeenCalledWith("dashboardstats");
  expect(mockSelect).toHaveBeenCalledWith("*");

  expect(result).toEqual(stats);
});

it("should get sales", async () => {
  const sales = [
    {
      month: "Jan",
      value: 200,
    },
  ];

  mockSelect.mockResolvedValue({
    data: sales,
    error: null,
  });

  const result = await dashboardService.getSales();

  expect(mockFrom).toHaveBeenCalledWith("dashboardsales");

  expect(result).toEqual(sales);
});

it("should get revenue", async () => {
  const revenue = [
    {
      month: "Jan",
      revenue: 500,
    },
  ];

  mockSelect.mockResolvedValue({
    data: revenue,
    error: null,
  });

  const result = await dashboardService.getRevenue();

  expect(mockFrom).toHaveBeenCalledWith("dashboardrevenue");

  expect(result).toEqual(revenue);
});

it("should get target", async () => {
  const target = {
    target: 90,
  };

  mockSelect.mockReturnValue({
    single: mockSingle,
  });

  mockSingle.mockResolvedValue({
    data: target,
    error: null,
  });

  const result = await dashboardService.getTarget();

  expect(mockFrom).toHaveBeenCalledWith("dashboardtarget");

  expect(result).toEqual(target);
});

it("should get visitors", async () => {
  const visitors = [
    {
      day: "Mon",
      value: 150,
    },
  ];

  mockSelect.mockResolvedValue({
    data: visitors,
    error: null,
  });

  const result = await dashboardService.getVisitors();

  expect(mockFrom).toHaveBeenCalledWith("dashboardvisitors");

  expect(result).toEqual(visitors);
});

it("should get demographics", async () => {
  const demographics = [
    {
      country: "USA",
      users: 100,
    },
  ];

  mockSelect.mockResolvedValue({
    data: demographics,
    error: null,
  });

  const result = await dashboardService.getDemographics();

  expect(mockFrom).toHaveBeenCalledWith("dashboarddemographics");

  expect(result).toEqual(demographics);
});

it("should get recent orders", async () => {
  const orders = [
    {
      id: 1,
    },
  ];

  mockSelect.mockResolvedValue({
    data: orders,
    error: null,
  });

  const result = await dashboardService.getRecentOrders();

  expect(mockFrom).toHaveBeenCalledWith("recentorders");

  expect(result).toEqual(orders);
});

it("should get top products", async () => {
  const products = [
    {
      id: 1,
    },
  ];

  mockSelect.mockResolvedValue({
    data: products,
    error: null,
  });

  const result = await dashboardService.getTopProducts();

  expect(mockFrom).toHaveBeenCalledWith("topproducts");

  expect(result).toEqual(products);
});

it("should get latest users", async () => {
  const users = [
    {
      id: "1",
      full_name: "Amir",
    },
  ];

  mockSelect.mockResolvedValue({
    data: users,
    error: null,
  });

  const result = await dashboardService.getLatestUsers();

  expect(mockFrom).toHaveBeenCalledWith("profiles");

  expect(result).toEqual(users);
});

it("should throw when getStats fails", async () => {
  const error = new Error("Database error");

  mockSelect.mockReturnValue({
    single: mockSingle,
  });

  mockSingle.mockResolvedValue({
    data: null,
    error,
  });

  await expect(
    dashboardService.getStats(),
  ).rejects.toThrow("Database error");
});

it("should throw when getSales fails", async () => {
  const error = new Error("Database error");

  mockSelect.mockResolvedValue({
    data: null,
    error,
  });

  await expect(
    dashboardService.getSales(),
  ).rejects.toThrow("Database error");
});