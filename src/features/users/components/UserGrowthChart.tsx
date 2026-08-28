"use client";

import { useMemo, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ScriptableContext,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { useUsers } from "../hooks/useUsers";
import { useErrorHandler } from "@/shared/hooks";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

export default function UserGrowthChart() {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    data: users = [],
    isLoading,
    isError,
    error: usersErrorData,
  } = useUsers();

  useErrorHandler(isError, usersErrorData);
  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.from(containerRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });
    },
    {
      scope: containerRef,
      dependencies: [isLoading],
    },
  );

  const growthData = useMemo(() => {
    const now = new Date();

    const months = Array.from({ length: 6 }, (_, index) => {
      const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);

      return {
        date,
        month: date.toLocaleString("en-US", {
          month: "long",
        }),
        count: 0,
      };
    });

    users.forEach((user) => {
      const createdAt = new Date(user.createdat);

      const monthIndex = months.findIndex(
        (item) =>
          createdAt.getFullYear() === item.date.getFullYear() &&
          createdAt.getMonth() === item.date.getMonth(),
      );

      if (monthIndex !== -1) {
        months[monthIndex].count += 1;
      }
    });

    return months;
  }, [users]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#9CA3AF",
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
          precision: 0,
        },
      },
    },
  };

  const data = {
    labels: growthData.map((item) => item.month),

    datasets: [
      {
        label: "New Users",

        data: growthData.map((item) => item.count),

        borderColor: "#4F46E5",

        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;

          const gradient = ctx.createLinearGradient(0, 0, 0, 300);

          gradient.addColorStop(0, "rgba(79, 70, 229, 0.5)");

          gradient.addColorStop(1, "rgba(79, 70, 229, 0)");

          return gradient;
        },

        fill: true,

        tension: 0.4,
      },
    ],
  };

  if (isLoading || isError) {
    return (
      <div className="flex h-[350px] items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800 animate-pulse">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Loading user growth...
        </span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="p-6 bg-white border border-gray-200 shadow-sm rounded-2xl dark:border-gray-700 dark:bg-transparent"
    >
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
        User Growth (Last 6 Months)
      </h3>

      <div className="w-full h-72">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}
