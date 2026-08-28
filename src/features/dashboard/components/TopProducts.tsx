"use client";

import Image from "next/image";
import Link from "next/link";

import Loading from "@/shared/components/errors/LoadingState";
import { useErrorHandler } from "@/shared/hooks";
import { useTopProducts } from "../hooks";

const medals = ["🥇", "🥈", "🥉"];

export default function TopProducts() {
  const { data: products, isLoading, isError, error } = useTopProducts();

  useErrorHandler(isError, error);

  if (isLoading || !products) {
    return <Loading />;
  }

  return (
    <div className="p-5 bg-white border border-gray-200 rounded-2xl dark:border-gray-800 dark:bg-white/3 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Top Products
          </h3>

          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Best selling products
          </p>
        </div>

        <Link
          href="/sales"
          className="text-sm font-medium text-brand-500 hover:text-brand-600"
        >
          View all
        </Link>
      </div>

      {/* Products */}
      <div className="space-y-4">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-4 transition-all duration-200 border border-gray-100 rounded-xl hover:border-brand-200 hover:bg-gray-50 dark:border-gray-800 dark:hover:border-brand-800 dark:hover:bg-white/5"
          >
            <div className="flex items-center gap-4">
              {/* Rank */}
              <div className="flex items-center justify-center text-lg bg-gray-100 rounded-full h-9 w-9 dark:bg-gray-800">
                {medals[index] ?? (
                  <span className="text-sm font-semibold text-gray-500">
                    #{index + 1}
                  </span>
                )}
              </div>

              {/* Product Image */}
              <div className="relative overflow-hidden border border-gray-200 h-14 w-14 rounded-xl dark:border-gray-700">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Product Info */}
              <div>
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
                  {product.name}
                </h4>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {product.sold.toLocaleString()} sold
                </p>
              </div>
            </div>

            {/* Revenue */}
            <div className="text-right">
              <p className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                Revenue
              </p>

              <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
                ${Math.round(product.revenue / 1000).toLocaleString()}K
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
