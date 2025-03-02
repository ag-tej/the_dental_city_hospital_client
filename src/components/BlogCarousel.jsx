import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { NavLink, useLocation } from "react-router";
import eye from "../assets/eye.svg";
import appointmentBooking from "../assets/appointment-booking.webp"; // to remove

const BlogCarousel = () => {
  const location = useLocation();

  return (
    <div id="blogs" className="mt-16 px-5 md:px-8 xl:px-13">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-5">
          {location.pathname.startsWith("/blog/") ? (
            <p className="text-responsive-text xl:text-lg text-primary-blue-dark font-medium uppercase tracking-wide">
              Read More Articles
            </p>
          ) : (
            <>
              <p className="text-responsive-text xl:text-lg text-primary-blue-light font-medium uppercase tracking-wide">
                Better information, better health
              </p>
              <p className="text-responsive-heading text-primary-blue-dark font-semibold uppercase tracking-wide">
                Blogs / Articles
              </p>
            </>
          )}
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
                className="swiper-slide-large mb-2 rounded"
              >
                <NavLink to="/blog/slug">
                  {/* add dynamic slug */}
                  <div className="w-full h-full rounded flex flex-col xs:flex-row gap-2 bg-primary-white border border-black/5">
                    <img
                      src={appointmentBooking}
                      loading="lazy"
                      alt="Image Name"
                      className="xs:w-2/5 aspect-[5/3] xs:aspect-square object-cover rounded-l"
                    />
                    <div className="p-5 flex flex-col">
                      <p className="text-responsive-text text-primary-blue-dark tracking-wide mb-3">
                        Thursday 05, September 2021 | By Author
                      </p>
                      <p className="text-responsive-text xl:text-lg font-normal text-gray-900 tracking-wide mb-3">
                        Article Title Goes Here, but not too long
                      </p>
                      <div className="flex items-center gap-2 mt-auto">
                        <img
                          src={eye}
                          loading="lazy"
                          alt="View Icon"
                          className="size-5"
                        />
                        <p className="text-responsive-text text-gray-900 font-medium">
                          68
                        </p>
                      </div>
                    </div>
                  </div>
                </NavLink>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default BlogCarousel;
