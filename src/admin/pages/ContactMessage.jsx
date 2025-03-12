import { useState, useEffect, useCallback } from "react";
import useAxios from "../UseAxios";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import { LiaSpinnerSolid } from "react-icons/lia";

const ContactMessage = () => {
  const axiosInstance = useAxios();
  const [fetching, setFetching] = useState(false);
  const [contactMessages, setContactMessages] = useState([]);
  const [loadingAction, setLoadingAction] = useState({
    readStatus: null, // Tracks which message is currently changing read status
    delete: null, // Tracks which message is currently being deleted
  });

  const fetchContactMessages = useCallback(async () => {
    try {
      setFetching(true);
      const response = await axiosInstance.get("/contactMessage", {
        withCredentials: true,
      });
      if (response.data.success) setContactMessages(response.data.data);
    } catch (error) {
      window.alert(error.response?.data?.message || "Something went wrong");
    }
    setFetching(false);
  }, [axiosInstance]);

  useEffect(() => {
    fetchContactMessages();
  }, [fetchContactMessages]);

  const handleChangeReadStatus = async (id) => {
    setLoadingAction((prevState) => ({ ...prevState, readStatus: id }));
    try {
      const response = await axiosInstance.put(
        `/contactMessage/change-read-status/${id}`,
        {},
        { withCredentials: true }
      );
      if (response.data.success) {
        fetchContactMessages();
        window.alert(response.data.message);
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
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;
    setLoadingAction((prevState) => ({ ...prevState, delete: id }));
    try {
      const response = await axiosInstance.delete(
        `/contactMessage/delete/${id}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        fetchContactMessages();
        window.alert(response.data.message);
      }
    } catch (error) {
      window.alert(error.response?.data?.message || "Error deleting message");
    } finally {
      setLoadingAction((prevState) => ({ ...prevState, delete: null }));
    }
  };

  return (
    <div className="p-5">
      <div className="flex flex-wrap gap-5 items-center justify-between mb-13">
        <p className="text-responsive-heading text-primary-blue-dark font-semibold tracking-wide uppercase">
          Contact Messages
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
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Message
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {contactMessages &&
              contactMessages.length > 0 &&
              contactMessages.map((item) => (
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
                  <td className="px-6 py-4">{item.phone}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4 max-w-sm">{item.message}</td>
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
      {fetching ? (
        <p className="text-primary-blue-dark font-medium italic text-center mt-8">
          Fetching data...
        </p>
      ) : (
        contactMessages &&
        contactMessages.length <= 0 && (
          <p className="text-red-600 font-medium italic text-center mt-8">
            Nothing to show!
          </p>
        )
      )}
    </div>
  );
};

export default ContactMessage;
