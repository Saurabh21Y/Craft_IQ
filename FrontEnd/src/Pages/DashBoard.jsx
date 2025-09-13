import React, { useEffect, useState } from 'react'
import { dummyCreationData } from '../assets/assets'
import { Gem, Sparkles } from 'lucide-react';
import { Protect } from '@clerk/clerk-react';
import CreationItem from '../Components/CreationItem';

const DashBoard = () => {
  const [creations, setCreations] = useState([]);

  useEffect(() => {
    setCreations(dummyCreationData);
  }, []);

  return (
    <div className='h-full overflow-y-auto p-6'>   {/* yaha scroll bar se problem ho raha hai to scroll ko auto kr rahe hai  className='h-full overflow-y-scroll p-6' */}
      <div className="flex flex-row gap-6">
        {/* Total card creation */}

        <div className='flex justify-between item-center w-100 p-4 px-6 bg-white rounded-xl border border-gray-200'>
          <div className='text-slate-600'>
            <p className='text-sm'>Total Creation</p>
            <h2 className='font-semibold text-xl'>{creations.length}</h2>
          </div>
          <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex items-center justify-center'>
            <Sparkles className='w-5 text-white'/>
          </div>
        </div>
        {/* Plan status */}
        <div className='flex justify-between item-center w-100 p-4 px-6 bg-white rounded-xl border border-gray-200'>

          <div className='text-slate-600'>
            <p className='text-sm'>Active Plan</p>
            <h2 className='font-semibold text-xl'>
              <Protect plan='subscription' fallback='Free'>Premium</Protect>
            </h2>
          </div>

          <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex items-center justify-center'>
            <Gem className='w-5 text-white'/>
          </div>
          
        </div>

      </div>

    {/* My Creations */}
    <div className='space-y-3'>
      <p className='mt-6 mb-4'>My Creations</p>
      {
        creations.map((item)=> < CreationItem key={item.id} item={item}/>)
      }
    </div>

    </div>


  )
}

export default DashBoard