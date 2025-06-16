import React from "react";
import { assets } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { navigate, token } = useAppContext();

  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="w-20 h-13 sm:w-44 cursor-pointer"
      />

      <div className="flex gap-4">
        <button
          onClick={() => {
            navigate("/user");
          }}
          className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-6 sm:px-8 md:px-10 py-2.5"
        >
          {token ? "Dashboard" : "Login"}
          <img src={assets.arrow} className="w-3" alt="arrow" />
        </button>

        {!token && (
          <button
            onClick={() => {
              navigate("/signup");
            }}
            className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-6 sm:px-8 md:px-10 py-[11px]"
          >
            SignUp
            <img src={assets.arrow} className="w-3" alt="arrow" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
