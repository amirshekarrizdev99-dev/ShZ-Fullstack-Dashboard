"use client";

import { useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
  type ChartOptions,
  type TooltipItem,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { useSales } from "../hooks/useSales";
import { useErrorHandler } from "@/shared/hooks";

gsap.registerPlugin(ScrollTrigger);

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function SalesPaymentMethodChart() {
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

  const paymentMethods = useMemo(() => {
    const methods = {
      "Credit Card": 0,
      PayPal: 0,
      Cash: 0,
    };

    orders.forEach((order) => {
      if (order.paymentmethod in methods) {
        methods[order.paymentmethod as keyof typeof methods]++;
      }
    });

    return methods;
  }, [orders]);

  if (isLoading || isError) {
    return (
      <div className="w-full min-w-0 p-5 bg-white border border-gray-200 rounded-xl dark:border-gray-800 dark:bg-gray-900">
        <div className="w-48 h-6 bg-gray-200 rounded animate-pulse dark:bg-gray-800" />
        <div className="mt-6 h-[300px] animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800/50" />
      </div>
    );
  }

  const data = {
    labels: ["Credit Card", "PayPal", "Cash"],
    datasets: [
      {
        label: "Orders",
        data: [
          paymentMethods["Credit Card"],
          paymentMethods.PayPal,
          paymentMethods.Cash,
        ],
        backgroundColor: ["#6366f1", "#22c55e", "#f59e0b"],
        borderRadius: 6,
        barThickness: 32,
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
            return ` ${context.parsed.y ?? 0} orders`;
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
        ticks: {
          color: "#9CA3AF",
          precision: 0,
        },
        grid: {
          color: "#374151",
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
        Payment Methods
      </h3>

      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Orders grouped by payment method.
      </p>

      <div className="mt-6 h-[300px] w-full min-w-0 overflow-hidden">
        {shouldAnimate ? <Bar data={data} options={options} /> : null}
      </div>
    </div>
  );
}
