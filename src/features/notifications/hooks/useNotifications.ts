import { useQuery } from "@tanstack/react-query";

import { notificationsService } from "../api/notifications.service";

export const useNotifications = () =>
  useQuery({
    queryKey: ["notifications"],
    queryFn: notificationsService.getNotifications,
  });
