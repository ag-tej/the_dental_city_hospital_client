import contactHero from "../assets/contact-hero.webp";
import BlogCarousel from "../components/BlogCarousel";
import {
  FaClock,
  FaEnvelope,
  FaLocationDot,
  FaPhoneVolume,
} from "react-icons/fa6";

const Contact = () => {
  return (
    <section>
      {/* Hero */}
      <div
        className="w-full aspect-[3/2] md:aspect-[5/2] max-h-[400px] mt-20 xl:mt-0 bg-cover border-b-4 border-primary-blue-dark"
        style={{ backgroundImage: `url(${contactHero})` }}
      >
        <div className="bg-primary-white/50 h-full w-full p-5 md:p-8 xl:p-13 flex flex-col justify-center">
          <p className="text-responsive-text xl:text-lg text-primary-blue-dark font-medium uppercase tracking-wide">
            Home / Contact
          </p>
          <p className="text-responsive-heading text-primary-blue-dark font-semibold tracking-wide uppercase drop-shadow">
            Our Contacts
          </p>
        </div>
      </div>
      {/* Contact */}
      <div className="mt-16 px-5 md:px-8 xl:px-13 max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col xl:flex-row gap-5 md:gap-8 xl:gap-13 items-center justify-center">
          <div className="w-full max-w-2xl xl:w-1/2">
            <div className="mb-5">
              <p className="text-responsive-text xl:text-lg text-primary-blue-light font-medium uppercase tracking-wide">
                Get in touch
              </p>
              <p className="text-responsive-heading text-primary-blue-dark font-semibold uppercase tracking-wide">
                Contact
              </p>
            </div>
            <form action="#" className="grid grid-cols-1 gap-[1px]">
              <div className="grid grid-cols-1 ss:grid-cols-2 gap-[1px]">
                <div>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className="input bg-primary-blue-dark text-white placeholder:text-white h-full py-3 px-5 rounded-none rounded-t ss:rounded-tl"
                    value=""
                    onChange=""
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div>
                  <input
                    type="number"
                    min={9111111111}
                    id="phone"
                    name="phone"
                    className="input bg-primary-blue-dark text-white placeholder:text-white h-full py-3 px-5 rounded-none"
                    value=""
                    onChange=""
                    placeholder="Phone"
                    required
                  />
                </div>
              </div>
              <input
                type="email"
                id="email"
                name="email"
                className="input bg-primary-blue-dark text-white placeholder:text-white h-full py-3 px-5 rounded-none"
                value=""
                onChange=""
                placeholder="Email"
                required
              />
              <textarea
                rows={5}
                id="message"
                name="message"
                className="input bg-primary-blue-dark text-white placeholder:text-white h-full py-3 px-5 rounded-none"
                value=""
                onChange=""
                placeholder="Message"
                required
              />
              <button className="button text-primary-blue-dark bg-primary-blue-light font-medium rounded-none rounded-b uppercase hover:shadow-none">
                Submit
              </button>
            </form>
          </div>
          <div className="xl:w-1/2">
            <div className="flex flex-wrap gap-5 items-center justify-center">
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
        {/* Maps */}
        <div className="rounded shadow-dark">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.3910067479883!2d85.39154529999999!3d27.6743075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1b2910ae91cf%3A0x9e40b390b9f07a31!2sThe%20Dental%20City%20Hospital!5e0!3m2!1sen!2snp!4v1740829171601!5m2!1sen!2snp"
            className="w-full rounded"
            height="500"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      {/* Blogs / Articles */}
      <div className="mb-16">
        <BlogCarousel />
      </div>
    </section>
  );
};

export default Contact;
