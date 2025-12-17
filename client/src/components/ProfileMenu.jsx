import React, { useState } from "react";
import { ChevronDown, User, Settings, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ProfileMenu = ({ user, logout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  };
  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="relative w-full">
      {/* Profile Button */}
      <button
        className={`flex items-center overflow-hidden gap-2 rounded-lg cursor-default duration-300 h-[40px] md:justify-start justify-between ${
          user ? "w-[100%]" : ""
        }`}
      >
        <img
          src={
            user.image
              ? user.image
              : "https://tse4.mm.bing.net/th?id=OIP.Yaficbwe3N2MjD2Sg0J9OgHaHa&pid=Api&P=0&h=180"
          }
          alt="Profile"
          className="md:h-12 h-10 w-[80%] sm:w-[50%] md:w-[30%] rounded-lg cursor-pointer border-none hover:scale-110 transition-all"
          onClick={goToProfile}
        />
        {/* <span className="text-gray-400 font-medium capitalize">Profile</span> */}
        <ChevronDown
          className={`w-6 h-6 cursor-pointer font-bold text-gray-400 transition-all duration-300 ${
            menuOpen ? "rotate-180" : "rotate-0"
          }`}
          onClick={(e) => {
            toggleMenu(e);
          }}
        />
      </button>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <Link
            to={user.role === "admin" || user.role === "Manager" ? "/dashboard" : "/profile"}
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition duration-200"
          >
            <User className="w-5 h-5 mr-2 text-gray-500" />
            {user.role === "admin" || user.role === "Manager" ? "Dashboard" : "Profile"}
          </Link>
          <Link
            to="/profile/settings"
            className="chev flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200"
          >
            <Settings className=" w-5 h-5 mr-2 text-gray-500" />
            Settings
          </Link>
          <button
            onClick={(e) => {
              toggleMenu(e);
              logout();
            }}
            className="flex items-center rounded-lg w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200"
          >
            <LogOut className="w-5 h-5 mr-2 text-gray-500" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
