import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { PropsWithChildren } from "react";
import { useState } from "react";

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

const Wrapper = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => createTestQueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export const wrapper = Wrapper;
