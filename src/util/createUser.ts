import { api } from "./http.js";
import type { ProfileData, CreateUserData } from "../types/ProfileData.ts";

type createUserInput = CreateUserData;
type UserResponse = ProfileData;

export const createUser = async ({
  name,
  email,
  password,
  avatar,
}: createUserInput): Promise<UserResponse> => {
  const response = await api.post<UserResponse>("/users/", {
    name,
    email,
    password,
    avatar,
  });
  return response.data; //should return email, password, name, avatar, role, and id
};

//Separated createUser like loginUser to follow best practices
// 1. Separation of Concerns
// 2. Reusability
// 3. Testability
// 4. Scability
