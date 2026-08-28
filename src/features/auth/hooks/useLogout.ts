import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { authService } from "../api/auth.service";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),

    onSuccess: () => {
      queryClient.clear();

      router.refresh();
      router.replace("/signin");
    },
  });
};
