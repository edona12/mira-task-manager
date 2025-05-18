// import React from 'react';
// import Header from '../components/Header';
// import { Outlet } from 'react-router-dom';

// const HomePage = () => {
//   return (
//     <>
//       <Header />
//       <div className="content">
//         <Outlet />
//       </div>
//     </>
//   );
// };

// export default HomePage;

import React from 'react';
import Header from '../components/Header';
import { Outlet, useLocation } from 'react-router-dom';

const HomePage = () => {
  const location = useLocation();

  const isBasePath = location.pathname === "/homepage";

  return (
    <>
      <Header />
      <div className="content px-6 py-10">
        {isBasePath ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold">Mirë se vini në MIRA Task Manager</h2>
            <p className="mt-4 text-lg text-gray-700">
              Zgjidh një seksion nga menuja për të vazhduar.
            </p>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </>
  );
};

export default HomePage;
