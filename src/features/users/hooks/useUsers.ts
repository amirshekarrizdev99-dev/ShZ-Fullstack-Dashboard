import { useQuery } from "@tanstack/react-query";

import { usersService } from "../api/users.service";

export const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: usersService.getUsers,
  });
