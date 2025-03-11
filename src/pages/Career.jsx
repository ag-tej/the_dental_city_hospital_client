import { useCallback, useEffect, useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import useAxios from "../admin/UseAxios";
import moment from "moment-timezone";
import TextReader from "../admin/components/TextReader";
import careerHero from "../assets/career-hero.webp";

const Career = () => {
  const axiosInstance = useAxios();
  const [vacancies, setVacancies] = useState([]);
  const [appliedPosition, setAppliedPosition] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resumeError, setResumeError] = useState("");
  const [otherDocumentError, setOtherDocumentError] = useState("");
  const [resumeFileName, setResumeFileName] = useState(""); // State to track the resume file name
  const [otherDocumentFileName, setOtherDocumentFileName] = useState(""); // State to track the other document file name
  const applicationFormSection = document.getElementById("application-from");

  const fetchVacancies = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/vacancy/current-opening");
      if (response.data.success) setVacancies(response.data.data);
    } catch (error) {
      window.alert(error.response?.data?.message || "Something went wrong");
    }
  }, [axiosInstance]);

  useEffect(() => {
    fetchVacancies();
  }, [fetchVacancies]);

  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    const maxSize = 500 * 1024; // 500 KB in bytes
    if (file) {
      if (file.size > maxSize) {
        if (type === "resume") setResumeError("File size exceeds 500KB");
        else setOtherDocumentError("File size exceeds 500KB");
        event.target.value = ""; // Clear the input field
      } else {
        if (type === "resume") {
          setResumeError("");
          setResumeFileName(file.name); // Set the file name for resume
        } else {
          setOtherDocumentError("");
          setOtherDocumentFileName(file.name); // Set the file name for other document
        }
      }
    }
  };

  const handleFileRemove = (type) => {
    if (type === "resume") {
      setResumeFileName(""); // Clear the resume file name
      document.getElementById("resume").value = ""; // Reset the input
    } else {
      setOtherDocumentFileName(""); // Clear the other document file name
      document.getElementById("other_document").value = ""; // Reset the input
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.target);
    const resumeFile = document.getElementById("resume").files[0];
    const otherDocumentFile =
      document.getElementById("other_document").files[0];
    const data = new FormData();
    data.append("fullname", formData.get("fullname"));
    data.append("email", formData.get("email"));
    data.append("phone", formData.get("phone"));
    data.append("applied_position", formData.get("applied_position"));
    data.append("earliest_start_date", formData.get("earliest_start_date"));
    data.append("resume", resumeFile);
    if (otherDocumentFile) data.append("other_document", otherDocumentFile);
    try {
      const response = await axiosInstance.post(
        "/jobApplication/create",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        window.alert("Your application has been recorded!");
        event.target.reset();
        setAppliedPosition("");
        setResumeFileName("");
        setOtherDocumentFileName("");
      }
    } catch (error) {
      window.alert(
        error.response?.data?.message || "Failed to submit application"
      );
    }
    setIsLoading(false);
  };

  return (
    <section>
      {/* Hero */}
      <div
        className="w-full aspect-[3/2] md:aspect-[5/2] max-h-[400px] mt-20 xl:mt-0 bg-cover bg-bottom border-b-4 border-primary-blue-dark"
        style={{ backgroundImage: `url(${careerHero})` }}
      >
        <div className="bg-primary-white/50 h-full w-full p-5 md:p-8 xl:p-13 flex flex-col justify-center">
          <p className="text-responsive-text xl:text-lg text-primary-blue-dark font-medium uppercase tracking-wide">
            Home / Career
          </p>
          <p className="text-responsive-heading text-primary-blue-dark font-semibold tracking-wide uppercase drop-shadow">
            Join Us
          </p>
        </div>
      </div>
      {/* Vacancy */}
      <div className="p-5 md:p-8 xl:p-13 bg-primary-blue-light">
        <div className="max-w-5xl mx-auto">
          <p className="text-responsive-heading text-primary-blue-dark text-center mb-8 xl:mb-13 font-semibold tracking-wide uppercase">
            Vacancy / Recruitment
          </p>
          {vacancies && vacancies.length > 0 ? (
            <div className="flex flex-wrap gap-8 xl:gap-13 items-center justify-center">
              {vacancies.map((item) => (
                <div key={item._id}>
                  <div className="flex gap-5 flex-col xs:flex-row xs:items-center justify-between mb-5">
                    <div>
                      <p className="text-responsive-heading text-gray-900 font-semibold tracking-wide mb-1">
                        {item.job_title}
                      </p>
                      <p className="text-responsive-text text-gray-700">
                        Apply Before:{" "}
                        <span className="text-primary-blue-dark font-medium">
                          {moment(item.last_date)
                            .tz("Asia/Kathmandu")
                            .format("dddd, MMMM D, YYYY")}
                        </span>
                      </p>
                    </div>
                    <div>
                      <button
                        className="button rounded py-2"
                        onClick={() => {
                          setAppliedPosition(item.job_title);
                          applicationFormSection.scrollIntoView({
                            behavior: "smooth",
                          });
                        }}
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 mb-2">
                      Job Description
                    </p>
                    <div className="pt-3 px-3 border border-primary-blue-dark/10 rounded">
                      <TextReader content={item.description} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-responsive-text text-center">
              <p className="xl:text-lg font-medium text-gray-900 leading-relaxed tracking-wide uppercase">
                No Current Opening
              </p>
              <p className="text-gray-700 leading-relaxed tracking-wide">
                Drop your CV to <strong>Join Our Talent Pool</strong>.
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Application Form */}
      <div id="application-from" className="my-16 px-5 md:px-8 xl:px-13">
        <p className="text-responsive-heading text-primary-blue-dark text-center mb-5 font-semibold tracking-wide uppercase">
          Application Form
        </p>
        <div className="bg-primary-blue-dark max-w-2xl mx-auto p-8 rounded">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
            <div>
              <label htmlFor="fullname" className="label text-primary-white">
                Fullname
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                className={`input bg-transparent border border-white text-primary-white ${
                  isLoading && "cursor-not-allowed"
                }`}
                required
                disabled={isLoading}
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
                  className={`input bg-transparent border border-white text-primary-white ${
                    isLoading && "cursor-not-allowed"
                  }`}
                  required
                  disabled={isLoading}
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
                  className={`input bg-transparent border border-white text-primary-white ${
                    isLoading && "cursor-not-allowed"
                  }`}
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <label
                  htmlFor="applied_position"
                  className="label text-primary-white"
                >
                  Applied Position
                </label>
                <input
                  type="text"
                  id="applied_position"
                  name="applied_position"
                  defaultValue={appliedPosition}
                  className={`input bg-transparent border border-white text-primary-white ${
                    isLoading && "cursor-not-allowed"
                  }`}
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <label
                  htmlFor="earliest_start_date"
                  className="label text-primary-white"
                >
                  Earliest Start Date
                </label>
                <input
                  type="date"
                  id="earliest_start_date"
                  name="earliest_start_date"
                  className={`input bg-transparent border border-white text-primary-white ${
                    isLoading && "cursor-not-allowed"
                  }`}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <div>
              <p className="label text-primary-white">Upload Resume</p>
              {resumeError && (
                <p className="text-base font-medium text-red-300 mb-1">
                  {resumeError}
                </p>
              )}
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="resume"
                  className={`flex flex-col items-center justify-center w-full h-40 border border-white rounded bg-transparent ${
                    isLoading ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  <div className="flex flex-col items-center justify-center absolute z-0">
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
                    {resumeFileName ? (
                      <p className="mt-2 text-sm text-primary-white">
                        {resumeFileName}
                      </p>
                    ) : (
                      <>
                        <p className="mb-2 text-sm text-primary-white">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-primary-white">
                          PDF (MAX. 500KB)
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="application/pdf"
                    id="resume"
                    name="resume"
                    className={`text-primary-blue-dark w-full h-full z-10 ${
                      isLoading ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    required
                    disabled={isLoading}
                    onChange={(e) => handleFileChange(e, "resume")}
                  />
                </label>
              </div>
              {resumeFileName && (
                <button
                  type="button"
                  className="w-full text-red-300 flex items-center justify-center gap-3 mt-2 cursor-pointer"
                  onClick={() => handleFileRemove("resume")}
                >
                  Remove File
                  <FaDeleteLeft className="text-2xl" />
                </button>
              )}
            </div>
            <div>
              <p className="label text-primary-white">
                Upload Other Documents{" "}
                <span className="text-sm font-normal">(optional)</span>
              </p>
              {otherDocumentError && (
                <p className="text-base font-medium text-red-300 mb-1">
                  {otherDocumentError}
                </p>
              )}
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="other_document"
                  className={`flex flex-col items-center justify-center w-full h-40 border border-white rounded bg-transparent ${
                    isLoading ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  <div className="flex flex-col items-center justify-center absolute z-0">
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
                    {otherDocumentFileName ? (
                      <p className="mt-2 text-sm text-primary-white">
                        {otherDocumentFileName}
                      </p>
                    ) : (
                      <>
                        <p className="mb-2 text-sm text-primary-white">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-primary-white">
                          PDF (MAX. 500KB)
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="application/pdf"
                    id="other_document"
                    name="other_document"
                    className={`text-primary-blue-dark w-full h-full z-10 ${
                      isLoading ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    disabled={isLoading}
                    onChange={(e) => handleFileChange(e, "other_document")}
                  />
                </label>
              </div>
              {otherDocumentFileName && (
                <button
                  type="button"
                  className="w-full text-red-300 flex items-center justify-center gap-3 mt-2 cursor-pointer"
                  onClick={() => handleFileRemove("other_document")}
                >
                  Remove File
                  <FaDeleteLeft className="text-2xl" />
                </button>
              )}
            </div>
            <div className="ml-auto">
              <button
                type="submit"
                className={`button py-1.5 border border-white font-medium rounded ${
                  isLoading ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Career;
