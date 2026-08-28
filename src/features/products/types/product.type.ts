export type ProductCategory =
  | "Laptop"
  | "Phone"
  | "Watch"
  | "Tablet"
  | "Audio"
  | "Monitor"
  | "Accessories";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: ProductCategory | string;
  stock: number;
  image: string;
  createdat: string;
}
