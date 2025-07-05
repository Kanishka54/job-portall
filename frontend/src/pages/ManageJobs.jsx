import React from 'react';
import { manageJobsData } from '../assets/assets';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';


const ManageJobs = () => {
    const navigate=useNavigate()
  return (
    <div className="p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-md shadow bg-white">
          <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
            <tr>
              <th className="p-3 border">#</th>
              <th className="p-3 border">Job Title</th>
              <th className="p-3 border hidden sm:table-cell">Date</th>
              <th className="p-3 border hidden sm:table-cell">Location</th>
              <th className="p-3 border">Applicants</th>
              <th className="p-3 border">Visible</th>
            </tr>
          </thead>
          <tbody>
            {manageJobsData.map((job, index) => (
              <tr key={index} className="text-center border-t hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3 font-medium text-gray-800">{job.title}</td>
                <td className="p-3 text-sm text-gray-600 hidden sm:table-cell">
                  {moment(job.date).format('ll')}
                </td>
                <td className="p-3 hidden sm:table-cell">{job.location}</td>
                <td className="p-3 text-blue-600 font-semibold">{job.applicants}</td>
                <td className="p-3">
                  <input type="checkbox" className="w-5 h-5 accent-blue-500" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 text-right">
  <button onClick={()=>navigate('/dashboard/add-job')} className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition duration-200">
    Add New Job
  </button>
</div>

    </div>
  );
};

export default ManageJobs;
