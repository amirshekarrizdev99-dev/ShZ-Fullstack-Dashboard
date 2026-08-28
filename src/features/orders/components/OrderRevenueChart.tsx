"use client";

import { useMemo, useRef, useState } from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
  ChartOptions,
  TooltipItem,
  ScriptableContext,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useOrders } from "../hooks/useOrders";
import { useErrorHandler } from "@/shared/hooks";

gsap.registerPlugin(ScrollTrigger);

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function OrderRevenueChart() {
  const {
    data: orders,
    isLoading,
    isError,
    error: ordersErrorData,
  } = useOrders();

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useErrorHandler(isError, ordersErrorData);

  const revenueData = useMemo(() => {
    const monthlyRevenue = Array.from({ length: 12 }, (_, index) => ({
      month: index,
      revenue: 0,
    }));

    orders?.forEach((order) => {
      const date = new Date(order.createdat);
      const month = date.getMonth();

      if (isNaN(month) || month < 0 || month > 11) return;

      const total = order.total ?? 0;

      monthlyRevenue[month].revenue += total;
    });

    return monthlyRevenue;
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

  if (isLoading) {
    return (
      <div className="flex min-h-[350px] items-center justify-center rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Loading revenue chart...
        </span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[350px] items-center justify-center rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Redirecting...
        </span>
      </div>
    );
  }

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Revenue",
        data: revenueData.map((item) => item.revenue),
        backgroundColor: "#3b82f6",
        borderRadius: 6,
        barPercentage: 0.6,
        categoryPercentage: 0.7,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1200,
      easing: "easeOutQuart",
      delay: (context: ScriptableContext<"bar">) => {
        if (context.type === "data" && context.mode === "default") {
          return context.dataIndex * 100;
        }
        return 0;
      },
    },
    plugins: {
      legend: { display: false },
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
        grid: { display: false },
        ticks: { color: "#9CA3AF" },
      },
      y: {
        beginAtZero: true,
        grid: { color: "#374151" },
        ticks: {
          color: "#9CA3AF",
          callback: (value: string | number) =>
            `$${Number(value).toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div
      ref={chartContainerRef}
      className="max-w-full min-w-0 p-5 overflow-hidden bg-white border border-gray-200 rounded-xl dark:border-gray-800 dark:bg-gray-900"
      style={{ opacity: 0 }}
    >
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Order Revenue
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Monthly revenue generated from orders.
        </p>
      </div>

      <div className="relative h-[320px] w-full overflow-hidden">
        {shouldAnimate ? <Bar data={data} options={options} /> : null}
      </div>
    </div>
  );
}
