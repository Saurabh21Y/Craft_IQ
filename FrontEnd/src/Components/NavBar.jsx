import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import {useClerk, UserButton, useUser } from '@clerk/clerk-react'

const NavBar = () => {
  const navigate = useNavigate();
  const {user} = useUser();
  const {openSignIn} = useClerk();


  return (
    <div className="fixed pt-0 left-0 z-50 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32">
      <img 
        src={assets.logo1} 
        alt="logo" 
        className="h-30 sm:h-32 w-auto cursor-pointer"
        onClick={() => navigate('/')} 
      />

      {
        user ? <UserButton/> :
        <button onClick={openSignIn} className="flex items-center justify-center gap-2 rounded-full text-sm bg-primary text-white px-6 h-10 sm:h-12">
        Sign In 
            <LogIn className="w-4 h-4"/> 
         </button>
        
      }

      
    </div>
  )
}

export default NavBar
