/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { uploadProductImage } from "@/lib/supabase/storage";
import { useIsAdmin } from "@/features/auth";
import { ProductUploadForm } from "@/features/products";
import { useCreateProduct } from "@/features/products/hooks/useProducts";

vi.mock("next/image", () => ({
  default: (props: any) => <img {...props} />,
}));

vi.mock("@gsap/react", () => ({ useGSAP: vi.fn() }));
vi.mock("gsap", () => ({ default: { from: vi.fn() } }));

vi.mock("@/lib/supabase/storage", () => ({
  uploadProductImage: vi.fn(),
}));

vi.mock("@/features/auth", () => ({
  useIsAdmin: vi.fn(),
}));

vi.mock("@/features/products/hooks/useProducts", () => ({
  useCreateProduct: vi.fn(),
}));

describe("ProductUploadForm", () => {
  const mutateAsync = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useIsAdmin).mockReturnValue({ data: true } as any);
    vi.mocked(useCreateProduct).mockReturnValue({
      mutateAsync,
      isPending: false,
    } as any);
    global.URL.createObjectURL = vi.fn(() => "mock-url");
  });

  it("renders form fields correctly", () => {
    render(<ProductUploadForm />);
    expect(
      screen.getByRole("heading", { name: "Upload Product" }),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("MacBook Pro 14")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter product description..."),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("249")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("40")).toBeInTheDocument();
  });

  it("disables submit button and shows warning for non-admins", () => {
    vi.mocked(useIsAdmin).mockReturnValue({ data: false } as any);
    render(<ProductUploadForm />);

    const submitButton = screen.getByRole("button", {
      name: /upload product/i,
    });
    expect(submitButton).toBeDisabled();
    expect(
      screen.getByText(/Demo accounts can view this page/i),
    ).toBeInTheDocument();
  });

  it("prevents submission and does not call mutateAsync when form is invalid", async () => {
    render(<ProductUploadForm />);

    const submitButton = screen.getByRole("button", {
      name: /upload product/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mutateAsync).not.toHaveBeenCalled();
    });
  });

  it("submits form successfully with valid data and image", async () => {
    render(<ProductUploadForm />);

    fireEvent.change(screen.getByPlaceholderText("MacBook Pro 14"), {
      target: { value: "Test Product" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("Enter product description..."),
      {
        target: { value: "Test Desc" },
      },
    );
    fireEvent.change(screen.getByPlaceholderText("249"), {
      target: { value: "100" },
    });
    fireEvent.change(screen.getByPlaceholderText("40"), {
      target: { value: "10" },
    });
    fireEvent.change(screen.getByLabelText("Category"), {
      target: { value: "Laptop" },
    });

    const file = new File(["image"], "test.png", { type: "image/png" });
    const input = screen.getByLabelText("Product Image") as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    vi.mocked(uploadProductImage).mockResolvedValue(
      "http://image.url/test.png",
    );

    const submitButton = screen.getByRole("button", {
      name: /upload product/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(uploadProductImage).toHaveBeenCalledWith(file);
      expect(mutateAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Test Product",
          description: "Test Desc",
          price: 100,
          category: "Laptop",
          stock: 10,
          image: "http://image.url/test.png",
        }),
      );
    });
  });
});
