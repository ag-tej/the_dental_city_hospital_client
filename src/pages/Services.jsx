import servicesHero from "../assets/services-hero.webp";
import ContactCards from "../components/ContactCards";

const Services = () => {
  return (
    <section>
      {/* Hero */}
      <div
        className="w-full aspect-[3/2] md:aspect-[5/2] max-h-[400px] mt-20 xl:mt-0 bg-cover border-b-4 border-primary-blue-dark"
        style={{ backgroundImage: `url(${servicesHero})` }}
      >
        <div className="bg-primary-white/50 h-full w-full p-5 md:p-8 xl:p-13 flex flex-col justify-center">
          <p className="text-base xl:text-lg text-primary-blue-dark font-medium uppercase tracking-wide">
            Home / Services
          </p>
          <p className="text-responsive text-primary-blue-dark font-semibold tracking-wide uppercase drop-shadow">
            Our Services
          </p>
        </div>
      </div>
      {/* Services */}
      <div className="mt-16 px-5 md:px-8 xl:px-13 max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row gap-5 md:gap-8 xl:gap-13 items-center justify-center">
          <div className="md:w-1/2 text-center md:text-left">
            <p className="text-responsive text-primary-blue-dark font-semibold tracking-wide">
              Oral Medicine & Radiology
            </p>
            <ul className="mt-3 ml-5 md:list-disc tracking-wide leading-relaxed text-sm sm:text-base xl:text-lg">
              <li>All kind of soft and hard tissue diagnosis.</li>
              <li>Medical treatment of oral diseases.</li>
              <li>Treatment of temporomandibular joint disorders.</li>
              <li>All kind of radiological diagnosis: x-ray, CBCT, OPG etc.</li>
            </ul>
          </div>
          <div className="md:w-1/2 max-w-lg">
            <img
              src={servicesHero}
              alt="Service Name"
              className="w-full aspect-[3/2] object-cover rounded-4xl shadow-dark"
            />
          </div>
        </div>
      </div>
      {/* Contact */}
      <ContactCards />
    </section>
  );
};

export default Services;
