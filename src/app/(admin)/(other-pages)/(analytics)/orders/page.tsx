import { Metadata } from "next";

import { OrdersPageClient } from "@/features/orders";

export const metadata: Metadata = {
  title: "Orders",
  description: "Orders",

};

export default function OrdersPage() {
  return <OrdersPageClient />;
}