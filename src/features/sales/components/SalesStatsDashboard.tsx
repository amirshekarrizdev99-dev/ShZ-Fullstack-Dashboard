"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaShoppingCart,
  FaDollarSign,
  FaChartLine,
  FaCheckCircle,
} from "react-icons/fa";

import StatCard from "@/features/users/components/StatCard";
import { useSales } from "../hooks/useSales";
import { useErrorHandler } from "@/shared/hooks";

gsap.registerPlugin(ScrollTrigger);

export default function SalesStatsDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { stats, isLoading, isError, error: salesErrorData } = useSales();

  useErrorHandler(isError, salesErrorData);

  useGSAP(
    () => {
      if (isLoading || isError || !containerRef.current) return;

      gsap.from(".sales-stat-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    {
      scope: containerRef,
      dependencies: [isLoading, isError],
    },
  );

  if (isLoading || isError) {
    return (
      <div className="grid w-full max-w-full min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-32 min-w-0 overflow-hidden bg-gray-100 animate-pulse rounded-xl dark:bg-gray-800"
          />
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="grid w-full max-w-full min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"
    >
      <div className="min-w-0 overflow-hidden sales-stat-card">
        <StatCard
          title="Total Revenue"
          value={Math.round(stats.totalRevenue)}
          icon={FaDollarSign}
          color="bg-emerald-500"
        />
      </div>

      <div className="min-w-0 overflow-hidden sales-stat-card">
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={FaShoppingCart}
          color="bg-blue-500"
        />
      </div>

      <div className="min-w-0 overflow-hidden sales-stat-card">
        <StatCard
          title="Average Order Value"
          value={Math.round(stats.averageOrderValue)}
          icon={FaChartLine}
          color="bg-indigo-500"
        />
      </div>

      <div className="min-w-0 overflow-hidden sales-stat-card">
        <StatCard
          title="Delivered Revenue"
          value={Math.round(stats.deliveredRevenue)}
          icon={FaCheckCircle}
          color="bg-green-500"
        />
      </div>
    </div>
  );
}
