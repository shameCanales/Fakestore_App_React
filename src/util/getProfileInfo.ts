import { api } from "./http.js";

interface ProfileData {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
}

export const getProfileInfo = async (token: string): Promise<ProfileData> => {
  const response = await api.get<ProfileData>("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
  //assumiong the response contains id, email, password, name, role, avatar
};

// cannot use useSelector inside the utility function
