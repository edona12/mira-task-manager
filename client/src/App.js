// import React, { useState } from 'react';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
//   NavLink,
// } from 'react-router-dom';
// import LoginForm from './components/LoginForm';
// import RegisterForm from './components/RegisterForm';
// import Dashboard from './pages/Dashboard';
// import Tasks from './pages/Tasks';
// import Staff from './pages/Staff';
// import HomePage from './pages/HomePage';
// import PrivateRoute from './components/PrivateRoute';
// import AuthContext from './context/AuthContext';
// import LogoutButton from './components/LogoutButton';
// import './App.css';

// function AppWrapper() {
//   const [token, setToken] = useState(localStorage.getItem('token'));

//   return (
//     <AuthContext.Provider value={{ token, setToken }}>
//       <Router>
//         <AppLayout />
//       </Router>
//     </AuthContext.Provider>
//   );
// }

// function AppLayout() {
//   const { token } = React.useContext(AuthContext);
//   const location = useLocation();

//   return (
//     <div className="App">
//       <nav>
//         {!token ? (
//           <>
//             <NavLink to="/login" className={({ isActive }) => (isActive ? 'active-link' : '')}>
//               Login
//             </NavLink>
//             <NavLink to="/register" className={({ isActive }) => (isActive ? 'active-link' : '')}>
//               Register
//             </NavLink>
//           </>
//         ) : (
//           <>
//             <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}>
//               Home
//             </NavLink>
//             <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active-link' : '')}>
//               Dashboard
//             </NavLink>
//             <NavLink to="/tasks" className={({ isActive }) => (isActive ? 'active-link' : '')}>
//               Tasks
//             </NavLink>
//             <NavLink to="/staff" className={({ isActive }) => (isActive ? 'active-link' : '')}>
//               Staff
//             </NavLink>
//             <LogoutButton />
//           </>
//         )}
//       </nav>

//     <Routes>
//   <Route path="/login" element={!token ? <LoginForm /> : <Navigate to="/homepage" />} />
//   <Route path="/register" element={!token ? <RegisterForm /> : <Navigate to="/homepage" />} />

//   {/* Layout që ka Header + Outlet */}
//   <Route path="/homepage" element={<PrivateRoute><HomePage /></PrivateRoute>}>
//     <Route index element={<Dashboard />} />
//     <Route path="dashboard" element={<Dashboard />} />
//     <Route path="tasks" element={<Tasks />} />
//     <Route path="staff" element={<Staff />} />
//   </Route>

//   {/* Fallback */}
//   <Route path="*" element={<Navigate to={token ? "/homepage" : "/login"} />} />
// </Routes>


//     </div>
//   );
// }

// export default AppWrapper;

import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  NavLink,
} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Staff from './pages/Staff';
import HomePage from './pages/HomePage';
import PrivateRoute from './components/PrivateRoute';
import AuthContext from './context/AuthContext';
import './App.css';

function AppWrapper() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <Router>
        <AppLayout />
      </Router>
    </AuthContext.Provider>
  );
}

function AppLayout() {
  const { token } = React.useContext(AuthContext);
  const location = useLocation();

  return (
    <div className="App">
      {/* Nav për Login/Register - vetëm kur nuk ka token */}
      {!token && (
        <nav className="flex justify-center gap-6 pt-6 text-white text-lg font-semibold">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `px-4 py-1 rounded-full transition duration-200 ${
                isActive ? 'bg-white text-indigo-600' : 'hover:text-indigo-300'
              }`
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `px-4 py-1 rounded-full transition duration-200 ${
                isActive ? 'bg-white text-indigo-600' : 'hover:text-indigo-300'
              }`
            }
          >
            Register
          </NavLink>
        </nav>
      )}

      <Routes>
        <Route path="/login" element={!token ? <LoginForm /> : <Navigate to="/homepage" />} />
        <Route path="/register" element={!token ? <RegisterForm /> : <Navigate to="/homepage" />} />

        <Route path="/homepage" element={<PrivateRoute><HomePage /></PrivateRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="staff" element={<Staff />} />
        </Route>

        <Route path="*" element={<Navigate to={token ? "/homepage" : "/login"} />} />
      </Routes>
    </div>
  );
}

export default AppWrapper;

