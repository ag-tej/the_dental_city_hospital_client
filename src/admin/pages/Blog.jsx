import { useState, useEffect, useCallback } from "react";
import moment from "moment-timezone";
import useAxios from "../UseAxios";
import TextEditor from "../components/TextEditor";
import eye from "../../assets/eye.svg";
import { NavLink } from "react-router";

const Blog = () => {
  const axiosInstance = useAxios();
  const [fetching, setFetching] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    cover_image: null,
    author: "",
    content: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [savingAction, setSavingAction] = useState(false);
  const [deletingAction, setDeletingAction] = useState({});

  const handleContentChange = (newContent) => {
    setFormData({ ...formData, content: newContent });
  };

  const fetchBlogs = useCallback(async () => {
    try {
      setFetching(true);
      const response = await axiosInstance.get("/blog");
      if (response.data.success) setBlogs(response.data.data);
    } catch (error) {
      window.alert(error.response?.data?.message || "Something went wrong");
    }
    setFetching(false);
  }, [axiosInstance]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSavingAction(true);
    const form = new FormData();
    form.append("title", formData.title);
    form.append("author", formData.author);
    form.append("content", formData.content);
    if (formData.cover_image) form.append("image", formData.cover_image);
    try {
      let response;
      if (editingId) {
        response = await axiosInstance.put(`/blog/edit/${editingId}`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });
      } else {
        response = await axiosInstance.post("/blog/create", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });
      }
      if (response.data.success) {
        fetchBlogs();
        closeModal();
        setImagePreview(null);
      }
    } catch (error) {
      window.alert(error.response?.data?.message || "Error saving blog");
    }
    setSavingAction(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    setDeletingAction((prev) => ({ ...prev, [id]: true }));
    try {
      const response = await axiosInstance.delete(`/blog/delete/${id}`, {
        withCredentials: true,
      });
      if (response.data.success) fetchBlogs();
    } catch (error) {
      window.alert(error.response?.data?.message || "Error deleting blog");
    }
    setDeletingAction((prev) => ({ ...prev, [id]: false }));
  };

  const openModal = (
    blog = { title: "", cover_image: null, author: "", content: "" }
  ) => {
    setFormData(blog);
    setImagePreview(blog.cover_image);
    setEditingId(blog._id || null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setFormData({ title: "", cover_image: null, author: "", content: "" });
    setImagePreview(null);
    setEditingId(null);
    setModalOpen(false);
  };

  return (
    <div className="p-5">
      <div className="flex flex-wrap gap-5 items-center justify-between mb-13">
        <p className="text-responsive-heading text-primary-blue-dark font-semibold tracking-wide uppercase">
          Blogs
        </p>
        <button onClick={() => openModal()} className="button rounded">
          Add Blog
        </button>
      </div>
      <div className="flex flex-wrap gap-13 items-center justify-center">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="p-4 bg-primary-white rounded shadow-dark border border-black/10"
            >
              <div className="w-lg rounded flex flex-col md:flex-row gap-2 bg-primary-white border border-black/5">
                <img
                  src={blog.cover_image}
                  loading="lazy"
                  alt="Image Name"
                  className="md:w-2/5 aspect-[5/3] xs:aspect-square object-cover rounded-l"
                />
                <div className="p-5 flex flex-col">
                  <p className="text-responsive-text text-primary-blue-dark tracking-wide">
                    {moment(blog.createdAt)
                      .tz("Asia/Kathmandu")
                      .format("dddd, MMMM D, YYYY")}
                  </p>
                  <p className="text-responsive-text text-primary-blue-dark tracking-wide mb-3">
                    {`Author: ${blog.author}`}
                  </p>
                  <p className="text-responsive-text xl:text-lg font-normal text-gray-900 tracking-wide mb-3">
                    {blog.title}
                  </p>
                  <div className="flex items-center gap-2 mt-auto">
                    <img
                      src={eye}
                      loading="lazy"
                      alt="View Icon"
                      className="size-5"
                    />
                    <p className="text-responsive-text text-gray-900 font-medium">
                      {blog.view_count}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-black/25 flex justify-end gap-3">
                <NavLink
                  to={`/blog/${blog._id}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="button rounded py-1.5 bg-green-700"
                >
                  View
                </NavLink>
                <button
                  onClick={() => openModal(blog)}
                  className="button rounded py-1.5"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className={`button rounded py-1.5 bg-red-700 ${
                    deletingAction[blog._id]
                      ? "cursor-not-allowed opacity-60"
                      : "cursor-pointer"
                  }`}
                  disabled={deletingAction[blog._id]}
                >
                  {deletingAction[blog._id] ? "Deleting..." : "Delete"}
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
              {editingId ? "Edit" : "Add"} Blog
            </p>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Blog Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className={`admin-input ${savingAction && "cursor-not-allowed"}`}
              required
              disabled={savingAction}
            />
            <input
              type="text"
              id="author"
              name="author"
              placeholder="Blog Author"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              className={`admin-input ${savingAction && "cursor-not-allowed"}`}
              required
              disabled={savingAction}
            />
            <div className={`mb-5 ${savingAction && "cursor-not-allowed"}`}>
              <TextEditor
                value={formData.content}
                onChange={handleContentChange}
                placeholder="Blog Content"
              />
            </div>
            <input
              type="file"
              id="cover_image"
              name="cover_image"
              onChange={(e) => {
                setFormData({ ...formData, cover_image: e.target.files[0] });
                setImagePreview(URL.createObjectURL(e.target.files[0]));
              }}
              className={`admin-input ${savingAction && "cursor-not-allowed"}`}
              required={editingId ? false : true}
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

export default Blog;
