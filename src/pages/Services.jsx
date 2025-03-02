import servicesHero from "../assets/services-hero.webp";
import ContactCards from "../components/ContactCards";
import { serviceData } from "../data/ServiceData";

const Services = () => {
  return (
    <section>
      {/* Hero */}
      <div
        className="w-full aspect-[3/2] md:aspect-[5/2] max-h-[400px] mt-20 xl:mt-0 bg-cover border-b-4 border-primary-blue-dark"
        style={{ backgroundImage: `url(${servicesHero})` }}
      >
        <div className="bg-primary-white/50 h-full w-full p-5 md:p-8 xl:p-13 flex flex-col justify-center">
          <p className="text-responsive-text xl:text-lg text-primary-blue-dark font-medium uppercase tracking-wide">
            Home / Services
          </p>
          <p className="text-responsive-heading text-primary-blue-dark font-semibold tracking-wide uppercase drop-shadow">
            Our Services
          </p>
        </div>
      </div>
      {/* Services */}
      <div className="mt-16 px-5 md:px-8 xl:px-13">
        <div className="max-w-7xl mx-auto space-y-16">
          {serviceData.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row gap-5 md:gap-8 xl:gap-13 md:items-center md:justify-center  max-w-lg md:max-w-full mx-auto"
            >
              <div className="md:w-1/2">
                <p className="text-responsive-heading text-primary-blue-dark font-semibold tracking-wide">
                  {item.name}
                </p>
                <ul className="mt-3 ml-5 list-disc tracking-wide leading-relaxed text-responsive-text xl:text-lg">
                  {item.description.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))}
                </ul>
              </div>
              <div className="md:w-1/2 max-w-lg">
                <img
                  src={item.image}
                  alt="Service Name"
                  className="w-full aspect-[3/2] object-cover rounded-4xl shadow-dark"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Contact */}
      <ContactCards />
    </section>
  );
};

export default Services;
