import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import { getProfileInfo } from "../util/getProfileInfo.js";

type Profile = Awaited<ReturnType<typeof getProfileInfo>>;

export const useGetProfileInfo = (
  token: string | null,
  enabled: boolean
): UseQueryResult<Profile, Error> => {
  return useQuery<Profile, Error>({
    queryKey: ["profile"],
    queryFn: () => {
      if (!token) throw new Error("No token found");
      return getProfileInfo(token);
    },
    enabled, //prevents running before login or before getting a token
    staleTime: 1000 * 60 * 2,
  });
};
