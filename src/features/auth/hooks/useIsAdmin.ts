import { useQuery } from "@tanstack/react-query";

import { authService } from "../api/auth.service";

export const useIsAdmin = () => {
  return useQuery({
    queryKey: ["is-admin"],
    queryFn: authService.isAdmin,
    staleTime: Infinity,
  });
};