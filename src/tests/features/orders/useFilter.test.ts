// src/tests/features/orders/ordersService.test.ts

import { beforeEach, describe, expect, it, vi } from "vitest";

import { ordersService } from "@/features/orders/api/orders.service";

const mockSelect = vi.hoisted(() => vi.fn());
const mockFrom = vi.hoisted(() => vi.fn());

vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    from: mockFrom,
  }),
}));

describe("ordersService", () => {
  beforeEach(() => {
    mockFrom.mockReset();
    mockSelect.mockReset();

    mockFrom.mockReturnValue({
      select: mockSelect,
    });
  });

  describe("getOrders", () => {
    it("should return orders successfully", async () => {
      const orders = [
        {
          id: "order-1",
          total: 250,
          status: "Delivered",
        },
        {
          id: "order-2",
          total: 150,
          status: "Pending",
        },
      ];

      mockSelect.mockResolvedValue({
        data: orders,
        error: null,
      });

      const result = await ordersService.getOrders();

      expect(mockFrom).toHaveBeenCalledTimes(1);
      expect(mockFrom).toHaveBeenCalledWith("orders");

      expect(mockSelect).toHaveBeenCalledTimes(1);
      expect(mockSelect).toHaveBeenCalledWith("*");

      expect(result).toEqual(orders);
    });

    it("should return an empty array when data is null", async () => {
      mockSelect.mockResolvedValue({
        data: null,
        error: null,
      });

      const result = await ordersService.getOrders();

      expect(result).toEqual([]);
    });

    it("should throw when fetching orders fails", async () => {
      const error = new Error("Failed to fetch orders");

      mockSelect.mockResolvedValue({
        data: null,
        error,
      });

      await expect(
        ordersService.getOrders(),
      ).rejects.toThrow("Failed to fetch orders");

      expect(mockFrom).toHaveBeenCalledTimes(1);
      expect(mockFrom).toHaveBeenCalledWith("orders");

      expect(mockSelect).toHaveBeenCalledTimes(1);
      expect(mockSelect).toHaveBeenCalledWith("*");
    });
  });
});