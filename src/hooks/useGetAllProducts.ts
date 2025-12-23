import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../util/http.js";
import type { Product } from "../types/Products.js";

// If your API returns a paginated response, define the response type
export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

export const useGetAllProducts = (page: number, limit: number) => {
  return useQuery<Product[], Error>({
    queryKey: ["products", page, limit],
    queryFn: ({ signal }) => fetchProducts({ page, limit, signal }),
    placeholderData: keepPreviousData, // to keep the previous data while fetching new data. old is keepPreviousData: true;
    staleTime: 2 * 60 * 1000,
  });
};
