"use client";

import { Button } from "@/components/ui/shadcn/button";

interface Props {
  message?: string;
  onRetry?: () => void;
  title?: string;
  description?: string;
}

export default function ErrorState({
  message = "Something went wrong.",
  onRetry,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <p className="text-sm text-red-500">{message}</p>

      {onRetry && <Button onClick={onRetry}>Retry</Button>}
    </div>
  );
}
