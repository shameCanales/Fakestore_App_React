import { Outlet } from "react-router";
import MainNavigation from "../components/MainNavigation";

function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main className="px-10 ">
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
