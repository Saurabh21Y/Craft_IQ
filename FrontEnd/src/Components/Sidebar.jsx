import React from "react";
import { Protect, useClerk, useUser } from "@clerk/clerk-react";
import { Eraser, FileText, Hash, House, Image, LogOut, Scissors, SquarePen, Users } from "lucide-react";
import { NavLink } from "react-router-dom";


const navItems=[
  {to: "/ai", label:"DashBoard", Icon: House},
  {to: "/ai/write-article", label:"Write Article", Icon: SquarePen},
  {to: "/ai/blog-titles", label:"Blog Titles", Icon: Hash},
  {to: "/ai/generate-images", label:"Generate Images", Icon: Image},
  {to: "/ai/remove-background", label:"Remove Background", Icon: Eraser},
  {to: "/ai/remove-object", label:"Remove Object", Icon: Scissors},
  {to: "/ai/review-resume", label:"Review Resume", Icon: FileText},
  {to: "/ai/community", label:"Community", Icon: Users},

]


const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <div
      className={`w-64 bg-white/20 backdrop-blur-lg shadow-lg border-r border-white/30 flex flex-col justify-between fixed lg:static top-14 bottom-0 z-50 transform 
        ${
          sidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } transition-transform duration-300`}
    >
      {/* User Profile */}
      <div className="flex flex-col items-center py-6">
        <img
          src={user.imageUrl}
          alt="user avatar"
          className="w-16 h-16 rounded-full border-2 border-white/40"
        />
        <h1 className="mt-3 text-gray-800 font-semibold">{user.fullName}</h1>

        <div className="px-6 mt-5 text-sm text-gray-600 font-medium">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/ai'}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `px-3.5 py-2.5 flex items-center gap-3 rounded ${
                  isActive
                    ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white'
                    : 'hover:bg-white/30 text-gray-700'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`}/>
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </div>

      </div>

      

      {/* Logout */}
        <div className="w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between">
          <div onClick={openUserProfile} className="flex gap-2 items-center cursor-pointer">
            <img src={user.imageUrl} className="w-8 h-8 rounded-full" alt="" />
            <div>
              <h1 className="text-sm font-medium">{user.fullName}</h1>
              <p className="text-xs text-gray-500">
                <Protect plan='subscription' fallback='Free'>Premium </Protect>
                Plan
              </p>
            </div>

          </div>
          <LogOut
          onClick={() => signOut()} className="w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer"/>
        </div>
      </div>
  );
};

export default Sidebar;
