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

const mockGetUsers = vi.hoisted(() => vi.fn());

vi.mock("@/features/users/api/users.service", () => ({
  usersService: {
    getUsers: mockGetUsers,
  },
}));

import { useUsers } from "@/features/users/hooks/useUsers";

describe("useUsers", () => {
  beforeEach(() => {
    mockGetUsers.mockReset();
  });

  it("should fetch users successfully", async () => {
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

    mockGetUsers.mockResolvedValue(users);

    const { result } = renderHook(
      () => useUsers(),
      {
        wrapper,
      },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockGetUsers).toHaveBeenCalledTimes(1);

    expect(result.current.data).toEqual(users);

    expect(result.current.error).toBeNull();
  });

  it("should handle users fetch error", async () => {
    const error = new Error("Failed to fetch users");

    mockGetUsers.mockRejectedValue(error);

    const { result } = renderHook(
      () => useUsers(),
      {
        wrapper,
      },
    );

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(mockGetUsers).toHaveBeenCalledTimes(1);

    expect(result.current.error).toBe(error);

    expect(result.current.data).toBeUndefined();
  });
});