"use client";

import { useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
  type ChartOptions,
  type TooltipItem,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { useSales } from "../hooks/useSales";
import { useErrorHandler } from "@/shared/hooks";

gsap.registerPlugin(ScrollTrigger);

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export default function SalesTopProductsChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const { orders, isLoading, isError, error: salesErrorData } = useSales();

  useErrorHandler(isError, salesErrorData);

  useGSAP(
    () => {
      if (isLoading || isError || !containerRef.current) return;

      gsap.set(containerRef.current, {
        scale: 0.98,
        opacity: 0,
      });

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 90%",
        onEnter: () => {
          gsap.to(containerRef.current, {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power2.inOut",
          });

          setShouldAnimate(true);
        },
      });

      return () => {
        st.kill();
      };
    },
    {
      dependencies: [isLoading, isError],
      scope: containerRef,
    },
  );

  const products = useMemo(() => {
    const productMap = new Map<
      string,
      {
        revenue: number;
        quantity: number;
      }
    >();

    orders.forEach((order) => {
      const existing = productMap.get(order.product);

      if (existing) {
        existing.revenue += order.total;
        existing.quantity += order.quantity;
      } else {
        productMap.set(order.product, {
          revenue: order.total,
          quantity: order.quantity,
        });
      }
    });

    return Array.from(productMap.entries())
      .map(([product, data]) => ({
        product,
        ...data,
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [orders]);

  if (isLoading || isError) {
    return (
      <div className="w-full min-w-0 p-5 bg-white border border-gray-200 rounded-xl dark:border-gray-800 dark:bg-gray-900">
        <div className="w-40 h-6 bg-gray-200 rounded animate-pulse dark:bg-gray-800" />
        <div className="mt-6 h-[320px] animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800/50" />
      </div>
    );
  }

  const data = {
    labels: products.map((item) => item.product),
    datasets: [
      {
        label: "Revenue",
        data: products.map((item) => item.revenue),
        backgroundColor: "#6366f1",
        borderRadius: 6,
        barThickness: 24,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",

    animation: {
      duration: 1800,
      easing: "easeInOutQuart",
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"bar">) => {
            const value = context.parsed.x ?? 0;
            return ` Revenue: $${value.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${Number(value).toLocaleString()}`,
        },
        grid: {
          color: "#374151",
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#9CA3AF",
        },
      },
    },
  };

  return (
    <div
      ref={containerRef}
      className="w-full min-w-0 p-5 bg-white border border-gray-200 rounded-xl dark:border-gray-800 dark:bg-gray-900"
      style={{ opacity: 0, willChange: "transform, opacity" }}
    >
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
        Top Products
      </h3>

      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Best-performing products by revenue.
      </p>

      <div className="mt-6 h-[320px] w-full min-w-0 overflow-hidden">
        {shouldAnimate ? <Bar data={data} options={options} /> : null}
      </div>
    </div>
  );
}
