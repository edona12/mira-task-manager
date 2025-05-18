

import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header'; // <-- Shto këtë nëse nuk e ke

const HomePage = () => {
  const location = useLocation();
  const isHomeRoot = location.pathname === '/homepage';

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-10">
      <Header /> {/* <-- Shto këtë që të shfaqet Header-i */}

      {isHomeRoot && (
        <div className="text-center mt-24">
          <h2 className="text-4xl font-bold mb-4">Mirësevini në MIRA Task Manager</h2>
          <p className="text-md">Menaxhoni detyrat dhe stafin me efikasitet.</p>
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default HomePage;
