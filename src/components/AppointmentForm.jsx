import { useEffect, useState } from "react";
import useAxios from "../admin/UseAxios";

const AppointmentForm = () => {
  const axiosInstance = useAxios();
  const [formData, setFormData] = useState({
    fullname: "",
    gender: "",
    age: "",
    phone: "",
    message: "",
    doctorId: "",
    doctorScheduleId: "",
    scheduleSlotId: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [fetchingSlots, setFetchingSlots] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [department, setDepartment] = useState();
  const [date, setDate] = useState();

  // Fetch all doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      const response = await axiosInstance.get("/doctor");
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    };
    fetchDoctors();
  }, [axiosInstance]);

  // Auto-select department when doctor is selected
  useEffect(() => {
    const selectedDoctor = doctors.find((doc) => doc._id === formData.doctorId);
    if (selectedDoctor) {
      setDepartment(selectedDoctor.department);
    }
  }, [doctors, formData.doctorId]);

  // Fetch available slots based on doctor id and date
  useEffect(() => {
    if (!formData.doctorId || !date) return;
    const fetchSlots = async () => {
      setFetchingSlots(true);
      const response = await axiosInstance.get(
        `/doctorSchedule/available-slots`,
        {
          params: { doctorId: formData.doctorId, date: date },
        }
      );
      // Response returns doctorScheduleId and available slots
      const { doctorScheduleId, slots } = response.data.data || {};
      setAvailableSlots(slots || []);
      setFormData((prev) => ({
        ...prev,
        doctorScheduleId,
        scheduleSlotId: "",
      }));
      setFetchingSlots(false);
    };
    fetchSlots();
  }, [axiosInstance, date, formData.doctorId]);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        "/appointment/create",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        window.alert("Your appointment request has been recorded!");
        e.target.reset();
        setFormData({
          fullname: "",
          gender: "",
          age: "",
          phone: "",
          message: "",
          doctorId: "",
          scheduleSlotId: "",
          doctorScheduleId: "",
        });
        setDepartment("");
        setDate("");
      }
    } catch (error) {
      window.alert(
        error.response?.data?.message || "Failed to submit appointment request"
      );
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-[1px]">
      <div className="grid grid-cols-1 ss:grid-cols-2 gap-[1px]">
        <div>
          <input
            type="text"
            id="fullname"
            name="fullname"
            className={`input bg-primary-blue-dark text-white placeholder:text-white h-full py-3 px-5 rounded-none rounded-t ss:rounded-tl ${
              isLoading && "cursor-not-allowed"
            }`}
            value={formData.fullname}
            onChange={(e) =>
              setFormData({ ...formData, fullname: e.target.value })
            }
            placeholder="Full Name"
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="gender" className="hidden">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            className={`input bg-primary-blue-dark text-white placeholder:text-white h-full py-3 px-5 rounded-none ss:rounded-tr ${
              isLoading && "cursor-not-allowed"
            }`}
            value={formData.gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
            required
            disabled={isLoading}
          >
            <option value="" disabled>
              Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <input
            type="number"
            min={1}
            max={120}
            id="age"
            name="age"
            className={`input bg-primary-blue-dark text-white placeholder:text-white h-full py-3 px-5 rounded-none ${
              isLoading && "cursor-not-allowed"
            }`}
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            placeholder="Age"
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <input
            type="number"
            min={9111111111}
            id="phone"
            name="phone"
            className={`input bg-primary-blue-dark text-white placeholder:text-white h-full py-3 px-5 rounded-none ${
              isLoading && "cursor-not-allowed"
            }`}
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="Phone"
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="doctor" className="hidden">
            Doctor
          </label>
          <select
            id="doctorId"
            name="doctorId"
            className={`input bg-primary-blue-dark text-white placeholder:text-white h-full py-3 px-5 rounded-none ${
              isLoading && "cursor-not-allowed"
            }`}
            value={formData.doctorId}
            onChange={(e) =>
              setFormData({ ...formData, doctorId: e.target.value })
            }
            required
            disabled={isLoading}
          >
            <option value="" disabled>
              {doctors.length > 0 ? "Doctor" : "Fetching doctors..."}
            </option>
            {doctors.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            type="text"
            id="department"
            name="department"
            className="input bg-primary-blue-dark text-white placeholder:text-white h-full py-3 px-5 rounded-none cursor-not-allowed"
            value={department}
            placeholder="Department"
            required
            disabled
          />
        </div>
        <div>
          <label htmlFor="date" className="hidden">
            Date
          </label>
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            id="date"
            name="date"
            className={`input bg-primary-blue-dark text-white placeholder:text-white h-full py-3 px-5 rounded-none ${
              isLoading && "cursor-not-allowed"
            }`}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="scheduleSlotId" className="hidden">
            Slot
          </label>
          <select
            id="scheduleSlotId"
            name="scheduleSlotId"
            className={`input bg-primary-blue-dark text-white placeholder:text-white h-full py-3 px-5 rounded-none ${
              isLoading && "cursor-not-allowed"
            }`}
            value={formData.scheduleSlotId}
            onChange={(e) =>
              setFormData({ ...formData, scheduleSlotId: e.target.value })
            }
            required
            disabled={!formData.doctorId || !date || isLoading}
          >
            <option value="" disabled>
              {date && formData.doctorId
                ? fetchingSlots
                  ? "Fetching slots..."
                  : availableSlots.length > 0
                  ? "Select Slot"
                  : "No slots available"
                : "Select doctor and date to continue"}
            </option>
            {availableSlots.map((slot) => (
              <option key={slot._id} value={slot._id}>
                {slot.startTime} - {slot.endTime}
              </option>
            ))}
          </select>
        </div>
      </div>
      <textarea
        rows={5}
        id="message"
        name="message"
        className={`input bg-primary-blue-dark text-white placeholder:text-white h-full py-3 px-5 rounded-none ${
          isLoading && "cursor-not-allowed"
        }`}
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        placeholder="Message"
        required
        disabled={isLoading}
      />
      <button
        type="submit"
        className={`button text-primary-blue-dark bg-primary-blue-light font-medium rounded-none rounded-b uppercase hover:shadow-none ${
          isLoading ? "cursor-not-allowed opacity-60" : "cursor-pointer"
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default AppointmentForm;
