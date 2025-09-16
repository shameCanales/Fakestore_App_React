import { useSelector } from "react-redux";
import type { RootState } from "../../store/store.js";
import { Navigate, Outlet } from "react-router";
import { useGetProfileInfo } from "../../hooks/useGetProfileInfo.js";

export default function CustomerProtectedRoute() {
  const token = useSelector((state: RootState) => state.auth.token);
  const { data: profileData, isPending } = useGetProfileInfo(token, !!token);

  if (isPending)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );

  const isLoggedIn = !!token;
  const isCustomer = profileData?.role === "customer";
  return isLoggedIn && isCustomer ? <Outlet /> : <Navigate to="/login" />;
}
