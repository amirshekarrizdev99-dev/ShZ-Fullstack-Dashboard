/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SignInForm } from "@/features/auth";
import { wrapper } from "@/tests/utils/query-client-wrapper";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
  },
  Variants: {},
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

const mockMutate = vi.hoisted(() => vi.fn());
vi.mock("@/features/auth/hooks/useLogin", () => ({
  useLogin: () => ({
    mutate: mockMutate,
    isPending: false,
    isError: false,
    error: null,
  }),
}));

vi.mock("@/shared/utils/getAuthErrorMessage", () => ({
  getAuthErrorMessage: (msg: string) => `Error: ${msg}`,
}));

vi.mock("@/icons", () => ({
  ChevronLeftIcon: () => <svg data-testid="back-icon" />,
}));

describe("SignInForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders form with default values", () => {
    render(<SignInForm />, { wrapper });

    expect(
      screen.getByRole("heading", { name: "Sign In" }),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("info@gmail.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("12345678")).toBeInTheDocument(); // پسورد دیفالت
  });

  it("toggles password visibility", () => {
    render(<SignInForm />, { wrapper });

    const passwordInput = screen.getByDisplayValue("12345678");
    const toggleButton = screen.getByRole("button", { name: /show/i });

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleButton);

    expect(passwordInput).toHaveAttribute("type", "text");
    expect(toggleButton).toHaveTextContent("Hide");
  });

  it("shows validation errors when fields are cleared and submitted", async () => {
    render(<SignInForm />, { wrapper });

    const emailInput = screen.getByPlaceholderText("info@gmail.com");
    const passwordInput = screen.getByDisplayValue("12345678");

    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.change(passwordInput, { target: { value: "" } });

    const submitButton = screen.getByRole("button", { name: /^sign in$/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(
        screen.getByText("Password must be at least 6 characters"),
      ).toBeInTheDocument();
    });
  });

  it("calls mutate with correct data on valid submit", async () => {
    render(<SignInForm />, { wrapper });

    const emailInput = screen.getByPlaceholderText("info@gmail.com");
    const submitButton = screen.getByRole("button", { name: /^sign in$/i });

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledTimes(1);
      expect(mockMutate).toHaveBeenCalledWith(
        { email: "user@example.com", password: "12345678" },
        expect.objectContaining({
          onSuccess: expect.any(Function),
          onError: expect.any(Function),
        }),
      );
    });
  });
});
