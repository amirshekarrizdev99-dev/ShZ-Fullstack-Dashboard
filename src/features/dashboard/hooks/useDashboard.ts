import { useQuery } from "@tanstack/react-query";

import { dashboardService } from "../api";
import { queryKeys } from "@/shared/lib/queryKeys";

export const useDashboardStats = () =>
  useQuery({
    queryKey: queryKeys.dashboard.stats,
    queryFn: dashboardService.getStats,
  });

export const useDashboardSales = () =>
  useQuery({
    queryKey: queryKeys.dashboard.sales,
    queryFn: dashboardService.getSales,
  });

export const useDashboardRevenue = () =>
  useQuery({
    queryKey: queryKeys.dashboard.revenue,
    queryFn: dashboardService.getRevenue,
  });

export const useDashboardTarget = () =>
  useQuery({
    queryKey: queryKeys.dashboard.target,
    queryFn: dashboardService.getTarget,
  });

export const useDashboardVisitors = () =>
  useQuery({
    queryKey: queryKeys.dashboard.visitors,
    queryFn: dashboardService.getVisitors,
  });

export const useDashboardDemographics = () =>
  useQuery({
    queryKey: queryKeys.dashboard.demographics,
    queryFn: dashboardService.getDemographics,
  });

export const useRecentOrders = () =>
  useQuery({
    queryKey: queryKeys.dashboard.recentOrders,
    queryFn: dashboardService.getRecentOrders,
  });

export const useLatestUsers = () =>
  useQuery({
    queryKey: queryKeys.dashboard.latestUsers,
    queryFn: dashboardService.getLatestUsers,
  });

export const useTopProducts = () =>
  useQuery({
    queryKey: queryKeys.dashboard.topProducts,
    queryFn: dashboardService.getTopProducts,
  });