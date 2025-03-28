import { NavLink, useNavigate } from "react-router";
import logo from "../assets/logo_white.webp";
import { FaFacebookSquare } from "react-icons/fa";
import { RiInstagramFill, RiSendPlaneFill } from "react-icons/ri";
import { AiFillTikTok } from "react-icons/ai";
import { TfiYoutube } from "react-icons/tfi";
import useAxios from "../admin/UseAxios";
import { useState } from "react";

const Footer = () => {
  const navigate = useNavigate();
  const handleClick = (section) => {
    navigate("/");
    setTimeout(() => {
      const doctorsSection = document.getElementById(section);
      if (doctorsSection) {
        doctorsSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  const axiosInstance = useAxios();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.target);
    const data = {
      email: formData.get("email"),
    };
    try {
      const response = await axiosInstance.post("/mailingList/create", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.success) {
        window.alert("Your email has been recorded!");
        event.target.reset();
      }
    } catch (error) {
      window.alert(error.response?.data?.message || "Failed to record email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="z-30 bg-primary-blue-dark px-5 md:px-8 xl:px-13 py-13 text-white mt-auto">
      <div className="w-full max-w-screen-2xl mx-auto">
        <div className="max-w-6xl mx-auto flex flex-wrap items-start justify-between gap-8 pb-13 border-b">
          <a href="/" className="flex flex-col items-center gap-3">
            <img
              src={logo}
              loading="lazy"
              className="size-24"
              alt="The Dental City"
            />
            <div className="text-center">
              <p className="text-base font-medium uppercase tracking-wide">
                The Dental City
              </p>
              <p className="text-sm font-light uppercase tracking-[0.6em] ml-1.5">
                Hospital
              </p>
            </div>
          </a>
          {/* Important Links */}
          <div>
            <p className="text-responsive-text xl:text-lg font-medium">
              Important Links
            </p>
            <ul className="mt-5 text-responsive-text font-normal flex flex-col gap-3">
              <li>
                <NavLink to="/appointment">Appointment</NavLink>
              </li>
              <li>
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    handleClick("doctors");
                  }}
                >
                  Doctors
                </button>
              </li>
              <li>
                <NavLink to="/services">Services</NavLink>
              </li>
              <li>
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    handleClick("about-us");
                  }}
                >
                  About Us
                </button>
              </li>
            </ul>
          </div>
          {/* Contact Us */}
          <div>
            <p className="text-responsive-text xl:text-lg font-medium">
              Contact Us
            </p>
            <ul className="mt-5 text-responsive-text font-normal flex flex-col gap-3">
              <li>
                Call: <a href="tel:01-6636277">01-6636277</a> |{" "}
                <a href="tel:+977 980-1222339">9801222339</a>
              </li>
              <li>
                Email:{" "}
                <a href="mailto:thedentalcity@gmail.com">
                  thedentalcity@gmail.com
                </a>
              </li>
              <li>
                Address:{" "}
                <a
                  href="https://maps.app.goo.gl/msRc6VPc1zcD6AdUA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SS Chowk, Madhyapur Thimi-05,
                  <br />
                  Bhaktapur, Nepal
                </a>
              </li>
            </ul>
          </div>
          {/* Socials and Newsletter */}
          <div>
            <div>
              <p className="text-responsive-text xl:text-lg font-medium">
                Socials
              </p>
              <ul className="mt-3 text-3xl flex flex-row items-center gap-4">
                <li>
                  <a
                    href="https://www.facebook.com/share/1KjcibRjW9/"
                    aria-label="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebookSquare />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/the_dental_city_hospital?igsh=bW1ibmlsY2Fhajlu"
                    aria-label="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <RiInstagramFill />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.tiktok.com/@thedentalcityhospital?_t=ZS-8uMbjB4zKKo&_r=1"
                    aria-label="TikTok"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <AiFillTikTok />
                  </a>
                </li>
                <li>
                  <a
                    href="https://youtube.com/@thedentalawarenesschannelo2798?si=FclCxPLGVSuUx8wD"
                    aria-label="YouTube"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TfiYoutube className="text-primary-blue-dark bg-white p-[1.5px] rounded" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <p className="text-responsive-text xl:text-lg font-medium">
                Newsletter
              </p>
              <div className="relative mt-3">
                <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`input pr-10 ${
                      isLoading && "cursor-not-allowed"
                    }`}
                    placeholder="Enter your email"
                    required
                    disabled={isLoading}
                  />
                  <button
                    aria-label="Subscribe"
                    type="submit"
                    className={`absolute top-1/2 right-2.5 transform -translate-y-1/2 ${
                      isLoading
                        ? "cursor-not-allowed opacity-60"
                        : "cursor-pointer"
                    }`}
                    disabled={isLoading}
                  >
                    <RiSendPlaneFill className="text-2xl text-primary-blue-dark" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Copyright */}
        <div className="mt-13 max-w-6xl mx-auto font-medium opacity-80 text-xs md:text-sm flex flex-col sm:flex-row gap-3 sm:gap-13 items-center justify-center sm:justify-between">
          <p>&#169;2025 All Rights Reserved | The Dental City Hospital</p>
          <a
            href="https://portfolio.tejagrawal.com.np/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Designed & Developed by Yeti Pixels
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
