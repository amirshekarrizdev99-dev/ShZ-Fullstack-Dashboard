"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type FilterFn,
  type SortingState,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

import { DataTablePagination } from "./DataTablePagination";
import { DataTableSearch } from "./DataTableSearch";

interface DataTableProps<TData extends object> {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  pageSize?: number;
  globalFilterFn?: FilterFn<TData>;
}

export function DataTable<TData extends object>({
  columns,
  data,
  pageSize = 5,
  globalFilterFn,
}: DataTableProps<TData>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const handleGlobalFilterChange = (value: string) => {
    setGlobalFilter(value);
  };

  const table = useReactTable({
    data,
    columns,

    state: {
      globalFilter,
      sorting,
    },

    onGlobalFilterChange: handleGlobalFilterChange,

    onSortingChange: setSorting,

    globalFilterFn,

    getCoreRowModel: getCoreRowModel(),

    getFilteredRowModel: getFilteredRowModel(),

    getSortedRowModel: getSortedRowModel(),

    getPaginationRowModel: getPaginationRowModel(),

    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  useEffect(() => {
    table.setPageIndex(0);
  }, [globalFilter]);

  const pagination = table.getState().pagination;

  return (
    <div className="overflow-hidden bg-white border border-gray-200 rounded-xl dark:border-gray-800 dark:bg-gray-900">
      <DataTableSearch
        value={globalFilter}
        onChange={handleGlobalFilterChange}
        placeholder="Search..."
      />

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-225">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{
                      width: header.getSize(),
                    }}
                    className="px-4 py-3 text-sm font-semibold text-left text-gray-700 dark:text-gray-300"
                  >
                    {header.isPlaceholder ? null : (
                      <button
                        type="button"
                        onClick={header.column.getToggleSortingHandler()}
                        className="flex items-center gap-2"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}

                        {{
                          asc: "↑",
                          desc: "↓",
                        }[header.column.getIsSorted() as string] ?? "↕"}
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="transition-colors hover:bg-gray-50 dark:hover:bg-white/4"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{
                      width: cell.column.getSize(),
                    }}
                    className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}

            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-5 py-10 text-sm text-center text-gray-500 dark:text-gray-400"
                >
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <DataTablePagination
        page={pagination.pageIndex}
        pageCount={table.getPageCount()}
        onPageChange={(page) => table.setPageIndex(page)}
      />
    </div>
  );
}
