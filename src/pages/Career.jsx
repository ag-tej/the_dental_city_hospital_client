import { ImUserCheck } from "react-icons/im";
import careerHero from "../assets/career-hero.webp";

const Career = () => {
  // implement file size check on submit
  // document
  //   .getElementById("resume")
  //   .addEventListener("change", function (event) {
  //     const file = event.target.files[0];
  //     const maxSize = 500 * 1024; // 500 KB in bytes

  //     if (file) {
  //       if (file.size > maxSize) {
  //         // Show error message if file size exceeds 500 KB
  //         document.getElementById("error-message").style.display = "block";
  //         event.target.value = ""; // Clear the input field
  //       } else {
  //         // Hide error message if file size is valid
  //         document.getElementById("error-message").style.display = "none";
  //       }
  //     }
  //   });

  return (
    <section>
      {/* Hero */}
      <div
        className="w-full aspect-[3/2] md:aspect-[5/2] max-h-[400px] mt-20 xl:mt-0 bg-cover bg-bottom border-b-4 border-primary-blue-dark"
        style={{ backgroundImage: `url(${careerHero})` }}
      >
        <div className="bg-primary-white/50 h-full w-full p-5 md:p-8 xl:p-13 flex flex-col justify-center">
          <p className="text-base xl:text-lg text-primary-blue-dark font-medium uppercase tracking-wide">
            Home / Career
          </p>
          <p className="text-responsive text-primary-blue-dark font-semibold tracking-wide uppercase drop-shadow">
            Join Us
          </p>
        </div>
      </div>
      {/* Vacancy */}
      <div className="bg-primary-blue-light">
        <div className="max-w-5xl mx-auto p-5 md:p-8 xl:p-13">
          <p className="text-responsive text-primary-blue-dark text-center mb-8 xl:mb-13 font-semibold tracking-wide uppercase">
            Vacancy / Recruitment
          </p>
          <div className="flex flex-wrap gap-8 xl:gap-13 items-center justify-center">
            <div className="text-center">
              <p className="text-responsive text-gray-900 font-semibold tracking-wide">
                Job Title
              </p>
              <p className="text-base xl:text-lg text-primary-blue-dark mb-3">
                Job Date
              </p>
              <p className="text-gray-900 tracking-wide leading-relaxed max-w-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,
                iusto tenetur recusandae vel commodi obcaecati repellat minus
                nulla rerum omnis, cum laboriosam repellendus vero neque dolorem
                in placeat architecto numquam.
              </p>
            </div>
            <div className="text-center">
              <p className="text-responsive text-gray-900 font-semibold tracking-wide">
                Job Title
              </p>
              <p className="text-base xl:text-lg text-primary-blue-dark mb-3">
                Job Date
              </p>
              <p className="text-gray-900 tracking-wide leading-relaxed max-w-sm">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex cum
                commodi, pariatur iure, nostrum assumenda omnis eius adipisci
                doloremque eveniet natus consectetur tempora corporis eligendi
                officia hic architecto molestias qui?
              </p>
            </div>
            <div className="text-center">
              <p className="text-responsive text-gray-900 font-semibold tracking-wide">
                Job Title
              </p>
              <p className="text-base xl:text-lg text-primary-blue-dark mb-3">
                Job Date
              </p>
              <p className="text-gray-900 tracking-wide leading-relaxed max-w-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. A nulla
                eaque quaerat, deserunt ipsa, quam saepe unde voluptas magni
                nihil corrupti non? Quidem quisquam quia voluptate ut labore
                maiores harum!
              </p>
            </div>
            <div className="text-center">
              <p className="text-responsive text-gray-900 font-semibold tracking-wide">
                Job Title
              </p>
              <p className="text-base xl:text-lg text-primary-blue-dark mb-3">
                Job Date
              </p>
              <p className="text-gray-900 tracking-wide leading-relaxed max-w-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo officiis odit nesciunt eveniet exercitationem, fugiat
                repudiandae laudantium qui, labore inventore excepturi quis,
                animi unde? Molestiae atque animi nemo similique inventore.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Application Form */}
      <div className="my-16 px-5 md:px-8 xl:px-13">
        <p className="text-responsive text-primary-blue-dark text-center mb-5 font-semibold tracking-wide uppercase">
          Application Form
        </p>
        <div className="bg-primary-blue-dark max-w-2xl mx-auto p-8 rounded">
          <form action="#" className="grid grid-cols-1 gap-5">
            <div>
              <label htmlFor="fullname" className="label text-primary-white">
                Fullname
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                className="input bg-transparent border border-white text-primary-white"
                value=""
                onChange=""
                required
              />
            </div>
            <div className="grid grid-cols-1 ss:grid-cols-2 gap-5">
              <div>
                <label htmlFor="email" className="label text-primary-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input bg-transparent border border-white text-primary-white"
                  value=""
                  onChange=""
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="label text-primary-white">
                  Phone
                </label>
                <input
                  type="number"
                  min={9111111111}
                  id="phone"
                  name="phone"
                  className="input bg-transparent border border-white text-primary-white"
                  value=""
                  onChange=""
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="applied-position"
                  className="label text-primary-white"
                >
                  Applied Position
                </label>
                <input
                  type="text"
                  id="applied-position"
                  name="applied-position"
                  className="input bg-transparent border border-white text-primary-white"
                  value=""
                  onChange=""
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="earliest-start-date"
                  className="label text-primary-white"
                >
                  Phone
                </label>
                <input
                  type="date"
                  id="earliest-start-date"
                  name="earliest-start-date"
                  className="input bg-transparent border border-white text-primary-white"
                  value=""
                  onChange=""
                  required
                />
              </div>
            </div>
            <div>
              <p className="label text-primary-white">Upload Resume</p>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="resume"
                  className="flex flex-col items-center justify-center w-full h-40 border border-white rounded cursor-pointer bg-transparent"
                >
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      className="w-8 h-8 mb-4 text-primary-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-primary-white">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-primary-white">
                      PDF (MAX. 500KB)
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="application/pdf"
                    id="resume"
                    name="resume"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <div>
              <p className="label text-primary-white">
                Any Other Document{" "}
                <span className="text-sm font-normal">(optional)</span>
              </p>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="other-document"
                  className="flex flex-col items-center justify-center w-full h-40 border border-white rounded cursor-pointer bg-transparent"
                >
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      className="w-8 h-8 mb-4 text-primary-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-primary-white">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-primary-white">
                      PDF (MAX. 500KB)
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="application/pdf"
                    id="other-document"
                    name="other-document"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <div className="ml-auto">
              <button
                type="submit"
                className="button flex items-center gap-2 border border-white rounded py-1 px-3 uppercase font-medium"
              >
                Apply <ImUserCheck className="text-xl" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Career;
