import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Chat from "../components/Chat";
import Footer from "../components/Footer";

const UserLayout = () => {
  return (
    <main className="h-screen flex flex-col">
      <Navbar />
      <div className="w-full max-w-screen-2xl mx-auto">
        <Outlet />
      </div>
      <Chat />
      <Footer />
    </main>
  );
};

export default UserLayout;
