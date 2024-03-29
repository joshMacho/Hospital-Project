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
    const you = localStorage.getItem("currentuser");
    if (!you) {
      navigateTo("/login");
    } else {
      setLoginUser(you.name);
    }
  };

  const handleStaff = (e) => {
    e.preventDefault();
    setSelectedTab(2);
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
        <div className="c-div">
          <Logout getUser={getUser()} logout={() => logoutUser()} />
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
        </div>
      </div>
      <div className="admin-body-div">
        <Suspense fallback={<div>Loading...</div>}>
          {selectedTab === 1 && <Dashboard />}
          {selectedTab === 2 && <Staff />}
        </Suspense>
      </div>
    </div>
  );
}

export default AdminPage;
