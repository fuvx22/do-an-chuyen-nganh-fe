import React from 'react';
import Navbar from '../components/Navbar';

function Dashboard() {
  return (
    <>
      <div className="col-12 col-sm-10 col-md-8 m-auto">
        <Navbar />
        <div className="dashboard">This is dashboard</div>
      </div>
    </>
  );
}

export default Dashboard;
