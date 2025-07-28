import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import MainNavigation from "../../components/MainNavigation";
import Toast from "../../components/Toast";

export default function CustomerRootLayout() {
  const toastIsVisible = useSelector((state) => state.ui.toast.isVisible);

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
