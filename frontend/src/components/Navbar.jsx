import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { openSignIn } = useClerk();
  const { user } = useUser();

  const {setShowRecruiterLogin}=useContext(AppContext)

  return (
    <div className="shadow py-4 bg-white">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        {/* Logo */}
        <img
          onClick={() => navigate('/')}
          src={assets.logo}
          alt="Logo"
          className="h-10 cursor-pointer"
        />

        {/* Right Side */}
        {user ? (
          <div className="flex items-center gap-6">
            <Link
              to="/applications"
              className="text-blue-600 text-lg font-medium hover:underline"
            >
              Applied Jobs
            </Link>
            <p className="text-sm text-gray-700 max-sm:hidden">
              Hi, {user.firstName + " " + user.lastName}
            </p>
            <UserButton />
          </div>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={e => setShowRecruiterLogin(true)}

              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Recruiter Login
            </button>
            <button
              onClick={() => openSignIn()}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;