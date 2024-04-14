import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
// import { useUser } from "../context/userContext";
import { UserContext } from "../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import { fetchNotifiesAPI } from "../apis";
import { convert } from "html-to-text";

function CourseRegistration() {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const [notifies, setNotifies] = useState([]);
  const token = JSON.parse(localStorage.getItem("user-token"));

  return (
    <div className="col-12 col-sm-10 col-md-8 m-auto">
      <Navbar user={userData} />
      <div className="my-3">
        <h4 className="title">
          <i className="fa-solid fa-book me-2"></i>
          Đăng ký môn học học kì 2 - năm học 2023 - 2024
        </h4>
        <div className="filter-container d-flex gap-2 mb-3">
          <div className="d-grid flex-grow-1">
            <label className="form-label" htmlFor="major-select">
              Lọc theo khoa:
            </label>
            <select name="" id="major-select" className="form-select">
              <option value="">Công nghệ thông tin</option>
              <option value="">Công nghệ thông tin</option>
            </select>
          </div>
          <div className="d-grid flex-grow-1">
            <label className="form-label" htmlFor="find-inp">
              Tìm kiếm học phần:
            </label>
            <input type="text" id="find-inp" className="form-control" />
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
                {Array.from({ length: 50 }, (_, index) => (
                  <tr key={index}>
                    <td className="text-center">
                      <input type="checkbox" name="" id="" />
                    </td>
                    <td>841044</td>
                    <td>Lập trình hướng đối tượng</td>
                    <td>01</td>
                    <td>50</td>
                    <td>4</td>
                    <td>
                      Thứ 2, tiết 1 đến 5, phòng C.E402, giảng viên Nguyễn Văn A
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
            <span className="text-danger ms-2">0 môn, 0 tín chỉ</span>
          </h5>
          <table className="table table-sm">
            <thead
              className="align-middle theader"
            >
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
              {Array.from({ length: 5 }, (_, index) => (
                <tr key={index}>
                  <td className="text-center">
                    <a href="" className="btn btn-sm btn-danger">
                      <i className="fas fa-trash"></i>
                    </a>
                  </td>
                  <td>841044</td>
                  <td>Lập trình hướng đối tượng</td>
                  <td>01</td>
                  <td>50</td>
                  <td>4</td>
                  <td>
                    Thứ 2, tiết 1 đến 5, phòng C.E402, giảng viên Nguyễn Văn A
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
