import { FaPhoneVolume } from "react-icons/fa6";
import appointmentHero from "../assets/about-us.webp";
import AppointmentForm from "../components/AppointmentForm";
import ContactCards from "../components/ContactCards";

const Appointment = () => {
  return (
    <section>
      {/* Hero */}
      <div
        className="w-full aspect-[3/2] md:aspect-[5/2] max-h-[400px] mt-20 xl:mt-0 bg-cover border-b-4 border-primary-blue-dark"
        style={{ backgroundImage: `url(${appointmentHero})` }}
      >
        <div className="bg-primary-white/50 h-full w-full p-5 md:p-8 xl:p-13 flex flex-col justify-center">
          <p className="text-base xl:text-lg text-primary-blue-dark font-medium uppercase tracking-wide">
            Home / Appointment
          </p>
          <p className="text-responsive text-primary-blue-dark font-semibold tracking-wide uppercase drop-shadow">
            Book an Appointment
          </p>
        </div>
      </div>
      {/* Appointment */}
      <div className="mt-16 px-5 md:px-8 xl:px-13 max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col lg:flex-row gap-5 md:gap-8 xl:gap-13 items-center justify-center">
          <div className="lg:w-1/2">
            <div className="mb-8">
              <p className="text-responsive text-primary-blue-dark font-semibold uppercase tracking-wide">
                Book an Appointment
              </p>
              <p className="text-base text-gray-900 tracking-wide">
                Fill up the form below to make an appointment and meet the
                doctor with the specialty as of your choice.
              </p>
            </div>
            <AppointmentForm />
          </div>
          <div className="w-fit p-8 text-primary-white bg-primary-blue-dark flex flex-col items-center gap-8 rounded">
            <p className="text-responsive font-medium tracking-wide text-center">
              Schedule Hours
            </p>
            <div className="flex gap-8 leading-relaxed">
              <ul className="space-y-3">
                <li>Monday</li>
                <li>Tuesday</li>
                <li>Wednesday</li>
                <li>Thursday</li>
                <li>Friday</li>
                <li>Saturday</li>
                <li>Sunday</li>
              </ul>
              <ul className="space-y-3">
                <li>-</li>
                <li>-</li>
                <li>-</li>
                <li>-</li>
                <li>-</li>
                <li>-</li>
                <li>-</li>
              </ul>
              <ul className="space-y-3">
                <li>08:00 AM - 08:00 PM</li>
                <li>08:00 AM - 08:00 PM</li>
                <li>08:00 AM - 08:00 PM</li>
                <li>08:00 AM - 08:00 PM</li>
                <li>08:00 AM - 08:00 PM</li>
                <li>08:00 AM - 08:00 PM</li>
                <li>08:00 AM - 08:00 PM</li>
              </ul>
            </div>
            <div className="w-4/5 h-0.5 bg-primary-white" />
            <div className="flex items-center gap-5">
              <FaPhoneVolume className="text-4xl" />
              <div>
                <p className="text-base xl:text-lg">Emergency</p>
                <a
                  href="tel:+977 980-1222339"
                  className="block text-base xl:text-lg"
                >
                  9801222339
                </a>
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
      {/* Contacts */}
      <ContactCards />
    </section>
  );
};

export default Appointment;
