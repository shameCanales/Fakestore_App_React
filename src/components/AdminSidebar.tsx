import { authActions } from "../store/auth-slice.js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, NavLink } from "react-router";
import fakestorelogo from "../assets/fkstorelogo.png";
import LinkSidebar from "../UI/LinkSidebar.jsx";
// import { QueryClient } from "@tanstack/react-query";
// import { queryClient } from "../util/http.js";
import type { RootState, AppDispatch } from "../store/store.ts";

export default function AdminSidebar() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const routeNameMap: Record<string, string> = {
    "/admin": "dashboard",
    "/admin/ProductList": "productList",
    "/admin/categoriesList": "categoriesList",
    "/admin/usersList": "usersList",
  };

  const currentPage = routeNameMap[location.pathname] || "none";

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <div className="">
      <img src={fakestorelogo} alt="store logo" className="" />

      <p className="">Admin Studio</p>

      <nav className="">
        <ul>
          <li>
            <NavLink to="/admin">
              <LinkSidebar active={currentPage === "dashboard"}>
                Dashboard
              </LinkSidebar>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/ProductList">
              <LinkSidebar active={currentPage === "productList"}>
                Product List
              </LinkSidebar>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/categoriesList">
              <LinkSidebar active={currentPage === "categoriesList"}>
                Categories List
              </LinkSidebar>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/usersList">
              <LinkSidebar active={currentPage === "usersList"}>
                Users List
              </LinkSidebar>
            </NavLink>
          </li>
        </ul>
      </nav>

      <button className=" " onClick={handleLogout}>
        {`Logout =>`}
      </button>
    </div>
  );
}
