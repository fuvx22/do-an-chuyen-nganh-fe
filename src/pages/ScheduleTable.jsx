import { React, useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import TimeTable from "react-timetable-events";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { fetchSemestersAPI, getTimeScheduleAPI } from "../apis";
import metadata from "../utils/metadata.json";

function ScheduleTable() {
  const hourInterval = {
    from: 7,
    to: 18,
  };
  const [loadedMetatata] = metadata;
  const [schedule, setSchedule] = useState({});
  const { userData } = useContext(UserContext);
  const [semseters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null); // [semesterId, setSemesterId
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("user-token"));

  useEffect(() => {
    if (!token) {
      navigate("/");
    }

    fetchSemestersAPI(token).then((data) => {
      setSemesters(data);
    });
  }, []);

  const handleLoadSchedule = (semesterId) => {
    getTimeScheduleAPI(userData?._id, semesterId, token).then((data) => {
      setSchedule(data);
    });
  };

  useEffect(() => {
    if (selectedSemester) {
      handleLoadSchedule(selectedSemester);
    } else {
      handleLoadSchedule(loadedMetatata.currentSemesterId);
    }
  }, [selectedSemester, userData]);

  return (
    <div className="col-12 col-sm-10 col-md-8 m-auto">
      <Navbar user={userData} />

      <div className="col-sm-6 mt-3">
        <select
          className="form-select form-select-sm"
          aria-label=".form-select-sm example"
          defaultValue={loadedMetatata?.currentSemesterId}
          onChange={(e) => setSelectedSemester(e.target.value)}
        >
          {semseters.map((semester) => (
            <option key={semester._id} value={semester._id}>
              {semester.semesterName}
            </option>
          ))}
        </select>
      </div>

      <div className="time-table-container mt-3">
        <TimeTable
          events={schedule}
          hoursInterval={hourInterval}
          style={{ height: "125%", minWidth: "500px" }}
          bodyAttributes={{ className: "time-table-body" }}
        />
      </div>
    </div>
  );
}

export default ScheduleTable;
