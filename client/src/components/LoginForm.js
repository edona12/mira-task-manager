import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        email,
        password,
      });
      console.log("LOGIN RESPONSE:", response.data);
const { token, username } = response.data;
localStorage.setItem('token', token);
localStorage.setItem('username', username); 


      setToken(token); 
      navigate('/homepage');

    } catch (error) {
      setMessage('Gabim në login: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="form-container">
      <h2>Kyçu në MIRA Task Manager</h2>
      <form onSubmit={handleSubmit} className="form-card">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Fjalëkalimi:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn-primary">Kyçu</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default LoginForm;


