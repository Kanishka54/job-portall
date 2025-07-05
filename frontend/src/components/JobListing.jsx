import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import JobCards from './JobCards';
import { JobCategories, JobLocations, assets } from '../assets/assets';

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext);

  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(prev =>
      prev.includes(location)
        ? prev.filter(c => c !== location)
        : [...prev, location]
    );
  };

  const removeFilter = (key) => {
    setSearchFilter(prev => ({
      ...prev,
      [key]: ''
    }));
  };

  useEffect(() => {
    let updated = jobs;

    if (selectedCategories.length > 0) {
      updated = updated.filter(job => selectedCategories.includes(job.category));
    }

    if (selectedLocation.length > 0) {
      updated = updated.filter(job => selectedLocation.includes(job.location));
    }

    setFilteredJobs(updated);
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedCategories, selectedLocation, jobs]);

  return (
    <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>
      {/* Left Filter Sidebar */}
      <div className="space-y-6 w-full lg:w-1/4">

        {/* Current Search Tags */}
        {isSearched && (searchFilter.title || searchFilter.location) && (
          <div className='bg-white px-6 py-5 rounded-xl shadow-sm'>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Current Search</h3>
            <div className="flex gap-3 flex-wrap">
              {searchFilter.title && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2">
                  🔍 {searchFilter.title}
                  <button
                    onClick={() => removeFilter('title')}
                    className="text-blue-700 hover:text-red-500 font-bold text-xs"
                  >
                    ✖
                  </button>
                </span>
              )}
              {searchFilter.location && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center gap-2">
                  📍 {searchFilter.location}
                  <button
                    onClick={() => removeFilter('location')}
                    className="text-green-700 hover:text-red-500 font-bold text-xs"
                  >
                    ✖
                  </button>
                </span>
              )}
            </div>
          </div>
        )}

        {/* Show/Hide Filters Button for Mobile */}
        <button
          onClick={() => setShowFilter(prev => !prev)}
          className='px-6 py-1.5 rounded border border-gray-400 lg:hidden cursor-pointer mx-3'
        >
          {showFilter ? "Close" : "Filters"}
        </button>

        {/* Category Filter Box */}
        <div className={showFilter ? "" : "bg-white px-6 py-5 rounded-xl mx-3 shadow-sm max-lg:hidden"}>
          <h4 className='font-semibold text-lg mb-4 mx-3 text-gray-800'>Search by Categories</h4>
          <ul className="space-y-4 text-gray-800">
            {JobCategories.map((category, index) => (
              <li className="flex gap-3 mx-3 items-center" key={index}>
                <input
                  className="scale-125 accent-blue-600"
                  type="checkbox"
                  onChange={() => handleCategoryChange(category)}
                  checked={selectedCategories.includes(category)}
                />
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Location Filter Box */}
        <div className={showFilter ? "" : "bg-white px-6 py-5 rounded-xl shadow-sm max-lg:hidden"}>
          <h4 className='font-semibold text-lg mb-4 mx-3 text-gray-800'>Search by Locations</h4>
          <ul className="space-y-4 text-gray-800">
            {JobLocations.map((location, index) => (
              <li className="flex gap-3 mx-3 items-center" key={index}>
                <input
                  className="scale-125 accent-green-600"
                  type="checkbox"
                  onChange={() => handleLocationChange(location)}
                  checked={selectedLocation.includes(location)}
                />
                {location}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Job Display Section */}
      <section className='w-full lg:w-3/4 text-gray-800 px-3'>
        <h3 className='font-medium text-3xl py-2' id='job-List'>Latest jobs</h3>
        <p className="text-gray-500 whitespace-nowrap">
          Get your desired job from top companies
        </p>

        {/* Job Cards Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
          {filteredJobs
            .slice((currentPage - 1) * 6, currentPage * 6)
            .map((job, index) => (
              <JobCards key={index} job={job} />
            ))}
        </div>

        {/* Pagination */}
        {filteredJobs.length > 0 && (
          <div className='flex items-center justify-center space-x-2 mt-10'>
            <a href="#job-List">
              <img
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                src={assets.left_arrow_icon}
                alt="Previous"
              />
            </a>

            {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
              <a href="#job-List" key={index}>
                <button
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentPage === index + 1 ? 'bg-blue-100 text-blue-500' : 'text-gray-500'}`}
                >
                  {index + 1}
                </button>
              </a>
            ))}

            <a  href="#job-List">
              <img
                onClick={() =>
                  setCurrentPage(prev =>
                    Math.min(prev + 1, Math.ceil(filteredJobs.length / 6))
                  )
                }
                src={assets.right_arrow_icon}
                alt="Next"
              />
            </a>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;
