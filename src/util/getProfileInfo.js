import { api } from "./http";

export const getProfileInfo = async (token) => {
  const response = await api.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
  //assumiong the response contains id, email, password, name, role, avatar
};

// cannot use useSelector inside the utility function
