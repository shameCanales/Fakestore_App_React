import { api } from "./http";

export const createUser = async ({ name, email, password, avatar }) => {
  const response = await api.post("/users/", { name, email, password, avatar });
  return response.data; //should return email, password, name, avatar, role, and id
};

//Separated createUser like loginUser to follow best practices
// 1. Separation of Concerns
// 2. Reusability
// 3. Testability
// 4. Scability
