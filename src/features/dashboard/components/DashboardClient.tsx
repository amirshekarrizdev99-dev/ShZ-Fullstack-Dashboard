"use client";

import {
  EcommerceMetrics,
  MonthlySalesChart,
  MonthlyTarget,
  RecentOrders,
  StatisticsChart,
  useDashboardSales,
  useDashboardStats,
  useDashboardTarget,
} from "..";

import DemographicCard from "./DemographicCard";
import Loading from "@/shared/components/errors/LoadingState";
import { useErrorHandler } from "@/shared/hooks";
import LatestUsers from "./LatestUsers";
import TopProducts from "./TopProducts";

export default function DashboardClient() {
  const {
    data: stats,
    isLoading: statsLoading,
    isError: statsError,
    error: statsErrorData,
  } = useDashboardStats();

  const {
    data: sales,
    isLoading: salesLoading,
    isError: salesError,
    error: salesErrorData,
  } = useDashboardSales();

  const {
    data: target,
    isLoading: targetLoading,
    isError: targetError,
    error: targetErrorData,
  } = useDashboardTarget();

  useErrorHandler(targetError, targetErrorData);

  useErrorHandler(statsError, statsErrorData);
  useErrorHandler(salesError, salesErrorData);

  if (statsLoading || salesLoading || statsError || salesError) {
    return <Loading />;
  }

  if (!stats || !sales) {
    return <Loading />;
  }

  if (
    statsLoading ||
    salesLoading ||
    targetLoading ||
    statsError ||
    salesError ||
    targetError
  ) {
    return <Loading />;
  }

  if (!stats || !sales || !target) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <EcommerceMetrics stats={stats} />
        <MonthlySalesChart sales={sales} />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <RecentOrders />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <LatestUsers />
      </div>
      <div className="col-span-12 xl:col-span-5">
        <TopProducts />
      </div>
    </div>
  );
}
