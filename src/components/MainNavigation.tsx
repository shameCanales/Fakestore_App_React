import fakestorelogo from "../assets/fkstorelogo.png";
import { NavLink, useLocation, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import NavLinkText from "../UI/NavLinkText.jsx";
import cartIcon from "../assets/grocery-store.png";
import HamIcon from "../assets/hamMenu.png";
import { authActions } from "../store/auth-slice.js";
import type { RootState, AppDispatch } from "../store/store.js";
import { uiActions } from "../store/ui-Slice.js";
import NavButton from "./ui/navButton.js";

export default function MainNavigation() {
  const navigate = useNavigate();
  const location = useLocation(); // Already typed react router.
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const routeNameMap: Record<string, string> = {
    "/": "home",
    "/products": "products",
    "/categories": "categories",
    "/cart": "cart",
  };

  const currentPage: string = routeNameMap[location.pathname] || "wala";

  const handleLogout = (): void => {
    dispatch(authActions.logout());
    navigate("/");
  };

  const handleOpenMobileNav = (): void => {
    dispatch(uiActions.openMobileNav());
  };

  return (
    <header className="bg-stone-900 flex justify-between items-center p-3">
      <div className="flex">
        <button onClick={() => handleOpenMobileNav()}>
          <img className="w-5" src={HamIcon} alt="Open Menu" />
        </button>
        <img src={fakestorelogo} alt="store logo" className="w-20 ml-3" />
      </div>

      <nav className="hidden">
        <ul className="">
          <li>
            <NavLink to="/">
              <NavLinkText name="Home" active={currentPage === "home"} />
            </NavLink>
          </li>
          <li>
            <NavLink to="products">
              <NavLinkText
                name="Products"
                active={currentPage === "products"}
              />
            </NavLink>
          </li>
          <li>
            <NavLink to="categories">
              <NavLinkText
                name="Categories"
                active={currentPage === "categories"}
              />
            </NavLink>
          </li>
        </ul>
        <button className="">
          <NavLink to="cart">
            <img
              src={cartIcon}
              alt="Cart icon"
              className="w-[20px] mr-2 ml-10"
            />
            <div className="hidden">
              <NavLinkText name="Cart" active={currentPage === "cart"} />
            </div>
          </NavLink>
        </button>
      </nav>

      {isLoggedIn ? (
        <button
          className="bg-red-600 text-stone-50 py-2 px-4 rounded-lg montserrat-bold"
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
        <div className="flex gap-2">
          <NavButton>
            <NavLink to="/login">Login</NavLink>
          </NavButton>
          <NavButton>
            <NavLink to="/login">Signup</NavLink>
          </NavButton>
        </div>
      )}
    </header>
  );
}
