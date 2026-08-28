// src/tests/features/profile/useProfile.test.tsx

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

const mockGetProfile = vi.hoisted(() => vi.fn());

vi.mock("@/features/profile/api", () => ({
  profileService: {
    getProfile: mockGetProfile,
  },
  profileKeys: {
    all: ["profile"],
  },
}));

import { useProfile } from "@/features/profile/hooks/useProfile";

describe("useProfile", () => {
  beforeEach(() => {
    mockGetProfile.mockReset();
  });

  it("should fetch profile successfully", async () => {
    const profile = {
      id: "admin-123",
      email: "admin@example.com",
      name: "Admin",
    };

    mockGetProfile.mockResolvedValue(profile);

    const { result } = renderHook(
      () => useProfile(),
      {
        wrapper,
      },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockGetProfile).toHaveBeenCalledTimes(1);

    expect(result.current.data).toEqual(profile);

    expect(result.current.error).toBeNull();
  });

  it("should handle profile fetch error", async () => {
    const error = new Error("Failed to fetch profile");

    mockGetProfile.mockRejectedValue(error);

    const { result } = renderHook(
      () => useProfile(),
      {
        wrapper,
      },
    );

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(mockGetProfile).toHaveBeenCalledTimes(1);

    expect(result.current.error).toBe(error);

    expect(result.current.data).toBeUndefined();
  });
});