import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { productsService } from "../api/products.service";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: productsService.getProducts,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productsService.createProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};
