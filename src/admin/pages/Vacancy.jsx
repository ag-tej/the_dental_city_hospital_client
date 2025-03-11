import { useState, useEffect, useCallback } from "react";
import moment from "moment-timezone";
import useAxios from "../UseAxios";
import TextEditor from "../components/TextEditor";
import TextReader from "../components/TextReader";

const Vacancy = () => {
  const axiosInstance = useAxios();
  const [vacancies, setVacancies] = useState([]);
  const [formData, setFormData] = useState({
    job_title: "",
    description: "",
    last_date: "",
  });
  const [fetching, setFetching] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [savingAction, setSavingAction] = useState(false);
  const [deletingAction, setDeletingAction] = useState({});

  const handleContentChange = (newDescription) => {
    setFormData({ ...formData, description: newDescription });
  };

  const fetchVacancies = useCallback(async () => {
    try {
      setFetching(true);
      const response = await axiosInstance.get("/vacancy");
      if (response.data.success) setVacancies(response.data.data);
    } catch (error) {
      window.alert(error.response?.data?.message || "Something went wrong");
    }
    setFetching(false);
  }, [axiosInstance]);

  useEffect(() => {
    fetchVacancies();
  }, [fetchVacancies]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSavingAction(true);
    const form = new FormData();
    form.append("job_title", formData.job_title);
    form.append("description", formData.description);
    form.append("last_date", formData.last_date);
    try {
      let response;
      if (editingId) {
        response = await axiosInstance.put(`/vacancy/edit/${editingId}`, form, {
          withCredentials: true,
        });
      } else {
        response = await axiosInstance.post("/vacancy/create", form, {
          withCredentials: true,
        });
      }
      if (response.data.success) {
        fetchVacancies();
        closeModal();
      }
    } catch (error) {
      window.alert(error.response?.data?.message || "Error saving vacancy");
    }
    setSavingAction(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this vacancy?")) return;
    setDeletingAction((prev) => ({ ...prev, [id]: true }));
    try {
      const response = await axiosInstance.delete(`/vacancy/delete/${id}`, {
        withCredentials: true,
      });
      if (response.data.success) fetchVacancies();
    } catch (error) {
      window.alert(error.response?.data?.message || "Error deleting vacancy");
    }
    setDeletingAction((prev) => ({ ...prev, [id]: false }));
  };

  const openModal = (
    vacancy = { job_title: "", description: "", last_date: "" }
  ) => {
    setFormData(vacancy);
    setEditingId(vacancy._id || null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setFormData({ job_title: "", description: "", last_date: "" });
    setEditingId(null);
    setModalOpen(false);
  };

  return (
    <div className="p-5">
      <div className="flex flex-wrap gap-5 items-center justify-between mb-13">
        <p className="text-responsive-heading text-primary-blue-dark font-semibold tracking-wide uppercase">
          Vacancies
        </p>
        <button onClick={() => openModal()} className="button rounded">
          Add Vacancy
        </button>
      </div>
      <div className="flex flex-wrap gap-13 items-center justify-center">
        {vacancies && vacancies.length > 0 ? (
          vacancies.map((vacancy) => (
            <div
              key={vacancy._id}
              className="p-5 bg-primary-white rounded shadow-dark border border-black/10"
            >
              <p className="text-lg text-gray-900 font-semibold leading-relaxed mb-1">
                {vacancy.job_title}
              </p>
              <p className="text-base text-gray-700 mb-3">
                {`Apply Before: ${moment(vacancy.last_date)
                  .tz("Asia/Kathmandu")
                  .format("dddd, MMMM D, YYYY")}`}
              </p>
              <div className="mb-3">
                <p className="text-sm text-gray-500 mb-2">Job Description:</p>
                <div className="pt-3 px-3 border border-gray-300 rounded">
                  <TextReader content={vacancy.description} />
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-black/25 flex justify-end gap-3">
                <button
                  onClick={() => openModal(vacancy)}
                  className="button rounded py-1.5"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(vacancy._id)}
                  className={`button rounded py-1.5 bg-red-700 ${
                    deletingAction[vacancy._id]
                      ? "cursor-not-allowed opacity-60"
                      : "cursor-pointer"
                  }`}
                  disabled={deletingAction[vacancy._id]}
                >
                  {deletingAction[vacancy._id] ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))
        ) : fetching ? (
          <p className="text-primary-blue-dark font-medium italic">
            Fetching data...
          </p>
        ) : (
          <p className="text-red-600 font-medium italic">Nothing to show!</p>
        )}
      </div>
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs p-5 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-primary-white p-5 rounded shadow max-w-4xl max-h-full overflow-auto"
          >
            <p className="mb-5 text-responsive-text font-semibold tracking-wide uppercase">
              {editingId ? "Edit" : "Add"} Vacancy
            </p>
            <input
              type="text"
              id="job_title"
              name="job_title"
              placeholder="Job Title"
              value={formData.job_title}
              onChange={(e) =>
                setFormData({ ...formData, job_title: e.target.value })
              }
              className={`admin-input ${savingAction && "cursor-not-allowed"}`}
              required
              disabled={savingAction}
            />
            <div className={`mb-5 ${savingAction && "cursor-not-allowed"}`}>
              <TextEditor
                value={formData.description}
                onChange={handleContentChange}
                placeholder="Job Description"
              />
            </div>
            <label
              htmlFor="last_date"
              className="label text-gray-500 font-normal"
            >
              Last Date
            </label>
            <input
              type="date"
              id="last_date"
              name="last_date"
              placeholder="Last Date"
              value={moment(formData.last_date)
                .tz("Asia/Kathmandu")
                .format("YYYY-MM-DD")}
              onChange={(e) =>
                setFormData({ ...formData, last_date: e.target.value })
              }
              className={`admin-input ${savingAction && "cursor-not-allowed"}`}
              required
              disabled={savingAction}
            />
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
    </div>
  );
};

export default Vacancy;
