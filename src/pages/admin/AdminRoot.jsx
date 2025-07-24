import { Outlet } from "react-router";

export default function AdminRootLayout() {
  return (
    <>
      <p>Admin Navigation</p>
      <main>
        <Outlet />
      </main>
    </>
  );
}
