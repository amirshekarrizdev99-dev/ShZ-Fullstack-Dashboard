import type { User } from "@/features/users";
import type { Order } from "@/features/orders";
import type { Product } from "@/features/products";
import type { Notification } from "@/features/notifications";

interface DashboardInput {
  users: User[];
  orders: Order[];
  products: Product[];
  notifications: Notification[];
}

export function calculateDashboardStats({
  users,
  orders,
  products,
  notifications,
}: DashboardInput) {
  const totalRevenue = orders
    .filter((order) => order.status === "Delivered")
    .reduce((sum, order) => sum + order.total, 0);

  return {
    totalRevenue,

    totalUsers: users.length,

    totalOrders: orders.length,

    totalProducts: products.length,

    unreadNotifications: notifications.filter(
      (notification) => !notification.isRead,
    ).length,
  };
}