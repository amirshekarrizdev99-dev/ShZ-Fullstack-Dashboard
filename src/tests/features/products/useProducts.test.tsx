import { beforeEach, describe, expect, it, vi } from "vitest";

import { renderHook, waitFor } from "@testing-library/react";

import { wrapper } from "@/tests/utils/query-client-wrapper";

const mockGetProducts = vi.hoisted(() => vi.fn());
const mockCreateProduct = vi.hoisted(() => vi.fn());

vi.mock("@/features/products/api/products.service", () => ({
  productsService: {
    getProducts: mockGetProducts,
    createProduct: mockCreateProduct,
  },
}));

import {
  useProducts,
  useCreateProduct,
} from "@/features/products/hooks/useProducts";

describe("useProducts", () => {
  beforeEach(() => {
    mockGetProducts.mockReset();
    mockCreateProduct.mockReset();
  });

  describe("useProducts", () => {
    it("should fetch products successfully", async () => {
      const products = [
        {
          id: 1,
          name: "Product 1",
          price: 100,
        },
        {
          id: 2,
          name: "Product 2",
          price: 200,
        },
      ];

      mockGetProducts.mockResolvedValue(products);

      const { result } = renderHook(() => useProducts(), {
        wrapper,
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockGetProducts).toHaveBeenCalledTimes(1);

      expect(result.current.data).toEqual(products);

      expect(result.current.error).toBeNull();
    });

    it("should handle products fetch error", async () => {
      const error = new Error("Failed to fetch products");

      mockGetProducts.mockRejectedValue(error);

      const { result } = renderHook(() => useProducts(), {
        wrapper,
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(mockGetProducts).toHaveBeenCalledTimes(1);

      expect(result.current.error).toBe(error);

      expect(result.current.data).toBeUndefined();
    });
  });

  describe("useCreateProduct", () => {
    it("should create product successfully", async () => {
      const product = {
        name: "New Product",
        price: 150,
        description: "A new product",
        category: "General",
        stock: 10,
        image: "https://example.com/product.jpg",
        createdat: "2024-01-01T00:00:00.000Z",
      };

      const createdProduct = {
        id: 123,
        ...product,
      };

      mockCreateProduct.mockResolvedValue(createdProduct);

      const { result } = renderHook(() => useCreateProduct(), {
        wrapper,
      });

      result.current.mutate(product);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockCreateProduct).toHaveBeenCalledTimes(1);

      expect(mockCreateProduct).toHaveBeenCalledWith(
        product,
        expect.any(Object),
      );

      expect(result.current.data).toEqual(createdProduct);
    });

    it("should handle create product error", async () => {
      const product = {
        name: "New Product",
        price: 150,
        description: "A new product",
        category: "General",
        stock: 10,
        image: "https://example.com/product.jpg",
        createdat: "2024-01-01T00:00:00.000Z",
      };

      const error = new Error("Failed to create product");

      mockCreateProduct.mockRejectedValue(error);

      const { result } = renderHook(() => useCreateProduct(), {
        wrapper,
      });

      result.current.mutate(product);

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(mockCreateProduct).toHaveBeenCalledTimes(1);

      expect(mockCreateProduct).toHaveBeenCalledWith(
        product,
        expect.any(Object),
      );

      expect(result.current.error).toBe(error);
    });
  });
});
