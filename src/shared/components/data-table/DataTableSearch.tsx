"use client";

interface DataTableSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function DataTableSearch({
  value,
  onChange,
  placeholder = "Search...",
}: DataTableSearchProps) {
  return (
    <div className="p-4">
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full max-w-sm rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500"
      />
    </div>
  );
}
