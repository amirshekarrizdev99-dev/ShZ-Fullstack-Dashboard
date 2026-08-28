"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/shadcn/table";
import { Badge } from "../../../components/ui/shadcn/badge";
import Loading from "@/shared/components/errors/LoadingState";
import { useErrorHandler } from "@/shared/hooks";
import { useRecentOrders } from "../hooks";


gsap.registerPlugin(ScrollTrigger);

function getStatusColor(status: string) {
  switch (status) {
    case "Delivered":
      return "bg-green-50 text-green-700 border-transparent dark:bg-green-950 dark:text-green-300";

    case "Pending":
      return "bg-amber-100 text-amber-700 border-transparent dark:bg-amber-700/20 dark:text-amber-300";

    case "Canceled":
    case "Cancelled":
      return "bg-red-50 text-red-700 border-transparent dark:bg-red-950 dark:text-red-300";

    default:
      return "border-transparent";
  }
}

export default function RecentOrders() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: orders = [], isLoading, isError, error } = useRecentOrders();


  useErrorHandler(isError, error);


  useGSAP(
    () => {
      if (isLoading || isError || !containerRef.current) return;

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
      dependencies: [isLoading, isError],
      scope: containerRef,
    },
  );


  if (isLoading || isError) {
    return <Loading />;
  }

  return (
    <div
      ref={containerRef}
      className="px-4 pt-4 pb-3 overflow-hidden bg-white border border-gray-200 rounded-2xl dark:border-gray-800 dark:bg-white/3 sm:px-6"
      style={{ opacity: 0, willChange: "transform, opacity" }} 
    >
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Recent Orders
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/orders">
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200">
              See all
            </button>
          </Link>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Products
              </TableCell>

              <TableCell className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Price
              </TableCell>

              <TableCell className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Category
              </TableCell>

              <TableCell className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12.5 w-12.5 overflow-hidden rounded-md">
                      <Image
                        width={50}
                        height={50}
                        src={order.image}
                        alt={order.product}
                        className="h-12.5 w-12.5 object-cover"
                      />
                    </div>

                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {order.product}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  ${order.price.toLocaleString()}
                </TableCell>

                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {order.category}
                </TableCell>

                <TableCell className="py-3">
                  <Badge
                    variant="outline"
                    className={`px-2.5 py-1 text-xs font-medium ${getStatusColor(order.status)}`}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
