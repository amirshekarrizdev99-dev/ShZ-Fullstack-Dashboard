// src/tests/features/products/productsService.test.ts

import { beforeEach, describe, expect, it, vi } from "vitest";

import { productsService } from "@/features/products/api/products.service";

const mockSelect = vi.hoisted(() => vi.fn());
const mockOrder = vi.hoisted(() => vi.fn());
const mockInsert = vi.hoisted(() => vi.fn());
const mockSingle = vi.hoisted(() => vi.fn());
const mockFrom = vi.hoisted(() => vi.fn());

vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    from: mockFrom,
  }),
}));

describe("productsService", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockFrom.mockReturnValue({
      select: mockSelect,
      insert: mockInsert,
    });

    mockSelect.mockReturnValue({
      order: mockOrder,
      single: mockSingle,
    });

    mockInsert.mockReturnValue({
      select: mockSelect,
    });
  });

  describe("getProducts", () => {
    it("should return products successfully", async () => {
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

      mockOrder.mockResolvedValue({
        data: products,
        error: null,
      });

      const result = await productsService.getProducts();

      expect(mockFrom).toHaveBeenCalledTimes(1);
      expect(mockFrom).toHaveBeenCalledWith("products");

      expect(mockSelect).toHaveBeenCalledTimes(1);
      expect(mockSelect).toHaveBeenCalledWith("*");

      expect(mockOrder).toHaveBeenCalledTimes(1);
      expect(mockOrder).toHaveBeenCalledWith("createdat", {
        ascending: false,
      });

      expect(result).toEqual(products);
    });

    it("should throw when fetching products fails", async () => {
      const error = new Error("Failed to fetch products");

      mockOrder.mockResolvedValue({
        data: null,
        error,
      });

      await expect(productsService.getProducts()).rejects.toThrow(
        "Failed to fetch products",
      );

      expect(mockFrom).toHaveBeenCalledWith("products");
      expect(mockSelect).toHaveBeenCalledWith("*");
      expect(mockOrder).toHaveBeenCalledWith("createdat", {
        ascending: false,
      });
    });
  });

  describe("createProduct", () => {
    const product = {
      name: "New Product",
      price: 150,
      description: "A new product",
      category: "General",
      stock: 10,
      image: "https://example.com/product.jpg",
      createdat: "2024-01-01T00:00:00.000Z",
    };

    it("should create a product successfully", async () => {
      const createdProduct = {
        id: 123456789,
        ...product,
      };

      mockSingle.mockResolvedValue({
        data: createdProduct,
        error: null,
      });

      vi.spyOn(Date, "now").mockReturnValue(123456789);

      const result = await productsService.createProduct(product);

      expect(mockFrom).toHaveBeenCalledTimes(1);
      expect(mockFrom).toHaveBeenCalledWith("products");

      expect(mockInsert).toHaveBeenCalledTimes(1);
      expect(mockInsert).toHaveBeenCalledWith({
        ...product,
        id: 123456789,
      });

      expect(mockSelect).toHaveBeenCalledTimes(1);
      expect(mockSelect).toHaveBeenCalledWith();

      expect(mockSingle).toHaveBeenCalledTimes(1);

      expect(result).toEqual(createdProduct);
    });

    it("should throw when creating a product fails", async () => {
      const error = new Error("Failed to create product");

      vi.spyOn(Date, "now").mockReturnValue(123456789);

      mockSingle.mockResolvedValue({
        data: null,
        error,
      });

      await expect(productsService.createProduct(product)).rejects.toThrow(
        "Failed to create product",
      );

      expect(mockFrom).toHaveBeenCalledWith("products");
      expect(mockInsert).toHaveBeenCalledWith({
        ...product,
        id: 123456789,
      });
      expect(mockSelect).toHaveBeenCalledWith();
      expect(mockSingle).toHaveBeenCalledTimes(1);
    });
  });
});
