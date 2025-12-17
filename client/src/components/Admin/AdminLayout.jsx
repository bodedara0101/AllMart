import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";
import Aside from "./Aside";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setP, setU } from "../../contexts/dashboardContext";
import Footer from "../Footer";

const AdminLayout = ({ children }) => {
  const isSidebarOpen = useSelector((state) => state.isSidebarOpen.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const [userP, setUserP] = useState("");
  const [products, setProducts] = useState("");

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
        if (user.user.role !== "admin" && user.user.role !== "Manager") {
          toast.info(`User Unauthorized for ${window.location.pathname}`, {
            autoClose: 1500,
          });
          navigate("/profile");
        }
        setUserP(user.user);
        {
          user.user
            ? toast.success(`Welcome ${user.user.username}`)
            : toast.error("token expired", { autoClose: 1500, delay: 200 });
        }
      };
      fetchUser();
      const getAllUsers = async () => {
        try {
          const response = await fetch("http://localhost:8000/admin/api/users");
          const data = await response.json();
          console.log(data);
          dispatch(setU(data));
        } catch (error) {
          console.error(error);
        }
      };

      getAllUsers();
      const getAllProducts = async () => {
        try {
          const response = await fetch(
            "http://localhost:8000/admin/api/products"
          );
          const data = await response.json();
          console.log(data);
          dispatch(setP(data));
        } catch (error) {
          console.error(error);
        }
      };

      getAllProducts();
    } else {
      setUserP(null);
    }
  }, []);

  return (
    <>
      {userP ? (
        <>
          <div className="h-[100vh]">
            <AdminNav />
            <main
              className={`pt-[61px] ${
                isSidebarOpen ? "ml-64" : "ml-0"
              } transition-margin duration-300`}
            >
              {children}
            </main>
            <aside
              className={`fixed left-0 top-[61px] z-40 h-screen transition-transform ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <Aside />
            </aside>
          </div>
        </>
      ) : (
        <div className="text-center text-2xl mt-20">
          You are not authorized please{" "}
          <span className="underline text-blue-700">
            <a href="/login">login</a>
          </span>{" "}
          again!
        </div>
      )}
    </>
  );
};

export default AdminLayout;
