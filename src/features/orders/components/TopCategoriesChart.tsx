"use client";

import { useMemo, useRef } from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useOrders } from "../hooks/useOrders";
import { useErrorHandler } from "@/shared/hooks";

gsap.registerPlugin(ScrollTrigger);

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function TopCategoriesChart() {
  const {
    data: orders,
    isLoading,
    isError,
    error: ordersErrorData,
  } = useOrders();

  const chartContainerRef = useRef<HTMLDivElement>(null);

  useErrorHandler(isError, ordersErrorData);
  const categoryData = useMemo(() => {
    if (!orders) {
      return [];
    }

    const categoryMap = new Map<string, number>();

    orders.forEach((order) => {
      const category = order.category;

      categoryMap.set(category, (categoryMap.get(category) ?? 0) + 1);
    });

    return Array.from(categoryMap.entries())
      .map(([category, count]) => ({
        category,
        count,
      }))
      .sort((a, b) => b.count - a.count);
  }, [orders]);

  useGSAP(
    () => {
      if (isLoading || isError || !chartContainerRef.current) return;

      gsap.fromTo(
        chartContainerRef.current,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: chartContainerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    {
      dependencies: [isLoading, isError],
      scope: chartContainerRef,
    },
  );

  if (isLoading || isError) {
    return (
      <div className="flex min-h-[350px] items-center justify-center rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <span className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
          Loading categories...
        </span>
      </div>
    );
  }

  const data = {
    labels: categoryData.map((item) => item.category),
    datasets: [
      {
        label: "Orders",
        data: categoryData.map((item) => item.count),
        backgroundColor: "#3b82f6",
        borderRadius: 6,
        barThickness: 32,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <div
      ref={chartContainerRef}
      className="p-5 bg-white border border-gray-200 rounded-xl dark:border-gray-800 dark:bg-gray-900"
      style={{ opacity: 0 }}
    >
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Top Categories
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Number of orders by product category.
        </p>
      </div>

      <div className="h-[320px]">
        {categoryData.length > 0 ? (
          <Bar data={data} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full text-sm text-gray-500 dark:text-gray-400">
            No category data available.
          </div>
        )}
      </div>
    </div>
  );
}
