// import React from 'react';
// import { NavLink, Link } from 'react-router-dom';
// import LogoutButton from './LogoutButton';

// const Header = () => {
//   return (
//     <header className="w-full px-8 py-4 flex justify-between items-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md z-50">
//       {/* Logo MIRA */}
//       {/* <Link
//         to="/homepage"
//         className="text-3xl font-bold tracking-wider hover:opacity-90 transition"
//         style={{ textDecoration: 'none', color: 'inherit' }}
//       >
//         MIRA
//       </Link> */
//         <Link to="/homepage" className="flex items-center gap-3">
//   <img src="/assets/mira-logo.png" alt="MIRA Logo" className="w-10 h-10 object-contain" />
//    <span className="text-xl font-semibold tracking-wide">MIRA</span>
//  </Link>}
      

//       {/* Navigation */}
//       <nav className="flex items-center gap-8 text-lg font-medium">
//         <NavLink
//           to="/homepage/dashboard"
//           className={({ isActive }) =>
//             isActive
//               ? 'border-b-2 border-white pb-1'
//               : 'hover:text-gray-200 transition'
//           }
//         >
//           Dashboard
//         </NavLink>
//         <NavLink
//           to="/homepage/tasks"
//           className={({ isActive }) =>
//             isActive
//               ? 'border-b-2 border-white pb-1'
//               : 'hover:text-gray-200 transition'
//           }
//         >
//           Tasks
//         </NavLink>
//         <NavLink
//           to="/homepage/staff"
//           className={({ isActive }) =>
//             isActive
//               ? 'border-b-2 border-white pb-1'
//               : 'hover:text-gray-200 transition'
//           }
//         >
//           Staff
//         </NavLink>

//         <LogoutButton />
//       </nav>
//     </header>
//   );
// };

// export default Header;





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
