import { useState, useEffect, useCallback } from "react";
import useAxios from "../UseAxios";
import { LuEye, LuEyeClosed, LuTicketCheck } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import { LiaSpinnerSolid } from "react-icons/lia";

const AppointmentApplication = () => {
  const axiosInstance = useAxios();
  const [fetching, setFetching] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loadingAction, setLoadingAction] = useState({
    edit: null, // Tracks which appointment is currently being edited
    delete: null, // Tracks which appointment is currently being deleted
  });

  const fetchAppointments = useCallback(async () => {
    try {
      setFetching(true);
      const response = await axiosInstance.get("/appointment", {
        withCredentials: true,
      });
      if (response.data.success) {
        setAppointments(response.data.data.appointments);
      }
    } catch (error) {
      window.alert(error.response?.data?.message || "Something went wrong");
    }
    setFetching(false);
  }, [axiosInstance]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleConfirmStatus = async (id) => {
    setLoadingAction((prevState) => ({ ...prevState, edit: id }));
    try {
      const response = await axiosInstance.put(
        `/appointment/confirm-status/${id}`,
        {},
        { withCredentials: true }
      );
      if (response.data.success) {
        fetchAppointments();
        window.alert(response.data.message);
      }
    } catch (error) {
      window.alert(error.response?.data?.message || "Error updating status");
    } finally {
      setLoadingAction((prevState) => ({ ...prevState, edit: null }));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?"))
      return;
    setLoadingAction((prevState) => ({ ...prevState, delete: id }));
    try {
      const response = await axiosInstance.delete(`/appointment/delete/${id}`, {
        withCredentials: true,
      });
      if (response.data.success) {
        fetchAppointments();
        window.alert(response.data.message);
      }
    } catch (error) {
      window.alert(
        error.response?.data?.message || "Error deleting appointment"
      );
    } finally {
      setLoadingAction((prevState) => ({ ...prevState, delete: null }));
    }
  };

  return (
    <div className="p-5">
      <div className="flex flex-wrap gap-5 items-center justify-between mb-13">
        <p className="text-responsive-heading text-primary-blue-dark font-semibold tracking-wide uppercase">
          Appointments
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
                Doctor
              </th>
              <th scope="col" className="px-6 py-3">
                Appointment Date
              </th>
              <th scope="col" className="px-6 py-3">
                Message
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments &&
              appointments.length > 0 &&
              appointments.map((item) => (
                <tr
                  key={item.appointmentId}
                  className="text-gray-900 border-b border-gray-300 hover:bg-primary-white odd:bg-gray-50 even:bg-gray-100"
                >
                  <th scope="row" className="px-6 py-4 font-medium">
                    {item.fullname} <br />
                    <span className="text-sm tracking-widest">
                      ({item.age}/{item.gender === "Male" ? "M" : "F"})
                    </span>
                  </th>
                  <td className="px-6 py-4 max-w-sm">{item.phone}</td>
                  <td className="px-6 py-4 max-w-sm">
                    {item.doctorName} ({item.doctorDepartment})
                  </td>
                  <td className="px-6 py-4 max-w-sm">{item.appointmentDate}</td>
                  <td className="px-6 py-4 max-w-sm">{item.message}</td>
                  <td className="px-6 py-4 max-w-sm">{item.status}</td>
                  <td>
                    <div className="px-6 py-4 flex items-center justify-center gap-6">
                      <button
                        className="text-primary-blue-dark"
                        onClick={() => handleConfirmStatus(item.appointmentId)}
                        disabled={loadingAction.edit === item.appointmentId}
                      >
                        {loadingAction.edit === item.appointmentId ? (
                          <LiaSpinnerSolid className="text-xl text-primary-blue-dark animate-spin" />
                        ) : (
                          <LuTicketCheck className="text-xl text-primary-blue-dark cursor-pointer" />
                        )}
                      </button>
                      <button
                        className="text-primary-blue-dark"
                        onClick={() => handleDelete(item.appointmentId)}
                        disabled={loadingAction.delete === item.appointmentId}
                      >
                        {loadingAction.delete === item.appointmentId ? (
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
        appointments &&
        appointments.length <= 0 && (
          <p className="text-red-600 font-medium italic text-center mt-8">
            Nothing to show!
          </p>
        )
      )}
    </div>
  );
};

export default AppointmentApplication;
