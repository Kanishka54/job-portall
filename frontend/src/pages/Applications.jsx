import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { assets, jobsApplied } from '../assets/assets';
import moment from 'moment';

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);
  const [resumeURL, setResumeURL] = useState('');

  return (
    <>
      <Navbar />
      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        {/* Resume Upload Section */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Resume</h2>
        <div className="flex flex-col sm:flex-row gap-4 mb-6 mt-3 items-center">
          {isEdit ? (
            <>
              <label
                htmlFor="resumeUpload"
                className="flex items-center gap-3 border border-gray-300 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition"
              >
                <p className="text-gray-700">Select Resume</p>
                <input
                  id="resumeUpload"
                  onChange={(e) => setResume(e.target.files[0])}
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                />
              </label>

              <button
                onClick={() => setIsEdit(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex gap-3 items-center">
              <a
                className="bg-blue-100 text-blue-800 font-medium px-4 py-2 rounded-lg hover:bg-blue-200 transition"
                href={resumeURL || '#'}
              >
                Resume
              </a>
              <button
                onClick={() => setIsEdit(true)}
                className="text-gray-600 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100 transition"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {/* Jobs Applied Table */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Jobs Applied</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-left text-gray-700 text-sm uppercase">
              <tr>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Job Title</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {jobsApplied.map((job, index) =>
                true ? (
                  <tr
                    key={index}
                    className="border-t border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 flex items-center gap-2">
                      
                      <span>{job.company}</span>
                    </td>
                    <td className="px-4 py-3">{job.title}</td>
                    <td className="px-4 py-3">{job.location}</td>
                    <td className="px-4 py-3">{moment(job.date).format('ll')}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        job.status === 'Accepted'
                          ? 'bg-green-100 text-green-700'
                          : job.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Applications;
