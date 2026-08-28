"use client";

interface DataTablePaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export function DataTablePagination({
  page,
  pageCount,
  onPageChange,
}: DataTablePaginationProps) {
  if (pageCount <= 1) {
    return null;
  }

  const currentPage = page + 1;

  const getPages = (): (number | "...")[] => {
    if (pageCount <= 7) {
      return Array.from({ length: pageCount }, (_, index) => index + 1);
    }

    const pages: (number | "...")[] = [];

    pages.push(1);

    if (currentPage > 4) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(pageCount - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < pageCount - 3) {
      pages.push("...");
    }

    pages.push(pageCount);

    return pages;
  };

  return (
    <div className="flex items-center justify-between gap-4 px-4 py-4 border-t border-gray-200 dark:border-gray-800">
      <button
        type="button"
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
        className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3.5 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Previous
      </button>

      <div className="hidden items-center gap-1.5 sm:flex">
        {getPages().map((item, index) => {
          if (item === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-1 text-sm font-medium text-gray-400 dark:text-gray-500"
              >
                ...
              </span>
            );
          }

          const isActive = item === currentPage;

          return (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item - 1)}
              className={`flex h-9 min-w-[2.25rem] items-center justify-center rounded-lg px-2 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[#465FFF] text-white shadow-theme-xs dark:bg-[#465FFF] dark:text-white"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        disabled={page === pageCount - 1}
        onClick={() => onPageChange(page + 1)}
        className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3.5 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
      >
        Next
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
