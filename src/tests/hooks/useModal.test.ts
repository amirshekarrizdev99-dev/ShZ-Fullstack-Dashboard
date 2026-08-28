import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useModal } from "@/shared/hooks/useModal";

describe("useModal", () => {
  it("should be closed by default", () => {
    const { result } = renderHook(() => useModal());

    expect(result.current.isOpen).toBe(false);
  });

  it("should use the provided initial state", () => {
    const { result } = renderHook(() => useModal(true));

    expect(result.current.isOpen).toBe(true);
  });

  it("should open the modal", () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal();
    });

    expect(result.current.isOpen).toBe(true);
  });

  it("should close the modal", () => {
    const { result } = renderHook(() => useModal(true));

    act(() => {
      result.current.closeModal();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it("should toggle the modal from closed to open", () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.toggleModal();
    });

    expect(result.current.isOpen).toBe(true);
  });

  it("should toggle the modal from open to closed", () => {
    const { result } = renderHook(() => useModal(true));

    act(() => {
      result.current.toggleModal();
    });

    expect(result.current.isOpen).toBe(false);
  });
});
