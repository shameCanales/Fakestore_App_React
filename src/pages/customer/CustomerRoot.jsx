import { Outlet } from "react-router";
import MainNavigation from "../../components/MainNavigation";

export default function CustomerRootLayout() {
  return (
    <>
      <MainNavigation />
      <main className="px-10 ">
        <Outlet />
      </main>
    </>
  );
}
