"use client";

import { useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
  type ChartOptions,
  type TooltipItem,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { useSales } from "../hooks/useSales";
import { useErrorHandler } from "@/shared/hooks";

gsap.registerPlugin(ScrollTrigger);

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SalesPaymentChart() {
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

  const paymentStats = useMemo(() => {
    return {
      Paid: orders.filter((order) => order.paymentstatus === "Paid").length,
      Pending: orders.filter((order) => order.paymentstatus === "Pending")
        .length,
      Failed: orders.filter((order) => order.paymentstatus === "Failed").length,
    };
  }, [orders]);

  if (isLoading || isError) {
    return (
      <div className="w-full min-w-0 p-5 bg-white border border-gray-200 rounded-xl dark:border-gray-800 dark:bg-gray-900">
        <div className="h-6 bg-gray-200 rounded w-44 animate-pulse dark:bg-gray-800" />
        <div className="mx-auto mt-6 h-[280px] w-[280px] animate-pulse rounded-full bg-gray-100 dark:bg-gray-800/50" />
      </div>
    );
  }

  const data = {
    labels: ["Paid", "Pending", "Failed"],
    datasets: [
      {
        data: [paymentStats.Paid, paymentStats.Pending, paymentStats.Failed],
        backgroundColor: ["#22c55e", "#f59e0b", "#ef4444"],
        borderWidth: 0,
        hoverOffset: 6,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "68%",
    animation: {
      duration: 1800,
      easing: "easeInOutQuart",
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#9CA3AF",
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"doughnut">) => {
            const value = context.parsed;
            const total =
              paymentStats.Paid + paymentStats.Pending + paymentStats.Failed;
            const percentage =
              total > 0 ? ((value / total) * 100).toFixed(1) : "0";
            return ` ${value} orders (${percentage}%)`;
          },
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
        Payment Status
      </h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Distribution of order payment statuses.
      </p>

      <div className="relative mx-auto mt-6 h-[300px] w-full max-w-[360px] overflow-hidden">
        {shouldAnimate ? <Doughnut data={data} options={options} /> : null}
      </div>
    </div>
  );
}
