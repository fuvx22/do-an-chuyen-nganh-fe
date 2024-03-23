import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Userboard from "./pages/Userboard";
import { UserProvider } from "./context/userContext";
import Navbar from "./components/Navbar";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/userboard" element={<Userboard />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
