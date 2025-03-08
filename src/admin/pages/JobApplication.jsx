import { useState, useEffect, useCallback, useRef } from "react";
import moment from "moment";
import useAxios from "../UseAxios";
import { TbFileCv } from "react-icons/tb";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import { LiaSpinnerSolid } from "react-icons/lia";

const JobApplication = () => {
  const axiosInstance = useAxios();
  const axiosRef = useRef(axiosInstance);
  const [jobApplications, setJobApplications] = useState([]);
  const [loadingAction, setLoadingAction] = useState({
    readStatus: null, // Tracks which application is currently changing read status
    delete: null, // Tracks which application is currently being deleted
  });

  const fetchJobApplications = useCallback(async () => {
    try {
      const response = await axiosRef.current.get("/jobApplication", {
        withCredentials: true,
      });
      if (response.data.success) setJobApplications(response.data.data);
    } catch (error) {
      window.alert(error.response?.data?.message || "Something went wrong");
    }
  }, []);

  useEffect(() => {
    fetchJobApplications();
  }, [fetchJobApplications]);

  const handleChangeReadStatus = async (id) => {
    setLoadingAction((prevState) => ({ ...prevState, readStatus: id }));
    try {
      const response = await axiosInstance.put(
        `/jobApplication/change-read-status/${id}`,
        {},
        { withCredentials: true }
      );
      if (response.data.success) {
        fetchJobApplications();
      }
    } catch (error) {
      window.alert(
        error.response?.data?.message || "Error updating read status"
      );
    } finally {
      setLoadingAction((prevState) => ({ ...prevState, readStatus: null }));
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm("Are you sure you want to delete this job application?")
    )
      return;
    setLoadingAction((prevState) => ({ ...prevState, delete: id }));
    try {
      const response = await axiosInstance.delete(
        `/jobApplication/delete/${id}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        fetchJobApplications();
      }
    } catch (error) {
      window.alert(
        error.response?.data?.message || "Error deleting job application"
      );
    } finally {
      setLoadingAction((prevState) => ({ ...prevState, delete: null }));
    }
  };

  return (
    <div className="p-5">
      <div className="flex flex-wrap gap-5 items-center justify-between mb-13">
        <p className="text-responsive-heading text-primary-blue-dark font-semibold tracking-wide uppercase">
          Job Applications
        </p>
      </div>
      <div className="shadow-dark">
        <table className="w-full text-base text-left rtl:text-right text-gray-900 bg-primary-white border border-black/10">
          <thead className="text-sm text-white bg-primary-blue-dark uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Full Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Applied Position
              </th>
              <th scope="col" className="px-6 py-3">
                Earliest Start Date
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Documents
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {jobApplications &&
              jobApplications.length > 0 &&
              jobApplications.map((item) => (
                <tr
                  key={item._id}
                  className={`text-gray-900 border-b border-gray-300 hover:bg-primary-white ${
                    item.read_status
                      ? "odd:bg-gray-50 even:bg-gray-100"
                      : "bg-primary-blue-light"
                  }`}
                >
                  <th scope="row" className="px-6 py-4 font-medium">
                    {item.fullname}
                  </th>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.phone}</td>
                  <td className="px-6 py-4">{item.applied_position}</td>
                  <td className="px-6 py-4">
                    {moment(item.earliest_start_date).format(
                      "dddd, MMMM D, YYYY"
                    )}
                  </td>
                  <td>
                    <div className="px-6 py-4 flex items-center justify-center gap-6">
                      <a
                        href={item.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-primary-blue-dark"
                      >
                        <TbFileCv className="text-2xl text-primary-blue-dark" />
                      </a>
                      {item.other_document && (
                        <a
                          href={item.other_document}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline text-primary-blue-dark"
                        >
                          <IoDocumentTextOutline className="text-2xl text-primary-blue-dark" />
                        </a>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="px-6 py-4 flex items-center justify-center gap-6">
                      <button
                        className="text-primary-blue-dark"
                        onClick={() => handleChangeReadStatus(item._id)}
                        disabled={loadingAction.readStatus === item._id}
                      >
                        {loadingAction.readStatus === item._id ? (
                          <LiaSpinnerSolid className="text-xl text-primary-blue-dark animate-spin" />
                        ) : item.read_status ? (
                          <LuEyeClosed className="text-xl text-primary-blue- cursor-pointer" />
                        ) : (
                          <LuEye className="text-xl text-primary-blue- cursor-pointer" />
                        )}
                      </button>
                      <button
                        className="text-primary-blue-dark"
                        onClick={() => handleDelete(item._id)}
                        disabled={loadingAction.delete === item._id}
                      >
                        {loadingAction.delete === item._id ? (
                          <LiaSpinnerSolid className="text-xl text-red-500 animate-spin" />
                        ) : (
                          <MdDeleteOutline className="text-xl text-red-500 cursor-pointer" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {jobApplications && jobApplications.length <= 0 && (
        <p className="text-red-600 font-medium italic text-center mt-8">
          Nothing to show!
        </p>
      )}
    </div>
  );
};

export default JobApplication;
