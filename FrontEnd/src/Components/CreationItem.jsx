import React, { useState } from 'react';
import Markdown from 'react-markdown'

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className='p-4 max-w-5xl text-sm bg-white border border-gray-200 rounded-lg cursor-pointer'
    >
      <div className='flex items-center justify-between gap-4'>
        {/* Container for Prompt and Date */}
        <div className='flex flex-col gap-1'>
          <h2 className='font-medium text-gray-800'>{item.prompt}</h2>
          <p className='text-gray-500'>
            {item.type} - {new Date(item.created_at).toLocaleString()}
          </p>
        </div>

        {/* Button with click event stopping propagation */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevents the parent 'div' from handling the click
            // Add any specific button action here if needed
          }}
          className='bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] px-4 py-1 rounded-full whitespace-nowrap'
        >
          {item.type}
        </button>
      </div>

      {/* Response Box */}
      {expanded && (
        <div className='mt-4'>
          {item.type === 'image' ? (
            <img src={item.content} alt='Creation' className='mt-3 w-full max-w-md' />
          ) : (
            <div className='mt-3 text-slate-700'>
              {/* Added a more robust class for the text content, removing the unnecessary overflow-y-scroll here */}
               <div className='reset-tw'>
                <Markdown>{item.content}</Markdown>
               </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationItem;