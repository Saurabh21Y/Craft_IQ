import React from 'react'
import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

const AiTools = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <section className='px-4 sm:px-20 xl:px-32 my-24'>
      {/* Msg area */}
      <div className='text-center'>
        <h2 className='text-slate-700 text-[42px] font-semibold'>
          Powerful AI Tools
        </h2>
        <p className='text-gray-500 max-w-lg mx-auto'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum modi maxime, doloremque fugiat reprehenderit dolores.
        </p>
      </div>
      {/* Cards */}
      <div className='flex flex-wrap mt-10 justify-center'>
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            onClick={() => user && navigate(tool.path)}
            className='p-8 m-4 max-w-xs bg-white rounded-xl border border-gray-100 shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer group'
            style={{
              boxShadow: "0 8px 32px 0 rgba(80,68,229,0.08)"
            }}
          >
            <tool.Icon className='w-12 h-12 text-white rounded-xl mb-2 group-hover:scale-110 transition' style={{ background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})` }} />
            <h3 className='font-semibold text-lg mt-4 mb-3'>{tool.title}</h3>
            <p className='text-sm text-gray-500 max-w-[95%]'>{tool.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AiTools