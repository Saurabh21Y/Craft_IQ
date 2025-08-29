import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { X, Menu } from "lucide-react";
import Sidebar from "../Components/Sidebar";
import { SignIn,useUser } from "@clerk/clerk-react";

const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const { user } = useUser();

  return user ? (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#a2d2ff] to-[#b8c0ff]">
      {/* Navbar */}
      <nav className="w-full px-6 py-4 flex items-center justify-between bg-white/20 backdrop-blur-md shadow-md">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src={assets.logo1}
            alt="logo1"
            onClick={() => navigate("/")}
            className="h-20 w-auto cursor-pointer"
          />
          <h1 className="text-lg font-bold text-gray-800">CraftIQ</h1>
        </div>

        {/* Mobile Toggle */}
        {sidebar ? (
          <X
            onClick={() => setSidebar(false)}
            className="w-7 h-7 text-gray-700 lg:hidden cursor-pointer"
          />
        ) : (
          <Menu
            onClick={() => setSidebar(true)}
            className="w-7 h-7 text-gray-700 lg:hidden cursor-pointer"
          />
        )}
      </nav>

      {/* Content Area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        
        <div className="mt-6">
            <Outlet />
          </div>

      </div>
    </div>
  ) : (

    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
        
    )
};

export default Layout;
