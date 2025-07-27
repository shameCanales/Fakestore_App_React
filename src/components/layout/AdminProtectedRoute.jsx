import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

export default function AdminProtectedRoute() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isFakeAdmin = useSelector((state) => state.auth.isFakeAdmin);

  return isLoggedIn && isFakeAdmin ? <Outlet /> : <Navigate to="/" />;
}
