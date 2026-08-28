import { describe, it, expect, vi, beforeEach } from "vitest";
import { authService } from "@/features/auth/api/auth.service";

const mockSignInWithPassword = vi.fn();
const mockSignOut = vi.fn();
const mockGetSession = vi.fn();
const mockGetUser = vi.fn();
const mockFrom = vi.fn();

vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    auth: {
      signInWithPassword: mockSignInWithPassword,
      signOut: mockSignOut,
      getSession: mockGetSession,
      getUser: mockGetUser,
    },
    from: mockFrom,
  }),
}));

describe("authService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("login", () => {
    it("should login successfully with valid credentials", async () => {
      const mockData = {
        user: { id: "user-1", email: "admin@admin.com" },
        session: { access_token: "token-123" },
      };

      mockSignInWithPassword.mockResolvedValue({
        data: mockData,
        error: null,
      });

      const result = await authService.login("admin@admin.com", "12345678");

      expect(mockSignInWithPassword).toHaveBeenCalledWith({
        email: "admin@admin.com",
        password: "12345678",
      });
      expect(result).toEqual(mockData);
    });

    it("should throw error when login fails", async () => {
      mockSignInWithPassword.mockResolvedValue({
        data: { user: null, session: null },
        error: { message: "Invalid login credentials" },
      });

      await expect(
        authService.login("wrong@email.com", "wrong"),
      ).rejects.toMatchObject({
        message: "Invalid login credentials",
      });
    });
  });

  describe("logout", () => {
    it("should call signOut with local scope", async () => {
      mockSignOut.mockResolvedValue({ error: null });

      await authService.logout();

      expect(mockSignOut).toHaveBeenCalledWith({ scope: "local" });
    });

    it("should throw error when logout fails", async () => {
      mockSignOut.mockResolvedValue({
        error: { message: "Logout failed" },
      });

      await expect(authService.logout()).rejects.toMatchObject({
        message: "Logout failed",
      });
    });
  });

  describe("getSession", () => {
    it("should return current session", async () => {
      const mockSession = { access_token: "token-123" };

      mockGetSession.mockResolvedValue({
        data: { session: mockSession },
        error: null,
      });

      const result = await authService.getSession();

      expect(result).toEqual(mockSession);
    });

    it("should throw error when getSession fails", async () => {
      mockGetSession.mockResolvedValue({
        data: { session: null },
        error: { message: "Session error" },
      });

      await expect(authService.getSession()).rejects.toMatchObject({
        message: "Session error",
      });
    });
  });

  describe("isAdmin", () => {
    it("should return true when user exists in admins table", async () => {
      mockGetUser.mockResolvedValue({
        data: { user: { id: "admin-id" } },
        error: null,
      });

      const maybeSingle = vi.fn().mockResolvedValue({
        data: { id: "admin-id" },
        error: null,
      });
      const eq = vi.fn().mockReturnValue({ maybeSingle });
      const select = vi.fn().mockReturnValue({ eq });

      mockFrom.mockReturnValue({ select });

      const result = await authService.isAdmin();

      expect(mockFrom).toHaveBeenCalledWith("admins");
      expect(result).toBe(true);
    });

    it("should return false when user is not logged in", async () => {
      mockGetUser.mockResolvedValue({
        data: { user: null },
        error: null,
      });

      const result = await authService.isAdmin();

      expect(result).toBe(false);
      expect(mockFrom).not.toHaveBeenCalled();
    });

    it("should return false when user is not in admins table", async () => {
      mockGetUser.mockResolvedValue({
        data: { user: { id: "demo-id" } },
        error: null,
      });

      const maybeSingle = vi.fn().mockResolvedValue({
        data: null,
        error: null,
      });
      const eq = vi.fn().mockReturnValue({ maybeSingle });
      const select = vi.fn().mockReturnValue({ eq });

      mockFrom.mockReturnValue({ select });

      const result = await authService.isAdmin();

      expect(result).toBe(false);
    });
  });
});