import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
function Navbar(props) {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { role } = useContext(UserContext);
  const token = JSON.parse(localStorage.getItem("user-token"));
  const handleOpenSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user-token");
    navigate("/");
  };
  const handleCourseManger = () => {
    if (token) {
      navigate("/course-manage");
    } else {
      navigate("/");
    }
  };
  const handleCheckInfo = () => {
    if (token) {
      navigate("/userBoard");
    } else {
      navigate("/");
    }
  };
  const handleMajorManager = () => {
    if (token) {
      navigate("/major-manage");
    } else {
      navigate("/");
    }
  };
  const handleInstructorManager = () => {
    if (token) {
      navigate("/instructor-manage");
    } else {
      navigate("/");
    }
  };
  const handleSemesterManager = () => {
    if (token) {
      navigate("/semester-manage");
    } else {
      navigate("/");
    }
  };
  const handleCourseScheduleManager = () => {
    if (token) {
      navigate("/course-schedule-manage");
    } else {
      navigate("/");
    }
  };
  const handleNotifyManager = () => {
    if (token) {
      navigate("/notify-manage");
    } else {
      navigate("/");
    }
  };
  return (
    <div className="my-navbar px-2">
      <button
        className=" border-0 text-light py-1 px-3"
        onClick={handleOpenSideMenu}
      >
        {isSideMenuOpen ? (
          <i className="fa-solid fa-xmark"></i>
        ) : (
          <i className="fas fa-bars"></i>
        )}
      </button>
      <div className="navbar-user-info d-flex h-100 .align-items-*-center position-relative">
        <span className="navbar-user-name mx-2 ">
          {props.user && props.user.name}
        </span>
        <img
          className="navbar-user-img rounded-circle h-80"
          src="https://picsum.photos/200/200"
          alt=""
        />
        <ul className="dropdown-menu dropdown-menu-right overflow-hidden py-0 end-0 top-100">
          <li className="dropdown-item" onClick={handleCheckInfo}>
            Thông tin cá nhân
          </li>
          <div className="dropdown-divider m-0"></div>
          <li className="dropdown-item" onClick={handleLogout}>
            Đăng xuất
          </li>
        </ul>
      </div>
      <div
        className={
          isSideMenuOpen
            ? "side-menu col-12 col-sm-2 active"
            : "side-menu col-12 col-sm-2"
        }
      >
        <button
          className=" border-0 text-light position-absolute end-0 px-3 py-1 d-sm-none"
          onClick={handleOpenSideMenu}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <ul className="side-menu-option-list mt-5">
          <li className="side-menu-option" onClick={() => navigate("/dashBoard")}>Trang chủ</li>
          {role === "admin" && (
            <li className="side-menu-option" onClick={handleInstructorManager}>
              Quản lí Giảng Viên
            </li>
          )}
          {role === "admin" && (
            <li className="side-menu-option" onClick={handleCourseManger}>
              Quản lí môn học
            </li>
          )}
          {role === "admin" && (
            <li className="side-menu-option" onClick={handleCourseScheduleManager}>
              Quản lí đăng ký môn học
            </li>
          )}
          {role === "admin" && (
            <li className="side-menu-option" onClick={handleMajorManager}>
              Quản lí khoa
            </li>
          )}
          {role === "admin" && (
            <li className="side-menu-option" onClick={handleSemesterManager}>
              Quản lí học kỳ
            </li>
          )}
          {role === "admin" && (
            <li className="side-menu-option" onClick={handleNotifyManager}>
              Quản lí thông báo
            </li>
          )}
          <li className="side-menu-option" onClick={handleCheckInfo}>
            Thông tin cá nhân
          </li>
          <li className="side-menu-option">Đăng ký học phần</li>
          <li className="side-menu-option">Xem thời khóa biểu tuần</li>
          <li className="side-menu-option">Xem thời khóa biểu học kì</li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
