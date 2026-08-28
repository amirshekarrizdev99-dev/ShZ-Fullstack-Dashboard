// src/tests/features/users/usersService.test.ts

import { beforeEach, describe, expect, it, vi } from "vitest";

const mockFrom = vi.hoisted(() => vi.fn());
const mockSelect = vi.hoisted(() => vi.fn());

vi.mock("@/lib/supabase/client", () => ({
  createClient: vi.fn(() => ({
    from: mockFrom,
  })),
}));

import { usersService } from "@/features/users/api/users.service";

describe("usersService", () => {
  beforeEach(() => {
    mockFrom.mockReset();
    mockSelect.mockReset();

    mockFrom.mockReturnValue({
      select: mockSelect,
    });
  });

  describe("getUsers", () => {
    it("should get users successfully", async () => {
      const users = [
        {
          id: "user-1",
          email: "user1@example.com",
          name: "User One",
        },
        {
          id: "user-2",
          email: "user2@example.com",
          name: "User Two",
        },
      ];

      mockSelect.mockResolvedValue({
        data: users,
        error: null,
      });

      const result = await usersService.getUsers();

      expect(mockFrom).toHaveBeenCalledTimes(1);
      expect(mockFrom).toHaveBeenCalledWith("profiles");

      expect(mockSelect).toHaveBeenCalledTimes(1);
      expect(mockSelect).toHaveBeenCalledWith("*");

      expect(result).toEqual(users);
    });

    it("should return an empty array when data is null", async () => {
      mockSelect.mockResolvedValue({
        data: null,
        error: null,
      });

      const result = await usersService.getUsers();

      expect(mockFrom).toHaveBeenCalledTimes(1);
      expect(mockFrom).toHaveBeenCalledWith("profiles");

      expect(mockSelect).toHaveBeenCalledTimes(1);
      expect(mockSelect).toHaveBeenCalledWith("*");

      expect(result).toEqual([]);
    });

    it("should throw error when getting users fails", async () => {
      const error = new Error("Failed to fetch users");

      mockSelect.mockResolvedValue({
        data: null,
        error,
      });

      await expect(
        usersService.getUsers(),
      ).rejects.toBe(error);

      expect(mockFrom).toHaveBeenCalledTimes(1);
      expect(mockFrom).toHaveBeenCalledWith("profiles");

      expect(mockSelect).toHaveBeenCalledTimes(1);
      expect(mockSelect).toHaveBeenCalledWith("*");
    });
  });
});