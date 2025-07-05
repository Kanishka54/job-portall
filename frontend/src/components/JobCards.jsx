import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const JobCards = ({ job }) => {

   const navigate=useNavigate()
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-6 flex flex-col gap-4">
      
      {/* Company Icon and Name */}
      <div className="flex flex-col items-center justify-center mb-2">
        <img
          src={assets.company_icon}
          alt="Company"
          className="h-12 w-12 object-contain mb-1"
        />
        <p className="text-sm font-medium text-gray-700">{job.company}</p>
      </div>

      {/* Job Title */}
      <h4 className="text-xl font-semibold text-gray-800 text-center">{job.title}</h4>

      {/* Location and Level */}
      <div className="flex justify-center gap-4 text-sm text-gray-600 mb-2">
        <span>📍 {job.location}</span>
        <span>🎯 {job.level}</span>
      </div>

      {/* Description */}
      <p
        className="text-sm text-gray-700 line-clamp-3"
        dangerouslySetInnerHTML={{ __html: job.description.slice(0, 100) }}
      ></p>

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button  onClick={() => {
         navigate(`/apply-job/${job._id}`);
        window.scrollTo(0, 0);
}}
className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 text-sm font-medium cursor-pointer">
          Apply Now
        </button>
        <button onClick={() => {
         navigate(`/apply-job/${job._id}`);
       window.scrollTo(0, 0);
}}
className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 text-sm font-medium cursor-pointer">
          Learn more
        </button>
      </div>
    </div>
  );
};

export default JobCards;
