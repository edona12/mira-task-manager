import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('');
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

  const handleExportCSV = () => {
    const csvHeader = ['Titulli', 'Përshkrimi', 'Përparësia', 'Data'];
    const csvRows = filteredTasks.map(task => [
      task.title,
      task.description,
      task.priority,
      new Date(task.due_date).toLocaleDateString('en-GB')
    ]);

    const csvContent = [csvHeader, ...csvRows]
      .map(row => row.map(value => `"${value}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'detyrat-e-mia.csv');
    link.click();
  };

  const filteredTasks = tasks.filter(task =>
    (task.title || '').toLowerCase().includes(filter.toLowerCase()) ||
    (task.description || '').toLowerCase().includes(filter.toLowerCase()) ||
    (task.priority || '').toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="page-wrapper">
      <h2 className="tasks-title" style={{ 
  textAlign: 'center', 
  marginTop: '0.5rem', 
  marginBottom: '1rem' 
}}>
  📌 Detyrat e mia
</h2>


   <div style={{ 
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'center', 
  gap: '8px', 
  marginTop: '0rem',
  marginBottom: '1rem' 
}}>


  <button onClick={handleExportCSV}>
    Eksporto në CSV
  </button>

  <input
    type="text"
    placeholder="🔍 Kërko sipas titullit, përshkrimit ose përparësisë"
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    className="tasks-filter"
  />
</div>


      {filteredTasks.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Nuk u gjet asnjë detyrë.</p>
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
            {filteredTasks.map((task) => (
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
