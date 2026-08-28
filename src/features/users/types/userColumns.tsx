import type { ColumnDef } from "@tanstack/react-table";
import type { User } from "./user.type";

export const userColumns: ColumnDef<User>[] = [
  {
    id: "name",
    header: "Name",
    size: 360,

    accessorFn: (row) => `${row.firstname} ${row.lastname}`,

    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex items-center min-w-0 gap-3">
          <img
            src={user.avatar}
            alt={`${user.firstname} ${user.lastname}`}
            className="object-cover w-10 h-10 rounded-full shrink-0"
          />

          <div className="min-w-0">
            <p className="font-medium text-gray-800 truncate dark:text-white">
              {user.firstname} {user.lastname}
            </p>

            <p className="text-xs text-gray-500 truncate dark:text-gray-400">
              {user.email}
            </p>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "country",
    header: "Country",
    size: 220,
    cell: ({ row }) => (
      <span className="whitespace-nowrap">{row.original.country}</span>
    ),
  },

  {
    accessorKey: "status",
    header: "Status",
    size: 160,
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <span
          className={
            status === "online"
              ? "whitespace-nowrap text-green-600 dark:text-green-400"
              : "whitespace-nowrap text-gray-500 dark:text-gray-400"
          }
        >
          {status === "online" ? "🟢 Online" : "⚫ Offline"}
        </span>
      );
    },
  },
];
