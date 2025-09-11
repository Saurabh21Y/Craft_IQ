import React, { useEffect, useState } from 'react'
import { dummyCreationData } from '../assets/assets'
import { Gem, Sparkles } from 'lucide-react';
import { Protect } from '@clerk/clerk-react';

const DashBoard = () => {
  const [creations, setCreations] = useState([]);

  useEffect(() => {
    setCreations(dummyCreationData);
  }, []);

  return (
    <section className="max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Total Creations */}
        <div className='flex-1 flex items-center justify-between gap-6 p-5 sm:p-6 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition'>
          <div>
            <p className='text-sm text-gray-500 tracking-wide'>Total Creations</p>
            <h2 className='font-bold text-2xl text-slate-700'>{creations.length}</h2>
          </div>
          <span className='flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] shadow'>
            <Sparkles className='w-6 h-6 text-white' />
          </span>
        </div>
        {/* Plan status */}
        <div className='flex-1 flex items-center justify-between gap-6 p-5 sm:p-6 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition'>
          <div>
            <p className='text-sm text-gray-500 tracking-wide'>Active Plan</p>
            <h2 className='font-bold text-2xl text-slate-700'>
              <Protect plan='subscription' fallback='Free'>Premium</Protect>
            </h2>
          </div>
          <span className='flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] shadow'>
            <Gem className='w-6 h-6 text-white' />
          </span>
        </div>
      </div>

      <div className='mt-10 space-y-3'>
        <p className='mb-2 text-lg font-semibold text-slate-700'>Recent Creations</p>
        {/* Placeholder for recent creations - can add a grid or list here */}
        {creations.length === 0 ? (
          <div className="text-sm text-gray-400">No creations yet.</div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {creations.map((item, idx) => (
              <li key={idx} className="p-4 bg-white rounded-xl border border-gray-100 shadow hover:shadow-md flex flex-col">
                <span className="font-medium text-gray-700">{item.title || `Creation #${idx + 1}`}</span>
                <span className="text-xs text-gray-400 mt-1">{item.date || "Recently added"}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default DashBoard