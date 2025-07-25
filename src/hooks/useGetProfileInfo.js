import { useQuery } from "@tanstack/react-query";
import { getProfileInfo } from "../util/getProfileInfo";

export const useGetProfileInfo = (token, enabled) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfileInfo(token),
    enabled, //prevents running before login or before getting a token
    staleTime: 1000 * 60 * 2,
  });
};
