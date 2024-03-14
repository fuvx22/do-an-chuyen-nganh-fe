import React, { useState } from 'react';

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
        <i className="fas fa-bars"></i>
      </button>
      <div className="navbar-user-info d-flex h-100 .align-items-*-center">
        <p className="navbar-user-name mx-2">Võ Ngọc Phú</p>
        <img
          className="navbar-user-img rounded-circle h-80"
          src="https://picsum.photos/200/200"
          alt=""
        />
      </div>
      <div
        className={
          isSideMenuOpen
            ? 'side-menu col-12 col-sm-4 active'
            : 'side-menu col-12 col-sm-4'
        }
      >
        <button
          className=" border-0 text-light position-absolute end-0 px-3 py-1"
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
