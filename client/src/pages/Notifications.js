import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/notifications', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotifications(res.data);
      } catch (error) {
        console.error('Gabim gjatë marrjes së njoftimeve:', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Njoftimet</h2>
      <ul className="space-y-2">
        {notifications.map((n, index) => (
          <li key={index} className="bg-purple-600 rounded-xl p-4 shadow">
            {n.message} <br />
            <span className="text-sm opacity-75">{new Date(n.createdAt).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
