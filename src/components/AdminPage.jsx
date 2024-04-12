import React, { useState, useEffect, Suspense } from "react";
import "./adminPage.css";
import dashboardIcon from "../assets/icons/layers.svg";
import staffsIcon from "../assets/icons/staffs.svg";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./Logout";
import { API_BASE_URL } from "./apibase";
import { useAuth } from "../UseAuth";
import adminIcon from "../assets/images/admin.png";
import Logs from "./Logs";

// Lazy-load Dashboard component
const Dashboard = React.lazy(() => import("./Dashboard"));
// Lazy-load Staff component
const Staff = React.lazy(() => import("./Staff"));

function AdminPage() {
  const [loginUser, setLoginUser] = useState("");
  const [selectedTab, setSelectedTab] = useState(1);
  const navigateTo = useNavigate();

  useEffect(() => {
    checkAuthentication();
    getUser();
  }, []);

  const handleDashboard = (e) => {
    e.preventDefault();
    setSelectedTab(1);
  };

  const checkAuthentication = async () => {
    const you = JSON.parse(localStorage.getItem("currentuser"));
    if (!you) {
      navigateTo("/login");
    }
    if (you.type !== "Admin") {
      navigateTo("/login");
    } else {
      setLoginUser(you.name);
    }
  };

  const handleStaff = (e) => {
    e.preventDefault();
    setSelectedTab(2);
  };

  const handleLogs = (e) => {
    e.preventDefault();
    setSelectedTab(3);
  };

  const getUser = () => {
    return loginUser;
  };

  const logoutUser = async () => {
    localStorage.removeItem("currentuser");
    navigateTo("/login");
  };

  return (
    <div className="admin-main-div">
      <div className="top-bar-div">
        <div className="who-div">
          <div className="user-div">
            <img src={adminIcon} />
          </div>
          <div className="c-div">
            <Logout getUser={getUser()} logout={() => logoutUser()} />
          </div>
        </div>
        <div className="nav-buttons-div">
          <button
            onClick={handleDashboard}
            className={`${selectedTab === 1 ? "selected" : ""}`}
          >
            <img src={dashboardIcon} alt="Dashboard" />
            <p>Dashboard</p>
          </button>
          <button
            onClick={handleStaff}
            className={`${selectedTab === 2 ? "selected" : ""}`}
          >
            <img src={staffsIcon} alt="Staff" />
            <p>Staff</p>
          </button>
          <button
            onClick={handleLogs}
            className={`${selectedTab === 3 ? "selected" : ""}`}
          >
            <p>Sys.Logs</p>
          </button>
        </div>
      </div>
      <div className="admin-body-div">
        <Suspense fallback={<div>Loading...</div>}>
          {selectedTab === 1 && <Dashboard />}
          {selectedTab === 2 && <Staff />}
          {selectedTab === 3 && <Logs />}
        </Suspense>
      </div>
    </div>
  );
}

export default AdminPage;
