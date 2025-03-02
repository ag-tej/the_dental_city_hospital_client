import BlogCarousel from "../components/BlogCarousel";
import eye from "../assets/eye.svg";

const SingleBlog = () => {
  return (
    <section className="mt-32 px-5 md:px-8 xl:px-13">
      {/* Single Article */}
      <div className="max-w-4xl mx-auto">
        <article>
          <p className="text-responsive-heading text-primary-blue-dark font-semibold uppercase tracking-wide mb-5">
            Article Title Goes Here, But not too long
          </p>
          <img
            src="https://marketplace.canva.com/EAFAs6po4S4/1/0/1600w/canva-brown-neutral-minimalist-web-design-blog-banner-NoU393qujqk.jpg"
            alt="Blog Banner"
            className="w-full aspect-[3/2] max-h-[500px] object-cover rounded mb-3"
          />
          <div className="flex gap-5 justify-between items-center mb-5">
            <p className="text-responsive-text text-primary-blue-dark tracking-wide">
              Thursday 05, September 2021 | By Author
            </p>
            <div className="flex items-center gap-2 mt-auto">
              <img
                src={eye}
                loading="lazy"
                alt="View Icon"
                className="size-6"
              />
              <p className="text-gray-900 font-medium">68</p>
            </div>
          </div>
          <p className="text-responsive-text text-gray-900 tracking-wide leading-relaxed text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quos
            sequi, omnis sed recusandae rem molestias at corporis cumque dicta?
            At, ea quasi! Consectetur tempora odio excepturi maxime doloribus
            suscipit!
          </p>
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
