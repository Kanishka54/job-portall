import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Dashboard = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center shadow-md bg-white sticky top-0 z-20">
        <img
          onClick={() => navigate('/')}
          className="w-40 max-sm:w-28 cursor-pointer"
          src={assets.logo}
          alt="Company Logo"
        />

        <div className="flex items-center gap-4">
          <p className="text-gray-700 font-medium hidden sm:block">Welcome</p>
          <div className="relative group">
            <img
              src={assets.company_icon}
              alt="Company"
              className="w-10 h-10 rounded-full cursor-pointer"
            />
            <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md opacity-0 
              group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto 
              transition-all duration-200 z-50"
            >
              <ul className="text-sm text-gray-700">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => console.log('Logout clicked')}
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 min-h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <nav className="w-20 md:w-64 bg-white border-r p-4 space-y-4">
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/dashboard/add-job"
                className={({ isActive }) =>
                  `flex flex-col md:flex-row items-center md:items-start gap-1 md:gap-3 px-2 py-2 rounded hover:bg-blue-100 transition ${
                    isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700'
                  }`
                }
              >
                <img src={assets.add_icon} alt="Add" className="w-6 h-6" />
                <p className="hidden md:block">Add Jobs</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/manage-jobs"
                className={({ isActive }) =>
                  `flex flex-col md:flex-row items-center md:items-start gap-1 md:gap-3 px-2 py-2 rounded hover:bg-blue-100 transition ${
                    isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700'
                  }`
                }
              >
                <img src={assets.home_icon} alt="Manage" className="w-6 h-6" />
                <p className="hidden md:block">Manage Jobs</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/view-applications"
                className={({ isActive }) =>
                  `flex flex-col md:flex-row items-center md:items-start gap-1 md:gap-3 px-2 py-2 rounded hover:bg-blue-100 transition ${
                    isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700'
                  }`
                }
              >
                <img src={assets.person_tick_icon} alt="Applications" className="w-6 h-6" />
                <p className="hidden md:block">View Applications</p>
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Dashboard
