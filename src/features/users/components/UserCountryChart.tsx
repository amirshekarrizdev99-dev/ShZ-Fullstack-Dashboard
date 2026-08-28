"use client";

import { useMemo, useRef, useState } from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
  type ChartOptions,
  type ScriptableContext,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useUsers } from "@/features/users/hooks/useUsers";
import { useErrorHandler } from "@/shared/hooks";

gsap.registerPlugin(ScrollTrigger);

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const countryFlags: Record<string, string> = {
  "United States": "🇺🇸",
  Germany: "🇩🇪",
  India: "🇮🇳",
  Brazil: "🇧🇷",
  France: "🇫🇷",
  Canada: "🇨🇦",
  Japan: "🇯🇵",
  "United Kingdom": "🇬🇧",
  Australia: "🇦🇺",
  Italy: "🇮🇹",
  Spain: "🇪🇸",
};

function getCountryFlag(country: string) {
  return countryFlags[country] ?? "🌍";
}

export default function UserCountryChart() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [shouldAnimate, setShouldAnimate] = useState(false);

  const {
    data: users = [],
    isLoading,
    isError,
    error: usersErrorData,
  } = useUsers();

  useErrorHandler(isError, usersErrorData);
  const countryData = useMemo(() => {
    const countryCounts = new Map<string, number>();

    users.forEach((user) => {
      const country = user.country?.trim();

      if (!country) return;

      countryCounts.set(country, (countryCounts.get(country) ?? 0) + 1);
    });

    return Array.from(countryCounts.entries())
      .map(([country, users]) => ({
        country,
        flag: getCountryFlag(country),
        users,
      }))
      .sort((a, b) => b.users - a.users)
      .slice(0, 7);
  }, [users]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.set(containerRef.current, {
        y: 60,
        opacity: 0,
      });

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 85%",

        onEnter: () => {
          gsap.to(containerRef.current, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          });

          const flags = gsap.utils.toArray<HTMLElement>(".country-flag");
          flags.forEach((flag, i) => {
            gsap.set(flag, {
              scale: 0,
              opacity: 0,
              transformOrigin: "50% 50%",
            });

            gsap.to(flag, {
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
              delay: 0.3 + i * 0.15,
            });

            gsap.to(flag, {
              rotation: i % 2 === 0 ? 360 : -360,
              duration: 8 + i * 2,
              ease: "none",
              repeat: -1,
              force3D: true,
              delay: 0.5,
            });
          });

          setShouldAnimate(true);
        },
      });

      return () => {
        st.kill();
        gsap.killTweensOf(".country-flag");
      };
    },
    {
      scope: containerRef,
    },
  );

  const chartData = {
    labels: countryData.map((item) => item.country),

    datasets: [
      {
        label: "Users",

        data: countryData.map((item) => item.users),

        backgroundColor: (context: ScriptableContext<"bar">) => {
          const ctx = context.chart.ctx;

          const gradient = ctx.createLinearGradient(0, 0, 300, 0);

          gradient.addColorStop(0, "rgba(56, 189, 248, 0.15)");

          gradient.addColorStop(1, "rgba(59, 130, 246, 0.7)");

          return gradient;
        },

        borderColor: "rgba(56, 189, 248, 0.5)",
        borderWidth: 1,
        borderRadius: 6,

        barThickness: 20,

        hoverBackgroundColor: "rgba(59, 130, 246, 0.9)",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,

    maintainAspectRatio: false,

    indexAxis: "y",

    animation: {
      duration: 1500,
      easing: "easeOutQuart",

      delay: (context: ScriptableContext<"bar">) => {
        if (context.type === "data" && context.mode === "default") {
          return context.dataIndex * 150 + 500;
        }

        return 0;
      },
    },

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      x: {
        beginAtZero: true,

        grid: {
          color: "#374151",
        },

        ticks: {
          color: "#9CA3AF",
          precision: 0,
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

  if (isLoading || isError) {
    return (
      <div className="w-full min-w-0 p-5 bg-white border border-gray-200 rounded-xl dark:border-gray-800 dark:bg-gray-900">
        <div className="w-48 h-6 bg-gray-200 rounded animate-pulse dark:bg-gray-800" />

        <div className="h-4 max-w-full mt-2 bg-gray-200 rounded w-72 animate-pulse dark:bg-gray-800" />

        <div className="grid grid-cols-3 gap-2 mt-8 sm:gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex flex-col items-center">
              <div className="bg-gray-200 rounded-full h-14 w-14 animate-pulse dark:bg-gray-800" />

              <div className="w-16 h-4 mt-3 bg-gray-200 rounded animate-pulse dark:bg-gray-800" />

              <div className="w-20 h-3 mt-2 bg-gray-200 rounded animate-pulse dark:bg-gray-800" />
            </div>
          ))}
        </div>

        <div className="mt-8 h-[300px] animate-pulse rounded bg-gray-100 dark:bg-gray-800/50" />
      </div>
    );
  }

  if (countryData.length === 0) {
    return (
      <div className="w-full min-w-0 p-5 bg-white border border-gray-200 rounded-xl dark:border-gray-800 dark:bg-gray-900">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Users by Country
        </h3>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          No country data available.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full min-w-0 p-5 bg-white border border-gray-200 rounded-xl dark:border-gray-800 dark:bg-gray-900"
      style={{ opacity: 0 }}
    >
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Users by Country
        </h3>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Geographical distribution of users.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-8 sm:gap-6">
        {countryData.slice(0, 3).map((item) => (
          <div
            key={item.country}
            className="flex flex-col items-center min-w-0 text-center"
          >
            <div className="flex items-center justify-center w-16 h-16 shrink-0">
              <span className="inline-block text-5xl select-none country-flag will-change-transform">
                {item.flag}
              </span>
            </div>

            <div className="flex items-start justify-center w-full h-10 min-w-0 mt-2">
              <p
                className="text-xs font-medium leading-5 text-gray-800 line-clamp-2 dark:text-white sm:text-sm"
                title={item.country}
              >
                {item.country}
              </p>
            </div>

            <p className="mt-1 text-xs text-gray-500 whitespace-nowrap dark:text-gray-400">
              {item.users.toLocaleString()} users
            </p>
          </div>
        ))}
      </div>

      <div className="relative mt-8 h-[300px] w-full min-w-0 overflow-hidden">
        {shouldAnimate && <Bar data={chartData} options={options} />}
      </div>
    </div>
  );
}
