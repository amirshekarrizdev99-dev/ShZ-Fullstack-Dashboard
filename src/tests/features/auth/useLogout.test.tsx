import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

import { wrapper } from "@/tests/utils/query-client-wrapper";
import { useLogout } from "@/features/auth/hooks/useLogout";

const mockLogout = vi.hoisted(() => vi.fn());

const mockRefresh = vi.hoisted(() => vi.fn());
const mockReplace = vi.hoisted(() => vi.fn());

vi.mock("@/features/auth/api/auth.service", () => ({
  authService: {
    logout: mockLogout,
  },
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: mockRefresh,
    replace: mockReplace,
  }),
}));

describe("useLogout", () => {
  beforeEach(() => {
    mockLogout.mockReset();
    mockRefresh.mockReset();
    mockReplace.mockReset();
  });

  it("should logout successfully", async () => {
    mockLogout.mockResolvedValue(undefined);

    const { result } = renderHook(() => useLogout(), {
      wrapper,
    });

    result.current.mutate();

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockLogout).toHaveBeenCalledTimes(1);
    expect(mockRefresh).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith("/signin");
  });

  it("should handle logout error", async () => {
    const error = new Error("Logout failed");

    mockLogout.mockRejectedValue(error);

    const { result } = renderHook(() => useLogout(), {
      wrapper,
    });

    result.current.mutate();

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(mockLogout).toHaveBeenCalledTimes(1);
    expect(mockRefresh).not.toHaveBeenCalled();
    expect(mockReplace).not.toHaveBeenCalled();
    expect(result.current.error).toBe(error);
  });
});