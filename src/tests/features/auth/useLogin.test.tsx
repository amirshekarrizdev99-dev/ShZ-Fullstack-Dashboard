import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

import { wrapper } from "@/tests/utils/query-client-wrapper";
import { useLogin } from "@/features/auth/hooks/useLogin";

const mockLogin = vi.hoisted(() => vi.fn());

vi.mock("@/features/auth/api/auth.service", () => ({
  authService: {
    login: mockLogin,
  },
}));

describe("useLogin", () => {
  beforeEach(() => {
    mockLogin.mockReset();
  });

  it("should login successfully", async () => {
    const loginResponse = {
      user: {
        id: "user-123",
        email: "test@example.com",
      },
      session: null,
    };

    mockLogin.mockResolvedValue(loginResponse);

    const { result } = renderHook(() => useLogin(), {
      wrapper,
    });

    result.current.mutate({
      email: "test@example.com",
      password: "1234567",
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockLogin).toHaveBeenCalledTimes(1);

    expect(mockLogin).toHaveBeenCalledWith(
      "test@example.com",
      "1234567",
    );

    expect(result.current.data).toEqual(loginResponse);
  });

  it("should handle login error", async () => {
    const error = new Error("Invalid login credentials");

    mockLogin.mockRejectedValue(error);

    const { result } = renderHook(() => useLogin(), {
      wrapper,
    });

    result.current.mutate({
      email: "test@example.com",
      password: "wrong-password",
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(mockLogin).toHaveBeenCalledTimes(1);

    expect(mockLogin).toHaveBeenCalledWith(
      "test@example.com",
      "wrong-password",
    );

    expect(result.current.error).toBe(error);
  });
});