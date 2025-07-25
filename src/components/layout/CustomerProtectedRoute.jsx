import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

export default function CustomerProtectedRoute() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); //get the isLoggedIn state from the auth slice of the redux store
  const isCustomer =
    useSelector((state) => state.auth.profileData.role) === "customer";
  return isLoggedIn && isCustomer ? <Outlet /> : <Navigate to="/login" />; //navigate to login page if not logged in
}
