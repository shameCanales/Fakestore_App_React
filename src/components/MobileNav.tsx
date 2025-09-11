import closeIcon from "../assets/cancel.png";
import { NavLink } from "react-router";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/ui-Slice.js";
import type { AppDispatch } from "../store/store.js";

export default function MobileNav() {
  const dispatch = useDispatch<AppDispatch>();

  const handleCloseMobileNav = () => {
    dispatch(uiActions.closeMobileNav());
  };

  return (
    <div className="absolute z-1 w-full h-full bg-stone-900 p-5 text-stone-100">
      <button className="w-10" onClick={() => handleCloseMobileNav()}>
        <img src={closeIcon} alt="Exit icon" />
      </button>

      <nav className="text-center mt-15">
        <ul className="grid gap-6">
          <li>
            <NavLink to="/">
              <p>Home</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="products">
              <p>Products</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="categories">
              <p>Categories</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="cart">
              <p>Cart</p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
