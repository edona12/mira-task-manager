import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
  useLocation,
} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import AuthContext from './context/AuthContext'; // importo context
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
  const location = useLocation();
  const { token } = React.useContext(AuthContext); // merre token nga context

  return (
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
            {/* LogoutButton NUK është më këtu */}
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
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
  );
}

export default AppWrapper;
