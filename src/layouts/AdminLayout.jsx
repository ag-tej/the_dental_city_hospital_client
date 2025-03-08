import { Outlet } from "react-router";
import Navbar from "../admin/components/Navbar";

function AdminLayout() {
  return (
    <main className="flex min-h-screen w-full">
      <Navbar className="flex-none" />
      <div className="flex-1 p-4 ml-60">
        <Outlet />
      </div>
    </main>
  );
}

export default AdminLayout;
