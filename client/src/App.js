// import './App.css';
// import LoginForm from './components/LoginForm';

// function App() {
//   return (
//     <div className="App">
//       <LoginForm />
//     </div>
//   );
// }

// export default App;

// import './App.css';
// import RegisterForm from './components/RegisterForm';

// function App() {
//   return (
//     <div className="App">
//       <RegisterForm />
//     </div>
//   );
// }

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import LoginForm from './components/LoginForm';
// import RegisterForm from './components/RegisterForm';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <nav style={{ marginBottom: '20px' }}>
//           <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
//           <Link to="/register">Register</Link>
//         </nav>
//         <Routes>
//           <Route path="/login" element={<LoginForm />} />
//           <Route path="/register" element={<RegisterForm />} />
//           <Route path="*" element={<LoginForm />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import LogoutButton from './components/LogoutButton';
import './App.css';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <div className="App">
        <nav>
          {!token ? (
            <>
              <NavLink to="/login" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                Login
              </NavLink>
              <NavLink to="/register" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                Dashboard
              </NavLink>
              <LogoutButton />
            </>
          )}
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
            }
          />
          <Route path="/login" element={!token ? <LoginForm /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!token ? <RegisterForm /> : <Navigate to="/dashboard" />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
