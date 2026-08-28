import { describe, expect, it } from "vitest";

import {
  productSchema,
} from "@/features/products/validation/product.schema";

describe("productSchema", () => {
  const validProduct = {
    name: "MacBook Pro",
    description: "A professional laptop.",
    price: 1999,
    category: "Laptops",
    stock: 10,
    image: "/images/products/macbook.jpg",
  };

  it("should validate a valid product", () => {
    const result = productSchema.safeParse(validProduct);

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data).toEqual(validProduct);
    }
  });

  it("should trim name and description", () => {
    const result = productSchema.safeParse({
      ...validProduct,
      name: "  MacBook Pro  ",
      description: "  A professional laptop.  ",
      category: "  Laptops  ",
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.name).toBe("MacBook Pro");
      expect(result.data.description).toBe(
        "A professional laptop.",
      );
      expect(result.data.category).toBe("Laptops");
    }
  });

  it("should reject an empty name", () => {
    const result = productSchema.safeParse({
      ...validProduct,
      name: "   ",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Product name is required.",
      );
    }
  });

  it("should reject a name longer than 100 characters", () => {
    const result = productSchema.safeParse({
      ...validProduct,
      name: "a".repeat(101),
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Product name must be less than 100 characters.",
      );
    }
  });

  it("should reject an empty description", () => {
    const result = productSchema.safeParse({
      ...validProduct,
      description: "   ",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Description is required.",
      );
    }
  });

  it("should reject a description longer than 500 characters", () => {
    const result = productSchema.safeParse({
      ...validProduct,
      description: "a".repeat(501),
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Description must be less than 500 characters.",
      );
    }
  });

  it("should reject a non-positive price", () => {
    const result = productSchema.safeParse({
      ...validProduct,
      price: 0,
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Price must be greater than 0.",
      );
    }
  });

  it("should reject an empty category", () => {
    const result = productSchema.safeParse({
      ...validProduct,
      category: "   ",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Category is required.",
      );
    }
  });

  it("should reject a non-positive stock", () => {
    const result = productSchema.safeParse({
      ...validProduct,
      stock: 0,
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Stock must be greater than 0.",
      );
    }
  });

  it("should reject a decimal stock value", () => {
    const result = productSchema.safeParse({
      ...validProduct,
      stock: 10.5,
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Stock must be a whole number.",
      );
    }
  });

  it("should reject an empty image", () => {
    const result = productSchema.safeParse({
      ...validProduct,
      image: "",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Product image is required.",
      );
    }
  });

  it("should reject multiple invalid fields", () => {
    const result = productSchema.safeParse({
      name: "",
      description: "",
      price: 0,
      category: "",
      stock: 0,
      image: "",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues.length).toBeGreaterThan(1);
    }
  });
});