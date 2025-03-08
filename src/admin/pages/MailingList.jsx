import { useState, useEffect, useCallback, useRef } from "react";
import moment from "moment";
import useAxios from "../UseAxios";
import { MdDeleteOutline } from "react-icons/md";
import { LiaSpinnerSolid } from "react-icons/lia";

const ContactMessage = () => {
  const axiosInstance = useAxios();
  const axiosRef = useRef(axiosInstance);
  const [mailingLists, setMailingLists] = useState([]);
  const [loadingAction, setLoadingAction] = useState({
    delete: null, // Tracks which mailing list is currently being deleted
  });

  const fetchMailingLists = useCallback(async () => {
    try {
      const response = await axiosRef.current.get("/mailingList", {
        withCredentials: true,
      });
      if (response.data.success) setMailingLists(response.data.data);
    } catch (error) {
      window.alert(error.response?.data?.message || "Something went wrong");
    }
  }, []);

  useEffect(() => {
    fetchMailingLists();
  }, [fetchMailingLists]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this mail address?"))
      return;
    setLoadingAction((prevState) => ({ ...prevState, delete: id }));
    try {
      const response = await axiosInstance.delete(`/mailingList/delete/${id}`, {
        withCredentials: true,
      });
      if (response.data.success) {
        fetchMailingLists();
      }
    } catch (error) {
      window.alert(
        error.response?.data?.message ||
          "Error deleting mail address from the list"
      );
    } finally {
      setLoadingAction((prevState) => ({ ...prevState, delete: null }));
    }
  };

  return (
    <div className="p-5">
      <div className="flex flex-wrap gap-5 items-center justify-between mb-13">
        <p className="text-responsive-heading text-primary-blue-dark font-semibold tracking-wide uppercase">
          Mailing List
        </p>
      </div>
      <div className="shadow-dark">
        <table className="w-full text-base text-left rtl:text-right text-gray-900 bg-primary-white border border-black/10">
          <thead className="text-sm text-white bg-primary-blue-dark uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email Address
              </th>
              <th scope="col" className="px-6 py-3">
                Date Joined
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {mailingLists &&
              mailingLists.length > 0 &&
              mailingLists.map((item) => (
                <tr
                  key={item._id}
                  className={`text-gray-900 border-b border-gray-300 hover:bg-primary-white ${
                    item.read_status
                      ? "odd:bg-gray-50 even:bg-gray-100"
                      : "bg-primary-blue-light"
                  }`}
                >
                  <th scope="row" className="px-6 py-4 font-medium">
                    {item.email}
                  </th>
                  <td className="px-6 py-4">
                    {moment(item.createdAt).format("dddd, MMMM D, YYYY")}
                  </td>
                  <td>
                    <div className="px-6 py-4 flex items-center justify-center gap-6">
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
      {mailingLists && mailingLists.length <= 0 && (
        <p className="text-red-600 font-medium italic text-center mt-8">
          Nothing to show!
        </p>
      )}
    </div>
  );
};

export default ContactMessage;
