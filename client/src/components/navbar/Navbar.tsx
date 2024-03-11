import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { UserContextType } from '../../types/userContextType';
import axios from 'axios';
import { auth_api_path } from '../../api/auth';

function Navbar() {
  const { setCurrUser } = useContext(UserContext) as UserContextType;

  const logout = async () => {
    // remove auth cookie
    try {
      await axios.get(`${auth_api_path}logout`, {
        withCredentials: true,
      });

      // remove user from localStorage
      localStorage.removeItem('user');

      setCurrUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const [showNavigation, setShowNavigation] = useState(false);
  return (
    <nav className=" border-b border-gray-200 bg-gray-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={'/logo.png'} className="h-8" alt="PlateDate Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap ">
            PlateMate
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-hamburger"
          type="button"
          className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
          aria-controls="navbar-hamburger"
          aria-expanded="false"
          onClick={() => setShowNavigation((prev) => !prev)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {showNavigation && (
          <div className="w-full" id="navbar-hamburger">
            <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 ">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 "
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 "
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/chat"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 "
                >
                  Chat
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100"
                >
                  Settings
                </Link>
              </li>
              <li
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 cursor-pointer"
                onClick={logout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
