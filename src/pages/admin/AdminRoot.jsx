import { Outlet } from "react-router";
import { authActions } from "../../store/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";

export default function AdminRootLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/login");
  };

  return (
    <>
      <p>Admin Navigation</p>
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
      <main>
        <Outlet />
      </main>
    </>
  );
}
