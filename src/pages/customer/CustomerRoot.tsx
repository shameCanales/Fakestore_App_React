import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import MainNavigation from "../../components/MainNavigation.js";
import Toast from "../../components/Toast.js";
import type { RootState } from "../../store/store.js";

export default function CustomerRootLayout() {
  const toastIsVisible = useSelector(
    (state: RootState) => state.ui.toast.isVisible
  );

  return (
    <>
      <MainNavigation />
      <main className="px-10 ">
        <Outlet />
      </main>
      {toastIsVisible && <Toast />}
    </>
  );
}
