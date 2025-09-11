import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { X, Menu } from "lucide-react";
import Sidebar from "../Components/Sidebar";
import { SignIn, useUser } from "@clerk/clerk-react";

const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const { user } = useUser();

  return user ? (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#a2d2ff] to-[#b8c0ff]">
      {/* Navbar */}
      <nav className="w-full px-6 py-3 flex items-center justify-between bg-white/40 backdrop-blur-lg shadow-md z-40">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src={assets.logo1}
            alt="CraftIQ Logo"
            onClick={() => navigate("/")}
            className="h-14 sm:h-16 w-auto cursor-pointer transition hover:scale-105"
          />
          <h1 className="text-lg font-bold text-gray-800 tracking-wide">CraftIQ</h1>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 rounded hover:bg-gray-200/60 transition"
          aria-label={sidebar ? "Close sidebar" : "Open sidebar"}
          onClick={() => setSidebar((s) => !s)}
        >
          {sidebar ? <X className="w-7 h-7 text-gray-700" /> : <Menu className="w-7 h-7 text-gray-700" />}
        </button>
      </nav>

      {/* Content Area */}
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        {/* Overlay for mobile */}
        {sidebar && (
          <div
            className="fixed inset-0 z-40 bg-black/20 lg:hidden"
            onClick={() => setSidebar(false)}
            aria-hidden="true"
          />
        )}
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />

        {/* Main content */}
        <main className="flex-1 w-full px-2 pt-8 pb-6 md:px-8 lg:px-12 overflow-x-hidden min-h-[calc(100vh-72px)]">
          <Outlet />
        </main>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#a2d2ff] to-[#b8c0ff]">
      <SignIn />
    </div>
  );
};

export default Layout;