import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/index.css";
import "./assets/responsive.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Nhúng Bootstrap CSS
import "@fortawesome/fontawesome-free/css/all.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>
);
