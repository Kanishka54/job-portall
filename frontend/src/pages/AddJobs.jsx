import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { JobCategories, JobLocations } from '../assets/assets';

const AddJobs = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Bangalore');
  const [category, setCategory] = useState('Programming');
  const [level, setLevel] = useState('Beginner level');
  const [salary, setSalary] = useState(0);

  const editorRef = useRef(null);

  // Fix: Prevent double init of Quill
  useEffect(() => {
    if (editorRef.current && !editorRef.current.__quill_initialized) {
      new Quill(editorRef.current, {
        theme: 'snow',
      });
      editorRef.current.__quill_initialized = true;
    }
  }, []);

  return (
    <form className="p-6 space-y-6">
      {/* Job Title */}
      <div>
        <label className="block text-xl font-semibold text-gray-700 mb-1">
          Job Title
        </label>
        <input
          type="text"
          placeholder="Type here"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      {/* Job Description */}
      <div>
        <label className="block text-xl font-semibold text-gray-700 mb-1">
          Job Description
        </label>
        <div
          ref={editorRef}
          className="h-48 border border-gray-300 rounded-md"
        ></div>
      </div>

      {/* Job Category / Location / Level */}
      <div className="flex gap-4 flex-wrap">
        {/* Category */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-base font-medium text-gray-700 mb-1">
            Job Category
          </label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 bg-white shadow-sm"
          >
            {JobCategories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-base font-medium text-gray-700 mb-1">
            Job Location
          </label>
          <select
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 bg-white shadow-sm"
          >
            {JobLocations.map((loc, index) => (
              <option key={index} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Level */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-base font-medium text-gray-700 mb-1">
            Job Level
          </label>
          <select
            value={level}
            onChange={e => setLevel(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 bg-white shadow-sm"
          >
            <option value="Beginner level">Beginner level</option>
            <option value="Intermediate level">Intermediate level</option>
            <option value="Senior level">Senior level</option>
          </select>
        </div>
      </div>

      {/* Salary Input */}
      <div>
        <label className="block text-base font-medium text-gray-700 mb-1">
          Salary
        </label>
        <input
          onChange={e => setSalary(e.target.value)}
          value={salary}
          type="number"
          placeholder="2500"
          className="w-full border border-gray-300 rounded-lg p-2"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add Job
        </button>
      </div>
    </form>
  );
};

export default AddJobs;
