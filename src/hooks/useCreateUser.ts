import { useMutation } from "@tanstack/react-query";
import { createUser } from "../util/createUser.js";

// Define the shape of user data that will be sent to create a user
interface CreateUserData {
  email: string;
  password: string;
  name: string;
  avatar: string;
}

// Define what the ser returns after user creation
interface CreateUserResponse {
  id: number;
  email: string;
  name: string;
  avatar?: string;
  role: string;
  password: string; // usually we don't want to expose the password in responses. but this is just for fake api
}

export const useCreateUser = () => {
  return useMutation<CreateUserResponse, Error, CreateUserData>({
    mutationFn: createUser,
  });
};
