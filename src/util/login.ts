import { api } from "./http.js";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export const loginUser = async ({
  email,
  password,
}: LoginCredentials): Promise<LoginResponse> => {
  //receive email and password as parameters from useLogin
  const response = await api.post<LoginResponse>("/auth/login", {
    email,
    password,
  }); // make a POST request to the login endpoint with email and password
  return response.data; // Assuming the response contains user data and token, contains {access_token, refresh_token}
}; //return the response data which contains the access token
