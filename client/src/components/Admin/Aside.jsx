import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BarChart3, Users, Settings, Package, Video } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../contexts/SidebarContext.js";

const Aside = () => {
  const [profile, setProfile] = useState("");
  const [navLinks, setNavlinks] = useState([])
  const dispatch = useDispatch();
  
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userInfo = JSON.parse(user);
      console.log(userInfo)
      setProfile(userInfo);
      console.log(profile)
      if(userInfo.role == "admin"){
        setNavlinks([
          { title: "Dashboard", icon: <BarChart3 size={20} />, path: "/dashboard" },
          { title: "Users", icon: <Users size={20} />, path: "/users" },
          { title: "Products", icon: <Package size={20} />, path: "/products" },
          { title: "Meetings", icon: <Video size={20} />, path: "/meetings" },
          { title: "Profile", icon: "profile", path: "/admin/profile" },
          { title: "Settings", icon: <Settings size={20} />, path: "/settings" },
        ])
      }else{
        setNavlinks([
          { title: "Products", icon: <Package size={20} />, path: "/products" },
          { title: "Profile", icon: "profile", path: `/${userInfo.role.toLowerCase()}/profile` },
          { title: "Settings", icon: <Settings size={20} />, path: "/settings" },
        ])
      }
    }
  }, []);

  const isSidebarOpen = useSelector((state) => state.isSidebarOpen.value);

  return (
    <>
      <div className="h-full w-64 bg-white border-r border-gray-200">
        <div className="py-4" >
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `
                  flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600 transition-all duration-300"
                      : ""
                  }
                `}
            >
              {link.icon === "profile" ? (
                <img
                  src={profile.image}
                  className="w-7 h-7 border-black border rounded-full"
                  alt={""}
                />
              ) : (
                link.icon
              )}
              <span className="ml-3">{link.title}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Aside;
