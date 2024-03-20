import { React } from "react";
import Navbar from "../components/Navbar";
import TimeTable from "react-timetable-events";

function ScheduleTable() {
  const hourInterval = {
    from: 7,
    to: 18,
  };

  let scheduleEvents = {
    monday: [
      {
        id: 1,
        name: "Custom Event 1",
        type: "custom",
        startTime: new Date("2018-02-23T11:30:00"),
        endTime: new Date("2018-02-23T13:30:00"),
      },
      {
        id: 2,
        name: "Custom Event 2",
        type: "custom",
        startTime: new Date("2018-02-23T15:30:00"),
        endTime: new Date("2018-02-23T18:00:00"),
      },
    ],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
  };

  return (
    <div className="col-12 col-sm-10 col-md-8 m-auto">
      <Navbar />

    <div className="col-sm-6 mt-3">
      <select
        class="form-select form-select-sm"
        aria-label=".form-select-sm example"
      >
        <option value="2023-2024-2" selected> Học kì 2 năm học 2023-2024</option>
        <option value="2023-2024-1">Học kì 1 năm học 2023-2024</option>
        <option value="2022-2023-2">Học kì 2 năm học 2022-2023</option>
        <option value="2022-2023-1">Học kì 1 năm học 2022-2023</option>
        <option value="2021-2022-2">Học kì 2 năm học 2021-2022</option>
        <option value="2021-2022-1">Học kì 1 năm học 2021-2022</option>
      </select>
    </div>

      <div className="time-table-container mt-3 overflow-auto">
        <TimeTable
          events={scheduleEvents}
          hoursInterval={hourInterval}
          style={{ height: "100%", minWidth: "500px" }}
        />
      </div>
    </div>
  );
}

export default ScheduleTable;
