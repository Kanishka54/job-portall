import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);

  const [job, setJob] = useState('');
  const [location, setLocation] = useState('');
  const [jobSuggestions, setJobSuggestions] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);

  const onSearch = () => {
    setSearchFilter({
      title: job,
      location: location
    });
    setIsSearched(true);
  };

  const jobRoles = [
    "Programming", "Data Science", "Designing",
    "Networking", "Management", "Marketing", "Marketing"
  ];

  const locations = [
    "Bangalore", "California", "Washington",
    "Mumbai", "New York", "Chennai", "Hyderabad"
  ];

  const handleJobChange = (e) => {
    const input = e.target.value;
    setJob(input);
    const filtered = jobRoles.filter(role =>
      role.toLowerCase().startsWith(input.toLowerCase())
    );
    setJobSuggestions(input ? filtered : []);
  };

  const handleLocationChange = (e) => {
    const input = e.target.value;
    setLocation(input);
    const filtered = locations.filter(loc =>
      loc.toLowerCase().startsWith(input.toLowerCase())
    );
    setLocationSuggestions(input ? filtered : []);
  };

  const selectJob = (value) => {
    setJob(value);
    setJobSuggestions([]);
  };

  const selectLocation = (value) => {
    setLocation(value);
    setLocationSuggestions([]);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-16 px-6 md:px-20">
      {/* Heading Section */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
          Over 10,000+ Jobs Waiting for You
        </h2>
        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
          Your Next Big Career Move Starts Right Here —
          <br className="hidden md:block" />
          Discover top job openings and take the first step toward your future.
        </p>
      </div>

      {/* Search Section */}
      <div className="bg-white shadow-xl rounded-2xl p-4 px-6 flex flex-col md:flex-row items-center gap-4 max-w-4xl mx-auto relative w-full">
        
        {/* JOB INPUT */}
        <div className="relative w-full">
          <div className="flex items-center border rounded-full px-4 py-2 gap-3 bg-gray-50 hover:border-blue-400 transition">
            <img src={assets.search_icon} alt="Search" className="w-5 h-5 opacity-70" />
            <input
              type="text"
              placeholder="Search for jobs"
              value={job}
              onChange={handleJobChange}
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
          {jobSuggestions.length > 0 && (
            <ul className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-lg z-10 overflow-hidden border border-gray-200">
              {jobSuggestions.map((item, index) => (
                <li
                  key={index}
                  onClick={() => selectJob(item)}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* LOCATION INPUT */}
        <div className="relative w-full">
          <div className="flex items-center border rounded-full px-4 py-2 gap-3 bg-gray-50 hover:border-blue-400 transition">
            <img src={assets.location_icon} alt="Location" className="w-5 h-5 opacity-70" />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={handleLocationChange}
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
          {locationSuggestions.length > 0 && (
            <ul className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-lg z-10 overflow-hidden border border-gray-200">
              {locationSuggestions.map((item, index) => (
                <li
                  key={index}
                  onClick={() => selectLocation(item)}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* SEARCH BUTTON */}
        <button
          onClick={onSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition w-full md:w-auto"
        >
          🔍 Search
        </button>
      </div>

      {/* Trusted By Section (smaller version) */}
      <div className="mt-20 bg-gradient-to-r from-purple-100 to-blue-100 py-10 px-4 rounded-3xl shadow-inner max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
            Trusted by Leading Companies
          </h3>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Our partners include the world’s top tech companies hiring great talent.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 px-2">
          {[
            { src: assets.microsoft_logo, alt: "Microsoft" },
            { src: assets.walmart_logo, alt: "Walmart" },
            { src: assets.samsung_logo, alt: "Samsung" },
            { src: assets.amazon_logo, alt: "Amazon" },
            { src: assets.adobe_logo, alt: "Adobe" }
          ].map((logo, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-3 shadow-md hover:shadow-lg transition w-32 h-16 flex items-center justify-center"
            >
              <img src={logo.src} alt={logo.alt} className="h-8 object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
