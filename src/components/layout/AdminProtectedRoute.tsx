import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store.js";

export default function AdminProtectedRoute() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const isFakeAdmin = useSelector((state: RootState) => state.auth.isFakeAdmin);

  return isLoggedIn && isFakeAdmin ? <Outlet /> : <Navigate to="/" />;
}
