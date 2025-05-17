// // src/pages/Dashboard.js
// import React from 'react';
// import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
// import LogoutButton from '../components/LogoutButton';

// const pieData = [
//   { name: 'Përfunduar', value: 40 },
//   { name: 'Në proces', value: 35 },
//   { name: 'E vonuar', value: 25 },
// ];

// const COLORS = ['#0088FE', '#00C49F', '#FF8042'];

// const lineData = [
//   { day: 'E Hënë', completed: 4 },
//   { day: 'E Martë', completed: 6 },
//   { day: 'E Mërkurë', completed: 3 },
//   { day: 'E Enjte', completed: 5 },
//   { day: 'E Premte', completed: 7 },
// ];

// const Dashboard = () => {
//   return (
//     <div className="form-container" style={{ maxWidth: '700px' }}>
//       <h2>Dashboard - Përmbledhje</h2>
      
//       <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '40px' }}>
//         <div style={{ width: '45%', height: 300 }}>
//           <h3>Detyrat sipas statusit</h3>
//           <ResponsiveContainer>
//             <PieChart>
//               <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
//                 {pieData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         <div style={{ width: '45%', height: 300 }}>
//           <h3>Progresi javore</h3>
//           <ResponsiveContainer>
//             <LineChart data={lineData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="day" />
//               <YAxis />
//               <Tooltip />
//               <Line type="monotone" dataKey="completed" stroke="#8884d8" strokeWidth={3} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       <LogoutButton />
//     </div>
//   );
// };

// export default Dashboard;
