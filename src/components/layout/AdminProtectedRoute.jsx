import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

export default function AdminProtectedRoute() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isAdmin =
    useSelector((state) => state.auth.profileData.role) === "admin";

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
