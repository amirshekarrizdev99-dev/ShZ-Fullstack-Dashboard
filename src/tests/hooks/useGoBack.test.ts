import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

const mockBack = vi.hoisted(() => vi.fn());
const mockPush = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    back: mockBack,
    push: mockPush,
  }),
}));

import useGoBack from "@/shared/hooks/useGoBack";

describe("useGoBack", () => {
  beforeEach(() => {
    mockBack.mockReset();
    mockPush.mockReset();
  });

  it("should go back when browser history has previous entries", () => {
    vi.spyOn(window.history, "length", "get").mockReturnValue(2);

    const { result } = renderHook(() => useGoBack());

    act(() => {
      result.current();
    });

    expect(mockBack).toHaveBeenCalledTimes(1);
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("should navigate to home when there is no previous history", () => {
    vi.spyOn(window.history, "length", "get").mockReturnValue(1);

    const { result } = renderHook(() => useGoBack());

    act(() => {
      result.current();
    });

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith("/");

    expect(mockBack).not.toHaveBeenCalled();
  });

  it("should navigate to home when history length is zero", () => {
    vi.spyOn(window.history, "length", "get").mockReturnValue(0);

    const { result } = renderHook(() => useGoBack());

    act(() => {
      result.current();
    });

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith("/");

    expect(mockBack).not.toHaveBeenCalled();
  });
});