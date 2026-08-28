"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from "chart.js";

import { CalenderIcon } from "@/icons";
import ChartTab from "@/shared/components/ui/common/ChartTab";
import Loading from "@/shared/components/errors/LoadingState";
import { useDashboardRevenue, useDashboardSales } from "../hooks";


gsap.registerPlugin( ScrollTrigger);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const DynamicLineChart = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Line),
  { ssr: false },
);

function useIsDarkMode() {
  return useSyncExternalStore(
    (callback) => {
      const observer = new MutationObserver(callback);

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });

      return () => observer.disconnect();
    },
    () => document.documentElement.classList.contains("dark"),
    () => false,
  );
}

export default function StatisticsChart() {
  const datePickerRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isDark = useIsDarkMode();

  const { data: sales = [], isLoading: salesLoading } = useDashboardSales();

  const { data: revenue = [], isLoading: revenueLoading } =
    useDashboardRevenue();


  useGSAP(
    () => {
      if (salesLoading || revenueLoading || !containerRef.current) return;

      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          y: 40,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    {
      dependencies: [salesLoading, revenueLoading],
      scope: containerRef,
    },
  );

  useEffect(() => {
    if (!datePickerRef.current) return;

    const today = new Date();
    const sevenDaysAgo = new Date();

    sevenDaysAgo.setDate(today.getDate() - 6);

    const fp = flatpickr(datePickerRef.current, {
      mode: "range",
      static: true,
      monthSelectorType: "static",
      dateFormat: "M d",
      defaultDate: [sevenDaysAgo, today],
      clickOpens: true,
      prevArrow:
        '<svg class="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12.5 15L7.5 10L12.5 5" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      nextArrow:
        '<svg class="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.5 15L12.5 10L7.5 5" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    });

    return () => {
      if (!Array.isArray(fp)) {
        fp.destroy();
      }
    };
  }, []);

  if (salesLoading || revenueLoading) {
    return <Loading />;
  }

  const labels = sales.map((item) => item.month);

  const data: ChartData<"line"> = {
    labels,
    datasets: [
      {
        label: "Sales",
        data: sales.map((item) => item.sales),
        borderColor: "#465FFF",
        borderWidth: 2,
        tension: 0,
        fill: true,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) return undefined;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom,
          );

          gradient.addColorStop(0, "rgba(70,95,255,.55)");
          gradient.addColorStop(1, "rgba(70,95,255,0)");

          return gradient;
        },
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#465FFF",
        pointHoverBorderWidth: 2,
      },
      {
        label: "Revenue",
        data: revenue.map((item) => item.value),
        borderColor: "#9CB9FF",
        borderWidth: 2,
        tension: 0,
        fill: true,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) return undefined;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom,
          );

          gradient.addColorStop(0, "rgba(156,185,255,.55)");
          gradient.addColorStop(1, "rgba(156,185,255,0)");

          return gradient;
        },
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#9CB9FF",
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index",
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        usePointStyle: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: isDark ? "#9ca3af" : "#6B7280",
          font: {
            family: "Outfit, sans-serif",
          },
        },
      },
      y: {
        grid: {
          color: isDark ? "#374151" : "#f3f4f6",
        },
        border: {
          display: false,
        },
        ticks: {
          color: isDark ? "#9ca3af" : "#6B7280",
          font: {
            size: 12,
            family: "Outfit, sans-serif",
          },
        },
      },
    },
  };

  return (
    <div
      ref={containerRef}
      className="px-5 pt-5 pb-5 bg-white border border-gray-200 rounded-2xl dark:border-gray-800 dark:bg-white/3 sm:px-6 sm:pt-6"
      style={{ opacity: 0, willChange: "transform, opacity" }} 
    >
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Statistics
          </h3>

          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Target you&apos;ve set for each month
          </p>
        </div>

        <div className="flex items-center gap-3 sm:justify-end">
          <ChartTab />

          <div className="relative inline-flex items-center">
            <CalenderIcon className="absolute z-10 text-gray-500 -translate-x-1/2 -translate-y-1/2 pointer-events-none left-1/2 top-1/2 dark:text-gray-400 lg:left-3 lg:translate-x-0" />

            <input
              ref={datePickerRef}
              className="w-10 h-10 text-sm font-medium text-transparent bg-white border border-gray-200 rounded-lg outline-none cursor-pointer dark:border-gray-700 dark:bg-gray-800 lg:h-auto lg:w-40 lg:py-2 lg:pl-10 lg:pr-3 lg:text-gray-700 dark:lg:text-gray-300"
              placeholder="Select date range"
            />
          </div>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="h-77.5 min-w-150 xl:min-w-full">
          <DynamicLineChart data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
