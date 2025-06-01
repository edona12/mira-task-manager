
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import './Header.css';

const Header = () => {
  const role = localStorage.getItem('role'); // merr rolin e përdoruesit

  return (
    <header className="header-wrapper">
      <Link to="/homepage" className="header-logo">
        <img src="/assets/mira-logo.png" alt="MIRA Logo" />
      </Link>

      <nav className="header-nav">
        {role === 'admin' && (
          <>
            <NavLink to="/homepage/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
              Dashboard
            </NavLink>
            <NavLink to="/homepage/tasks" className={({ isActive }) => (isActive ? 'active' : '')}>
              Tasks
            </NavLink>
            <NavLink to="/homepage/staff" className={({ isActive }) => (isActive ? 'active' : '')}>
              Staff
            </NavLink>
          </>
        )}

        {role === 'staff' && (
          <NavLink to="/homepage/mytasks" className={({ isActive }) => (isActive ? 'active' : '')}>
            My Tasks
          </NavLink>
        )}
      </nav>

      <div className="logout-container">
        <LogoutButton />
      </div>
    </header>
  );
};

export default Header;
