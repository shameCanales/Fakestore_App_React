import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store.js";
import { useGetProfileInfo } from "../../hooks/useGetProfileInfo.js";

export default function AdminProtectedRoute() {
  const token = useSelector((state: RootState) => state.auth.token);
  const isLoggedIn = !!token;
  const { data: profileData, isPending } = useGetProfileInfo(token, !!token);

  const isAdmin = profileData?.role === "admin";

  return isLoggedIn && isAdmin ? <Outlet /> : <Navigate to="/" />;
}
