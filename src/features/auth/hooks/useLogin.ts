import { useMutation } from "@tanstack/react-query";

import { authService } from "../api/auth.service";
import type { LoginRequest } from "../types/auth.type";

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: LoginRequest) =>
      authService.login(email, password),
  });
};
