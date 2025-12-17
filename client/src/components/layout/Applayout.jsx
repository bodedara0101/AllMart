import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import AllMart from "./../../assets/output-onlinepngtools.png";
import Footer from './../Footer.jsx';


const AppLayout = ({ children }) => {
  let token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const userInfo = JSON.parse(user);

  const checkTokenExpiration = (token) => {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    console.log(currentTime)
    console.log(decodedToken.exp)
    return decodedToken.exp < currentTime;
  }

  if (!token) {
    localStorage.removeItem("user");
  }else if(checkTokenExpiration(token)){
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
    toast.success("Logout successful", { autoClose: 1500 });
  };

  return (
    <>
      <div className="app-layout h-[100vh]">
        <div className="nav h-[15%] flex items-center">
        <img src="https://img.ws.mms.shopee.ph/7c2cc0162362d21f870d5eb6d9c4b870" className="w-auto border-2 border-black rounded-full h-6 md:h-auto md:w-20 absolute md:top-2 left-[42%] md:left-10" alt="logo" />
          <Navbar userInfo={userInfo} handleLogout={handleLogout} />
        </div>
        <main className="main h-auto">{children}</main>
      <Footer />
      </div>
    </>
  );
};

export default AppLayout;
