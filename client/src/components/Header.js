import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full px-8 py-4 flex justify-between items-center text-white z-50">
      {/* Logo */}
      <h1
        onClick={() => navigate('/homepage')}
        className="text-2xl font-bold cursor-pointer tracking-wide"
      >
        MIRA
      </h1>

      {/* Navigation Links */}
      <nav className="flex gap-8 text-lg font-medium">
        <NavLink to="/homepage/dashboard" className="hover:underline transition duration-200">
          Dashboard
        </NavLink>
        <NavLink to="/homepage/tasks" className="hover:underline transition duration-200">
          Tasks
        </NavLink>
        <NavLink to="/homepage/staff" className="hover:underline transition duration-200">
          Staff
        </NavLink>
        <LogoutButton />
      </nav>
    </header>
  );
};

export default Header;
