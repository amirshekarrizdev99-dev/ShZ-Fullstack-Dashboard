"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  FaCheckCircle,
  FaClock,
  FaSyncAlt,
  FaTimesCircle,
} from "react-icons/fa";

import StatCard from "@/features/users/components/StatCard";
import OrderRevenueChart from "./OrderRevenueChart";
import OrderStatusChart from "./OrderStatusChart";
import TopCategoriesChart from "./TopCategoriesChart";
import { useOrders } from "../hooks/useOrders";
import { useErrorHandler } from "@/shared/hooks";

export default function OrdersDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    data: orders = [],
    isLoading,
    isError,
    error: ordersErrorData,
  } = useOrders();

  useErrorHandler(isError, ordersErrorData);
  useGSAP(
    () => {
      if (isLoading || isError) return;

      gsap.from(".stat-card-wrapper", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.from(".orders-section", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.4,
      });
    },
    {
      scope: containerRef,
      dependencies: [isLoading, isError],
    },
  );

  if (isLoading) {
    return (
      <div className="w-full min-w-0 space-y-6">
        <div className="grid w-full min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-32 min-w-0 bg-gray-200 animate-pulse rounded-2xl dark:bg-gray-800"
            />
          ))}
        </div>

        <div className="grid w-full min-w-0 grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="h-[420px] min-w-0 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />

          <div className="h-[420px] min-w-0 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
        </div>

        {/* Categories skeleton */}
        <div className="w-full min-w-0">
          <div className="h-[350px] min-w-0 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full min-w-0 space-y-6">
        <div className="grid w-full min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-32 min-w-0 bg-gray-200 animate-pulse rounded-2xl dark:bg-gray-800"
            />
          ))}
        </div>

        <div className="grid w-full min-w-0 grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="h-[420px] min-w-0 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
          <div className="h-[420px] min-w-0 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
        </div>

        <div className="w-full min-w-0">
          <div className="h-[350px] min-w-0 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
    );
  }

  const deliveredCount = orders.filter(
    (order) => order.status === "Delivered",
  ).length;

  const pendingCount = orders.filter(
    (order) => order.status === "Pending",
  ).length;

  const processingCount = orders.filter(
    (order) => order.status === "Processing",
  ).length;

  const cancelledCount = orders.filter(
    (order) => order.status === "Cancelled",
  ).length;

  return (
    <div ref={containerRef} className="w-full min-w-0 space-y-6">
      <div className="grid w-full min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <div className="w-full min-w-0 stat-card-wrapper">
          <StatCard
            title="Delivered"
            value={deliveredCount}
            icon={FaCheckCircle}
            color="bg-emerald-500"
          />
        </div>

        <div className="w-full min-w-0 stat-card-wrapper">
          <StatCard
            title="Pending"
            value={pendingCount}
            icon={FaClock}
            color="bg-amber-500"
          />
        </div>

        <div className="w-full min-w-0 stat-card-wrapper">
          <StatCard
            title="Processing"
            value={processingCount}
            icon={FaSyncAlt}
            color="bg-blue-500"
          />
        </div>

        <div className="w-full min-w-0 stat-card-wrapper">
          <StatCard
            title="Cancelled"
            value={cancelledCount}
            icon={FaTimesCircle}
            color="bg-red-500"
          />
        </div>
      </div>

      <div className="grid w-full min-w-0 grid-cols-1 gap-6 orders-section xl:grid-cols-2">
        <div className="w-full min-w-0">
          <OrderRevenueChart />
        </div>

        <div className="w-full min-w-0">
          <OrderStatusChart />
        </div>
      </div>

      <div className="w-full min-w-0 orders-section">
        <div className="w-full min-w-0">
          <TopCategoriesChart />
        </div>
      </div>
    </div>
  );
}
