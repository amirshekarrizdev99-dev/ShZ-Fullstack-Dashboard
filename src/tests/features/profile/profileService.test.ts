import { beforeEach, describe, expect, it, vi } from "vitest";

const mockFrom = vi.hoisted(() => vi.fn());
const mockSelect = vi.hoisted(() => vi.fn());
const mockSingle = vi.hoisted(() => vi.fn());
const mockLimit = vi.hoisted(() => vi.fn());
const mockAuthGetUser = vi.hoisted(() => vi.fn());

vi.mock("@/lib/supabase/client", () => ({
  createClient: vi.fn(() => ({
    from: mockFrom,
    auth: { getUser: mockAuthGetUser },
  })),
}));

import { profileService } from "@/features/profile/api/profile.service";

describe("profileService", () => {
  beforeEach(() => {
    mockFrom.mockReset();
    mockSelect.mockReset();
    mockSingle.mockReset();
    mockLimit.mockReset();
    mockAuthGetUser.mockReset();

    mockFrom.mockReturnValue({
      select: mockSelect,
    });

    mockSelect.mockReturnValue({
      limit: mockLimit,
    });

    mockLimit.mockReturnValue({
      single: mockSingle,
    });

    // Default auth.getUser returns a user for tests
    mockAuthGetUser.mockResolvedValue({
      data: { user: { id: "user-1", email: "user@example.com" } },
    });
  });

  describe("getProfile", () => {
    it("should get profile successfully", async () => {
      const profile = {
        id: "admin-123",
        email: "admin@example.com",
        name: "Admin",
      };

      mockSingle.mockResolvedValue({
        data: profile,
        error: null,
      });

      const result = await profileService.getProfile();

      expect(mockFrom).toHaveBeenCalledTimes(1);
      expect(mockFrom).toHaveBeenCalledWith("admins");

      expect(mockSelect).toHaveBeenCalledTimes(1);
      expect(mockSelect).toHaveBeenCalledWith("*");

      expect(mockSingle).toHaveBeenCalledTimes(1);

      expect(result).toEqual(profile);
    });

    it("should throw error when getting profile fails", async () => {
      const error = new Error("Failed to get profile");

      mockSingle.mockResolvedValue({
        data: null,
        error,
      });

      await expect(
        profileService.getProfile(),
      ).rejects.toBe(error);

      expect(mockFrom).toHaveBeenCalledTimes(1);
      expect(mockFrom).toHaveBeenCalledWith("admins");

      expect(mockSelect).toHaveBeenCalledTimes(1);
      expect(mockSelect).toHaveBeenCalledWith("*");

      expect(mockSingle).toHaveBeenCalledTimes(1);
    });
  });
});