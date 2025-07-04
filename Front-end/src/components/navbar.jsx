import './Allstyle.css';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

// Navbar component now accepts isAuthenticated, currentUser, and onSignOut as props
export default function Navbar({ isAuthenticated, currentUser, onSignOut }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-lg z-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Brand Logo/Name */}
        <div className="text-3xl font-bold tracking-wider">
          <Link to="/" className="hover:text-red-500">
            MUSIC<span className="text-red-500 text-2xl">ALER</span>
          </Link>
        </div>

        {/* Hamburger Button for mobile */}
        <button
          className="md:hidden p-2 focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? (
            // Close icon (X) when menu is open
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          ) : (
            // Hamburger icon when menu is closed
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          )}
        </button>

        {/* Navigation Links, Favorite, and Auth Buttons */}
        <ul className={`md:flex md:space-x-6 items-center ${open ? 'block mt-4 md:mt-0 w-full md:w-auto text-center' : 'hidden'} md:block`}>
          <li>
            <NavLink
              to="/music"
              className={({ isActive }) =>
                isActive
                  ? 'block py-2 px-3 text-red-500 font-semibold md:inline-block'
                  : 'block py-2 px-3 hover:text-red-500 transition-colors md:inline-block'
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/albums"
              className={({ isActive }) =>
                isActive
                  ? 'block py-2 px-3 text-red-500 font-semibold md:inline-block'
                  : 'block py-2 px-3 hover:text-red-500 transition-colors md:inline-block'
              }
            >
              Albums
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/artist"
              className={({ isActive }) =>
                isActive
                  ? 'block py-2 px-3 text-red-500 font-semibold md:inline-block'
                  : 'block py-2 px-3 hover:text-red-500 transition-colors md:inline-block'
              }
            >
              Artist
            </NavLink>
          </li>
          {/* Favorite Link */}
          <li>
            <NavLink
              to="/favorite"
              className={({ isActive }) =>
                isActive
                  ? 'block py-2 px-3 text-red-500 font-semibold md:inline-block'
                  : 'block py-2 px-3 hover:text-red-500 transition-colors md:inline-block'
              }
            >
              Favorite
            </NavLink>
          </li>
          {/* Conditional rendering for Login/Signup or User Info/Logout */}
          {isAuthenticated ? (
            <>
              <li className="mt-4 md:mt-0">
                <span className="block py-2 px-3 text-gray-300 md:inline-block">
                  Hello, {currentUser?.email ? currentUser.email.split('@')[0] : currentUser?.uid?.substring(0, 8)}!
                </span>
              </li>
              <li className="mt-2 md:mt-0">
                <button
                  onClick={onSignOut}
                  className="inline-block bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white font-bold py-2 px-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
                >
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <>
              {/* Login Button */}
              <li className="mt-4 md:mt-0">
                <Link
                  to="/login"
                  className="inline-block bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold py-2 px-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
                >
                  Login
                </Link>
              </li>
              {/* Signup Button */}
              <li className="mt-2 md:mt-0">
                <Link
                  to="/signup"
                  className="inline-block bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-bold py-2 px-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
