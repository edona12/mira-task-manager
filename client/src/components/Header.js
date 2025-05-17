// // src/components/Header.js
// import React from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';

// const Header = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token'); // fshij tokenin
//     navigate('/login'); // ridrejto te login
//   };

//   return (
//     <header style={{
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       padding: '10px 20px',
//       backgroundColor: '#2952ff',
//       color: 'white',
//       borderRadius: '0 0 10px 10px',
//       position: 'sticky',
//       top: 0,
//       zIndex: 1000,
//     }}>
//       <div>
//         <NavLink
//           to="/home"
//           style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5rem', textDecoration: 'none' }}
//         >
//           MIRA
//         </NavLink>
//       </div>

//       <nav style={{ display: 'flex', gap: '15px' }}>
//         <NavLink
//           to="/home"
//           style={({ isActive }) => ({
//             color: isActive ? '#ffeb3b' : 'white',
//             textDecoration: 'none',
//           })}
//         >
//           Home
//         </NavLink>
//         <NavLink
//           to="/dashboard"
//           style={({ isActive }) => ({
//             color: isActive ? '#ffeb3b' : 'white',
//             textDecoration: 'none',
//           })}
//         >
//           Dashboard
//         </NavLink>
//         <NavLink
//           to="/tasks"
//           style={({ isActive }) => ({
//             color: isActive ? '#ffeb3b' : 'white',
//             textDecoration: 'none',
//           })}
//         >
//           Tasks
//         </NavLink>
//         <NavLink
//           to="/staff"
//           style={({ isActive }) => ({
//             color: isActive ? '#ffeb3b' : 'white',
//             textDecoration: 'none',
//           })}
//         >
//           Staff
//         </NavLink>
//       </nav>

//       <button
//         onClick={handleLogout}
//         style={{
//           backgroundColor: '#f44336',
//           border: 'none',
//           color: 'white',
//           padding: '8px 15px',
//           borderRadius: '5px',
//           cursor: 'pointer',
//           fontWeight: '600',
//         }}
//       >
//         Logout
//       </button>
//     </header>
//   );
// };

// export default Header;
