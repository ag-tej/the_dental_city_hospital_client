import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import logo from "../assets/logo.webp";
import calendar from "../assets/calendar.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handle = (e) => {
      if (menuRef && menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [menuRef]);

  const navLinkClasses = ({ isActive }) =>
    isActive
      ? "text-primary-blue-dark py-4"
      : "text-gray-900 hover:text-primary-blue-dark py-4";

  const handleNavLinkClick = () => {
    setShowMenu(false);
  };

  const handleClick = (section) => {
    navigate("/");
    setTimeout(() => {
      const doctorsSection = document.getElementById(section);
      if (doctorsSection) {
        doctorsSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  return (
    <nav className="nav-container">
      {/* Main Navbar */}
      <div className="navbar">
        <div className="flex items-center">
          <div
            onClick={() => setShowMenu(!showMenu)}
            className="cursor-pointer lg:hidden mr-3"
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-7 text-gray-900"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
              />
            </svg>
          </div>
          <a href="/" className="flex items-center gap-2 w-fit lg:w-[210px]">
            <img
              src={logo}
              loading="lazy"
              className="size-16"
              alt="The Dental City"
            />
            <div className="text-center hidden xs:block">
              <p className="text-base font-medium uppercase tracking-wide">
                The Dental City
              </p>
              <p className="text-sm font-light uppercase tracking-[0.6em] ml-1.5">
                Hospital
              </p>
            </div>
          </a>
        </div>
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-8">
          <NavLink to="/" className={navLinkClasses}>
            Home
          </NavLink>
          <NavLink to="/services" className={navLinkClasses}>
            Services
          </NavLink>
          <button
            className={`${navLinkClasses} cursor-pointer`}
            onClick={() => {
              handleClick("doctors");
            }}
          >
            Doctors
          </button>
          <NavLink to="/career" className={navLinkClasses}>
            Career
          </NavLink>
          <button
            className={`${navLinkClasses} cursor-pointer`}
            onClick={() => {
              handleClick("blogs");
            }}
          >
            Blog
          </button>
          <NavLink to="/contact" className={navLinkClasses}>
            Contact
          </NavLink>
        </div>
        {/* Mobile Menu */}
        <div
          ref={menuRef}
          className={`lg:hidden z-50 bg-white border-r border-primary-blue-dark/10 shadow shadow-primary-blue-dark/10 absolute top-0 left-0 w-64 h-screen transition-all ease-in-out transform ${
            showMenu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div
            onClick={() => setShowMenu(!showMenu)}
            className="cursor-pointer absolute right-6 top-6"
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-7 text-gray-900"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="grid grid-cols-1 divide-y divide-primary/30 mt-16 px-6 md:px-8">
            <NavLink
              to="/"
              className={navLinkClasses}
              onClick={handleNavLinkClick}
            >
              Home
            </NavLink>
            <NavLink
              to="/services"
              className={navLinkClasses}
              onClick={handleNavLinkClick}
            >
              Services
            </NavLink>
            <button
              className={`${navLinkClasses} cursor-pointer py-4 text-left`}
              onClick={() => {
                handleNavLinkClick();
                handleClick("doctors");
              }}
            >
              Doctors
            </button>
            <NavLink
              to="/career"
              className={navLinkClasses}
              onClick={handleNavLinkClick}
            >
              Career
            </NavLink>
            <button
              className={`${navLinkClasses} cursor-pointer py-4 text-left`}
              onClick={() => {
                handleNavLinkClick();
                handleClick("blogs");
              }}
            >
              Blog
            </button>
            <NavLink
              to="/contact"
              className={navLinkClasses}
              onClick={handleNavLinkClick}
            >
              Contact
            </NavLink>
          </div>
        </div>
        {/* Appointment Button */}
        <div className="w-fit lg:w-[210px] flex justify-end">
          <NavLink
            to="/appointment"
            className="button scale flex items-center gap-2"
          >
            <img src={calendar} loading="lazy" alt="Calendar Icon" />
            Appointment
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
