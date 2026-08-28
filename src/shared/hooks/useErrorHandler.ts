import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface SupabaseLikeError {
  response?: {
    status?: number;
  };
}

interface FetchLikeError {
  status?: number;
}

interface CustomServerError {
  statusCode?: number;
}

const getErrorStatus = (error: unknown): number | undefined => {
  if (!error || typeof error !== "object") {
    return undefined;
  }

  if ("response" in error) {
    const supabaseError = error as SupabaseLikeError;

    const status = supabaseError.response?.status;

    if (typeof status === "number") {
      return status;
    }
  }

  if ("status" in error) {
    const fetchError = error as FetchLikeError;

    if (typeof fetchError.status === "number") {
      return fetchError.status;
    }
  }

  if ("statusCode" in error) {
    const customError = error as CustomServerError;

    if (typeof customError.statusCode === "number") {
      return customError.statusCode;
    }
  }

  return undefined;
};

export const useErrorHandler = (isError: boolean, error: unknown) => {
  const router = useRouter();

  useEffect(() => {
    if (!isError) {
      return;
    }

    const statusCode = getErrorStatus(error);

    switch (statusCode) {
      case 404:
        router.replace("/404");
        break;

      case 500:
        router.replace("/500");
        break;

      default:
        router.replace("/500");
        break;
    }
  }, [isError, error, router]);
};
