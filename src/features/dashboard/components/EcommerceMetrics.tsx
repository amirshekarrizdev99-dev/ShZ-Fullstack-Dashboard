"use client";

import { motion, type Variants } from "framer-motion";

import { Badge } from "../../../components/ui/shadcn/badge";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from "@/icons";
import type { DashboardStats } from "../types";

interface Props {
  stats: DashboardStats;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function EcommerceMetrics({ stats }: Props) {
  const metrics = [
    {
      title: "Customers",
      value: stats.customers,
      growth: stats.customergrowth,
      icon: GroupIcon,
    },
    {
      title: "Orders",
      value: stats.orders,
      growth: stats.ordergrowth,
      icon: BoxIconLine,
    },
  ];

  return (
    <motion.div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {metrics.map((metric) => {
        const Icon = metric.icon;
        const isPositive = metric.growth >= 0;

        return (
          <motion.div
            key={metric.title}
            variants={itemVariants}
            className="p-5 bg-white border border-gray-200 rounded-2xl dark:border-gray-800 dark:bg-white/3 md:p-6"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              <span className="text-gray-800 dark:text-white/90">
                <Icon />
              </span>
            </div>

            <div className="flex items-end justify-between mt-5">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {metric.title}
                </span>

                <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                  {metric.value.toLocaleString()}
                </h4>
              </div>

              <Badge
                className={
                  isPositive
                    ? "text-green-700 bg-green-50 dark:bg-green-950 dark:text-green-300"
                    : "text-red-700 bg-red-50 dark:bg-red-950 dark:text-red-300"
                }
              >
                {isPositive ? <ArrowUpIcon /> : <ArrowDownIcon />}
                {Math.abs(metric.growth).toFixed(2)}%
              </Badge>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}