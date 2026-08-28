// src/tests/features/notifications/useNotifications.test.tsx

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

const mockGetNotifications = vi.hoisted(() => vi.fn());

vi.mock("@/features/notifications/api/notifications.service", () => ({
  notificationsService: {
    getNotifications: mockGetNotifications,
  },
}));

import { useNotifications } from "@/features/notifications/hooks/useNotifications";

describe("useNotifications", () => {
  beforeEach(() => {
    mockGetNotifications.mockReset();
  });

  it("should fetch notifications successfully", async () => {
    const notifications = [
      {
        id: "notification-1",
        title: "New order",
        message: "You have a new order",
        isRead: false,
      },
      {
        id: "notification-2",
        title: "Order delivered",
        message: "Your order has been delivered",
        isRead: true,
      },
    ];

    mockGetNotifications.mockResolvedValue(notifications);

    const { result } = renderHook(
      () => useNotifications(),
      {
        wrapper,
      },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockGetNotifications).toHaveBeenCalledTimes(1);

    expect(result.current.data).toEqual(notifications);

    expect(result.current.error).toBeNull();
  });

  it("should handle notifications fetch error", async () => {
    const error = new Error("Failed to fetch notifications");

    mockGetNotifications.mockRejectedValue(error);

    const { result } = renderHook(
      () => useNotifications(),
      {
        wrapper,
      },
    );

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(mockGetNotifications).toHaveBeenCalledTimes(1);

    expect(result.current.error).toBe(error);

    expect(result.current.data).toBeUndefined();
  });
});