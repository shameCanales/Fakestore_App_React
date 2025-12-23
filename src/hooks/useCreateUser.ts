import { useMutation } from "@tanstack/react-query";
import { createUser } from "../util/createUser.js";
import type { ProfileData, CreateUserData } from "../types/ProfileData.js";

// Define the shape of user data that will be sent to create a user

// Define what the ser returns after user creation
type CreateUserResponse = ProfileData;

export const useCreateUser = () => {
  return useMutation<CreateUserResponse, Error, CreateUserData>({
    mutationFn: createUser,
  });
};
