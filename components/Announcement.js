import React from 'react';

export default function Announcement(){
    return(
        <div className='w-full md:hidden block shadow border-2 rounded border-purple-600 mt-5 px-1'>
              <div className="flex justify-between py-3 border-b mb-2">
              <div className="font-semibold text-purple-600 p-2">Join Big Events 🎊</div>
              <div className=" text-sm cursor-pointer bg-purple-600 hover:bg-purple-400 text-white p-2 rounded-sm font-semibold">Browse</div>
            </div>



            <div className="flex p-2 flex-wrap">
            <span className="font-medium text-gray-800">
            Be part of events & hackathons, building careers and leveraging your skill by taking internships & browsing job openings from top companies.
            </span>
            </div>
            </div>
    ) 
}