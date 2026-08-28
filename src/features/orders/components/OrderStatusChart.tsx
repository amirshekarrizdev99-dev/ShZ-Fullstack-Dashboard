"use client";

import { useMemo, useRef, useState } from "react";
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
  ChartOptions,
  ScriptableContext,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useOrders } from "../hooks/useOrders";
import { useErrorHandler } from "@/shared/hooks";

gsap.registerPlugin(ScrollTrigger);

ChartJS.register(ArcElement, Tooltip, Legend);

export default function OrderStatusChart() {
  const {
    data: orders,
    isLoading,
    isError,
    error: ordersErrorData,
  } = useOrders();

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useErrorHandler(isError, ordersErrorData);

  const statusCounts = useMemo(() => {
    const counts = {
      Delivered: 0,
      Pending: 0,
      Processing: 0,
      Cancelled: 0,
    };

    orders?.forEach((order) => {
      if (order.status in counts) {
        counts[order.status as keyof typeof counts]++;
      }
    });

    return counts;
  }, [orders]);

  useGSAP(
    () => {
      if (isLoading || isError || !chartContainerRef.current) return;

      gsap.set(chartContainerRef.current, { y: 60, opacity: 0 });

      const st = ScrollTrigger.create({
        trigger: chartContainerRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.to(chartContainerRef.current, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
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
      scope: chartContainerRef,
    },
  );

  if (isLoading || isError) {
    return (
      <div className="flex min-h-[350px] items-center justify-center rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <span className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
          Loading status chart...
        </span>
      </div>
    );
  }

  const data = {
    labels: ["Delivered", "Pending", "Processing", "Cancelled"],
    datasets: [
      {
        data: [
          statusCounts.Delivered,
          statusCounts.Pending,
          statusCounts.Processing,
          statusCounts.Cancelled,
        ],
        backgroundColor: ["#10b981", "#f59e0b", "#3b82f6", "#ef4444"],
        borderWidth: 0,
        hoverOffset: 12,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "65%",
    animation: {
      duration: 1200,
      easing: "easeOutQuart",

      delay: (context: ScriptableContext<"doughnut">) => {
        if (context.type === "data" && context.mode === "default") {
          return context.dataIndex * 150;
        }
        return 0;
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#9CA3AF",
          usePointStyle: true,
          padding: 20,
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
          Order Status
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Distribution of orders by status.
        </p>
      </div>

      <div className="h-[300px]">
        {shouldAnimate ? <Doughnut data={data} options={options} /> : null}
      </div>
    </div>
  );
}
