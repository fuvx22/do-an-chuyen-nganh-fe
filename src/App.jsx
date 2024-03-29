import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Userboard from "./pages/Userboard";
import ScheduleTable from "./pages/ScheduleTable";
import CourseManage from "./pages/CourseManage";
import { UserProvider } from "./context/userContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/userboard" element={<Userboard />} />
          <Route path="/schedule" element={<ScheduleTable />} />
          <Route path="/course-manage" element={<CourseManage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
