import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ['#f97316', '#15803d', '#ef4444'];
 // Low, Medium, High

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Gabim gjatë marrjes së detyrave:', error);
      }
    };

    fetchTasks();
  }, [token]);

  const priorities = ['low', 'medium', 'high'];

  const priorityData = priorities.map((priority) => ({
    name: priority[0].toUpperCase() + priority.slice(1),
    value: tasks.filter((task) => task.priority === priority).length,
  }));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6">
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '24px',
          boxShadow: '0 8px 40px rgba(0, 0, 0, 0.2)',
          padding: '3rem',
          width: '100%',
          maxWidth: '700px',
          textAlign: 'center'
        }}
      >
        <h2 className="text-4xl font-extrabold mb-4">Dashboard</h2>
        <h3 className="text-2xl font-semibold mb-6">Detyrat me përparësi</h3>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
          <PieChart width={320} height={320}>
            <Pie
              data={priorityData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={110}
              label={false}
            >
              {priorityData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
          </PieChart>
        </div>

        <div className="mt-6 bg-white/10 backdrop-blur-sm py-3 px-6 rounded-lg shadow-inner">
          <p className="text-lg">Total Tasks</p>
          <p className="text-2xl font-bold">{tasks.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;




