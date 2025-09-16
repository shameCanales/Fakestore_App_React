import { useMutation } from "@tanstack/react-query";
import { createUser } from "../util/createUser.js";
import type { ProfileData } from "../types/ProfileData.js";

// Define the shape of user data that will be sent to create a user

type CreateUserData = Pick<
  ProfileData,
  "email" | "password" | "name" | "avatar"
>;

// Define what the ser returns after user creation
type CreateUserResponse = ProfileData;


export const useCreateUser = () => {
  return useMutation<CreateUserResponse, Error, CreateUserData>({
    mutationFn: createUser,
  });
};
