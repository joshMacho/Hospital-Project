import { useState } from "react";
import "./adminPage.css";
import Dashboard from "./Dashboard";
import Staff from "./Staff";
import dashboardIcon from "../assets/icons/layers.svg";
import staffsIcon from "../assets/icons/staffs.svg";
import { useNavigate } from "react-router";
import React, { useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./Logout";

function AdminPage() {
  const [loginUser, setLoginUser] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Make a request to a backend endpoint to validate the token
        await axios
          .get("http://localhost:8090/api/validate", { withCredentials: true })
          .then((response) => {
            setLoginUser(response.data.user.name);
          });
        // If the token is valid, do nothing
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
    await axios
      .get("http://localhost:8090/api/logout", { withCredentials: true })
      .then((response) => {
        toast.success(response.data, {
          position: "top-right",
        });
        navigateTo("/");
      })
      .catch((error) => {
        console.log(error);
      });
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
            <img src={dashboardIcon} />
            <p>Dashboard</p>
          </button>
          <button
            onClick={handleStaff}
            className={`${selectedTab === 2 ? "selected" : ""}`}
          >
            <img src={staffsIcon} />
            <p>Staff</p>
          </button>
        </div>
      </div>
      <div className="admin-body-div">
        {selectedTab === 1 && <Dashboard />}
        {selectedTab === 2 && <Staff />}
      </div>
    </div>
  );
}
export default AdminPage;
