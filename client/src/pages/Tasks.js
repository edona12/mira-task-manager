
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Tasks.css';

const Tasks = () => {
  const token = localStorage.getItem('token');

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [filter, setFilter] = useState('');

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(tasks.filter((task) => task.id !== taskId));
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (taskToEdit) {
        const response = await axios.put(`http://localhost:8000/api/tasks/${taskToEdit.id}`, {
          title,
          description,
          priority,
          due_date: dueDate,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTasks(tasks.map((t) => (t.id === taskToEdit.id ? response.data : t)));
        setTaskToEdit(null);
      } else {
        const response = await axios.post('http://localhost:8000/api/tasks', {
          title,
          description,
          priority,
          due_date: dueDate,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTasks([...tasks, response.data]);
      }

      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
    } catch (error) {
      console.error("🔴 Gabim gjatë shtimit/përditësimit të detyrës:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/tasks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTasks(response.data);
      } catch (error) {
        console.error("🔴 Gabim nga backend:", error.response?.data || error.message);
      }
    };

    fetchTasks();
  }, []);

  const handleExportCSV = () => {
    const csvHeader = ['Titulli', 'Përshkrimi', 'Përparësia', 'Data'];
    const csvRows = tasks.map(task => [
      task.title,
      task.description,
      task.priority,
      new Date(task.due_date).toLocaleDateString('en-GB')
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

  return (
    <div className="page-wrapper">
      <div className="tasks-container">
        <h2 className="tasks-title">📋 Detyrat</h2>

        <div className="task-form-card">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Titulli"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Përshkrimi"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">E ulët</option>
              <option value="medium">Mesatare</option>
              <option value="high">E lartë</option>
            </select>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit">
                {taskToEdit ? 'Përditëso' : 'Shto Detyrë'}
              </button>
              {taskToEdit && (
                <button
                  type="button"
                  onClick={() => {
                    setTaskToEdit(null);
                    setTitle('');
                    setDescription('');
                    setPriority('medium');
                    setDueDate('');
                  }}
                  style={{ backgroundColor: '#999' }}
                >
                  Anulo
                </button>
              )}
            </div>
          </form>
        </div>

        <button onClick={handleExportCSV} style={{ marginBottom: '1rem' }}>
          Eksporto në CSV
        </button>

        <input
          type="text"
          placeholder="🔍 Kërko sipas titullit, përshkrimit ose përparësisë"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="tasks-filter"
          style={{
            padding: '10px',
            marginBottom: '1rem',
            width: '100%',
            borderRadius: '8px',
            border: 'none',
            outline: 'none'
          }}
        />

        <table className="tasks-table">
          <thead>
            <tr>
              <th>Titulli</th>
              <th>Përshkrimi</th>
              <th>Përparësia</th>
              <th>Data</th>
              <th>Aksione</th>
            </tr>
          </thead>
          <tbody>
            {tasks
              .filter(task =>
                task.title.toLowerCase().includes(filter.toLowerCase()) ||
                task.description.toLowerCase().includes(filter.toLowerCase()) ||
                task.priority.toLowerCase().includes(filter.toLowerCase())
              )
              .map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>
                    <span className={`priority-badge ${
                      task.priority === 'low'
                        ? 'priority-low'
                        : task.priority === 'medium'
                        ? 'priority-medium'
                        : 'priority-high'
                    }`}>
                      {task.priority}
                    </span>
                  </td>
                  <td>{new Date(task.due_date).toLocaleDateString('en-GB')}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(task)}
                      style={{ backgroundColor: '#fbbf24', marginRight: '5px' }}
                    >
                      Edito
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      style={{ backgroundColor: '#ef4444' }}
                    >
                      Fshij
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tasks;
