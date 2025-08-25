import fakestorelogo from "../assets/fkstorelogo.png";
import { NavLink, useLocation, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import NavLinkText from "../UI/NavLinkText.jsx";
import cartIcon from "../assets/grocery-store.png";
import { authActions } from "../store/auth-slice.js";
import type { RootState, AppDispatch } from "../store/store.js";


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

  return (
    <header className="bg-stone-900 flex justify-between items-center p-4">
      <img
        src={fakestorelogo}
        alt="store logo"
        className="w-[119px] h-[40px]"
      />

      <nav className="flex items-center gap-2">
        <ul className="flex items-center border-r-stone-50 border-r-2">
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

        <button className="flex items-center">
          <img src={cartIcon} alt="Cart icon" className="w-[20px] mr-2 ml-10" />
          <NavLink to="cart">
            <NavLinkText name="Cart" active={currentPage === "cart"} />
          </NavLink>
        </button>

        {isLoggedIn ? (
          <button
            className="bg-red-600 text-stone-50 py-2 px-4 rounded-lg montserrat-bold"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <button className="bg-lime-600 text-stone-50 py-2 px-4 rounded-lg montserrat-bold">
            <NavLink to="/login">Login</NavLink>
          </button>
        )}
      </nav>
    </header>
  );
}
