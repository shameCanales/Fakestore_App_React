export interface ProfileData {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
}

export type CreateUserData = Pick<
  ProfileData,
  "email" | "password" | "name" | "avatar"
>;

