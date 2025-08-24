import { api } from "./http.js";

interface createUserInput {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

interface UserResponse {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
}

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
