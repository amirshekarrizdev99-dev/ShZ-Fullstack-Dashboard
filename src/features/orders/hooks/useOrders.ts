import { useQuery } from "@tanstack/react-query";

import { ordersService } from "../api/orders.service";

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: ordersService.getOrders,
  });
};
