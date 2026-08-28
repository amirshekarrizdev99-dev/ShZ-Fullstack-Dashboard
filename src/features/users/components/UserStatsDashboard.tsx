"use client";

import { useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaUsers, FaUserCheck, FaUserPlus, FaUserTimes } from "react-icons/fa";

import StatCard from "./StatCard";
import { useUsers } from "../hooks/useUsers";
import { useErrorHandler } from "@/shared/hooks";

const UserGrowthChart = dynamic(() => import("./UserGrowthChart"), {
  loading: () => (
    <div className="h-[350px] animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
  ),
  ssr: false,
});

const UsersByCountryChart = dynamic(() => import("./UserCountryChart"), {
  loading: () => (
    <div className="h-[350px] animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
  ),
  ssr: false,
});

const UserActivityChart = dynamic(() => import("./UserActivityChart"), {
  loading: () => (
    <div className="h-[350px] animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
  ),
  ssr: false,
});

export default function UserStatsDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    data: users = [],
    isLoading,
    isError,
    error: usersErrorData,
  } = useUsers();

  useErrorHandler(isError, usersErrorData);

  useGSAP(
    () => {
      if (isLoading || isError) return;

      gsap.from(".stat-card-wrapper", {
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
      });
    },
    {
      scope: containerRef,
      dependencies: [isLoading, isError],
    },
  );

  const stats = useMemo(() => {
    const now = new Date();

    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(now.getDate() - 30);

    const totalUsers = users.length;

    const onlineUsers = users.filter((user) => user.status === "online").length;

    const newUsers = users.filter((user) => {
      const createdAt = new Date(user.createdat);

      return createdAt >= thirtyDaysAgo;
    }).length;

    const inactiveUsers = users.filter(
      (user) => user.status === "offline",
    ).length;

    return {
      totalUsers,
      onlineUsers,
      newUsers,
      inactiveUsers,
    };
  }, [users]);

  if (isLoading || isError) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-[140px] animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800"
            />
          ))}
        </div>

        <div className="h-[420px] animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />

        <div className="h-[350px] animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="min-w-0 stat-card-wrapper">
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={FaUsers}
            color="bg-indigo-500"
          />
        </div>

        <div className="min-w-0 stat-card-wrapper">
          <StatCard
            title="Online Users"
            value={stats.onlineUsers}
            icon={FaUserCheck}
            color="bg-green-500"
          />
        </div>

        <div className="min-w-0 stat-card-wrapper">
          <StatCard
            title="New Users"
            value={stats.newUsers}
            icon={FaUserPlus}
            color="bg-blue-500"
          />
        </div>

        <div className="min-w-0 stat-card-wrapper">
          <StatCard
            title="Inactive Users"
            value={stats.inactiveUsers}
            icon={FaUserTimes}
            color="bg-red-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <UserGrowthChart />

        <UsersByCountryChart />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <UserActivityChart />
      </div>
    </div>
  );
}
