import type { Metadata } from "next";

import { DashboardClient } from "@/features/dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default function Dashboard() {
  return <DashboardClient />;
}
