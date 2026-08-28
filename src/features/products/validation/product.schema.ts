import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Product name is required.")
    .max(100, "Product name must be less than 100 characters."),

  description: z
    .string()
    .trim()
    .min(1, "Description is required.")
    .max(500, "Description must be less than 500 characters."),

  price: z
    .number("Price is required.")
    .positive("Price must be greater than 0."),

  category: z.string().trim().min(1, "Category is required."),

  stock: z
    .number("Stock is required.")
    .int("Stock must be a whole number.")
    .positive("Stock must be greater than 0."),

  image: z.string().min(1, "Product image is required."),
});

export type ProductFormValues = z.infer<typeof productSchema>;
