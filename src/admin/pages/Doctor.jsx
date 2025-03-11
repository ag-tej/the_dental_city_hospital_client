import { useState, useEffect, useCallback, useRef } from "react";
import useAxios from "../UseAxios";
import facebook from "../../assets/facebook.svg";
import instagram from "../../assets/instagram.svg";
import linkedin from "../../assets/linkedin.svg";
import femaleDoctor from "../../assets/female-doctor.jpg";
import maleDoctor from "../../assets/male-doctor.jpg";

const Doctor = () => {
  const axiosInstance = useAxios();
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    profile_image: null,
    name: "",
    department: "",
    gender: "",
    facebook_link: "",
    instagram_link: "",
    linkedin_link: "",
  });
  const [fetching, setFetching] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [savingAction, setSavingAction] = useState(false);
  const [deletingAction, setDeletingAction] = useState({});
  // useStates for department list, filtered department list and dropdown
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Refs for department input and dropdown
  const departmentInputRef = useRef(null);
  const dropdownRef = useRef(null);

  const fetchDoctors = useCallback(async () => {
    try {
      setFetching(true);
      const response = await axiosInstance.get("/doctor");
      if (response.data.success) setDoctors(response.data.data);
    } catch (error) {
      window.alert(error.response?.data?.message || "Something went wrong");
    }
    setFetching(false);
  }, [axiosInstance]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  // Update department list for dropdown
  useEffect(() => {
    const departments = doctors.map((doctor) => doctor.department);
    const uniqueDepartments = Array.from(new Set(departments));
    setDepartments(uniqueDepartments);
    setFilteredDepartments(uniqueDepartments);
  }, [doctors]);

  // Filter departments based on user input
  const handleDepartmentInputChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, department: value });
    // If input is empty, reset to full department list
    if (value === "") {
      setFilteredDepartments(departments);
      setIsDropdownOpen(false);
    } else {
      // Filter departments
      const filtered = departments.filter((department) =>
        department.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDepartments(filtered);
      setIsDropdownOpen(true);
    }
  };

  // Select department from dropdown
  const handleDepartmentSelect = (department) => {
    setFormData({ ...formData, department });
    setFilteredDepartments(departments);
    setIsDropdownOpen(false);
  };

  // Handle clicks outside the department input or dropdown to close the dropdown
  const handleClickOutside = (e) => {
    if (
      departmentInputRef.current &&
      !departmentInputRef.current.contains(e.target) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  // Listen for clicks outside department input and dropdown to close the dropdown
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the event listener when component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSavingAction(true);
    const form = new FormData();
    form.append("name", formData.name);
    form.append("department", formData.department);
    form.append("gender", formData.gender);
    form.append("facebook_link", formData.facebook_link);
    form.append("instagram_link", formData.instagram_link);
    form.append("linkedin_link", formData.linkedin_link);
    if (formData.profile_image) form.append("image", formData.profile_image);
    try {
      let response;
      if (editingId) {
        response = await axiosInstance.put(`/doctor/edit/${editingId}`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });
      } else {
        response = await axiosInstance.post("/doctor/create", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });
      }
      if (response.data.success) {
        fetchDoctors();
        closeModal();
        setImagePreview(null);
      }
    } catch (error) {
      window.alert(error.response?.data?.message || "Error saving doctor");
    }
    setSavingAction(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this doctor?")) return;
    setDeletingAction((prev) => ({ ...prev, [id]: true }));
    try {
      const response = await axiosInstance.delete(`/doctor/delete/${id}`, {
        withCredentials: true,
      });
      if (response.data.success) fetchDoctors();
    } catch (error) {
      window.alert(error.response?.data?.message || "Error deleting doctor");
    }
    setDeletingAction((prev) => ({ ...prev, [id]: false }));
  };

  const openModal = (
    doctor = {
      profile_image: null,
      name: "",
      department: "",
      gender: "",
      facebook_link: "",
      instagram_link: "",
      linkedin_link: "",
    }
  ) => {
    setFormData(doctor);
    setImagePreview(doctor.cover_image);
    setEditingId(doctor._id || null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setFormData({
      profile_image: null,
      name: "",
      department: "",
      gender: "",
      facebook_link: "",
      instagram_link: "",
      linkedin_link: "",
    });
    setImagePreview(null);
    setEditingId(null);
    setModalOpen(false);
  };

  return (
    <div className="p-5">
      <div className="flex flex-wrap gap-5 items-center justify-between mb-13">
        <p className="text-responsive-heading text-primary-blue-dark font-semibold tracking-wide uppercase">
          Doctors
        </p>
        <button onClick={() => openModal()} className="button rounded">
          Add Doctor
        </button>
      </div>
      <div className="flex flex-wrap gap-13 items-stretch justify-center">
        {doctors && doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="max-w-xs p-4 rounded shadow-dark bg-primary-white border border-black/10 flex flex-col grow shrink"
            >
              <div className="bg-primary-blue-light text-primary-blue-dark text-center font-medium rounded mb-3">
                <img
                  src={
                    doctor.profile_image
                      ? doctor.profile_image
                      : doctor.gender == "Male"
                      ? maleDoctor
                      : femaleDoctor
                  }
                  loading="lazy"
                  alt={doctor.name}
                  className="w-full aspect-[5/4] object-cover rounded"
                />
                <div className="p-4">
                  <p className="text-responsive-text xl:text-lg font-medium tracking-wide uppercase mb-1">
                    {doctor.name}
                  </p>
                  <p className="text-responsive-text font-normal tracking-wide uppercase mb-3">
                    {doctor.department}
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    {doctor.facebook_link && (
                      <a
                        href={doctor.facebook_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={facebook}
                          alt="Facebook Icon"
                          loading="lazy"
                          className="size-8"
                        />
                      </a>
                    )}
                    {doctor.instagram_link && (
                      <a
                        href={doctor.instagram_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={instagram}
                          alt="Instagram Icon"
                          loading="lazy"
                          className="size-8"
                        />
                      </a>
                    )}
                    {doctor.linkedin_link && (
                      <a
                        href={doctor.linkedin_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={linkedin}
                          alt="Linkedin Icon"
                          loading="lazy"
                          className="size-8"
                        />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-auto pt-3 border-t border-black/25 flex justify-end gap-3">
                <button
                  to={`/doctor/${doctor._id}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="button rounded py-1.5 bg-green-700"
                >
                  View
                </button>
                <button
                  onClick={() => openModal(doctor)}
                  className="button rounded py-1.5"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(doctor._id)}
                  className={`button rounded py-1.5 bg-red-700 ${
                    deletingAction[doctor._id]
                      ? "cursor-not-allowed opacity-60"
                      : "cursor-pointer"
                  }`}
                  disabled={deletingAction[doctor._id]}
                >
                  {deletingAction[doctor._id] ? "Deleting..." : "Delete"}
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
            className="relative bg-primary-white p-5 rounded shadow max-w-xl max-h-full overflow-auto"
          >
            <p className="mb-5 text-responsive-text font-semibold tracking-wide uppercase">
              {editingId ? "Edit" : "Add"} Doctor
            </p>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Doctor's Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={`admin-input ${savingAction && "cursor-not-allowed"}`}
              required
              disabled={savingAction}
            />
            <input
              ref={departmentInputRef}
              type="text"
              id="department"
              name="department"
              placeholder="Doctor's Department"
              value={formData.department}
              onChange={handleDepartmentInputChange}
              className={`admin-input ${savingAction && "cursor-not-allowed"}`}
              required
              disabled={savingAction}
              onFocus={() => setIsDropdownOpen(true)}
            />
            {/* Dropdown for departments */}
            {isDropdownOpen && filteredDepartments.length > 0 && (
              <div
                ref={dropdownRef}
                className="absolute -mt-4 z-10 bg-[#e9e9ed] shadow p-1.5 rounded border border-gray-300 w-[calc(100%-40px)] max-h-48 overflow-y-auto"
              >
                <div className="dropdown-item px-5 py-2 rounded text-gray-500">
                  Select Department
                </div>
                {filteredDepartments.map((department, index) => (
                  <div
                    key={index}
                    onClick={() => handleDepartmentSelect(department)}
                    className="dropdown-item px-5 py-2 rounded cursor-pointer hover:bg-[#e0e0e6]"
                  >
                    {department}
                  </div>
                ))}
              </div>
            )}
            <label htmlFor="gender" className="hidden">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              placeholder="Gender"
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              className={`admin-input ${savingAction && "cursor-not-allowed"}`}
              required
              disabled={savingAction}
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="url"
              id="facebook_link"
              name="facebook_link"
              placeholder="Doctor's Facebook Link (optional)"
              value={formData.facebook_link}
              onChange={(e) =>
                setFormData({ ...formData, facebook_link: e.target.value })
              }
              className={`admin-input ${savingAction && "cursor-not-allowed"}`}
              disabled={savingAction}
            />
            <input
              type="url"
              id="instagram_link"
              name="instagram_link"
              placeholder="Doctor's Instagram Link (optional)"
              value={formData.instagram_link}
              onChange={(e) =>
                setFormData({ ...formData, instagram_link: e.target.value })
              }
              className={`admin-input ${savingAction && "cursor-not-allowed"}`}
              disabled={savingAction}
            />
            <input
              type="url"
              id="linkedin_link"
              name="linkedin_link"
              placeholder="Doctor's Linkedin Link (optional)"
              value={formData.linkedin_link}
              onChange={(e) =>
                setFormData({ ...formData, linkedin_link: e.target.value })
              }
              className={`admin-input ${savingAction && "cursor-not-allowed"}`}
              disabled={savingAction}
            />
            <input
              type="file"
              id="profile_image"
              name="profile_image"
              onChange={(e) => {
                setFormData({ ...formData, profile_image: e.target.files[0] });
                setImagePreview(URL.createObjectURL(e.target.files[0]));
              }}
              className={`admin-input ${savingAction && "cursor-not-allowed"}`}
              disabled={savingAction}
            />
            {imagePreview && (
              <div className="mb-5">
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="w-1/3 h-auto object-cover rounded bg-gray-300"
                />
              </div>
            )}
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

export default Doctor;
