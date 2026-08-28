import { Metadata } from "next";

import PageBreadcrumb from "@/shared/components/ui/common/PageBreadCrumb";
import Calendar from "./components/Calendar";


export const metadata: Metadata = {
  title: "Calendar",
  description:
    "Calendar",
  // other metadata
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Calendar" />
      <Calendar />
    </div>
  );
}
