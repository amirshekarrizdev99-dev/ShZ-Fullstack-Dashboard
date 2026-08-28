import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";

const mockReplace = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

import { useErrorHandler } from "@/shared/hooks/useErrorHandler";

describe("useErrorHandler", () => {
  beforeEach(() => {
    mockReplace.mockReset();
  });

  it("should not redirect when isError is false", () => {
    renderHook(() => useErrorHandler(false, null));

    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("should redirect to /404 for Axios-like 404 error", () => {
    const error = {
      response: {
        status: 404,
      },
    };

    renderHook(() => useErrorHandler(true, error));

    expect(mockReplace).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith("/404");
  });

  it("should redirect to /500 for Axios-like 500 error", () => {
    const error = {
      response: {
        status: 500,
      },
    };

    renderHook(() => useErrorHandler(true, error));

    expect(mockReplace).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith("/500");
  });

  it("should redirect to /404 for fetch-like 404 error", () => {
    const error = {
      status: 404,
    };

    renderHook(() => useErrorHandler(true, error));

    expect(mockReplace).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith("/404");
  });

  it("should redirect to /500 for fetch-like 500 error", () => {
    const error = {
      status: 500,
    };

    renderHook(() => useErrorHandler(true, error));

    expect(mockReplace).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith("/500");
  });

  it("should redirect to /404 for custom server 404 error", () => {
    const error = {
      statusCode: 404,
    };

    renderHook(() => useErrorHandler(true, error));

    expect(mockReplace).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith("/404");
  });

  it("should redirect to /500 for custom server 500 error", () => {
    const error = {
      statusCode: 500,
    };

    renderHook(() => useErrorHandler(true, error));

    expect(mockReplace).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith("/500");
  });

  it("should redirect to /500 for an unknown status code", () => {
    const error = {
      status: 403,
    };

    renderHook(() => useErrorHandler(true, error));

    expect(mockReplace).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith("/500");
  });

  it("should redirect to /500 when error has no status", () => {
    const error = {};

    renderHook(() => useErrorHandler(true, error));

    expect(mockReplace).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith("/500");
  });

  it("should redirect to /500 when error is null", () => {
    renderHook(() => useErrorHandler(true, null));

    expect(mockReplace).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith("/500");
  });

  it("should redirect to /500 when error is a primitive value", () => {
    renderHook(() => useErrorHandler(true, "Something went wrong"));

    expect(mockReplace).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith("/500");
  });
});