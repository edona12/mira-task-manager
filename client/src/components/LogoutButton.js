// components/LogoutButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Fshije token-in
    navigate('/login'); // Ridrejto te login
  };

  return (
    <button onClick={handleLogout} className="btn-primary" style={{ marginTop: '20px' }}>
      Dil nga llogaria
    </button>
  );
};

export default LogoutButton;
