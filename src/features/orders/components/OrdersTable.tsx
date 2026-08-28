"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { DataTable } from "@/shared/components/data-table";
import { useOrders } from "../hooks/useOrders";
import { orderGlobalFilter } from "../hooks/useFilter";
import { orderColumns } from "../types";
import { useErrorHandler } from "@/shared/hooks";

gsap.registerPlugin(ScrollTrigger);

export function OrdersTable() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError, error: ordersErrorData } = useOrders();

  useErrorHandler(isError, ordersErrorData);

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

  if (isLoading || isError) {
    return (
      <div className="p-6 bg-white border border-gray-200 rounded-xl dark:border-gray-800 dark:bg-gray-900 animate-pulse">
        <div className="w-24 h-4 mb-4 bg-gray-200 rounded dark:bg-gray-800"></div>
        <div className="w-full h-4 mb-2 bg-gray-200 rounded dark:bg-gray-800"></div>
        <div className="w-full h-4 mb-2 bg-gray-200 rounded dark:bg-gray-800"></div>
        <div className="w-3/4 h-4 bg-gray-200 rounded dark:bg-gray-800"></div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full min-w-0 overflow-hidden"
      style={{ opacity: 0, willChange: "transform, opacity" }}
    >
      <DataTable
        columns={orderColumns}
        data={data ?? []}
        pageSize={5}
        globalFilterFn={orderGlobalFilter}
      />
    </div>
  );
}
