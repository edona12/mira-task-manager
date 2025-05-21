import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [filter, setFilter] = useState('');
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
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
    const token = localStorage.getItem('token');

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
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/tasks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("🟢 Tasks nga backend:", response.data);
        setTasks(response.data);
      } catch (error) {
        console.error("🔴 Gabim nga backend:", error.response?.data || error.message);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="p-6 text-white">
      <h2 className="text-3xl font-bold mb-6">Detyrat e mia</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Titulli"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded text-black"
          required
        />
        <textarea
          placeholder="Përshkrimi"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 rounded text-black"
          required
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-2 rounded text-black"
        >
          <option value="low">E ulët</option>
          <option value="medium">Mesatare</option>
          <option value="high">E lartë</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-2 rounded text-black"
          required
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            {taskToEdit ? 'Përditëso Detyrën' : 'Shto Detyrën'}
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
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              Anulo
            </button>
          )}
        </div>
      </form>

      <input
        type="text"
        placeholder="Filtro sipas përshkrimit..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-2 mb-4 rounded text-black"
      />

      <ul className="space-y-4">
        {tasks
          .filter((task) =>
            task.description.toLowerCase().includes(filter.toLowerCase())
          )
          .map((task) => (
            <li key={task.id} className="bg-white text-black p-4 rounded shadow">
              <h3 className="font-semibold">{task.title}</h3>
              <p>{task.description}</p>
              <p>Statusi: {task.status}</p>
              <p>Prioriteti: {task.priority}</p>
              <p>Afati: {task.due_date}</p>
              <button
                onClick={() => handleEdit(task)}
                className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
              >
                Edito
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Fshij
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Tasks;
