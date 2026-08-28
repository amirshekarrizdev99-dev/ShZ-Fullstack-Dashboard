"use client";

import { useRef, useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
  type ScriptableContext,
  type TooltipItem,
} from "chart.js";

import { Bar } from "react-chartjs-2";

import { useSales } from "../hooks/useSales";
import { useErrorHandler } from "@/shared/hooks";

gsap.registerPlugin(ScrollTrigger);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function SalesRevenueChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const {
    monthlySales,
    isLoading,
    isError,
    error: salesErrorData,
  } = useSales();

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

  if (isLoading || isError) {
    return (
      <div className="max-w-full min-w-0 p-5 bg-white border border-gray-200 rounded-xl dark:border-gray-800 dark:bg-gray-900">
        <div className="w-48 h-6 bg-gray-200 rounded animate-pulse dark:bg-gray-800" />
        <div className="mt-5 h-[320px] animate-pulse rounded bg-gray-100 dark:bg-gray-800/50" />
      </div>
    );
  }

  const data = {
    labels: monthlySales.map((item) => item.month),
    datasets: [
      {
        label: "Revenue",
        data: monthlySales.map((item) => item.revenue),
        backgroundColor: (context: ScriptableContext<"bar">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 320);
          gradient.addColorStop(0, "rgba(99, 102, 241, 0.85)");
          gradient.addColorStop(1, "rgba(99, 102, 241, 0.15)");
          return gradient;
        },
        hoverBackgroundColor: "rgba(99, 102, 241, 1)",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "rgba(99, 102, 241, 0.3)",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,

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
            const value = context.parsed.y ?? 0;
            return ` Revenue: $${value.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#9CA3AF",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#374151",
        },
        ticks: {
          color: "#9CA3AF",
          callback: (value) => {
            return `$${Number(value).toLocaleString()}`;
          },
        },
      },
    },
  };

  return (
    <div
      ref={containerRef}
      className="max-w-full min-w-0 p-5 bg-white border border-gray-200 rounded-xl dark:border-gray-800 dark:bg-gray-900"
      style={{ opacity: 0, willChange: "transform, opacity" }}
    >
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Revenue Overview
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Monthly revenue generated from orders.
        </p>
      </div>

      <div className="relative h-[320px] w-full overflow-hidden">
        {monthlySales.length === 0 ? (
          <div className="flex items-center justify-center h-full text-sm text-gray-500 dark:text-gray-400">
            No sales data available.
          </div>
        ) : shouldAnimate ? (
          <Bar data={data} options={options} />
        ) : null}
      </div>
    </div>
  );
}
