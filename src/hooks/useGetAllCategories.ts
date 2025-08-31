import { fetchCategories } from "../util/http.js";
import type { Category } from "../util/http.js";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: ({ signal }) => fetchCategories({ signal }),
    staleTime: 2 * 60 * 1000,
  });
};
