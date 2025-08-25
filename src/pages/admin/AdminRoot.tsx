import { Outlet } from "react-router";
import AdminSidebar from "../../components/AdminSidebar.js";

export default function AdminRootLayout() {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
