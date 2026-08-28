"use client";

interface Props {
  title?: string;
  description?: string;
}

export default function EmptyState({
  title = "No Data",
  description = "Nothing to display.",
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h3 className="font-semibold">{title}</h3>

      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
