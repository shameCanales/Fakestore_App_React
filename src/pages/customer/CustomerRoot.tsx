import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import MainNavigation from "../../components/MainNavigation.js";
import Toast from "../../components/Toast.js";
import type { RootState } from "../../store/store.js";
import MobileNav from "../../components/MobileNav.js";

export default function CustomerRootLayout() {
  const toastIsVisible = useSelector(
    (state: RootState) => state.ui.toast.isVisible
  );
  const mobileNavIsOpen = useSelector(
    (state: RootState) => state.ui.mobileNav.isOpen
  );

  return (
    <>
      {mobileNavIsOpen && <MobileNav />}
      <MainNavigation />
      <main className="bg-stone-950 text-slate-50 px-3">
        <Outlet />
      </main>
      {toastIsVisible && <Toast />}
    </>
  );
}
