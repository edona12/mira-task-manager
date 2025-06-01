import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../App.css';


const HomePage = () => {
  const location = useLocation();
  const isHomeRoot = location.pathname === '/homepage';
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [date, setDate] = useState('');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "🌅 Mirëmëngjes";
    if (hour < 18) return "🌞 Mirëdita";
    return "🌙 Mirëmbrëma";
  };

  useEffect(() => {
    const storedName = localStorage.getItem('username');
    if (storedName) {
      setUsername(storedName);
    }

    const today = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formatted = today.toLocaleDateString('sq-AL', options);
    setDate(formatted);
  }, []);

  return (
    <div className="page-centered">
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500 text-white pt-28 px-10 relative">
      <Header />

     {isHomeRoot && (
  <>
    <div className="welcome-container">
      <h2 className="welcome-greeting">
        {username ? `${getGreeting()}, ${username}` : getGreeting()}
      </h2>

      <h3 className="welcome-title"> MIRA Task Manager</h3>
      <p className="welcome-description">
        Menaxhoni detyrat dhe stafin me efikasitet.
      </p>

      {/* <button
        onClick={() => navigate('/homepage/dashboard')}
        className="welcome-button"
      >
        📊 Shko te Dashboard
      </button> */}

      <p className="welcome-quote">
        Çdo ditë është një mundësi e re për t’u organizuar më mirë se dje.
      </p>
    </div>

    <p className="welcome-date-fixed">📅 {date}</p>
  </>
)}


      <Outlet />
    </div>
    </div>
  );
};

export default HomePage;
