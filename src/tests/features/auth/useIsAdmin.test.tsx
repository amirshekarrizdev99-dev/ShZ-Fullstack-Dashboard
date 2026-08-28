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

import { useIsAdmin } from "@/features/auth/hooks/useIsAdmin";
import { wrapper } from "@/tests/utils/query-client-wrapper";


const mockIsAdmin = vi.hoisted(() => vi.fn());

vi.mock("@/features/auth/api/auth.service", () => ({
  authService: {
    isAdmin: mockIsAdmin,
  },
}));

describe("useIsAdmin", () => {
  beforeEach(() => {
    mockIsAdmin.mockReset();
  });

  it("should return admin status", async () => {
    mockIsAdmin.mockResolvedValue(true);

    const { result } = renderHook(() => useIsAdmin(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockIsAdmin).toHaveBeenCalledTimes(1);
    expect(result.current.data).toBe(true);
  });

  it("should handle error", async () => {
    const error = new Error("Failed to check admin status");

    mockIsAdmin.mockRejectedValue(error);

    const { result } = renderHook(() => useIsAdmin(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(mockIsAdmin).toHaveBeenCalledTimes(1);
    expect(result.current.error).toBe(error);
  });
});