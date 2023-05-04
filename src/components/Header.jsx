import {
  ArrowRightOnRectangleIcon,
  BookmarkIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logoutUser } from '../APIs/user';

function Header() {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  // handler func : NavbarCollapse
  function handleNavbarCollapse() {
    setIsNavOpen((pre) => !pre);
  }

  function handleLogout() {
    logoutUser().then(({ isSuccess }) => {
      if (isSuccess) {
        navigate('/login');
      }
    });
  }

  return (
    <nav className=" border-b border-gray-200 bg-gray-100 py-2.5 dark:bg-gray-900">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-2 sm:px-4">
        <Link to="/" className="flex items-center">
          <img
            src={import.meta.env.PROD ? '/paper-frontend/logo.png' : 'logo.png'}
            className="mr-3 h-9"
            alt="Paper Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold  dark:text-white">
            Paper
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={handleNavbarCollapse}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-6 w-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div
          className={`${!isNavOpen && 'hidden'} w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-gray-100 md:text-sm md:font-medium md:dark:bg-gray-900">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => {
                  return `${
                    isActive && 'bg-teal-600 text-white md:text-teal-700'
                  } block rounded py-2 pl-3 pr-4 font-medium text-black dark:text-white md:bg-transparent md:p-0`;
                }}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) => {
                  return `${
                    isActive && 'bg-teal-600 text-white md:text-teal-700'
                  } block rounded py-2 pl-3 pr-4 font-medium text-black dark:text-white md:bg-transparent md:p-0`;
                }}
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/bookmarks"
                className={({ isActive }) => {
                  return `${
                    isActive && 'bg-teal-600 text-white md:text-teal-700'
                  } block rounded py-2 pl-3 pr-4 font-medium text-black dark:text-white md:bg-transparent md:p-0`;
                }}
              >
                <BookmarkIcon className="h-5 w-5" />
              </NavLink>
            </li>
            <li className="block rounded py-2 pl-3 pr-4 font-medium text-black dark:text-white md:bg-transparent md:p-0">
              <button type="button" onClick={handleLogout}>
                <ArrowRightOnRectangleIcon className="h-5 w-5 cursor-pointer" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Header;
