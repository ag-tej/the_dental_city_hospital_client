import {
  FaClock,
  FaEnvelope,
  FaLocationDot,
  FaPhoneVolume,
} from "react-icons/fa6";

const ContactCards = () => {
  return (
    <div className="my-16 px-5 md:px-8 xl:px-13">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-5">
          <p className="text-responsive-text xl:text-lg text-primary-blue-light font-medium uppercase tracking-wide">
            Get in touch
          </p>
          <p className="text-responsive-heading text-primary-blue-dark font-semibold uppercase tracking-wide">
            Contact
          </p>
        </div>
        <div className="flex flex-wrap gap-5 md:gap-8 xl:gap-13 items-center justify-center">
          <div className="text-responsive-text bg-primary-blue-light text-primary-blue-dark hover:bg-primary-blue-dark hover:text-primary-blue-light px-5 py-8 rounded w-[230px] h-[200px]">
            <FaPhoneVolume className="text-2xl mb-5" />
            <p className="font-medium uppercase mb-3">Emergency</p>
            <a href="tel:01-6636277" className="block tracking-wide mb-1">
              01-6636277
            </a>
            <a href="tel:+977 980-1222339" className="block tracking-wide">
              9801222339
            </a>
          </div>
          <div className="text-responsive-text bg-primary-blue-light text-primary-blue-dark hover:bg-primary-blue-dark hover:text-primary-blue-light px-5 py-8 rounded w-[230px] h-[200px]">
            <FaLocationDot className="text-2xl mb-5" />
            <p className="font-medium uppercase mb-3">Location</p>
            <a
              href="https://maps.app.goo.gl/msRc6VPc1zcD6AdUA"
              target="_blank"
              rel="noopener noreferrer"
              className="block tracking-wide"
            >
              Madhyapur Thimi-05,
              <br />
              Bhaktapur, Nepal
            </a>
          </div>
          <div className="text-responsive-text bg-primary-blue-light text-primary-blue-dark hover:bg-primary-blue-dark hover:text-primary-blue-light px-5 py-8 rounded w-[230px] h-[200px]">
            <FaEnvelope className="text-2xl mb-5" />
            <p className="font-medium uppercase mb-3">Email</p>
            <a
              href="mailto:thedentalcity@gmail.com"
              className="block tracking-wide"
            >
              thedentalcity@gmail.com
            </a>
          </div>
          <div className="text-responsive-text bg-primary-blue-light text-primary-blue-dark hover:bg-primary-blue-dark hover:text-primary-blue-light px-5 py-8 rounded w-[230px] h-[200px]">
            <FaClock className="text-2xl mb-5" />
            <p className="font-medium uppercase mb-3">Working Hours</p>
            <p className="mb-1 tracking-wide">Sun-Sat 08:00-20:00</p>
            <p className="tracking-wide">open whole week</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCards;
