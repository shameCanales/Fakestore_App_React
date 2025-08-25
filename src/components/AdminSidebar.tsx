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
    <div className="bg-stone-950  w-[300px] h-full">
      <img
        src={fakestorelogo}
        alt="store logo"
        className="w-[119px] h-[40px] mt-6 ml-6"
      />

      <p className="poppins-regular text-stone-400 text-lg mt-2 pl-7">
        Admin Studio
      </p>

      <nav className="mt-8 border-t-2 border-b-2 border-b-stone-600 border-t-stone-600 mx-2">
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

      <button
        className="text-red-500 montserrat-medium text-xl px-2 ml-6 mt-5 "
        onClick={handleLogout}
      >
        {`Logout =>`}
      </button>
    </div>
  );
}
