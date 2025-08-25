import { useMutation } from "@tanstack/react-query";
import type { UseMutationResult } from "@tanstack/react-query";
import { loginUser } from "../util/login.js";

// Infer the type of the response from loginUsers
type LoginResponse = Awaited<ReturnType<typeof loginUser>>;
// Infer the type of the parameters logUser expects
type LoginVariables = Parameters<typeof loginUser>[0];

export const useLogin = (): UseMutationResult<
  LoginResponse,
  Error,
  LoginVariables
> => {
  return useMutation({
    mutationFn: loginUser, //call the loginUser function from util/login.js with the email and password as parameters
  });
};
// This hook can be used in components to handle user login
// It will return an object with properties like mutate, isLoading, isError, etc.
