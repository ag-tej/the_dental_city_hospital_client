import { useState, useEffect, useCallback } from "react";
import useAxios from "../UseAxios";
import { useParams } from "react-router";
import moment from "moment-timezone";
import { IoCloseCircleOutline } from "react-icons/io5";
import { format, getDay, parse, startOfWeek } from "date-fns";
import { enUS } from "date-fns/locale";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const DoctorSchedule = () => {
  const axiosInstance = useAxios();
  const { id } = useParams();
  const [doctor, setDoctor] = useState({});
  const [schedules, setSchedules] = useState([]);
  const [formData, setFormData] = useState({
    doctorId: id,
    date: "",
    sessionDuration: "",
    timeSlots: [{ startTime: "", endTime: "" }],
  });
  const [fetching, setFetching] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [savingAction, setSavingAction] = useState(false);
  // State for managing event (slot) modal
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(false);
  const [editingSlot, setEditingSlot] = useState(false);
  const [editing, setEditing] = useState(false);
  // For editing appointment details (used when status is Pending/Confirmed)
  const [editSlotData, setEditSlotData] = useState({
    startTime: "",
    endTime: "",
    status: "",
    fullname: "",
    gender: "",
    age: "",
    phone: "",
    message: "",
  });

  const fetchSchedules = useCallback(async () => {
    try {
      setFetching(true);
      const response = await axiosInstance.get(`/doctorSchedule/${id}`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setDoctor(response.data.data.doctor);
        setSchedules(response.data.data.schedules);
      }
    } catch (error) {
      window.alert(error.response?.data?.message || "Something went wrong");
    }
    setFetching(false);
  }, [axiosInstance, id]);

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  // Manage slots for add schedule
  const handleAddSlot = () => {
    setFormData((prev) => ({
      ...prev,
      timeSlots: [...prev.timeSlots, { startTime: "", endTime: "" }],
    }));
  };
  const handleRemoveSlot = (index) => {
    const updatedTimeSlots = formData.timeSlots.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      timeSlots: updatedTimeSlots,
    }));
  };
  const handleSlotChange = (index, field, value) => {
    const updatedTimeSlots = [...formData.timeSlots];
    updatedTimeSlots[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      timeSlots: updatedTimeSlots,
    }));
  };

  // react-big-calendar setup
  const locales = { "en-US": enUS };
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [labelYear, setLabelYear] = useState(new Date().getFullYear());

  // Convert scheduleSlots to events for the calendar
  function convertToDataArray(appointments) {
    return appointments.flatMap((appointment) =>
      appointment.scheduleSlots.map((slot) => ({
        doctorScheduleId: appointment._id, // The ID of the doctor schedule document
        scheduleSlotId: slot._id, // The individual slot ID
        start: moment(`${appointment.date.split("T")[0]} ${slot.startTime}`)
          .tz("Asia/Kathmandu", true)
          .toDate(),
        end: moment(`${appointment.date.split("T")[0]} ${slot.endTime}`)
          .tz("Asia/Kathmandu", true)
          .toDate(),
        status: slot.status,
        appointmentId: slot.appointmentId ? slot.appointmentId._id : null,
        title: slot.appointmentId
          ? slot.appointmentId.fullname
          : "No Appointment",
        age: slot.appointmentId ? slot.appointmentId.age : null,
        gender: slot.appointmentId ? slot.appointmentId.gender : null,
        phone: slot.appointmentId ? slot.appointmentId.phone : null,
        message: slot.appointmentId ? slot.appointmentId.message : null,
      }))
    );
  }
  const events = convertToDataArray(schedules);
  // Calendar navigation
  const handleNavigate = (action) => {
    setLabelYear(moment(action).format("YYYY"));
    setCalendarDate(action);
  };
  // Custom toolbar component
  const CustomToolbar = ({ label, onNavigate }) => {
    return (
      <div
        className="rbc-toolbar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span className="rbc-toolbar-label ml-[250px] mt-5 mb-2">{`${label}, ${labelYear}`}</span>
        <span className="rbc-btn-group" style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => onNavigate("PREV")}>Previous</button>
          <button onClick={() => onNavigate("TODAY")}>Today</button>
          <button onClick={() => onNavigate("NEXT")}>Next</button>
        </span>
      </div>
    );
  };
  // Custom time gutter header component
  const CustomTimeGutterHeader = () => {
    return (
      <div
        style={{
          textAlign: "center",
          fontWeight: "semibold",
          padding: "5px 0",
        }}
      >
        Office Hours
      </div>
    );
  };
  // Custom event wrapper component
  const CustomEventWrapper = ({ event }) => {
    // Calculate top position based on time difference from 8 AM
    const calculateTop = (start) => {
      const givenDate = new Date(start);
      const eightAM = new Date(start);
      eightAM.setHours(8, 0, 0, 0);
      const difference = (givenDate - eightAM) / (1000 * 60); // minutes difference
      return (difference / 720) * 100; // 12 hours (720 minutes)
    };
    // Calculate the height of the event based on its duration
    const calculateHeight = (start, end) => {
      const startTime = new Date(start);
      const endTime = new Date(end);
      const diffMinutes = (endTime - startTime) / (1000 * 60); // difference in minutes
      return (diffMinutes / 720) * 100;
    };
    return (
      <div
        tabIndex={0}
        className={`absolute w-full p-1.5 ml-[5px] mt-[5px] rounded-md cursor-pointer transition text-white text-sm ${
          event.status === "Available"
            ? "bg-emerald-500 hover:bg-emerald-600"
            : event.status === "Pending"
            ? "bg-orange-500 hover:bg-orange-600"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
        title={`${moment(event.start).format("hh:mm A")} - ${moment(
          event.end
        ).format("hh:mm A")} | ${event.title}${
          event.age && event.gender
            ? ` | ${event.age}/${event.gender === "Male" ? "M" : "F"}`
            : ""
        }`}
        style={{
          top: `${calculateTop(event.start)}%`,
          height: `calc(${calculateHeight(event.start, event.end)}% - 10px)`,
        }}
        onClick={() => {
          setSelectedEvent(event);
          // Pre-populate edit fields if applicable
          if (event.status !== "Available") {
            setEditSlotData({
              startTime: moment(event.start).format("HH:mm"),
              endTime: moment(event.end).format("HH:mm"),
              status: event.status,
              fullname: event.title,
              age: event.age,
              gender: event.gender,
              phone: event.phone,
              message: event.message,
            });
          }
          setShowEventModal(true);
        }}
      >
        <p className="font-semibold truncate">{event.title}</p>
        <p className="mt-1">{event.phone}</p>
      </div>
    );
  };

  // Handle adding new slots
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSavingAction(true);
    try {
      const response = await axiosInstance.post(
        "/doctorSchedule/create",
        formData,
        { withCredentials: true }
      );
      if (response.data.success) {
        fetchSchedules();
        closeModal();
        window.alert(response.data.message);
      }
    } catch (error) {
      window.alert(error.response?.data?.message || "Error saving schedule");
    }
    setSavingAction(false);
  };

  const openModal = (
    schedule = {
      doctorId: id,
      date: "",
      sessionDuration: "",
      timeSlots: [{ startTime: "", endTime: "" }],
    }
  ) => {
    setFormData(schedule);
    setModalOpen(true);
  };

  const closeModal = () => {
    setFormData({
      doctorId: id,
      date: "",
      sessionDuration: "",
      timeSlots: [{ startTime: "", endTime: "" }],
    });
    setModalOpen(false);
  };

  // Delete slot handler – works for "Available" status
  const handleDeleteSlot = async () => {
    if (!selectedEvent) return;
    if (!window.confirm("Are you sure you want to delete this slot?")) return;
    try {
      setLoading(true);
      const response = await axiosInstance.delete(
        `/doctorSchedule/delete-slot/${selectedEvent.doctorScheduleId}/${selectedEvent.scheduleSlotId}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        window.alert("Slot deleted successfully.");
        fetchSchedules();
        setShowEventModal(false);
        setSelectedEvent(null);
      }
    } catch (error) {
      window.alert(error.response?.data?.message || "Failed to delete slot.");
    }
    setLoading(false);
  };

  const handleDeleteAppointment = async () => {
    if (!selectedEvent) return;
    if (
      !window.confirm(
        `Are you sure you want to delete this ${selectedEvent.status} Appointment?`
      )
    )
      return;
    try {
      setLoading(true);
      const response = await axiosInstance.delete(
        `/appointment/delete/${selectedEvent.appointmentId}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        window.alert("Appointment deleted successfully.");
        fetchSchedules();
        setShowEventModal(false);
        setSelectedEvent(null);
      }
    } catch (error) {
      window.alert(
        error.response?.data?.message || "Failed to delete appointment."
      );
    }
    setLoading(false);
  };

  const handleAppointmentUpdate = async (e) => {
    e.preventDefault();
    if (!selectedEvent) return;
    if (
      !window.confirm(
        `Are you sure you want to update this appointment details?`
      )
    )
      return;
    try {
      setEditing(true);
      const updatedData = {
        fullname: editSlotData.fullname,
        gender: editSlotData.gender,
        age: editSlotData.age,
        phone: editSlotData.phone,
        message: editSlotData.message,
      };
      const response = await axiosInstance.put(
        `/appointment/edit/${selectedEvent.appointmentId}`,
        updatedData,
        { withCredentials: true }
      );
      if (response.data.success) {
        window.alert("Appointment updated successfully.");
        fetchSchedules();
      }
    } catch (error) {
      window.alert(
        error.response?.data?.message || "Failed to update appointment."
      );
    }
    setEditing(false);
    setEditingAppointment(false);
  };

  const handleSlotUpdate = async (e) => {
    e.preventDefault();
    if (!selectedEvent) return;
    if (!window.confirm(`Are you sure you want to update this slot details?`))
      return;
    try {
      setEditing(true);
      const updatedData = {
        startTime: editSlotData.startTime,
        endTime: editSlotData.endTime,
        status: editSlotData.status,
      };
      const response = await axiosInstance.put(
        `/doctorSchedule/edit-slot/${selectedEvent.doctorScheduleId}/${selectedEvent.scheduleSlotId}`,
        updatedData,
        { withCredentials: true }
      );
      if (response.data.success) {
        window.alert("Slot updated successfully.");
        fetchSchedules();
      }
    } catch (error) {
      window.alert(error.response?.data?.message || "Failed to update slot.");
    }
    setEditing(false);
    setEditingSlot(false);
  };

  return (
    <div className="p-5 h-full">
      <div>
        <div className="flex flex-wrap gap-5 items-center justify-between">
          <p className="text-responsive-heading text-primary-blue-dark font-semibold tracking-wide uppercase">
            Schedules
          </p>
          <button onClick={() => openModal()} className="button rounded">
            Add Slots
          </button>
        </div>
        <div>
          <p className="text-lg text-gray-700 font-semibold leading-relaxed tracking-wide">
            {doctor.name} ({doctor.department})
          </p>
        </div>
        {fetching && (
          <p className="text-primary-blue-dark font-medium italic text-center">
            Fetching data...
          </p>
        )}
      </div>
      <div className="h-full">
        <Calendar
          dayLayoutAlgorithm="no-overlap"
          localizer={localizer}
          date={calendarDate}
          onNavigate={handleNavigate}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={{ week: true }}
          defaultView="week"
          step={15}
          toolbar
          showAllEvents
          className="h-full pb-10"
          min={new Date(new Date().setHours(8, 0, 0))}
          max={new Date(new Date().setHours(20, 0, 0))}
          formats={{
            weekdayFormat: (date, culture, localizer) =>
              localizer?.format(date, "EEE", culture) ?? "",
          }}
          onSelectEvent={() => {}} // Handled by CustomEventWrapper onClick
          components={{
            timeGutterHeader: CustomTimeGutterHeader,
            toolbar: CustomToolbar,
            eventWrapper: ({ event }) => <CustomEventWrapper event={event} />,
          }}
        />
      </div>
      {modalOpen && (
        <div className="fixed z-10 inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-primary-white p-5 rounded shadow w-md"
          >
            <p className="mb-5 text-responsive-text font-semibold tracking-wide uppercase">
              Add Slots
            </p>
            <label htmlFor="date" className="label text-gray-500 font-normal">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              placeholder="Date"
              value={moment(formData.date)
                .tz("Asia/Kathmandu")
                .format("YYYY-MM-DD")}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className={`admin-input ${savingAction && "cursor-not-allowed"}`}
              required
              disabled={savingAction}
            />
            <label
              htmlFor="sessionDuration"
              className="label text-gray-500 font-normal"
            >
              Session Duration (30-60 minutes)
            </label>
            <input
              type="number"
              min={1}
              max={60}
              id="sessionDuration"
              name="sessionDuration"
              placeholder="Session Duration"
              value={formData.sessionDuration}
              onChange={(e) =>
                setFormData({ ...formData, sessionDuration: e.target.value })
              }
              className={`admin-input ${savingAction && "cursor-not-allowed"}`}
              required
              disabled={savingAction}
            />
            <div className="mb-5">
              <label
                htmlFor="timeSlots"
                className="label text-gray-500 font-normal"
              >
                Time Slots
              </label>
              {formData.timeSlots.map((slot, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    value={slot.startTime}
                    onChange={(e) =>
                      handleSlotChange(index, "startTime", e.target.value)
                    }
                    className={`admin-input w-fit ${
                      savingAction && "cursor-not-allowed"
                    }`}
                    required
                    disabled={savingAction}
                  />
                  <span className="mb-4 text-gray-700">to</span>
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    value={slot.endTime}
                    onChange={(e) =>
                      handleSlotChange(index, "endTime", e.target.value)
                    }
                    className={`admin-input w-fit ${
                      savingAction && "cursor-not-allowed"
                    }`}
                    required
                    disabled={savingAction}
                  />
                  {formData.timeSlots.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSlot(index)}
                      className={
                        savingAction
                          ? "cursor-not-allowed ml-5"
                          : "cursor-pointer ml-5"
                      }
                      disabled={savingAction}
                    >
                      <IoCloseCircleOutline className="text-2xl mb-4 text-gray-900" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddSlot}
                className={`button rounded py-1.5 bg-primary-blue-light text-primary-blue-dark text-5xl ${
                  savingAction ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                disabled={savingAction}
              >
                + Add Time Slot
              </button>
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={closeModal}
                className={`button rounded py-1.5 bg-gray-500 ${
                  savingAction
                    ? "cursor-not-allowed opacity-60"
                    : "cursor-pointer"
                }`}
                disabled={savingAction}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`button rounded py-1.5 ${
                  savingAction
                    ? "cursor-not-allowed opacity-60"
                    : "cursor-pointer"
                }`}
                disabled={savingAction}
              >
                {savingAction ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Event Modal */}
      {showEventModal && selectedEvent && (
        <div className="fixed z-20 inset-0 bg-black/60 backdrop-blur-xs p-5 flex items-center justify-center">
          <div className="relative bg-primary-white p-5 rounded shadow w-lg max-h-full overflow-auto">
            <p className="mb-5 text-responsive-text font-semibold tracking-wide uppercase">
              Manage Slot
            </p>
            <div className="text-gray-700 font-medium space-y-[2px]">
              <p>
                <strong>Status:</strong> {selectedEvent.status}
              </p>
              <p>
                <strong>Time:</strong>{" "}
                {`${moment(selectedEvent.start).format("hh:mm A")} - ${moment(
                  selectedEvent.end
                ).format("hh:mm A")}`}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {moment(selectedEvent.start).format("dddd, MMMM D, YYYY")}
              </p>
            </div>
            {selectedEvent.status === "Available" && (
              <div className="mt-5">
                <p className="text-gray-500 italic">
                  This slot is empty. You may delete it.
                </p>
                <button
                  className={`button rounded py-1.5 bg-red-700 mt-5 float-right ${
                    loading ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                  }`}
                  onClick={handleDeleteSlot}
                  disabled={loading}
                >
                  {loading ? "Deleting Slot..." : "Delete Slot"}
                </button>
              </div>
            )}
            {(selectedEvent.status === "Pending" ||
              selectedEvent.status === "Confirmed") && (
              <>
                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <p>Appointment Details</p>
                    <button
                      className={`button rounded py-1 px-3 bg-primary-blue-light text-gray-900 ${
                        loading || editing
                          ? "cursor-not-allowed opacity-60"
                          : "cursor-pointer"
                      }`}
                      onClick={() => setEditingAppointment(!editingAppointment)}
                      disabled={loading || editing}
                    >
                      {editingAppointment ? "Cancel" : "Edit"}
                    </button>
                  </div>
                  <form
                    onSubmit={handleAppointmentUpdate}
                    className="space-y-3"
                  >
                    <div className="grid grid-cols-2 gap-x-5 gap-y-3">
                      <div>
                        <label htmlFor="fullname" className="label">
                          Name
                        </label>
                        <input
                          type="text"
                          id="fullname"
                          name="fullname"
                          className={`admin-input m-0 ${
                            (loading || !editingAppointment || editing) &&
                            "cursor-not-allowed"
                          }`}
                          value={editSlotData.fullname}
                          onChange={(e) =>
                            setEditSlotData({
                              ...editSlotData,
                              fullname: e.target.value,
                            })
                          }
                          placeholder="Full Name"
                          required
                          disabled={loading || !editingAppointment || editing}
                        />
                      </div>
                      <div>
                        <label htmlFor="gender" className="label">
                          Gender
                        </label>
                        <select
                          id="gender"
                          name="gender"
                          className={`admin-input m-0 ${
                            (loading || !editingAppointment || editing) &&
                            "cursor-not-allowed"
                          }`}
                          value={editSlotData.gender}
                          onChange={(e) =>
                            setEditSlotData({
                              ...editSlotData,
                              gender: e.target.value,
                            })
                          }
                          required
                          disabled={loading || !editingAppointment || editing}
                        >
                          <option value="" disabled>
                            Gender
                          </option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="age" className="label">
                          Age
                        </label>
                        <input
                          type="number"
                          min={1}
                          max={120}
                          id="age"
                          name="age"
                          className={`admin-input m-0 ${
                            (loading || !editingAppointment || editing) &&
                            "cursor-not-allowed"
                          }`}
                          value={editSlotData.age}
                          onChange={(e) =>
                            setEditSlotData({
                              ...editSlotData,
                              age: e.target.value,
                            })
                          }
                          placeholder="Age"
                          required
                          disabled={loading || !editingAppointment || editing}
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="label">
                          Phone
                        </label>
                        <input
                          type="number"
                          min={9111111111}
                          id="phone"
                          name="phone"
                          className={`admin-input m-0 ${
                            (loading || !editingAppointment || editing) &&
                            "cursor-not-allowed"
                          }`}
                          value={editSlotData.phone}
                          onChange={(e) =>
                            setEditSlotData({
                              ...editSlotData,
                              phone: e.target.value,
                            })
                          }
                          placeholder="Phone"
                          required
                          disabled={loading || !editingAppointment || editing}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="label">
                        Message
                      </label>
                      <textarea
                        rows={2}
                        id="message"
                        name="message"
                        className={`admin-input m-0 ${
                          (loading || !editingAppointment || editing) &&
                          "cursor-not-allowed"
                        }`}
                        value={editSlotData.message}
                        onChange={(e) =>
                          setEditSlotData({
                            ...editSlotData,
                            message: e.target.value,
                          })
                        }
                        placeholder="Message"
                        required
                        disabled={loading || !editingAppointment || editing}
                      />
                    </div>
                    {editingAppointment && (
                      <button
                        type="submit"
                        className={`button rounded py-1.5 bg-primary-blue-dark ${
                          loading || !editingAppointment || editing
                            ? "cursor-not-allowed opacity-60"
                            : "cursor-pointer"
                        }`}
                        disabled={loading || editing}
                      >
                        {editing ? "Saving..." : "Save Changes"}
                      </button>
                    )}
                  </form>
                </div>
                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <p>Slot Details</p>
                    <button
                      className={`button rounded py-1 px-3 bg-primary-blue-light text-gray-900 ${
                        loading || editing
                          ? "cursor-not-allowed opacity-60"
                          : "cursor-pointer"
                      }`}
                      onClick={() => setEditingSlot(!editingSlot)}
                      disabled={loading || editing}
                    >
                      {editingSlot ? "Cancel" : "Edit"}
                    </button>
                  </div>
                  <form onSubmit={handleSlotUpdate} className="space-y-3">
                    <div className="grid grid-cols-3 gap-x-5 gap-y-3">
                      <div>
                        <label htmlFor="startTime" className="label">
                          Start Time
                        </label>
                        <input
                          type="time"
                          id="startTime"
                          name="startTime"
                          className={`admin-input m-0 ${
                            (loading || !editingSlot || editing) &&
                            "cursor-not-allowed"
                          }`}
                          value={editSlotData.startTime}
                          onChange={(e) =>
                            setEditSlotData({
                              ...editSlotData,
                              startTime: e.target.value,
                            })
                          }
                          required
                          disabled={loading || !editingSlot || editing}
                        />
                      </div>
                      <div>
                        <label htmlFor="endTime" className="label">
                          End Time
                        </label>
                        <input
                          type="time"
                          id="endTime"
                          name="endTime"
                          className={`admin-input m-0 ${
                            (loading || !editingSlot || editing) &&
                            "cursor-not-allowed"
                          }`}
                          value={editSlotData.endTime}
                          onChange={(e) =>
                            setEditSlotData({
                              ...editSlotData,
                              endTime: e.target.value,
                            })
                          }
                          required
                          disabled={loading || !editingSlot || editing}
                        />
                      </div>
                      <div>
                        <label htmlFor="status" className="label">
                          Status
                        </label>
                        <select
                          id="status"
                          name="status"
                          className={`admin-input m-0 ${
                            (loading || !editingSlot || editing) &&
                            "cursor-not-allowed"
                          }`}
                          value={editSlotData.status}
                          onChange={(e) =>
                            setEditSlotData({
                              ...editSlotData,
                              status: e.target.value,
                            })
                          }
                          required
                          disabled={loading || !editingSlot || editing}
                        >
                          <option value="" disabled>
                            Status
                          </option>
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                        </select>
                      </div>
                    </div>
                    {editingSlot && (
                      <button
                        type="submit"
                        className={`button rounded py-1.5 bg-primary-blue-dark ${
                          loading || !editingSlot || editing
                            ? "cursor-not-allowed opacity-60"
                            : "cursor-pointer"
                        }`}
                        disabled={loading || editing}
                      >
                        {editing ? "Saving..." : "Save Changes"}
                      </button>
                    )}
                  </form>
                </div>
                <button
                  className={`button rounded py-1.5 bg-red-700 mt-5 float-right ${
                    loading || editing
                      ? "cursor-not-allowed opacity-60"
                      : "cursor-pointer"
                  }`}
                  onClick={handleDeleteAppointment}
                  disabled={loading || editing}
                >
                  {loading ? "Deleting Appointment..." : "Delete Appointment"}
                </button>
              </>
            )}
            <button
              className={`absolute top-5 right-5 ${
                loading || editing
                  ? "cursor-not-allowed opacity-60"
                  : "cursor-pointer"
              }`}
              onClick={() => {
                setShowEventModal(false);
                setSelectedEvent(null);
              }}
              disabled={loading || editing}
            >
              <IoCloseCircleOutline className="text-3xl text-gray-700" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorSchedule;
