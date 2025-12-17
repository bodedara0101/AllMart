import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {Users2Icon , ListOrderedIcon , Package2Icon, BadgeIndianRupeeIcon} from "lucide-react";

const Dashboard = () => {

  const isSidebar = useSelector((state) => state.isSidebarOpen.value);
  const users = useSelector((state) => state.dashboard.users);
  const products = useSelector((state) => state.dashboard.products);
  console.log(users)

  useEffect(() => {
    console.log(isSidebar);
  }, []);     

  return (
    <>
      
        <div className="p-6">
          {/* Your page content goes here */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Sample cards */}
            {[
              { title: "Total Users", value: users.length, color: "bg-blue-500", component :<Users2Icon className="w-12 h-12 text-blue-500"/> },
              { title: "Revenue", value: "$12,345", color: "bg-green-500", component :<BadgeIndianRupeeIcon className="w-12 h-12 text-green-500"/> },
              { title: "Orders", value: "456", color: "bg-purple-500", component :<ListOrderedIcon className="w-12 h-12 text-green-500"/> },
              { title: "Products", value: products.length, color: "bg-yellow-500", component :<Package2Icon className="w-12 h-12 text-orange-500"/> },
            ].map((card, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                {card.component}
                <h3 className="text-lg font-semibold text-gray-700">
                  {card.title}
                </h3>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
            ))}
          </div>
        </div>
    </>
  );
};

export default Dashboard;
