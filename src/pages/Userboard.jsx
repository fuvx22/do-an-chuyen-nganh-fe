import React, { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

function Userboard() {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("user-token"));
  useEffect(() => {
    if (token) {
      return;
    } else {
      navigate("/");
    }
  }, []);
  return (
    <div className="col-12 col-sm-10 col-md-8 m-auto">
      <Navbar user={userData} />
      {userData ? (
        <div className="userboard-container d-sm-flex flex-sm-row d-flex flex-column align-items-center align-items-sm-stretch gap-2 mt-2">
          <div
            className="user-info d-flex flex-column align-items-center justify-content-center px-5 border rounded bg-light"
            style={{ width: "300px" }}
          >
            <img
              src="https://avatars.githubusercontent.com/u/95951850?v=4"
              alt=""
              className="rounded-circle img-thumbnail"
            />
            <h5 className="d-inline">{userData?.name}</h5>
            <p className="d-inline">Niên khóa: 2020-2025</p>
          </div>
          <div className="flex-grow-1 d-flex flex-column gap-2">
            <div className="user-detail-info pt-3 px-5 border rounded bg-light">
              <p>MSSV: {userData?.userId}</p>
              <p>Họ và tên: {userData?.name}</p>
              <p>Số điện thoại: {userData?.phoneNumber}</p>
              <p>Tôn giáo: {userData?.religion}</p>
              <p>Dân tộc: {userData?.ethnic}</p>
              <p>Địa chỉ: {userData?.address}</p>
              <p>Ngành: Công nghệ thông tin</p>
              <p>Chuyên ngành: Kỹ thuật phần mềm</p>
              <p>Niên khóa: {userData?.academicYear}</p>
            </div>
            <div className="user-study-progress p-2 px-5 border rounded bg-light">
              <p>Tiến độ học tập</p>
              <div
                className="progress"
                role="progressbar"
                aria-label="Example with label"
                aria-valuenow="80"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div
                  className="progress-bar bg-success"
                  style={{ width: "80%" }}
                >
                  85%
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{ height: "100vh" }}
          className="d-flex justify-content-center align-items-center"
        >
          <div
            className="spinner-border text-primary"
            style={{ width: "6rem", height: "6rem" }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Userboard;
