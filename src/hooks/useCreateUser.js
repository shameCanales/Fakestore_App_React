import { useMutation } from "@tanstack/react-query";
import { createUser } from "../util/createUser";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,
  });
};
