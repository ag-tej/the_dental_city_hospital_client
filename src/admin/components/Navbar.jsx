import {
  FaBlogger,
  FaBriefcaseMedical,
  FaListAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { BiSolidMessageDetail } from "react-icons/bi";
import { PiOfficeChairFill } from "react-icons/pi";
import { MdMessage } from "react-icons/md";
import { TbFileCv } from "react-icons/tb";
import { NavLink } from "react-router";
import { UseAuth } from "../UseAuth";
import useAxios from "../UseAxios";
import logo from "../../assets/logo_white.webp";

const Navbar = () => {
  const axiosInstance = useAxios();
  const { logout } = UseAuth();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;
    try {
      const response = await axiosInstance.post(
        "/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        logout();
      }
    } catch (error) {
      window.alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-primary-blue-dark min-h-screen p-5 fixed">
      <a href="/dashboard" className="flex items-center gap-2 w-fit mb-8">
        <img
          src={logo}
          loading="lazy"
          className="size-16"
          alt="The Dental City"
        />
        <div className="text-center text-primary-white">
          <p className="text-sm font-medium uppercase tracking-wide">
            The Dental City
          </p>
          <p className="text-xs font-light uppercase tracking-[0.6em] ml-1.5">
            Hospital
          </p>
        </div>
      </a>
      <div className="flex flex-col space-y-3 font-semibold">
        <NavLink to="/doctor" className="admin-nav-link">
          <FaUserDoctor size={20} />
          <span>Doctors</span>
        </NavLink>
        <NavLink to="/blog" className="admin-nav-link">
          <FaBlogger size={20} />
          <span>Blogs</span>
        </NavLink>
        <NavLink to="/testimonial" className="admin-nav-link">
          <BiSolidMessageDetail size={20} />
          <span>Testimonials</span>
        </NavLink>
        <NavLink to="/vacancy" className="admin-nav-link">
          <PiOfficeChairFill size={20} />
          <span>Vacancies</span>
        </NavLink>
        <hr className="text-primary-white mb-3" />
        <NavLink to="/appointment-application" className="admin-nav-link">
          <FaBriefcaseMedical size={20} />
          <span>Appointments</span>
        </NavLink>
        <NavLink to="/job-application" className="admin-nav-link">
          <TbFileCv size={20} />
          <span>Job Applications</span>
        </NavLink>
        <NavLink to="/contact-message" className="admin-nav-link">
          <MdMessage size={20} />
          <span>Contact Messages</span>
        </NavLink>
        <NavLink to="/mailing-list" className="admin-nav-link">
          <FaListAlt size={20} />
          <span>Mailing List</span>
        </NavLink>
        <hr className="text-primary-white mb-3" />
        <div className="admin-nav-link" onClick={handleLogout}>
          <FaSignOutAlt size={20} />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
