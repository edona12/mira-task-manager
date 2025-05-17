import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Kontrollo nëse je i kyçur dhe ridrejto në dashboard
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/auth/register', {
        name,
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem('token', token); // ruaje token-in pas regjistrimit
      setMessage('Regjistrim me sukses!');
      setTimeout(() => navigate('/dashboard'), 1000); // redirect pas 1 sek
    } catch (error) {
      setMessage('Gabim në regjistrim: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="form-container">
      <h2>Regjistrohu në MIRA</h2>
      <form onSubmit={handleSubmit} className="form-card">
        <label>Emri:</label>
        <input
          type="text"
          value={name}
          placeholder="Shkruaj emrin"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          placeholder="Shkruaj email-in"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Fjalëkalimi:</label>
        <input
          type="password"
          value={password}
          placeholder="Shkruaj fjalëkalimin"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn-primary">Regjistrohu</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default RegisterForm;
