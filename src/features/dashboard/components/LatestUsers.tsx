"use client";

import Image from "next/image";
import Link from "next/link";

import Loading from "@/shared/components/errors/LoadingState";
import { useErrorHandler } from "@/shared/hooks";
import { useLatestUsers } from "../hooks";

export default function LatestUsers() {
  const { data: users, isLoading, isError, error } = useLatestUsers();

  useErrorHandler(isError, error);

  if (isLoading || !users) {
    return <Loading />;
  }

  const latestUsers = [...users]
    .sort(
      (a, b) =>
        new Date(b.createdat).getTime() - new Date(a.createdat).getTime(),
    )
    .slice(0, 6);

  return (
    <div className="p-5 bg-white border border-gray-200 rounded-2xl dark:border-gray-800 dark:bg-white/3 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Latest Users
          </h3>

          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Recently joined users
          </p>
        </div>

        <Link
          href="/users"
          className="text-sm font-medium text-brand-500 hover:text-brand-600"
        >
          View all
        </Link>
      </div>

      {/* Users */}
      <div className="space-y-4">
        {latestUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-3 border border-gray-100 rounded-xl dark:border-gray-800"
          >
            <div className="flex items-center min-w-0 gap-3">
              <Image
                src={user.avatar}
                alt={`${user.firstname} ${user.lastname}`}
                width={48}
                height={48}
                className="object-cover w-12 h-12 rounded-full"
              />

              <div className="min-w-0">
                <h4 className="font-medium text-gray-800 truncate dark:text-white">
                  {user.firstname} {user.lastname}
                </h4>

                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                {user.role}
              </span>

              <div className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    user.status === "online" ? "bg-green-500" : "bg-gray-400"
                  }`}
                />

                <span className="text-xs text-gray-500 capitalize dark:text-gray-400">
                  {user.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
