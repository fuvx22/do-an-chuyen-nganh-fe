import React, { useState } from "react";

function Navbar() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const handleOpenSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
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
        <span className="navbar-user-name mx-2 ">Võ Ngọc Phú</span>
        <img
          className="navbar-user-img rounded-circle h-80"
          src="https://picsum.photos/200/200"
          alt=""
        />
        <ul className="dropdown-menu dropdown-menu-right overflow-hidden py-0 end-0 top-100">
          <li className="dropdown-item">Thông tin cá nhân</li>
          <div className="dropdown-divider m-0"></div>
          <li className="dropdown-item">Đăng xuất</li>
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
          <li className="side-menu-option">Thông tin cá nhân</li>
          <li className="side-menu-option">Đăng ký học phần</li>
          <li className="side-menu-option">Xem thời khóa biểu tuần</li>
          <li className="side-menu-option">Xem thời khóa biểu học kì</li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
