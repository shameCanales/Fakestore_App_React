import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../util/login";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser, //call the loginUser function from util/login.js with the email and password as parameters
  });
};
// This hook can be used in components to handle user login
// It will return an object with properties like mutate, isLoading, isError, etc.