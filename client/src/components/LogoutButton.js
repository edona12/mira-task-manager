import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role'); 
    setToken(null);
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Dil nga llogaria
    </button>
  );
};

export default LogoutButton;
