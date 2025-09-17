import fakestorelogo from "../assets/fkstorelogo.png";
import { NavLink, useLocation, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import NavLinkText from "../UI/NavLinkText.jsx";
import cartIcon from "../assets/grocery-store.png";
import HamIcon from "../assets/menu.png";
import type { RootState, AppDispatch } from "../store/store.js";
import { uiActions } from "../store/ui-Slice.js";
import NavButton from "./ui/NavButton.js";
import { useEffect } from "react";
import { useGetProfileInfo } from "../hooks/useGetProfileInfo.js";
import loginIcon from "../assets/login.png";
import signupIcon from "../assets/signup.png";

export default function MainNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const token = useSelector((state: RootState) => state.auth.token);

  const { data: profileData, isPending: gettingProfilePending } =
    useGetProfileInfo(token, !!token);

  const routeNameMap: Record<string, string> = {
    "/": "home",
    "/products": "products",
    "/categories": "categories",
    "/cart": "cart",
  };

  const currentPage: string = routeNameMap[location.pathname] || "wala";

  useEffect(() => {
    dispatch(uiActions.closeMobileNav());
  }, [location, dispatch]);

  const handleOpenMobileNav = (): void => {
    dispatch(uiActions.openMobileNav());
  };

  return (
    <header className="bg-slate-50 text-stone- shadow-md sticky top-0 left-0 w-full z-0">
      <div className="flex justify-between items-center px-4 md:px-10 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenMobileNav}
            className="border-2 p-1 rounded-md border-s-slate-200"
          >
            <img className="w-6" src={HamIcon} alt="Open Menu" />
          </button>
          <img src={fakestorelogo} alt="store logo" className="h-6" />

          <nav className="hidden lg:flex items-center gap-12 ml-15">
            <NavLink to="/">
              <NavLinkText name="Home" active={currentPage === "home"} />
            </NavLink>
            <NavLink to="/products">
              <NavLinkText
                name="Products"
                active={currentPage === "products"}
              />
            </NavLink>
            <NavLink to="/categories">
              <NavLinkText
                name="Categories"
                active={currentPage === "categories"}
              />
            </NavLink>
          </nav>
        </div>

        {/* Auth Section */}
        <div className="flex gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-6">
              <NavLink to="/cart" className=" lg:block">
                <img src={cartIcon} alt="Cart" className="w-6" />
              </NavLink>

              <NavLink to="/profile">
                <img
                  src={profileData?.avatar}
                  alt="Profile"
                  className="w-10 rounded-full"
                />
              </NavLink>
            </div>
          ) : (
            <div className="flex gap-3">
              <NavButton route="/login" icon={loginIcon} label="Login" />
              <NavButton
                route="/create-user"
                icon={signupIcon}
                label="Sign Up"
              />

              {/* <NavLink className="flex items-center gap-3 p-2" to="/signup">
                <img className="w-5" src={signupIcon} alt="Signup" />
                <p className="text-sm popp">Signup</p>
              </NavLink> */}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
