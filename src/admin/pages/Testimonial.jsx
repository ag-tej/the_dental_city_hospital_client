import { useState, useEffect, useCallback } from "react";
import useAxios from "../UseAxios";

const Testimonial = () => {
  const axiosInstance = useAxios();
  const [testimonials, setTestimonials] = useState([]);
  const [formData, setFormData] = useState({
    client_name: "",
    client_message: "",
  });
  const [fetching, setFetching] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [savingAction, setSavingAction] = useState(false);
  const [deletingAction, setDeletingAction] = useState({});

  const fetchTestimonials = useCallback(async () => {
    try {
      setFetching(true);
      const response = await axiosInstance.get("/testimonial");
      if (response.data.success) setTestimonials(response.data.data);
    } catch (error) {
      window.alert(error.response?.data?.message || "Something went wrong");
    }
    setFetching(false);
  }, [axiosInstance]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSavingAction(true);
    const form = new FormData();
    form.append("client_name", formData.client_name);
    form.append("client_message", formData.client_message);
    try {
      let response;
      if (editingId) {
        response = await axiosInstance.put(
          `/testimonial/edit/${editingId}`,
          form,
          { withCredentials: true }
        );
      } else {
        response = await axiosInstance.post("/testimonial/create", form, {
          withCredentials: true,
        });
      }
      if (response.data.success) {
        fetchTestimonials();
        closeModal();
        window.alert(response.data.message);
      }
    } catch (error) {
      window.alert(error.response?.data?.message || "Error saving testimonial");
    }
    setSavingAction(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    setDeletingAction((prev) => ({ ...prev, [id]: true }));
    try {
      const response = await axiosInstance.delete(`/testimonial/delete/${id}`, {
        withCredentials: true,
      });
      if (response.data.success) {
        fetchTestimonials();
        window.alert(response.data.message);
      }
    } catch (error) {
      window.alert(
        error.response?.data?.message || "Error deleting testimonial"
      );
    }
    setDeletingAction((prev) => ({ ...prev, [id]: false }));
  };

  const openModal = (testimonial = { client_name: "", client_message: "" }) => {
    setFormData(testimonial);
    setEditingId(testimonial._id || null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setFormData({ client_name: "", client_message: "" });
    setEditingId(null);
    setModalOpen(false);
  };

  return (
    <div className="p-5">
      <div className="flex flex-wrap gap-5 items-center justify-between mb-13">
        <p className="text-responsive-heading text-primary-blue-dark font-semibold tracking-wide uppercase">
          Testimonials
        </p>
        <button onClick={() => openModal()} className="button rounded">
          Add Testimonial
        </button>
      </div>
      <div className="flex flex-wrap gap-13 items-stretch justify-center">
        {testimonials && testimonials.length > 0 ? (
          testimonials.map((testimonial) => (
            <div
              key={testimonial._id}
              className="max-w-md p-4 bg-primary-white rounded shadow-dark border border-black/10 flex flex-col grow shrink"
            >
              <p className="text-base text-gray-900 font-semibold mb-3">
                {testimonial.client_name}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed tracking-wide mb-3">
                {testimonial.client_message}
              </p>
              <div className="mt-auto pt-3 border-t border-black/25 flex justify-end gap-3">
                <button
                  onClick={() => openModal(testimonial)}
                  className="button rounded py-1.5"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(testimonial._id)}
                  className={`button rounded py-1.5 bg-red-700 ${
                    deletingAction[testimonial._id]
                      ? "cursor-not-allowed opacity-60"
                      : "cursor-pointer"
                  }`}
                  disabled={deletingAction[testimonial._id]}
                >
                  {deletingAction[testimonial._id] ? "Deleting..." : "Delete"}
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-primary-white p-5 rounded shadow max-w-md"
          >
            <p className="mb-5 text-responsive-text font-semibold tracking-wide uppercase">
              {editingId ? "Edit" : "Add"} Testimonial
            </p>
            <input
              type="text"
              id="client_name"
              name="client_name"
              placeholder="Client Name"
              value={formData.client_name}
              onChange={(e) =>
                setFormData({ ...formData, client_name: e.target.value })
              }
              className={`admin-input ${savingAction && "cursor-not-allowed"}`}
              required
              disabled={savingAction}
            />
            <textarea
              rows={5}
              id="client_message"
              name="client_message"
              placeholder="Message"
              value={formData.client_message}
              onChange={(e) =>
                setFormData({ ...formData, client_message: e.target.value })
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

export default Testimonial;
