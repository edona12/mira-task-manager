
import React, { useState, useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  NavLink,
} from 'react-router-dom';
import LoginForm from './components/LoginForm';

import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Staff from './pages/Staff';
import HomePage from './pages/HomePage';
import PrivateRoute from './components/PrivateRoute';
import AuthContext from './context/AuthContext';
import './App.css';
import Notifications from './pages/Notifications';
import MyTasks from './pages/MyTasks';




<Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />

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
  const { token } = useContext(AuthContext);
  const isAuthPage = window.location.pathname === '/login' ;

  return (
    <div className="min-h-screen w-full relative">
     
      {!token && isAuthPage && (
        <nav
          style={{
            position: 'absolute',
            top: '30px',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: '30px',
            zIndex: 10,
          }}
        >
          <NavLink
            to="/login"
            style={({ isActive }) => ({
              padding: '8px 16px',
              borderRadius: '10px',
              fontWeight: '600',
              textDecoration: 'none',
              color: isActive ? '#4e54c8' : '#fff',
              backgroundColor: isActive ? '#fff' : 'transparent',
              transition: '0.3s',
            })}
          >
            Login
          </NavLink>
   
        </nav>
      )}

      <Routes>
        <Route path="/login" element={!token ? <LoginForm /> : <Navigate to="/homepage" />} />
       
        <Route path="/homepage" element={<PrivateRoute><HomePage /></PrivateRoute>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="mytasks" element={<MyTasks />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="staff" element={<Staff />} />

        </Route>
        <Route path="*" element={<Navigate to={token ? "/homepage" : "/login"} />} />
      </Routes>
    </div>
  );
}

export default AppWrapper;


