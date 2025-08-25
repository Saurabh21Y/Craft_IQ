import React ,{ useState} from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets';
import { X, Menu } from 'lucide-react';

const Layout = () => {
  const navigate=useNavigate();
  const[sidebar,setSidebar]=useState(false);
  return (
    <div className='flex flex-col items-start justify-start h-screen'>

      <nav className='w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200'>

        <img src={assets.logo1} alt="logo1" 
        onClick={() => navigate('/')} 
        className="h-30 sm:h-32 w-auto cursor-pointer" />

        {
          sidebar 
            ? <X onClick={() => setSidebar(false)} className="w-6 h-6 text-gray-600 hidden lg:block" /> 
            : <Menu onClick={() => setSidebar(true)} className="w-6 h-6 text-gray-600 lg:hidden" />
        }



      </nav>

      <Outlet />
    </div>
  )
}

export default Layout
