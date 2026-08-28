import { Metadata } from "next";

import ProductsTable from "@/features/products/components/ProductsTable";


export const metadata: Metadata = {
  title: "Products",
  description: "Products",
};

export default function ProductsPage() {
  return (
    <div className="w-full min-w-0">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Products
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage and view your products.
        </p>
      </div>

      <ProductsTable />
    </div>
  );
}
