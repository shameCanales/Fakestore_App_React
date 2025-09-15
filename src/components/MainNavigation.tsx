import fakestorelogo from "../assets/fkstorelogo.png";
import { NavLink, useLocation, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import NavLinkText from "../UI/NavLinkText.jsx";
import cartIcon from "../assets/grocery-store.png";
import HamIcon from "../assets/hamMenu.png";
import { authActions } from "../store/auth-slice.js";
import type { RootState, AppDispatch } from "../store/store.js";
import { uiActions } from "../store/ui-Slice.js";
import NavButton from "./ui/NavButton.js";
import { useEffect } from "react";

export default function MainNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

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

  const handleLogout = (): void => {
    dispatch(authActions.logout());
    navigate("/");
  };

  const handleOpenMobileNav = (): void => {
    dispatch(uiActions.openMobileNav());
  };

  return (
    <header className="bg-stone-900 text-stone-100 shadow-md sticky top-0 left-0 w-full z-0">
      <div className="flex justify-between items-center px-4 md:px-10 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenMobileNav}
            className="lg:hidden focus:outline-none"
          >
            <img className="w-6" src={HamIcon} alt="Open Menu" />
          </button>
          <img src={fakestorelogo} alt="store logo" className="w-24" />

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
            <div>
              <NavLink to="/cart" className="hidden lg:block">
                <img src={cartIcon} alt="Cart" className="w-6" />
              </NavLink>
              <button
                className="hidden md:block bg-red-600 hover:bg-red-500 transition-colors text-white py-2 px-4 rounded-xl font-medium"
                onClick={handleLogout}
              >
                Logout
              </button>
              <NavLink to="/profile">
                <h1>Profile</h1>
              </NavLink>
            </div>
          ) : (
            <div className="hidden md:flex gap-3">
              <NavButton>
                <NavLink to="/login">Login</NavLink>
              </NavButton>
              <NavButton>
                <NavLink to="/signup">Signup</NavLink>
              </NavButton>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
