import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

export default function CustomerProtectedRoute() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); //get the isLoggedIn state from the auth slice of the redux store
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />; //navigate to login page if not logged in
}
