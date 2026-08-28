"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { useProducts } from "../hooks/useProducts";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";

export default function ProductsTable() {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    data: products = [],
    isLoading,
    isError,
    error: productsErrorData,
  } = useProducts();

  useErrorHandler(isError, productsErrorData);

  useGSAP(
    () => {
      if (isLoading || isError || !containerRef.current) return;

      gsap.from(containerRef.current, {
        scale: 0.98,
        opacity: 0,
        duration: 1.2,
        ease: "power2.inOut",
      });
    },
    {
      dependencies: [isLoading, isError],
      scope: containerRef,
    },
  );

  if (isLoading || isError) {
    return (
      <div className="w-full overflow-hidden bg-white border border-gray-200 rounded-xl dark:border-gray-800 dark:bg-gray-900">
        <div className="animate-pulse">
          <div className="bg-gray-100 h-14 dark:bg-gray-800" />

          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="flex items-center h-20 gap-4 px-5 border-t border-gray-200 dark:border-gray-800"
            >
              <div className="w-12 h-12 bg-gray-200 rounded-lg shrink-0 dark:bg-gray-800" />

              <div className="flex-1 space-y-2">
                <div className="w-32 h-4 bg-gray-200 rounded dark:bg-gray-800" />
                <div className="w-48 h-3 bg-gray-200 rounded dark:bg-gray-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="p-6 text-sm text-gray-500 bg-white border border-gray-200 rounded-xl dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
        No products available.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full min-w-0 overflow-hidden bg-white border border-gray-200 rounded-xl dark:border-gray-800 dark:bg-gray-900"
      style={{
        willChange: "transform, opacity",
      }}
    >
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[760px]">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <th className="px-5 py-4 text-sm font-medium text-left text-gray-500 dark:text-gray-400">
                Product
              </th>

              <th className="px-5 py-4 text-sm font-medium text-left text-gray-500 dark:text-gray-400">
                Category
              </th>

              <th className="px-5 py-4 text-sm font-medium text-left text-gray-500 dark:text-gray-400">
                Price
              </th>

              <th className="px-5 py-4 text-sm font-medium text-left text-gray-500 dark:text-gray-400">
                Stock
              </th>

              <th className="px-5 py-4 text-sm font-medium text-left text-gray-500 dark:text-gray-400">
                Created
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {products.map((product) => (
              <tr
                key={product.id}
                className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 overflow-hidden bg-gray-100 rounded-lg shrink-0 dark:bg-gray-800">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate dark:text-white">
                        {product.name}
                      </p>

                      <p className="max-w-[280px] truncate text-xs text-gray-500 dark:text-gray-400">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                  {product.category}
                </td>

                <td className="px-5 py-4 text-sm font-medium text-gray-800 dark:text-white">
                  ${product.price.toLocaleString()}
                </td>

                <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                  {product.stock}
                </td>

                <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                  {new Date(product.createdat).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
