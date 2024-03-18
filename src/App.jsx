import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Userboard from './pages/Userboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/userboard" element={<Userboard />} />
      </Routes>
    </Router>
  );
}

export default App;
