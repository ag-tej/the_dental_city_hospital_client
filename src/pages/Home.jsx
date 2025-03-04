import { NavLink, useNavigate } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import hero from "../assets/hero.webp";
import calendar2 from "../assets/calender2.svg";
import group from "../assets/group.svg";
import list from "../assets/list.svg";
import aboutUs from "../assets/about-us.webp";
import appointmentBooking from "../assets/appointment-booking.webp";
import testimonialsBackground from "../assets/testimonials-background.webp";
import facebook from "../assets/facebook.svg";
import instagram from "../assets/instagram.svg";
import linkedin from "../assets/linkedin.svg";
import ContactCards from "../components/ContactCards";
import BlogCarousel from "../components/BlogCarousel";
import AppointmentForm from "../components/AppointmentForm";
import { serviceData } from "../data/ServiceData";

const Home = () => {
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

  return (
    <section>
      {/* Hero */}
      <div className="relative">
        <img
          src={hero}
          loading="lazy"
          alt="Hero Image"
          className="max-h-[500px] xl:max-h-[600px] min-h-80 w-full object-cover"
        />
        <div className="absolute left-8 ss:left-13 xs:left-18 sm:left-21 lg:left-25 top-28 sm:top-32 md:top-36 lg:top-40 xl:top-44 hero-text text-responsive-heading text-primary-blue-dark font-medium uppercase">
          <p>"AI is not yet a tool in</p>
          <p>health care, digitalization is."</p>
        </div>
      </div>
      {/* Cards */}
      <div className="mt-13 px-5 md:px-8 xl:px-13">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-5 md:gap-8 xl:gap-13 items-center justify-center">
          <NavLink to="/appointment">
            <div className="bg-primary-blue-dark w-xs flex items-center justify-between px-8 py-5 rounded text-responsive-text text-white font-medium">
              <p>Book an Appointment</p>
              <img
                src={calendar2}
                loading="lazy"
                alt="Calendar Icon"
                className="h-10"
              />
            </div>
          </NavLink>
          <div
            className="bg-primary-blue-light w-xs flex items-center justify-between px-8 py-5 rounded text-responsive-text text-primary-blue-dark font-medium cursor-pointer"
            onClick={() => {
              handleClick("doctors");
            }}
          >
            <p>Know Your Doctor</p>
            <img src={group} loading="lazy" alt="Group Icon" className="h-10" />
          </div>
          <NavLink to="services">
            <div className="bg-primary-blue-dark w-xs flex items-center justify-between px-8 py-5 rounded text-responsive-text text-white font-medium">
              <p>Our Services</p>
              <img src={list} loading="lazy" alt="List Icon" className="h-10" />
            </div>
          </NavLink>
        </div>
      </div>
      {/* About Us */}
      <div id="about-us" className="mt-16 px-5 md:px-8 xl:px-13">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-5 md:gap-8 xl:gap-13 items-center justify-center">
          <div className="text-center lg:text-left lg:w-1/2 max-w-lg">
            <p className="text-responsive-heading text-primary-blue-dark font-semibold uppercase tracking-wide">
              About Us
            </p>
            <p className="text-responsive-text xl:text-lg text-primary-blue-light font-medium uppercase tracking-wide">
              Know who we are
            </p>
            <p className="text-responsive-text font-normal text-gray-900 leading-relaxed mt-4">
              Welcome to The Dental City, the ultimate destination for world
              class dental care in Nepal located in the heritage city of
              Bhaktapur. We excel in the field of dentistry as in braces,
              aligners, Dental implants, root canal treatment, oral and
              maxillofacial surgery, gum diseases, child dentistry and every
              other field of dentistry. Looking forward for your excellent
              experience in Dental treatment with us.
            </p>
          </div>
          <div className="w-full lg:w-1/2">
            <img
              src={aboutUs}
              loading="lazy"
              alt="About Us Image"
              className="w-full max-w-lg mx-auto lg:ml-auto h-auto object-cover rounded-4xl"
            />
          </div>
        </div>
      </div>
      {/* Book Your Appointment */}
      <div
        className="mt-16 h-fit relative bg-cover"
        style={{ backgroundImage: `url(${appointmentBooking})` }}
      >
        <div className="bg-primary-white/80 h-full w-full p-5 md:p-8 xl:p-13">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-5 md:gap-8 xl:gap-13 items-center justify-between">
            <div className="lg:w-1/2 text-center text-responsive-heading text-primary-blue-dark font-bold uppercase tracking-wide leading-snug">
              <p>Book Your</p>
              <p className="underline underline-offset-[14px]">Appointment</p>
            </div>
            <div className="w-full max-w-2xl lg:w-1/2 mx-auto">
              <AppointmentForm />
            </div>
          </div>
        </div>
      </div>
      {/* Our Services */}
      <div className="mt-16 px-5 md:px-8 xl:px-13">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-5">
            <p className="text-responsive-text xl:text-lg text-primary-blue-light font-medium uppercase tracking-wide">
              We take care of your oral health
            </p>
            <p className="text-responsive-heading text-primary-blue-dark font-semibold uppercase tracking-wide">
              Our Services
            </p>
          </div>
          <div>
            <Swiper
              slidesPerView="auto"
              centeredSlides={true}
              spaceBetween={20}
              loop={true}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              navigation={true}
              modules={[Autoplay, Navigation]}
            >
              {serviceData.map((item) => (
                <SwiperSlide
                  key={item.id}
                  className="bg-primary-blue-dark text-white text-center font-medium rounded-4xl mb-2"
                >
                  <img
                    src={item.image}
                    loading="lazy"
                    alt={item.name}
                    className="rounded-4xl w-full aspect-[5/4] object-cover"
                  />
                  <p className="p-4 text-responsive-text xl:text-lg tracking-wide">
                    {item.name}
                  </p>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      {/* Our Doctors */}
      <div id="doctors" className="mt-16 px-5 md:px-8 xl:px-13">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-5">
            <p className="text-responsive-text xl:text-lg text-primary-blue-light font-medium uppercase tracking-wide">
              Meet
            </p>
            <p className="text-responsive-heading text-primary-blue-dark font-semibold uppercase tracking-wide">
              Our Doctors
            </p>
          </div>
          <div>
            <Swiper
              slidesPerView="auto"
              centeredSlides={true}
              spaceBetween={20}
              loop={true}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              navigation={true}
              modules={[Autoplay, Navigation]}
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <SwiperSlide
                  key={index}
                  className="bg-primary-blue-light text-primary-blue-dark text-center font-medium rounded mb-2"
                >
                  <img
                    src={appointmentBooking}
                    loading="lazy"
                    alt="Image Name"
                    className="w-full aspect-[5/4] object-cover rounded"
                  />
                  <div className="p-4">
                    <p className="text-responsive-text xl:text-lg font-medium tracking-wide uppercase mb-1">
                      Doctor Name
                    </p>
                    <p className="text-responsive-text font-normal tracking-wide uppercase mb-3">
                      Specialty
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <img
                          src={facebook}
                          alt="Facebook Icon"
                          loading="lazy"
                          className="size-8"
                        />
                      </a>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <img
                          src={instagram}
                          alt="Instagram Icon"
                          loading="lazy"
                          className="size-8"
                        />
                      </a>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <img
                          src={linkedin}
                          alt="Linkedin Icon"
                          loading="lazy"
                          className="size-8"
                        />
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      {/* Testimonials */}
      <div
        className="mt-16 h-fit relative bg-cover bg-center"
        style={{ backgroundImage: `url(${testimonialsBackground})` }}
      >
        <div className="bg-[#1F2B6C]/60 backdrop-blur-xs h-full w-full px-5 md:px-8 xl:px-13 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-5">
              <p className="text-responsive-text xl:text-lg text-primary-white font-medium uppercase tracking-wide">
                Testimonials
              </p>
            </div>
            <div>
              <Swiper
                slidesPerView={1}
                centeredSlides={true}
                spaceBetween={20}
                loop={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                navigation={true}
                modules={[Autoplay, Navigation]}
              >
                {Array.from({ length: 6 }).map((_, index) => (
                  <SwiperSlide
                    key={index}
                    className="mb-2 swiper-slide-x-large"
                  >
                    <div className="flex flex-col items-center justify-center max-w-3xl mx-auto">
                      <p className="text-primary-white text-responsive-text xl:text-lg font-medium italic tracking-wide text-center leading-relaxed">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Voluptas placeat obcaecati in necessitatibus
                        perferendis cupiditate laudantium nesciunt tempora, eius
                        labore, minus nulla officia? Quasi, itaque molestias
                        perspiciatis voluptatibus error repellat.
                      </p>
                      <div className="w-xs h-0.5 mt-16 mb-8 bg-primary-blue-light" />
                      <p className="text-primary-white text-responsive-text xl:text-lg font-medium tracking-wide text-center leading-relaxed">
                        Rabi Shah
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
      {/* Blog / Article */}
      <BlogCarousel />
      {/* Contact */}
      <ContactCards />
    </section>
  );
};

export default Home;
