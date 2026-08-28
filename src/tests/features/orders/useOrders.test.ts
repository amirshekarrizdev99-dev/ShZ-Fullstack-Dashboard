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

const mockGetOrders = vi.hoisted(() => vi.fn());

vi.mock("@/features/orders/api/orders.service", () => ({
  ordersService: {
    getOrders: mockGetOrders,
  },
}));

import { useOrders } from "@/features/orders/hooks/useOrders";

describe("useOrders", () => {
  beforeEach(() => {
    mockGetOrders.mockReset();
  });

  it("should fetch orders successfully", async () => {
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

    mockGetOrders.mockResolvedValue(orders);

    const { result } = renderHook(
      () => useOrders(),
      {
        wrapper,
      },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockGetOrders).toHaveBeenCalledTimes(1);

    expect(result.current.data).toEqual(orders);

    expect(result.current.error).toBeNull();
  });

  it("should handle orders fetch error", async () => {
    const error = new Error("Failed to fetch orders");

    mockGetOrders.mockRejectedValue(error);

    const { result } = renderHook(
      () => useOrders(),
      {
        wrapper,
      },
    );

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(mockGetOrders).toHaveBeenCalledTimes(1);

    expect(result.current.error).toBe(error);

    expect(result.current.data).toBeUndefined();
  });
});