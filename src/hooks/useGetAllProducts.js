import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../util/http";

export const useGetAllProducts = (page, limit) => {
  return useQuery({
    queryKey: ["products", page, limit],
    queryFn: ({ signal }) => fetchProducts({ page, limit, signal }),
    keepPreviousData: true, // to keep the previous data while fetching new data
    staleTime: 2 * 60 * 1000,
  });
};
