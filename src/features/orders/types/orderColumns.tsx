import type { ColumnDef } from "@tanstack/react-table";
import type { Order } from "./order.type";

export const orderColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
    size: 90,
  },

  {
    accessorKey: "product",
    header: "Product",
    size: 180,
  },

  {
    accessorKey: "customername",
    header: "Customer",
    size: 200,

    cell: ({ row }) => {
      const order = row.original;

      return (
        <div className="flex flex-col min-w-0">
          <span className="font-medium text-gray-800 truncate dark:text-white/90">
            {order.customername}
          </span>

          <span className="text-xs text-gray-500 truncate dark:text-gray-400">
            {order.customeremail}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "category",
    header: "Category",
    size: 130,
  },

  {
    accessorKey: "price",
    header: "Price",
    size: 120,

    cell: ({ row }) => {
      return `$${row.original.price.toLocaleString()}`;
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    size: 140,

    cell: ({ row }) => {
      const status = row.original.status;

      const statusClasses: Record<Order["status"], string> = {
        Delivered:
          "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",

        Pending:
          "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",

        Processing:
          "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",

        Cancelled:
          "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
      };

      return (
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusClasses[status]}`}
        >
          {status}
        </span>
      );
    },
  },

  {
    accessorKey: "createdat",
    header: "Date",
    size: 150,

    cell: ({ row }) => {
      return new Date(row.original.createdat).toLocaleDateString();
    },
  },
];