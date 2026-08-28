import { beforeEach, describe, expect, it, vi } from "vitest";
import { config, proxy } from "../../proxy";

const mockUpdateSession = vi.hoisted(() => vi.fn());

vi.mock("@/lib/supabase/proxy", () => ({
  updateSession: mockUpdateSession,
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("proxy", () => {
  it("should call updateSession with the request", async () => {
    const request = {
      nextUrl: {
        pathname: "/dashboard",
      },
    } as never;

    const response = new Response(null, {
      status: 200,
    });

    mockUpdateSession.mockResolvedValue(response);

    const result = await proxy(request);

    expect(mockUpdateSession).toHaveBeenCalledTimes(1);
    expect(mockUpdateSession).toHaveBeenCalledWith(request);

    expect(result).toBe(response);
  });

  it("should return the response from updateSession", async () => {
    const request = {} as never;

    const response = new Response(null, {
      status: 303,
    });

    mockUpdateSession.mockResolvedValue(response);

    const result = await proxy(request);

    expect(result).toBe(response);
  });

  it("should propagate errors from updateSession", async () => {
    const request = {} as never;

    const error = new Error("Session update failed");

    mockUpdateSession.mockRejectedValue(error);

    await expect(proxy(request)).rejects.toBe(error);

    expect(mockUpdateSession).toHaveBeenCalledTimes(1);
    expect(mockUpdateSession).toHaveBeenCalledWith(request);
  });
});

describe("proxy config", () => {
  it("should have the correct matcher", () => {
    expect(config.matcher).toEqual([
      "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ]);
  });
});
