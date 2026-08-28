/* eslint-disable @typescript-eslint/no-explicit-any */
import { calculateDashboardStats } from "@/features/dashboard/utils/dashboardAnalytics";
import { describe, expect, it } from "vitest";

describe("calculateDashboardStats", () => {
  it("should calculate dashboard statistics correctly", () => {
    const users = [
      { id: "user-1" },
      { id: "user-2" },
      { id: "user-3" },
    ] as any;

    const orders = [
      {
        id: "order-1",
        status: "Delivered",
        total: 100,
      },
      {
        id: "order-2",
        status: "Delivered",
        total: 250,
      },
      {
        id: "order-3",
        status: "Pending",
        total: 500,
      },
      {
        id: "order-4",
        status: "Cancelled",
        total: 300,
      },
    ] as any;

    const products = [
      { id: "product-1" },
      { id: "product-2" },
    ] as any;

    const notifications = [
      {
        id: "notification-1",
        isRead: false,
      },
      {
        id: "notification-2",
        isRead: true,
      },
      {
        id: "notification-3",
        isRead: false,
      },
    ] as any;

    const result = calculateDashboardStats({
      users,
      orders,
      products,
      notifications,
    });

    expect(result).toEqual({
      totalRevenue: 350,
      totalUsers: 3,
      totalOrders: 4,
      totalProducts: 2,
      unreadNotifications: 2,
    });
  });

  it("should only include delivered orders in total revenue", () => {
    const orders = [
      {
        id: "order-1",
        status: "Delivered",
        total: 100,
      },
      {
        id: "order-2",
        status: "Pending",
        total: 200,
      },
      {
        id: "order-3",
        status: "Processing",
        total: 300,
      },
      {
        id: "order-4",
        status: "Cancelled",
        total: 400,
      },
    ] as any;

    const result = calculateDashboardStats({
      users: [],
      orders,
      products: [],
      notifications: [],
    });

    expect(result.totalRevenue).toBe(100);
  });

  it("should count unread notifications correctly", () => {
    const notifications = [
      {
        id: "notification-1",
        isRead: false,
      },
      {
        id: "notification-2",
        isRead: true,
      },
      {
        id: "notification-3",
        isRead: false,
      },
      {
        id: "notification-4",
        isRead: false,
      },
    ] as any;

    const result = calculateDashboardStats({
      users: [],
      orders: [],
      products: [],
      notifications,
    });

    expect(result.unreadNotifications).toBe(3);
  });

  it("should return zero values for empty arrays", () => {
    const result = calculateDashboardStats({
      users: [],
      orders: [],
      products: [],
      notifications: [],
    });

    expect(result).toEqual({
      totalRevenue: 0,
      totalUsers: 0,
      totalOrders: 0,
      totalProducts: 0,
      unreadNotifications: 0,
    });
  });

  it("should count all orders regardless of their status", () => {
    const orders = [
      {
        id: "order-1",
        status: "Delivered",
        total: 100,
      },
      {
        id: "order-2",
        status: "Pending",
        total: 200,
      },
      {
        id: "order-3",
        status: "Cancelled",
        total: 300,
      },
    ] as any;

    const result = calculateDashboardStats({
      users: [],
      orders,
      products: [],
      notifications: [],
    });

    expect(result.totalOrders).toBe(3);
    expect(result.totalRevenue).toBe(100);
  });
});