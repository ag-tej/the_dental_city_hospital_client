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
          className="mt-24 lg:mt-0 max-h-[650px] min-h-60 w-full object-cover"
        />
        <div className="absolute left-5 md:left-8 xl:left-13 top-8 lg:top-40 hero-text text-responsive text-primary-blue-dark font-medium drop-shadow uppercase">
          <p>"AI is not yet a tool in</p>
          <p>health care, digitalization is."</p>
        </div>
      </div>
      {/* Cards */}
      <div className="mt-13 px-5 md:px-8 xl:px-13 max-w-7xl mx-auto flex flex-wrap gap-5 items-center justify-center">
        <NavLink to="/appointment">
          <div className="bg-primary-blue-dark w-xs flex items-center justify-between px-8 py-5 rounded text-white font-medium">
            <p>Book an Appointment</p>
            <img
              src={calendar2}
              loading="lazy"
              alt="Calendar Icon"
              className="h-11"
            />
          </div>
        </NavLink>
        <div
          className="bg-primary-blue-light w-xs flex items-center justify-between px-8 py-5 rounded text-primary-blue-dark font-medium cursor-pointer"
          onClick={() => {
            handleClick("doctors");
          }}
        >
          <p>Know Your Doctor</p>
          <img src={group} loading="lazy" alt="Group Icon" className="h-11" />
        </div>
        <NavLink to="services">
          <div className="bg-primary-blue-dark w-xs flex items-center justify-between px-8 py-5 rounded text-white font-medium">
            <p>Our Services</p>
            <img src={list} loading="lazy" alt="List Icon" className="h-11" />
          </div>
        </NavLink>
      </div>
      {/* About Us */}
      <div
        id="about-us"
        className="mt-16 px-5 md:px-8 xl:px-13 max-w-7xl mx-auto flex flex-col lg:flex-row gap-5 items-center justify-between"
      >
        <div className="text-center lg:text-left lg:w-1/2">
          <p className="text-responsive text-primary-blue-dark font-semibold uppercase tracking-wide">
            About Us
          </p>
          <p className="text-base xl:text-lg text-primary-blue-light font-medium uppercase tracking-wide">
            Know who we are
          </p>
          <p className="text-base font-normal text-gray-900 leading-relaxed mt-4 max-w-2xl">
            Welcome to The Dental City, the ultimate destination for world class
            dental care in Nepal located in the heritage city of Bhaktapur. We
            excel in the field of dentistry as in braces, aligners, Dental
            implants, root canal treatment, oral and maxillofacial surgery, gum
            diseases, child dentistry and every other field of dentistry.
            Looking forward for your excellent experience in Dental treatment
            with us.
          </p>
        </div>
        <div className="w-full lg:w-1/2">
          <img
            src={aboutUs}
            loading="lazy"
            alt="About Us Image"
            className="w-full max-w-lg mx-auto h-auto object-cover rounded-4xl"
          />
        </div>
      </div>
      {/* Book Your Appointment */}
      <div
        className="mt-16 h-fit relative bg-cover"
        style={{ backgroundImage: `url(${appointmentBooking})` }}
      >
        <div className="bg-primary-white/80 h-full w-full p-5 md:p-8 xl:p-13">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-5 items-center justify-between">
            <div className="lg:w-1/2 text-center text-responsive text-primary-blue-dark font-bold drop-shadow uppercase tracking-wide leading-snug">
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
      <div className="mt-16 px-5 md:px-8 xl:px-13 max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <p className="text-base xl:text-lg text-primary-blue-light font-medium uppercase tracking-wide">
            We take care of your oral health
          </p>
          <p className="text-responsive text-primary-blue-dark font-semibold uppercase tracking-wide">
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
            <SwiperSlide className="bg-primary-blue-dark text-white text-center font-medium rounded-3xl mb-2">
              <img
                src={appointmentBooking}
                loading="lazy"
                alt="Image Name"
                className="rounded-3xl w-full aspect-[5/4] object-cover"
              />
              <p className="p-4 text-lg tracking-wide">Digital Dentistry</p>
            </SwiperSlide>
            <SwiperSlide className="bg-primary-blue-dark text-white text-center font-medium rounded-3xl mb-2">
              <img
                src={appointmentBooking}
                loading="lazy"
                alt="Image Name"
                className="rounded-3xl w-full aspect-[5/4] object-cover"
              />
              <p className="p-4 text-lg tracking-wide">Digital Dentistry</p>
            </SwiperSlide>
            <SwiperSlide className="bg-primary-blue-dark text-white text-center font-medium rounded-3xl mb-2">
              <img
                src={appointmentBooking}
                loading="lazy"
                alt="Image Name"
                className="rounded-3xl w-full aspect-[5/4] object-cover"
              />
              <p className="p-4 text-lg tracking-wide">Digital Dentistry</p>
            </SwiperSlide>
            <SwiperSlide className="bg-primary-blue-dark text-white text-center font-medium rounded-3xl mb-2">
              <img
                src={appointmentBooking}
                loading="lazy"
                alt="Image Name"
                className="rounded-3xl w-full aspect-[5/4] object-cover"
              />
              <p className="p-4 text-lg tracking-wide">Digital Dentistry</p>
            </SwiperSlide>
            <SwiperSlide className="bg-primary-blue-dark text-white text-center font-medium rounded-3xl mb-2">
              <img
                src={appointmentBooking}
                loading="lazy"
                alt="Image Name"
                className="rounded-3xl w-full aspect-[5/4] object-cover"
              />
              <p className="p-4 text-lg tracking-wide">Digital Dentistry</p>
            </SwiperSlide>
            <SwiperSlide className="bg-primary-blue-dark text-white text-center font-medium rounded-3xl mb-2">
              <img
                src={appointmentBooking}
                loading="lazy"
                alt="Image Name"
                className="rounded-3xl w-full aspect-[5/4] object-cover"
              />
              <p className="p-4 text-lg tracking-wide">Digital Dentistry</p>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      {/* Our Doctors */}
      <div
        id="doctors"
        className="mt-16 px-5 md:px-8 xl:px-13 max-w-7xl mx-auto"
      >
        <div className="text-center mb-4">
          <p className="text-base xl:text-lg text-primary-blue-light font-medium uppercase tracking-wide">
            Meet
          </p>
          <p className="text-responsive text-primary-blue-dark font-semibold uppercase tracking-wide">
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
            <SwiperSlide className="bg-primary-blue-light text-primary-blue-dark text-center font-medium rounded mb-2">
              <img
                src={appointmentBooking}
                loading="lazy"
                alt="Image Name"
                className="w-full aspect-[5/4] object-cover rounded"
              />
              <div className="p-4">
                <p className="text-lg font-medium tracking-wide uppercase mb-1">
                  Doctor Name
                </p>
                <p className="text-base font-normal tracking-wide uppercase mb-3">
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
            <SwiperSlide className="bg-primary-blue-light text-primary-blue-dark text-center font-medium rounded">
              <img
                src={appointmentBooking}
                loading="lazy"
                alt="Image Name"
                className="w-full aspect-[5/4] object-cover rounded"
              />
              <div className="p-4">
                <p className="text-lg font-medium tracking-wide uppercase mb-1">
                  Doctor Name
                </p>
                <p className="text-base font-normal tracking-wide uppercase mb-3">
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
            <SwiperSlide className="bg-primary-blue-light text-primary-blue-dark text-center font-medium rounded">
              <img
                src={appointmentBooking}
                loading="lazy"
                alt="Image Name"
                className="w-full aspect-[5/4] object-cover rounded"
              />
              <div className="p-4">
                <p className="text-lg font-medium tracking-wide uppercase mb-1">
                  Doctor Name
                </p>
                <p className="text-base font-normal tracking-wide uppercase mb-3">
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
            <SwiperSlide className="bg-primary-blue-light text-primary-blue-dark text-center font-medium rounded">
              <img
                src={appointmentBooking}
                loading="lazy"
                alt="Image Name"
                className="w-full aspect-[5/4] object-cover rounded"
              />
              <div className="p-4">
                <p className="text-lg font-medium tracking-wide uppercase mb-1">
                  Doctor Name
                </p>
                <p className="text-base font-normal tracking-wide uppercase mb-3">
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
            <SwiperSlide className="bg-primary-blue-light text-primary-blue-dark text-center font-medium rounded">
              <img
                src={appointmentBooking}
                loading="lazy"
                alt="Image Name"
                className="w-full aspect-[5/4] object-cover rounded"
              />
              <div className="p-4">
                <p className="text-lg font-medium tracking-wide uppercase mb-1">
                  Doctor Name
                </p>
                <p className="text-base font-normal tracking-wide uppercase mb-3">
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
            <SwiperSlide className="bg-primary-blue-light text-primary-blue-dark text-center font-medium rounded">
              <img
                src={appointmentBooking}
                loading="lazy"
                alt="Image Name"
                className="w-full aspect-[5/4] object-cover rounded"
              />
              <div className="p-4">
                <p className="text-lg font-medium tracking-wide uppercase mb-1">
                  Doctor Name
                </p>
                <p className="text-base font-normal tracking-wide uppercase mb-3">
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
          </Swiper>
        </div>
      </div>
      {/* Testimonials */}
      <div
        className="mt-16 h-fit relative bg-cover bg-center"
        style={{ backgroundImage: `url(${testimonialsBackground})` }}
      >
        <div className="bg-[#1F2B6C]/60 backdrop-blur-xs h-full w-full px-5 md:px-8 xl:px-13 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-base xl:text-lg text-primary-white font-medium uppercase tracking-wide">
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
                <SwiperSlide className="mb-2 swiper-slide-x-large">
                  <div className="flex flex-col items-center justify-center max-w-3xl mx-auto">
                    <p className="text-primary-white md:text-lg font-medium italic tracking-wide text-center leading-relaxed">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Voluptas placeat obcaecati in necessitatibus perferendis
                      cupiditate laudantium nesciunt tempora, eius labore, minus
                      nulla officia? Quasi, itaque molestias perspiciatis
                      voluptatibus error repellat.
                    </p>
                    <div className="w-xs h-0.5 mt-12 mb-8 bg-primary-blue-light" />
                    <p className="text-primary-white text-lg font-medium tracking-wide text-center leading-relaxed">
                      Rabi Shah
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="mb-2 swiper-slide-x-large">
                  <div className="flex flex-col items-center justify-center max-w-3xl mx-auto">
                    <p className="text-primary-white md:text-lg font-medium italic tracking-wide text-center leading-relaxed">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Voluptas placeat obcaecati in necessitatibus perferendis
                      cupiditate laudantium nesciunt tempora, eius labore, minus
                      nulla officia? Quasi, itaque molestias perspiciatis
                      voluptatibus error repellat.
                    </p>
                    <div className="w-xs h-0.5 mt-12 mb-8 bg-primary-blue-light" />
                    <p className="text-primary-white text-lg font-medium tracking-wide text-center leading-relaxed">
                      Rabi Shah
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="mb-2 swiper-slide-x-large">
                  <div className="flex flex-col items-center justify-center max-w-3xl mx-auto">
                    <p className="text-primary-white md:text-lg font-medium italic tracking-wide text-center leading-relaxed">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Voluptas placeat obcaecati in necessitatibus perferendis
                      cupiditate laudantium nesciunt tempora, eius labore, minus
                      nulla officia? Quasi, itaque molestias perspiciatis
                      voluptatibus error repellat.
                    </p>
                    <div className="w-xs h-0.5 mt-12 mb-8 bg-primary-blue-light" />
                    <p className="text-primary-white text-lg font-medium tracking-wide text-center leading-relaxed">
                      Rabi Shah
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="mb-2 swiper-slide-x-large">
                  <div className="flex flex-col items-center justify-center max-w-3xl mx-auto">
                    <p className="text-primary-white md:text-lg font-medium italic tracking-wide text-center leading-relaxed">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Voluptas placeat obcaecati in necessitatibus perferendis
                      cupiditate laudantium nesciunt tempora, eius labore, minus
                      nulla officia? Quasi, itaque molestias perspiciatis
                      voluptatibus error repellat.
                    </p>
                    <div className="w-xs h-0.5 mt-12 mb-8 bg-primary-blue-light" />
                    <p className="text-primary-white text-lg font-medium tracking-wide text-center leading-relaxed">
                      Rabi Shah
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="mb-2 swiper-slide-x-large">
                  <div className="flex flex-col items-center justify-center max-w-3xl mx-auto">
                    <p className="text-primary-white md:text-lg font-medium italic tracking-wide text-center leading-relaxed">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Voluptas placeat obcaecati in necessitatibus perferendis
                      cupiditate laudantium nesciunt tempora, eius labore, minus
                      nulla officia? Quasi, itaque molestias perspiciatis
                      voluptatibus error repellat.
                    </p>
                    <div className="w-xs h-0.5 mt-12 mb-8 bg-primary-blue-light" />
                    <p className="text-primary-white text-lg font-medium tracking-wide text-center leading-relaxed">
                      Rabi Shah
                    </p>
                  </div>
                </SwiperSlide>
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
