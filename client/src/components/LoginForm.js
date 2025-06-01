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
    //  Provo login si admin
    const response = await axios.post('http://localhost:8000/api/auth/login', {
      email,
      password,
    });

    const { token, username, role } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('role', role);
    setToken(token);
    navigate('/homepage');

  } catch (error) {
    //  Nese deshton, provo login si staf
    try {
      const response = await axios.post('http://localhost:8000/api/staff/login', {
        email,
        password,
      });

      const { token, name, role } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', name);
      localStorage.setItem('role', role);
      setToken(token);
      navigate('/homepage');

    } catch (staffError) {
      setMessage('Gabim në login: ' + (staffError.response?.data?.message || staffError.message));
    }
  }
};


  return (
    <div className="page-centered">
      <div className="form-container">
        <h2>Kyçu në MIRA Task Manager</h2>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Shkruaj email-in"
            required
          />
          <label>Fjalëkalimi:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Shkruaj fjalëkalimin"
            required
          />
          <button type="submit">Kyçu</button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
