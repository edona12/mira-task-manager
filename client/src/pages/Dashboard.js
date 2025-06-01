import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ['#f97316', '#15803d', '#ef4444']; // Low, Medium, High

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredPriority, setFilteredPriority] = useState('all');
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

  const filteredTasks =
    filteredPriority === 'all'
      ? tasks
      : tasks.filter((task) => task.priority === filteredPriority);

  const priorities = ['low', 'medium', 'high'];

  const priorityData = priorities.map((priority) => ({
    name: priority[0].toUpperCase() + priority.slice(1),
    value: filteredTasks.filter((task) => task.priority === priority).length,
  }));

  const handleExportCSV = () => {
    const csvHeader = ['Titulli', 'Përshkrimi', 'Prioriteti', 'Data', 'Punëtori'];
    const csvRows = filteredTasks.map(task => [
      task.title,
      task.description,
      task.priority,
      task.due_date,
      task.assigned_name || ''


    ]);

    const csvContent = [csvHeader, ...csvRows]
      .map(e => e.map(value => `"${value || ''}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'raporti-detyrave.csv');
    link.click();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6">
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '24px',
          boxShadow: '0 8px 40px rgba(0, 0, 0, 0.2)',
          padding: '2rem 2rem 2.5rem 2rem',
          marginTop: '1rem',

          width: '100%',
          maxWidth: '700px',
          textAlign: 'center'
        }}
      >
        <h2 className="text-4xl font-extrabold mb-4">Dashboard</h2>
        <h3 className="text-2xl font-semibold mb-6">Detyrat me përparësi</h3>

        <div className="mb-4">
          <select
            className="text-black px-3 py-2 rounded"
            onChange={(e) => setFilteredPriority(e.target.value)}
          >
            <option value="all">Të gjitha</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

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
          <p className="text-2xl font-bold">{filteredTasks.length}</p>
        </div>

        <button
          onClick={handleExportCSV}
          className="mt-6 bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
        >
          Eksporto Raportin në CSV
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
