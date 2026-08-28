"use client";

import { useMemo, useRef, useState } from "react";
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
  type ScriptableContext,
  type ChartOptions,
  type TooltipItem,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { useUsers } from "../hooks/useUsers";
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

const WEEK_DAYS = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
] as const;

export default function UserActivityChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const {
    data: users = [],
    isLoading,
    isError,
    error: usersErrorData,
  } = useUsers();

  useErrorHandler(isError, usersErrorData);

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

  const activityData = useMemo(() => {
    const counts: Record<(typeof WEEK_DAYS)[number], number> = {
      Saturday: 0,
      Sunday: 0,
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
    };

    users.forEach((user) => {
      if (!user.createdat) return;

      const date = new Date(user.createdat);

      if (Number.isNaN(date.getTime())) return;

      const day = date.getDay();

      const dayName = WEEK_DAYS[day === 0 ? 1 : day + 1];

      if (dayName) {
        counts[dayName]++;
      }
    });

    return WEEK_DAYS.map((day) => counts[day]);
  }, [users]);

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
            return `${context.parsed.y ?? 0} new users`;
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
          precision: 0,
        },
      },
    },
  };

  const data = {
    labels: [...WEEK_DAYS],
    datasets: [
      {
        label: "New Users",
        data: activityData,
        backgroundColor: (context: ScriptableContext<"bar">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(34, 211, 238, 0.8)");
          gradient.addColorStop(1, "rgba(34, 211, 238, 0.1)");
          return gradient;
        },
        hoverBackgroundColor: "rgba(34, 211, 238, 1)",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "rgba(34, 211, 238, 0.3)",
      },
    ],
  };

  if (isLoading || isError) {
    return (
      <div className="p-5 bg-white border border-gray-200 rounded-xl dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-5">
          <div className="h-6 bg-gray-200 rounded w-52 animate-pulse dark:bg-gray-800" />
          <div className="h-4 mt-2 bg-gray-200 rounded w-72 animate-pulse dark:bg-gray-800" />
        </div>
        <div className="h-[320px] animate-pulse rounded bg-gray-100 dark:bg-gray-800/50" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="p-5 bg-white border border-gray-200 rounded-xl dark:border-gray-800 dark:bg-gray-900"
      style={{ opacity: 0, willChange: "transform, opacity" }}
    >
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Weekly Users Activity
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          New users registered by day of the week.
        </p>
      </div>

      <div className="relative h-[320px] w-full overflow-hidden">
        {shouldAnimate ? <Bar data={data} options={options} /> : null}
      </div>
    </div>
  );
}
