import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../contexts/userContext/userContext.slice.js";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const loginHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log(data);
      // dispatch(setUser(data.fuser))
      {
        data.token && localStorage.setItem("token", data.token);
      }
      {
        data.fuser && localStorage.setItem("user", JSON.stringify(data.fuser));
      }
      setLoading(false);

      if (response.status === 200) {
        if (data.fuser.role === "admin") {
          navigate("/dashboard");
          window.location.reload();
        } else {
          navigate("/profile");
          window.location.reload();
        }
      }
      if (
        response.status === 401 ||
        response.status === 400 ||
        response.status === 500
      ) {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
          Login to Your Account
        </h2>
        <form id="signinForm" onSubmit={loginHandler}>
          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-600 font-medium mb-2"
            >
              username
            </label>
            <input
              type="username"
              id="username"
              value={username}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-600 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        {/* Additional Links */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-500 hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
          <p className="mt-2">
            <Link
              to="/forgot-password"
              className="text-blue-500 hover:underline font-medium"
            >
              Forgot your password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
