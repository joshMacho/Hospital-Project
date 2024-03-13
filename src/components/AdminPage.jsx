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

// Lazy-load Dashboard component
const Dashboard = React.lazy(() => import("./Dashboard"));
// Lazy-load Staff component
const Staff = React.lazy(() => import("./Staff"));

function AdminPage() {
  const [loginUser, setLoginUser] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Make a request to a backend endpoint to validate the token
        const response = await axios.get(`${API_BASE_URL}/validate`, {
          withCredentials: true,
        });
        console.log(response.data.user.type);
        if (response.data.user.type === "Admin") {
          setLoginUser(response.data.user.name);
        } else {
          toast.error("Authentication is not for this page", {
            position: "top-right",
          });
          console.log("no user: ", response.data.user.name);
          navigateTo("/");
        }
      } catch (error) {
        console.log(error.response.error);
        navigateTo("/");
      }
    };

    checkAuthentication();
  }, []);

  const [selectedTab, setSelectedTab] = useState(1);

  const handleDashboard = (e) => {
    e.preventDefault();
    setSelectedTab(1);
  };
  const handleStaff = (e) => {
    e.preventDefault();
    setSelectedTab(2);
  };

  const getUser = () => {
    return loginUser;
  };

  const logout = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/logout`, {
        withCredentials: true,
      });
      toast.success(response.data, {
        position: "top-right",
      });
      navigateTo("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-main-div">
      <div className="top-bar-div">
        <div className="c-div">
          <Logout getUser={getUser()} logout={() => logout()} />
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
