import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import JobCards from '../components/JobCards';
import kconvert from 'k-convert';
import moment from 'moment';

const ApplyJob = () => {
  const { _id } = useParams();
  const [jobData, setJobData] = useState(null);
  const { jobs } = useContext(AppContext);

  useEffect(() => {
    const data = jobs.filter(job => job._id === _id);
    if (data.length !== 0) {
      setJobData(data[0]);
    }
  }, [_id, jobs]);

  if (!jobData) {
    return (
      <>
        <Navbar />
        <div className="text-center py-20 text-gray-500 text-lg">
          Loading job details...
        </div>
        <Footer />
      </>
    );
  }

  const moreJobs = jobs
    .filter(job => job._id !== _id && job.category === jobData.category)
    .slice(0, 3);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT: Job Detail */}
        <div className="lg:col-span-2 bg-white shadow-lg rounded-2xl p-8 space-y-8">
          <h1 className="text-4xl font-bold text-gray-800">{jobData.title}</h1>

          <div className="flex flex-wrap gap-4 text-sm">
            <span className="bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full">📍 {jobData.location}</span>
            <span className="bg-green-100 text-green-800 px-4 py-1.5 rounded-full">💼 {jobData.level}</span>
            <span className="bg-yellow-100 text-yellow-800 px-4 py-1.5 rounded-full">💰 NPM: ₹{kconvert.convertTo(jobData.salary)}</span>
            <span className="bg-purple-100 text-purple-800 px-4 py-1.5 rounded-full">🗂️ {jobData.category}</span>
            <span className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full">🕓 Posted {moment(jobData.date).fromNow()}</span>
          </div>

          <div className="prose max-w-none text-gray-700 leading-relaxed">
            <h2 className='text-3xl font-semibold mb-4'>Job Description</h2>
            <div dangerouslySetInnerHTML={{ __html: jobData.description }} />
          </div>

          <div className="pt-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium px-8 py-3 rounded-lg transition-all duration-200 shadow-md">
              Apply Now
            </button>
          </div>
        </div>

        {/* RIGHT: Sidebar */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">More Jobs</h2>
          <div className="space-y-4">
            {moreJobs.map((job, index) => (
              <JobCards key={index} job={job} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ApplyJob;
