import { beforeEach, describe, expect, it, vi } from "vitest";

import { notificationsService } from "@/features/notifications/api/notifications.service";

const mockSelect = vi.hoisted(() => vi.fn());
const mockFrom = vi.hoisted(() => vi.fn());

vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    from: mockFrom,
  }),
}));

describe("notificationsService", () => {
  beforeEach(() => {
    mockFrom.mockReset();
    mockSelect.mockReset();

    mockFrom.mockReturnValue({
      select: mockSelect,
    });
  });

  describe("getNotifications", () => {
    it("should return notifications successfully", async () => {
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

      mockSelect.mockResolvedValue({
        data: notifications,
        error: null,
      });

      const result = await notificationsService.getNotifications();

      expect(mockFrom).toHaveBeenCalledTimes(1);
      expect(mockFrom).toHaveBeenCalledWith("notifications");

      expect(mockSelect).toHaveBeenCalledTimes(1);
      expect(mockSelect).toHaveBeenCalledWith("*");

      expect(result).toEqual(notifications);
    });

    it("should throw when fetching notifications fails", async () => {
      const error = new Error("Failed to fetch notifications");

      mockSelect.mockResolvedValue({
        data: null,
        error,
      });

      await expect(
        notificationsService.getNotifications(),
      ).rejects.toThrow("Failed to fetch notifications");

      expect(mockFrom).toHaveBeenCalledTimes(1);
      expect(mockFrom).toHaveBeenCalledWith("notifications");

      expect(mockSelect).toHaveBeenCalledTimes(1);
      expect(mockSelect).toHaveBeenCalledWith("*");
    });
  });
});