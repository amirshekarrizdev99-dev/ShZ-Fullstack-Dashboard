import { Metadata } from "next";

import { SalesPage } from "@/features/sales";

export const metadata: Metadata = {
  title: "Sales",
  description: "Sales ",
};

function sales() {
  return <SalesPage />;
}

export default sales;
