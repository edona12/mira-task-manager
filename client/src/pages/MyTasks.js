import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/tasks/mytasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (err) {
        console.error("❌ Gabim gjatë marrjes së detyrave të mia:", err);
      }
    };

    fetchUserTasks();
  }, []);

  return (
    <div className="page-wrapper">
      <h2 className="tasks-title">📌 Detyrat e mia</h2>
      {tasks.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Nuk keni ende detyra të caktuara.</p>
      ) : (
        <table className="tasks-table">
          <thead>
            <tr>
              <th>Titulli</th>
              <th>Përshkrimi</th>
              <th>Përparësia</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.priority}</td>
                <td>{new Date(task.due_date).toLocaleDateString('en-GB')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyTasks;
