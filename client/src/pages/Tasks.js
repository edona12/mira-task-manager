import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Tasks.css';
import { useNavigate } from 'react-router-dom';

const Tasks = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState('');
  const [staffList, setStaffList] = useState([]);
  const [assignedTo, setAssignedTo] = useState('');

  useEffect(() => {
  if (role !== 'admin') {
    navigate('/homepage');
  }
}, [navigate, role]);


  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("🔴 Gabim nga backend:", error.response?.data || error.message);
    }
  };

const fetchStaff = async () => {
  try {
    const response = await axios.get('/api/users/staff', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setStaffList(response.data);
  } catch (err) {
    console.error("❌ Gabim gjatë marrjes së userëve staff:", err);
  }
};


  const showNotification = async () => {
    try {
      const res = await axios.get('/api/notifications', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.length > 0) {
        const latest = res.data[0].message;
        setNotification(latest);
        setTimeout(() => setNotification(''), 5000);
      }
    } catch (err) {
      console.error('Gabim gjatë marrjes së njoftimit:', err);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task.id !== taskId));
      await showNotification();
    } catch (error) {
      console.error("❌ Gabim gjatë fshirjes së detyrës:", error.response?.data || error.message);
    }
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
    setDueDate(task.due_date.split('T')[0]);
    setAssignedTo(task.assigned_to || '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title,
        description,
        priority,
        due_date: dueDate,
        assigned_to: assignedTo
      };
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (taskToEdit) {
        const response = await axios.put(`/api/tasks/${taskToEdit.id}`, payload, config);
        setTasks(tasks.map((t) => (t.id === taskToEdit.id ? response.data : t)));
        setTaskToEdit(null);
      } else {
        const response = await axios.post('/api/tasks', payload, config);
        setTasks([...tasks, response.data]);
      }

      await showNotification();

      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
      setAssignedTo('');
    } catch (error) {
      console.error("🔴 Gabim gjatë shtimit/përditësimit të detyrës:", error.response?.data || error.message);
    }
  };

  const handleExportCSV = () => {
    const csvHeader = ['Titulli', 'Përshkrimi', 'Përparësia', 'Data', 'Punëtori'];
    const csvRows = tasks.map(task => [
      task.title,
      task.description,
      task.priority,
      new Date(task.due_date).toLocaleDateString('en-GB'),
      staffList.find(s => s.id === task.assigned_to)?.name || ''
    ]);

    const csvContent = [csvHeader, ...csvRows]
      .map(e => e.map(value => `"${value}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'detyrat.csv');
    link.click();
  };

  useEffect(() => {
    fetchTasks();
    fetchStaff();
  }, []);

  const filteredTasks = tasks.filter(task => {
    const staffName = staffList.find(s => s.id === task.assigned_to)?.name || '';
    const search = filter.toLowerCase();
    return (
      task.title.toLowerCase().includes(search) ||
      task.description.toLowerCase().includes(search) ||
      task.priority.toLowerCase().includes(search) ||
      staffName.toLowerCase().includes(search)
    );
  });

  return (
    <div className="page-wrapper">
      {notification && (
        <div style={{
          position: 'fixed',
          top: '90px',
          right: '30px',
          backgroundColor: '#3B82F6',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '12px',
          fontWeight: 'bold',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
          zIndex: 1000
        }}>
          {notification}
        </div>
      )}

      <div className="tasks-container">
        <h2 className="tasks-title">📋 Detyrat</h2>

        <div className="task-form-card">
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Titulli" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <textarea placeholder="Përshkrimi" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="low">E ulët</option>
              <option value="medium">Mesatare</option>
              <option value="high">E lartë</option>
            </select>

            {/* <select value={assignedTo} onChange={(e) => setAssignedTo(Number(e.target.value))} required>
            <option value="">Zgjedh një punëtor</option>
            {staffList.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select> */}


          <select value={assignedTo} onChange={(e) => setAssignedTo(Number(e.target.value))} required>
  <option value="">Zgjedh një punëtor</option>
  {staffList.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))}
</select>


            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit">{taskToEdit ? 'Përditëso' : 'Shto Detyrë'}</button>
              {taskToEdit && (
                <button type="button" onClick={() => {
                  setTaskToEdit(null);
                  setTitle('');
                  setDescription('');
                  setPriority('medium');
                  setDueDate('');
                  setAssignedTo('');
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
          placeholder="🔍 Kërko sipas titullit, përshkrimit, përparësisë ose punëtorit"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="tasks-filter"
          style={{ padding: '10px', marginBottom: '1rem', width: '100%', borderRadius: '8px', border: 'none', outline: 'none' }}
        />

        <table className="tasks-table">
          <thead>
            <tr>
              <th>Titulli</th>
              <th>Përshkrimi</th>
              <th>Përparësia</th>
              <th>Data</th>
              <th>Punëtori</th>
              <th>Aksione</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => {
              const staffName = staffList.find(s => s.id === task.assigned_to)?.name || '—';
              return (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>
                    <span className={`priority-badge ${
                      task.priority === 'low' ? 'priority-low' :
                      task.priority === 'medium' ? 'priority-medium' : 'priority-high'
                    }`}>{task.priority}</span>
                  </td>
                  <td>{new Date(task.due_date).toLocaleDateString('en-GB')}</td>
                  <td>{staffName}</td>
                  <td>
                    <button onClick={() => handleEdit(task)} style={{ backgroundColor: '#fbbf24', marginRight: '5px' }}>Edito</button>
                    <button onClick={() => handleDelete(task.id)} style={{ backgroundColor: '#ef4444' }}>Fshij</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tasks;
