import React, { useEffect, useState } from "react";
import { blogCategories } from "../assets/assets";
import { motion } from "motion/react";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const UserBlogList = () => {
  const [menu, setMenu] = useState("All");
  const [userBlogs, setUserBlogs] = useState([]);
  const { input, axios } = useAppContext();

  // Fetch user's blogs
  const fetchUserBlogs = async () => {
    try {
      const { data } = await axios.get("/api/user/blogs");
      if (data.success) {
        setUserBlogs(data.blogs);
      } else {
        toast.error(data.message || "Could not fetch blogs");
      }
    } catch (err) {
      toast.error("Error fetching user blogs");
    }
  };

  useEffect(() => {
    fetchUserBlogs();
  }, []);

  const filteredBlogs = () => {
    if (input === "") return userBlogs;

    return userBlogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(input.toLowerCase()) ||
        blog.category.toLowerCase().includes(input.toLowerCase())
    );
  };

  return (
    <div>
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`cursor-pointer text-gray-500 ${
                menu === item && "text-white px-4 pt-0.5"
              }`}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full"
                />
              )}
            </button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 sm:mx-16 xl:mx-40">
        {filteredBlogs()
          .filter((blog) => (menu === "All" ? true : blog.category === menu))
          .map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
      </div>
    </div>
  );
};

export default UserBlogList;
