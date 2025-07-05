import React from 'react';
import { assets, viewApplicationsPageData } from '../assets/assets';

const ViewApplications = () => {
  return (
    <div className="p-4 sm:p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-md shadow bg-white">
          <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
            <tr>
              <th className="p-3 border">#</th>
              <th className="p-3 border">Username</th>
              <th className="p-3 border hidden md:table-cell">Job Title</th>
              <th className="p-3 border hidden md:table-cell">Location</th>
              <th className="p-3 border">Resume</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {viewApplicationsPageData.map((applicant, index) => (
              <tr key={index} className="text-center border-t hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3 flex items-center justify-center gap-2">
                  <img
                    src={applicant.imgSrc}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span>{applicant.name}</span>
                </td>

                {/* Job Title - hidden on small screens */}
                <td className="p-3 hidden md:table-cell">{applicant.jobTitle}</td>

                {/* Location - hidden on small screens */}
                <td className="p-3 hidden md:table-cell">{applicant.location}</td>

                <td className="p-3">
                  <a
                    href="#"
                    target="_blank"
                    className="flex items-center justify-center gap-1 text-blue-600 hover:underline"
                  >
                    Resume
                    <img
                      src={assets.resume_download_icon}
                      alt="Download"
                      className="w-4 h-4"
                    />
                  </a>
                </td>
                <td className="p-3">
                  <div className="relative group inline-block">
                    <button className="text-xl px-2 py-1 hover:bg-gray-200 rounded">
                      ⋮
                    </button>
                    <div className="absolute right-0 mt-2 w-28 bg-white shadow-md border rounded hidden group-hover:block z-10">
                      <button className="block w-full px-4 py-2 hover:bg-green-100 text-green-600 text-sm">
                        Accept
                      </button>
                      <button className="block w-full px-4 py-2 hover:bg-red-100 text-red-600 text-sm">
                        Reject
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;
