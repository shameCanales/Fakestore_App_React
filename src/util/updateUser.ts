import type { ProfileData } from "../types/ProfileData.js";
import { api } from "./http.js";

export async function updateUser({
  id,
  data,
}: {
  id: number;
  data: Partial<ProfileData>;
}) {
  const response = await api.put(`/users/${id}`, data);

  return response.data;
}
