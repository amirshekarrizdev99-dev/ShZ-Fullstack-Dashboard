/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SignUpForm } from "@/features/auth";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
  },
  Variants: {},
}));

vi.mock("next/link", () => ({
  default: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}));

vi.mock("@/icons", () => ({
  ChevronLeftIcon: () => <svg data-testid="back-icon" />,
  EyeCloseIcon: (props: any) => <svg data-testid="eye-close-icon" {...props} />,
  EyeIcon: (props: any) => <svg data-testid="eye-open-icon" {...props} />,
}));

vi.mock("@/components/ui/shadcn/checkbox", () => ({
  Checkbox: ({ checked, onCheckedChange, ...props }: any) => (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      data-testid="terms-checkbox"
      {...props}
    />
  ),
}));

describe("SignUpForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders form fields correctly", () => {
    render(<SignUpForm />);

    expect(
      screen.getByRole("heading", { name: "Sign Up" }),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your first name"),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your last name"),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your password"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("terms-checkbox")).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    render(<SignUpForm />);

    const submitButton = screen.getByRole("button", { name: /^sign up$/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("First name must be at least 2 characters."),
      ).toBeInTheDocument();
      expect(
        screen.getByText("Last name must be at least 2 characters."),
      ).toBeInTheDocument();
      expect(
        screen.getByText("Please enter a valid email address."),
      ).toBeInTheDocument();
      expect(
        screen.getByText("Password must be at least 8 characters."),
      ).toBeInTheDocument();
      expect(
        screen.getByText("You must accept the Terms and Conditions."),
      ).toBeInTheDocument();
    });
  });

  it("toggles password visibility", () => {
    render(<SignUpForm />);

    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const toggleIcon = screen.getByTestId("eye-close-icon");

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleIcon);

    expect(passwordInput).toHaveAttribute("type", "text");
    expect(screen.getByTestId("eye-open-icon")).toBeInTheDocument();
  });

  it("submits form with valid data", async () => {
    const consoleSpy = vi.spyOn(console, "log");
    render(<SignUpForm />);

    fireEvent.change(screen.getByPlaceholderText("Enter your first name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your last name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
      target: { value: "Password123" },
    });
    fireEvent.click(screen.getByTestId("terms-checkbox"));

    const submitButton = screen.getByRole("button", { name: /^sign up$/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith("Sign Up data:", {
        fname: "John",
        lname: "Doe",
        email: "john@example.com",
        password: "Password123",
        terms: true,
      });
    });

    consoleSpy.mockRestore();
  });
});
