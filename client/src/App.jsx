import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginForm from "./pages/Login";
import SignUpForm from "./pages/SignUp";
import Profile from "./components/Profile";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FileUpload from "./components/FileUpload";
import AppLayout from "./components/layout/Applayout";
import PageNotFound from "./components/PageNotFound";
import Dashboard from "./components/Admin/Dashboard";
import AdminLayout from "./components/Admin/AdminLayout";
import UsersComponent from "./components/Admin/Users";
import { setToken } from "./contexts/tokenContext.js";
import { useDispatch } from "react-redux";
import Products from "./components/Admin/Products.jsx";
import Product from "./components/Admin/Product.jsx";
import ShoppingCart from "./components/Admin/ShoppingCart.jsx";
import Meetings from "./components/Admin/Meetings.jsx";

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  let token = localStorage.getItem("token");
  const dispatch = useDispatch();
  dispatch(setToken(token));

  const user = localStorage.getItem("user");
  const userInfo = JSON.parse(user);

  useEffect(() => {
    const handleAuth = async () => {
      if (token) {
        const response = await fetch("http://localhost:8000/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          console.log(data);
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } else {
        ("");
      }
    };

    handleAuth();
  }, []);

  return (
    <>
      <Router>
        <ToastContainer />

        <Routes>
          {/* user routes go here */}

          <Route
            path="/"
            element={
              <AppLayout userInfo={userInfo}>
                <Home />
              </AppLayout>
            }
          />
          <Route path="/FileUpload" element={<FileUpload />} />
          <Route
            path="/login"
            element={
              isAuth ? (
                <Navigate to="/profile" />
              ) : (
                <AppLayout>
                  <LoginForm />
                </AppLayout>
              )
            }
          />
          <Route
            path="/profile"
            element={
              isAuth ? <Profile isAuth={isAuth} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/signup"
            element={
              isAuth ? (
                <Navigate to="/profile" />
              ) : (
                <AppLayout>
                  <SignUpForm />
                </AppLayout>
              )
            }
          />
          <Route
            path="/mycart"
            element={
              <AppLayout>
                <ShoppingCart />
              </AppLayout>
            }
          />

          {/* admin routes go here */}

          <Route path="*" element={<PageNotFound />} />
          <Route
            path="/meetings"
            element={
              <AdminLayout>
                <Meetings />
              </AdminLayout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            }
          />
          <Route
            path={`/profile`}
            element={
              <AdminLayout>
                <Profile />
              </AdminLayout>
            }
          />
          <Route
            path="/users"
            element={
              <AdminLayout>
                <UsersComponent />
              </AdminLayout>
            }
          />
          <Route
            path="/products"
            element={
              <AdminLayout>
                <Products />
              </AdminLayout>
            }
          />
          <Route
            path="/products/:id"
            element={
              <AdminLayout>
                <Product />
              </AdminLayout>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
