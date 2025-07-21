import fakestorelogo from "../assets/fkstorelogo.png";
import { NavLink, useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import LinkText from "../UI/LinkText";
import cartIcon from "../assets/grocery-store.png";
import { authActions } from "../store/auth-slice";

export default function MainNavigation() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const routeNameMap = {
    "/": "home",
    "/products": "products",
    "/categories": "categories",
    "/cart": "cart",
  };

  const currentPage = routeNameMap[location.pathname] || "wala";

  const handleLogout = () => {
    dispatch(authActions.logout());
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
              <LinkText name="Home" active={currentPage === "home"} />
            </NavLink>
          </li>
          <li>
            <NavLink to="products">
              <LinkText name="Products" active={currentPage === "products"} />
            </NavLink>
          </li>
          <li>
            <NavLink to="categories">
              <LinkText
                name="Categories"
                active={currentPage === "categories"}
              />
            </NavLink>
          </li>
        </ul>

        <button className="flex items-center">
          <img src={cartIcon} alt="Cart icon" className="w-[20px] mr-2 ml-10" />
          <NavLink to="cart">
            <LinkText name="Cart" active={currentPage === "cart"} />
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
