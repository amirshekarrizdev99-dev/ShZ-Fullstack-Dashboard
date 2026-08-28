"use client";

import React from "react";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
      ? "lg:ml-[290px]"
      : "lg:ml-[90px]";

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <AppSidebar />

      <Backdrop />

      <div
        className={`
          min-w-0
          overflow-x-hidden
          transition-all
          duration-300
          ease-in-out
          ${mainContentMargin}
        `}
      >
        <AppHeader />

        <main className="w-full min-w-0 p-4 overflow-x-hidden sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
