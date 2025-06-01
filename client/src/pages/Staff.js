

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Tasks.css';

const Staff = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const [staff, setStaff] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [password, setPassword] = useState('');
  const [staffToEdit, setStaffToEdit] = useState(null);
  const [filter, setFilter] = useState('');

  const fetchStaff = async () => {
    try {
      const response = await axios.get('/api/staff', {

        headers: { Authorization: `Bearer ${token}` },
      });
      setStaff(response.data);
    } catch (error) {
      console.error("Gabim gjatë marrjes së stafit:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const payload = {
      name,
      email,
      position,
      ...(staffToEdit ? {} : { password }), // shton password vetëm kur po krijon
    };


      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (staffToEdit) {
        const response = await axios.put(`/api/staff/${staffToEdit.id}`, payload, config);
        setStaff(staff.map((s) => (s.id === staffToEdit.id ? response.data : s)));
        setStaffToEdit(null);
      } else {
        // const response = await axios.post('/api/staff', payload, config);
        // setStaff([...staff, response.data]); // sepse response.data = { id, name, email, ... }

        await axios.post('/api/staff', payload, config);
await fetchStaff(); // rifreskon të gjithë stafin nga backend


      }

      setName('');
      setEmail('');
      setPosition('');
      setPassword('');
    } catch (error) {
      console.error("Gabim gjatë shtimit/përditësimit të stafit:", error);
    }
  };

  const handleEdit = (member) => {
    setStaffToEdit(member);
    setName(member.name);
    setEmail(member.email);
    setPosition(member.position);
    setPassword(''); // nuk e mbush password-in ekzistues
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/staff/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStaff(staff.filter((m) => m.id !== id));
    } catch (error) {
      console.error("Gabim gjatë fshirjes së stafit:", error);
    }
  };

  const handleExportCSV = () => {
    const csvHeader = ['Emri', 'Emaili', 'Pozita'];
    const csvRows = staff.map(m => [m.name, m.email, m.position]);

    const csvContent = [csvHeader, ...csvRows]
      .map(e => e.map(value => `"${value}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'stafi.csv');
    link.click();
  };

  useEffect(() => {
    if (role !== 'admin') return;
    fetchStaff();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="tasks-container">
        <h2 className="tasks-title">👥 Stafi</h2>

        <div className="task-form-card">
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Emri" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder="Emaili" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="text" placeholder="Pozita" value={position} onChange={(e) => setPosition(e.target.value)} required />
            {!staffToEdit && (
              <input type="password" placeholder="Fjalëkalimi" value={password} onChange={(e) => setPassword(e.target.value)} required />
            )}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit">{staffToEdit ? 'Përditëso' : 'Shto Staf'}</button>
              {staffToEdit && (
                <button type="button" onClick={() => {
                  setStaffToEdit(null);
                  setName('');
                  setEmail('');
                  setPosition('');
                  setPassword('');
                }} style={{ backgroundColor: '#999' }}>Anulo</button>
              )}
            </div>
          </form>
        </div>

        <button onClick={handleExportCSV} style={{ marginBottom: '1rem' }}>
          Eksporto në CSV
        </button>

        <input
          type="text"
          placeholder="🔍 Kërko sipas emrit, emailit ose pozitës"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="tasks-filter"
        />

        <table className="tasks-table">
          <thead>
            <tr>
              <th>Emri</th>
              <th>Emaili</th>
              <th>Pozita</th>
              <th>Aksione</th>
            </tr>
          </thead>
         <tbody>
            {staff
              .filter(m =>
                (m.name || '').toLowerCase().includes(filter.toLowerCase()) ||
                (m.email || '').toLowerCase().includes(filter.toLowerCase()) ||
                (m.position || '').toLowerCase().includes(filter.toLowerCase())
              )
              .map((m) => (
                <tr key={m.id || m.email}>

                  <td>{m.name}</td>
                  <td>{m.email}</td>
                  <td>{m.position}</td>
                  <td>
                    <button onClick={() => handleEdit(m)} style={{ backgroundColor: '#fbbf24', marginRight: '5px' }}>Edito</button>
                    <button onClick={() => handleDelete(m.id)} style={{ backgroundColor: '#ef4444' }}>Fshij</button>
                  </td>
                </tr>
              ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Staff;
