import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import './Header.css';


const Header = () => {
  return (
<header className="header-wrapper">
  <Link to="/homepage" className="header-logo">
    <img src="/assets/mira-logo.png" alt="MIRA Logo" />
    {/* <span>MIRA</span> */}
  </Link>

  <nav className="header-nav">
    <NavLink to="/homepage/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>Dashboard</NavLink>
    <NavLink to="/homepage/tasks" className={({ isActive }) => (isActive ? 'active' : '')}>Tasks</NavLink>
    <NavLink to="/homepage/staff" className={({ isActive }) => (isActive ? 'active' : '')}>Staff</NavLink>
  
    
  </nav>
     
  <div className="logout-container">
    <LogoutButton />
  </div>

</header>
  );
};

export default Header;
