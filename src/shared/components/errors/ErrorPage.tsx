import { ReactNode } from "react";

import GridShape from "../ui/common/GridShape";

interface ErrorPageProps {
  title: string;
  image?: ReactNode;
  description: string;
  buttonText?: string;
  href?: string;
}

export default function ErrorPage({
  title,
  image,
  description,
  buttonText,
  href,
}: ErrorPageProps) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden">
      <GridShape />

      <div className="w-full mx-auto text-center max-w-130">
        <h1 className="mb-8 text-2xl font-bold text-gray-800 dark:text-white">
          {title}
        </h1>

        {image && <div className="flex justify-center mb-8">{image}</div>}

        <p className="mt-10 mb-6 text-gray-600 dark:text-gray-400">
          {description}
        </p>

        {buttonText && href && (
          <a
            href={href}
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white transition-colors rounded-lg bg-brand-500 hover:bg-brand-600"
          >
            {buttonText}
          </a>
        )}
      </div>
    </div>
  );
}
