import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import moment from "moment-timezone";
import useAxios from "../admin/UseAxios";
import TextReader from "../admin/components/TextReader";
import BlogCarousel from "../components/BlogCarousel";
import eye from "../assets/eye.svg";

const SingleBlog = () => {
  const axiosInstance = useAxios();
  const { id } = useParams();
  const [blog, setBlog] = useState([]);

  const fetchBlog = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/blog/${id}`);
      if (response.data.success) setBlog(response.data.data);
    } catch (error) {
      window.alert(error.response?.data?.message || "Something went wrong");
    }
  }, [id, axiosInstance]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  return (
    <section className="mt-32 px-5 md:px-8 xl:px-13">
      {/* Single Article */}
      <div className="max-w-4xl mx-auto">
        <article>
          <p className="text-responsive-heading text-primary-blue-dark font-semibold uppercase tracking-wide mb-5">
            {blog.title}
          </p>
          <img
            src={blog.cover_image}
            alt="Blog Banner"
            className="w-full aspect-[3/2] max-h-[500px] object-cover rounded mb-3 border border-gray-300"
          />
          <div className="flex gap-5 justify-between items-center mb-8">
            <p className="text-responsive-text text-primary-blue-dark tracking-wide">
              {`${moment(blog.createdAt)
                .tz("Asia/Kathmandu")
                .format("dddd, MMMM D, YYYY")} | Author: ${blog.author}`}
            </p>
            <div className="flex items-center gap-2 mt-auto">
              <img
                src={eye}
                loading="lazy"
                alt="View Icon"
                className="size-6"
              />
              <p className="text-gray-900 font-medium">{blog.view_count}</p>
            </div>
          </div>
          <TextReader content={blog.content} />
        </article>
      </div>
      {/* Blogs */}
      <div className="mb-16">
        <BlogCarousel />
      </div>
    </section>
  );
};

export default SingleBlog;
