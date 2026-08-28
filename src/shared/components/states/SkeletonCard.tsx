"use client";

import { Skeleton } from "@/components/ui/shadcn/skeleton";

export default function SkeletonCard() {
  return (
    <div className="space-y-3 rounded-xl border p-6">
      <Skeleton className="h-6 w-1/3" />

      <Skeleton className="h-10 w-2/3" />

      <Skeleton className="h-4 w-full" />
    </div>
  );
}