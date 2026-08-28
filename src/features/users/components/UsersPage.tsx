"use client";

import UsersTable from "./UsersTable";
import UserStatsDashboard from "./UserStatsDashboard";

export default function UsersPage() {
  return (
    <div>
      <div className="mb-4.5 ml-1.5">
        <h1 className="text-2xl font-bold">Users</h1>

        <p className="text-gray-500">Manage all users</p>
      </div>

      <span className="space-y-6">
        <UserStatsDashboard />
        <UsersTable />
      </span>
    </div>
  );
}
