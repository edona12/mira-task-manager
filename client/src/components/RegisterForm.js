import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/auth/register', {
        name,
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', name);
      setToken(token);
      navigate('/homepage');
    } catch (error) {
      setMessage('Gabim në regjistrim: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '360px',
          background: 'rgba(255, 255, 255, 0.08)',
          padding: '35px 30px',
          borderRadius: '20px',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          textAlign: 'center',
          zIndex: 2,
        }}
      >
        <h2 style={{ color: 'white', fontSize: '1.8rem', marginBottom: '20px' }}>
          Regjistrohu në MIRA
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <label style={{ textAlign: 'left', color: '#e0e0ff' }}>Emri:</label>
          <input
            type="text"
            value={name}
            placeholder="Shkruaj emrin"
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              padding: '10px',
              borderRadius: '8px',
              border: 'none',
              background: 'rgba(255,255,255,0.15)',
              color: 'white',
            }}
          />

          <label style={{ textAlign: 'left', color: '#e0e0ff' }}>Email:</label>
          <input
            type="email"
            value={email}
            placeholder="Shkruaj email-in"
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: '10px',
              borderRadius: '8px',
              border: 'none',
              background: 'rgba(255,255,255,0.15)',
              color: 'white',
            }}
          />

          <label style={{ textAlign: 'left', color: '#e0e0ff' }}>Fjalëkalimi:</label>
          <input
            type="password"
            value={password}
            placeholder="Shkruaj fjalëkalimin"
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: '10px',
              borderRadius: '8px',
              border: 'none',
              background: 'rgba(255,255,255,0.15)',
              color: 'white',
            }}
          />

          <button
            type="submit"
            style={{
              backgroundColor: '#4e54c8',
              padding: '12px',
              border: 'none',
              color: 'white',
              borderRadius: '10px',
              fontWeight: '600',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Regjistrohu
          </button>
          {message && (
            <p style={{ marginTop: '10px', color: '#ffcccc', fontWeight: '600' }}>{message}</p>
          )}
        </form>

        {/* LINK për KYÇJE */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p style={{ color: 'white' }}>
            Keni tashmë llogari?{' '}
            <a href="/login" style={{ color: '#ffffff', textDecoration: 'underline' }}>
              Kyçu këtu
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
