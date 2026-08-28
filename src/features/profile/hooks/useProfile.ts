import { useQuery } from "@tanstack/react-query";

import { profileKeys, profileService } from "../api";

export const useProfile = () => {
  return useQuery({
    queryKey: profileKeys.all,
    queryFn: profileService.getProfile,
  });
};
