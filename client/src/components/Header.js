import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import LogoutButton from './LogoutButton';

const Header = () => {
  return (
    <header className="w-full px-8 py-4 flex justify-between items-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md z-50">
      {/* Logo MIRA pa efekt linku */}
      <Link
  to="/homepage"
  className="text-2xl font-bold tracking-wide text-white hover:cursor-pointer hover:opacity-90 no-underline"
  style={{
    textDecoration: 'none',
    color: 'inherit',
    fontWeight: '700'
  }}
>
  MIRA
</Link>







      {/* Navigation Links */}
      <nav className="flex items-center gap-8 text-lg font-medium">
        <NavLink
          to="/homepage/dashboard"
          className={({ isActive }) =>
            isActive ? 'underline text-white' : 'hover:underline transition duration-200'
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/homepage/tasks"
          className={({ isActive }) =>
            isActive ? 'underline text-white' : 'hover:underline transition duration-200'
          }
        >
          Tasks
        </NavLink>
        <NavLink
          to="/homepage/staff"
          className={({ isActive }) =>
            isActive ? 'underline text-white' : 'hover:underline transition duration-200'
          }
        >
          Staff
        </NavLink>
        <LogoutButton />
      </nav>
    </header>
  );
};

export default Header;
