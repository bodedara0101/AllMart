import React, { useEffect, useState } from "react";
import {
  BarChart3,
  Users,
  Settings,
  Package,
  Bell,
  Search,
  Menu,
  ShoppingBag,
  X,
  User,
  Home,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../contexts/SidebarContext";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const AdminNav = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const isSidebar = useSelector((state) => state.isSidebarOpen.value);
  const dispatch = useDispatch();
  const [userP, setUserP] = useState("");
  const token = localStorage.getItem("token");

  console.log(token);

  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        const response = await fetch("http://localhost:8000/profile", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const user = await response.json();
        console.log(user);
        setUserP(user.user);
        // {
        //   user.user
        //     ? toast.success(`Welcome ${user.user.username}`)
        //     : toast.error("token expired", { autoClose: 1500, delay: 200 });
        // }
      };
      fetchUser();
    } else {
      setUserP(null);
    }
    console.log(isSidebar);
  }, [localStorage.getItem("token")]);
  console.log(userP);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-4 py-3 lg:px-6">
          <div className="flex items-center justify-between">
            {/* Left side */}
            <div className="flex items-center">
              <button
                onClick={() => {
                  dispatch(toggleSidebar());
                  setIsSidebarOpen(isSidebar);
                }}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                {isSidebarOpen ? <Menu size={24} /> : <X size={24} />}
              </button>

              <NavLink
                to="/"
                className={`adminNav px-4 py-2 hover:bg-gray-100 ${({
                  isActive,
                }) => (isActive ? "active navlink" : "navlink")}`}
              >
                <Home />
              </NavLink>
            </div>

            {/* Search bar */}
            <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search..."
                />
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 relative flex">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 relative group"
                >
                  <span className="hidden md:inline capitalize">
                    {userP?.username}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center hover:scale-125 transition-all">
                    <img
                      src={userP?.image}
                      alt=""
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <NavLink to={userP.image}>
                    <div className="absolute right-[50%] top-20 mt-2 bg-gray-800 bg-opacity-10 text-white w-[200px] md:w-[400px] h-auto text-sm py-2 rounded-2xl md:rounded-2xl px-2 hidden items-center group-hover:flex group-hover:flex-col duration-500 transition-all">
                      <img
                        src={userP?.image}
                        alt=""
                        className="w-full rounded-xl h-auto"
                      />
                    </div>
                  </NavLink>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                    <NavLink
                      to="/admin/profile"
                      className={`adminNav block px-4 py-2 hover:bg-gray-100 ${({
                        isActive,
                      }) => (isActive ? "active navlink" : "navlink")}`}
                    >
                      Profile
                    </NavLink>
                    <NavLink
                      to="/admin/settings"
                      className={`adminNav block px-4 py-2 hover:bg-gray-100 ${({
                        isActive,
                      }) => (isActive ? "active navlink" : "navlink")}`}
                    >
                      Settings
                    </NavLink>
                    <NavLink
                      to="/admin/logout"
                      onClick={handleLogout}
                      className={`hover:bg-red-500 adminNav block px-4 py-2 hover:text-white ${({
                        isActive,
                      }) => (isActive ? "active navlink" : "navlink")}`}
                    >
                      Logout
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AdminNav;
