import React, { useState, useEffect, useContext, useRef } from "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { fetchCourseSchedulesBySemesterAPI, fetchMajorsAPI } from "../apis";
import { toast } from "react-toastify";

function CourseRegistration() {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const [courseSchedules, setCourseSchedules] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [totalCredits, setTotalCredits] = useState(0);
  const [selectedMajor, setSelectedMajor] = useState("");
  const [findCourse, setFindCourse] = useState("");
  const [filtedcourseSchedules, setFiltedcourseSchedules] = useState([]);
  let majors = useRef([]);
  const token = JSON.parse(localStorage.getItem("user-token"));
  const currentSemesterId = "661d4010d3f364ab77db298b";

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    fetchCourseSchedulesBySemesterAPI(token, currentSemesterId).then((data) => {
      setCourseSchedules(data);
      console.log(data);
    });

    fetchMajorsAPI(token).then((data) => {
      majors.current = data;
    });
  }, []);

  useEffect(() => {
    if (selectedMajor == "" && findCourse == "") {
      setFiltedcourseSchedules([]);
    } else {
      handleFilterCourseSechedules();
    }
  }, [selectedMajor, findCourse]);

  useEffect(() => {
    calculateTotalCredits();
  }, [selectedCourses]);

  const handleFilterCourseSechedules = () => {
    let filt = courseSchedules.filter((cs) => {
      return (
        (cs.course.name.toLowerCase().includes(findCourse.toLowerCase()) ||
          cs.course.courseId
            .toLowerCase()
            .includes(findCourse.toLowerCase())) &&
        (selectedMajor ? cs.course.majorId === selectedMajor : true)
      );
    });
    // sort by course name
    filt.sort((a, b) => {
      if (a.course.name < b.course.name) {
        return -1;
      }
      if (a.course.name > b.course.name) {
        return 1;
      }
      return 0;
    });
    setFiltedcourseSchedules(filt);
  };

  const calculateTotalCredits = () => {
    let total = 0;
    selectedCourses.forEach((cs) => {
      total += cs.course.courseCredits;
    });
    setTotalCredits(total);
  };

  const handleSelectCourseSchedule = (e) => {
    const selectedCS = courseSchedules.find((cs) => cs._id === e.target.value);

    if (e.target.checked) {
      // Calculate what the total credits would be if we add this course
      const newTotalCredits = totalCredits + selectedCS.course.courseCredits;

      if (
        selectedCourses.some((cs) => cs.course._id === selectedCS.course._id)
      ) {
        toast.error("Môn học đã được chọn", {
          position: "top-center",
        });
        e.target.checked = false;
        return;
      }

      // Only add the course if the new total credits would not exceed 26
      if (newTotalCredits > 26) {
        toast.error("Số tín chỉ vượt quá giới hạn", {
          position: "top-center",
        });
        e.target.checked = false;
        return;
      }

      setSelectedCourses([...selectedCourses, selectedCS]);
      setTotalCredits(newTotalCredits);
    } else {
      // If unchecking the checkbox, remove the course as before
      setSelectedCourses(
        selectedCourses.filter((cs) => cs._id !== e.target.value)
      );
      // And update the total credits
      setTotalCredits(totalCredits - selectedCS.course.courseCredits);
    }
  };

  return (
    <div className="col-12 col-sm-10 col-md-8 m-auto">
      <Navbar user={userData} />
      <div className="my-3">
        <h4 className="title">
          <i className="fa-solid fa-book me-2"></i>
          Đăng ký môn học học kì 2 - năm học 2023 - 2024
        </h4>
        <div className="filter-container d-flex gap-2 mb-3">
          <div className="d-grid flex-grow-1" style={{ maxWidth: "50%" }}>
            <label className="form-label" htmlFor="major-select">
              Lọc theo khoa:
            </label>
            <select
              name=""
              id="major-select"
              className="form-select"
              onChange={(e) => {
                setSelectedMajor(e.target.value);
              }}
            >
              <option value="">Lọc học phần theo ngành</option>
              {majors.current.map((major) => (
                <option value={major?._id} key={major?._id}>
                  {major?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="d-grid flex-grow-1">
            <label className="form-label" htmlFor="find-inp">
              Tìm kiếm học phần:
            </label>
            <input
              type="text"
              id="find-inp"
              className="form-control"
              value={findCourse}
              onChange={(e) => setFindCourse(e.target.value)}
            />
          </div>
        </div>
        <div className="course-registraions mb-3">
          <h5>Danh sách môn mở đăng kí</h5>
          <div
            className="course-to-regis-container"
            style={{
              maxHeight: "50vh",
              overflow: "auto",
              position: "relative",
            }}
          >
            <table className="table table-sm">
              <thead
                className="align-middle theader"
                style={{ position: "sticky", top: "-1px", zIndex: "1" }}
              >
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Mã môn học</th>
                  <th scope="col">Tên môn học</th>
                  <th scope="col">Nhóm</th>
                  <th scope="col">Còn lại</th>
                  <th scope="col">Số tín chỉ</th>
                  <th scope="col">Thời khóa biểu</th>
                </tr>
              </thead>
              <tbody className="table-bordered">
                {filtedcourseSchedules.map((cs, idx) => (
                  <tr key={idx}>
                    <td className="text-center">
                      <input
                        type="checkbox"
                        value={cs?._id}
                        onChange={(e) => handleSelectCourseSchedule(e)}
                        style={{ cursor: "pointer" }}
                      />
                    </td>
                    <td>{cs?.course?.courseId}</td>
                    <td>{cs?.course?.name}</td>
                    <td>{cs?.group}</td>
                    <td>{cs?.maxQuantity}</td>
                    <td>{cs?.course?.courseCredits}</td>
                    <td>
                      {`${cs?.dayOfWeek}, tiết ${cs?.period[0]} đến ${
                        cs?.period[cs?.period.length - 1]
                      }, phòng ${cs?.roomNumber}, giảng viên ${
                        cs?.instructor?.name
                      }`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="resgisted-courses-container">
          <h5>
            Danh sách môn đã đăng kí:
            <span className="text-danger ms-2">
              {selectedCourses.length} môn, {totalCredits} tín chỉ
            </span>
          </h5>
          <table className="table table-sm">
            <thead className="align-middle theader">
              <tr>
                <th scope="col">Xóa</th>
                <th scope="col">Mã môn học</th>
                <th scope="col">Tên môn học</th>
                <th scope="col">Nhóm</th>
                <th scope="col">Còn lại</th>
                <th scope="col">Số tín chỉ</th>
                <th scope="col">Thời khóa biểu</th>
              </tr>
            </thead>
            <tbody className="table-bordered">
              {selectedCourses.map((cs, idx) => (
                <tr key={idx}>
                  <td className="text-center">
                    <a href="" className="btn btn-sm btn-danger">
                      <i className="fas fa-trash"></i>
                    </a>
                  </td>
                  <td>{cs?.course?.courseId}</td>
                  <td>{cs?.course?.name}</td>
                  <td>{cs?.group}</td>
                  <td>{cs?.maxQuantity}</td>
                  <td>{cs?.course?.courseCredits}</td>
                  <td>
                    {`${cs?.dayOfWeek}, tiết ${cs?.period[0]} đến ${
                      cs?.period[cs?.period.length - 1]
                    }, phòng ${cs?.roomNumber}, giảng viên ${
                      cs?.instructor?.name
                    }`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CourseRegistration;
