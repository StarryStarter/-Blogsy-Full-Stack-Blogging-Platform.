import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

const Signup = () => {
  const { axios, setToken } = useAppContext();
    const navigate = useNavigate(); // ← initialize it
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/user/signup", formData);

      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = data.token;
        toast.success("Signup successful!");
        navigate('/login')
        // optionally redirect here
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={() => {
          navigate("/login");
        }}
        className="fixed top-7 right-19 z-50 flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-6 py-2.5 shadow-lg"
      >
        Login
        <img src={assets.arrow} className="w-3" alt="arrow" />
      </button>
      <button
        onClick={() => {
          navigate("/");
        }}
        className="fixed top-7 right-50 z-50 flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-6 py-2.5 shadow-lg"
      >
        Home
        <img src={assets.arrow} className="w-3" alt="arrow" />
      </button>

      <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg">
        <div className="w-full py6 text-center">
          <h1 className="text-3xl font-bold">
            <span className="text-primary">User</span> Signup
          </h1>
          <p className="font-light">Create your account to start blogging</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 text-gray-600">
          <div className="flex flex-col">
            <label>Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Your name"
              required
              className="border-b-2 border-gray-300 p-2 outline-none mb-6"
            />
          </div>
          <div className="flex flex-col">
            <label>Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Your email"
              required
              className="border-b-2 border-gray-300 p-2 outline-none mb-6"
            />
          </div>
          <div className="flex flex-col">
            <label>Password</label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Create password"
              required
              className="border-b-2 border-gray-300 p-2 outline-none mb-6"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 font-medium bg-primary text-white cursor-pointer hover:bg-primary/90 transition-all rounded"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
