import React from "react";
import { NavLink } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { Home, ShoppingBag } from "lucide-react";

const Navbar = ({ userInfo, handleLogout }) => {
  return (
    <div
      className={`z-50 links md:w-[40%] top-3 w-[60%] sm:w-[50%] mx-auto md:top-5 flex gap-5 items-center bg-zinc-900 fixed md:px-2 md:py-2 px-2 py-2 text-zinc-400 left-[50%] translate-x-[-30%] sm:translate-x-[-50%] rounded-lg shadow-black shadow-2xl ${
        userInfo ? "w-[30%] justify-between" : "justify-between"
      }`}
    >
      {userInfo ? (
        <>
          <ProfileMenu user={userInfo} logout={handleLogout} />
          <NavLink to="/mycart" className="p-2 rounded-lg relative flex">
            <ShoppingBag size={20} className="text-zinc-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </NavLink>
        </>
      ) : (
        <>
          <div className="">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "active navlink" : "navlink"
              }
            >
              <Home />
            </NavLink>
          </div>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "active navlink" : "navlink"
            }
          >
            login
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Navbar;
