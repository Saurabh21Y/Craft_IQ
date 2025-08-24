import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets';

const Hero = () => {

    const navigate = useNavigate();

  return (
    <div className="px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center min-h-screen ">
      {/* Hero text Content */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-semibold sm:text-5xl md:text-6xl 2xl:text-7xl mx-auto leading-[1.2]">
            Create Amazing Content <br /> With 
             <span className='text-primary'> AI Tools </span>
        </h1>

        <p className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto mx-sm:text-xs text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga quam eius odit quae beatae nobis culpa cum praesentium nesciunt soluta?
        </p>
      </div>

      {/* Hero Button */}

      <div className='flex flex-wrap gap-4 justify-center text-sm max-sm:text-xs'>
        <button 
        onClick={() => navigate('/ai')}
        className='bg-primary text-white px-10 py-3 rounded-lg hover:scale-102 active:scale-95 transition cursor-pointer'>
            Get Started
            </button>

        <button className='bg-white  px-10 py-3 rounded-lg border border-gray-300 hover:scale-102 active:scale-95 transition cursor-pointer'>
            Learn More
        </button>
      </div>

      <div className='flex items-center  gap-2 mt-8 mx-auto text-gray-600'>
        <img src={assets.user_group} alt="" className='h-8'/>
        Trusted By 1.4k people 😃
      </div>



    </div>
  )
}

export default Hero
