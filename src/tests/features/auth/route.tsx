import { POST } from "@/features/auth/constants/route";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockSignOut = vi.hoisted(() => vi.fn());

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(async () => ({
    auth: {
      signOut: mockSignOut,
    },
  })),
}));


describe("POST /api/auth/logout", () => {
  beforeEach(() => {
    mockSignOut.mockReset();
  });

  it("should sign out and redirect to /signin", async () => {
    mockSignOut.mockResolvedValue({
      error: null,
    });

    const request = new Request(
      "http://localhost:3000/api/auth/logout",
      {
        method: "POST",
      },
    );

    const response = await POST(request);

    expect(mockSignOut).toHaveBeenCalledTimes(1);

    expect(mockSignOut).toHaveBeenCalledWith({
      scope: "local",
    });

    expect(response.status).toBe(303);

    expect(response.headers.get("location")).toBe(
      "http://localhost:3000/signin",
    );
  });

  it("should return 500 when sign out fails", async () => {
    mockSignOut.mockResolvedValue({
      error: {
        message: "Logout failed",
      },
    });

    const request = new Request(
      "http://localhost:3000/api/auth/logout",
      {
        method: "POST",
      },
    );

    const response = await POST(request);

    expect(mockSignOut).toHaveBeenCalledTimes(1);

    expect(response.status).toBe(500);

    expect(await response.json()).toEqual({
      error: "Logout failed",
    });
  });
});