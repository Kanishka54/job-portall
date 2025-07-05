import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Recruiterlogin = () => {
  const [state, setState] = useState('Login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [logo, setLogo] = useState(null)

  const { setShowRecruiterLogin } = useContext(AppContext)

  const onSubmitHandler = (e) => {
    e.preventDefault()
    if (state === 'Signup') {
      alert('Submitted Signup Data')
    } else {
      alert('Logged in Successfully')
    }
  }

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    setLogo(URL.createObjectURL(file))
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-5 relative"
      >
        {/* ❌ Close Button */}
        <button
          type="button"
          onClick={() => setShowRecruiterLogin(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl font-bold"
        >
          &times;
        </button>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Recruiter {state === 'Signup' ? 'Sign Up' : 'Login'}
        </h1>
        <p className="text-sm text-center text-gray-500">
          Welcome back! Please sign in to continue
        </p>

        {/* Signup: Company Name */}
        {state === 'Signup' && (
          <div className="flex items-center border rounded px-3 py-2">
            <img src={assets.person_icon} alt="" className="w-5 h-5 mr-3" />
            <input
              type="text"
              placeholder="Company Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full outline-none"
            />
          </div>
        )}

        {/* Signup: Upload Company Logo */}
        {state === 'Signup' && (
          <div className="text-center space-y-2">
            <label htmlFor="logo-upload" className="cursor-pointer inline-block">
              {logo ? (
                <img
                  src={logo}
                  alt="Uploaded Logo"
                  className="mx-auto w-16 h-16 rounded-full object-cover border"
                />
              ) : (
                <div className="w-16 h-16 mx-auto rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xl">📤</span>
                </div>
              )}
            </label>
            <input
              type="file"
              id="logo-upload"
              accept="image/*"
              className="hidden"
              onChange={handleLogoUpload}
            />
            <p className="text-sm text-gray-500">Upload Company logo</p>
          </div>
        )}

        {/* Email Field */}
        <div className="flex items-center border rounded px-3 py-2">
          <img src={assets.email_icon} alt="" className="w-5 h-5 mr-3" />
          <input
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full outline-none"
          />
        </div>

        {/* Password Field */}
        <div className="flex items-center border rounded px-3 py-2">
          <img src={assets.lock_icon} alt="" className="w-5 h-5 mr-3" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full outline-none"
          />
        </div>

        {/* Forgot Password */}
        <div className="text-right">
          <button
            type="button"
            className="text-sm text-blue-600 hover:underline"
            onClick={() => alert('Redirect to password recovery')}
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {state === 'Login' ? 'Login' : 'Create Account'}
        </button>

        {/* Toggle Login / Signup */}
        <p className="text-sm text-center text-gray-600">
          {state === 'Login' ? (
            <>
              Don't have an account?{' '}
              <span
                className="text-blue-600 hover:underline cursor-pointer font-medium"
                onClick={() => setState('Signup')}
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span
                className="text-blue-600 hover:underline cursor-pointer font-medium"
                onClick={() => setState('Login')}
              >
                Login
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  )
}

export default Recruiterlogin
