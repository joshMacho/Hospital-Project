import { useState } from "react";
import "./adminPage.css";
import Dashboard from "./Dashboard";
import Staff from "./Staff";
import dashboardIcon from "../assets/icons/layers.svg";
import staffsIcon from "../assets/icons/staffs.svg";

function AdminPage() {
  const [selectedTab, setSelectedTab] = useState(1);
  const handleDashboard = (e) => {
    e.preventDefault();
    setSelectedTab(1);
  };
  const handleStaff = (e) => {
    e.preventDefault();
    setSelectedTab(2);
  };
  return (
    <div className="admin-main-div">
      <div className="top-bar-div">
        <div className="c-div">
          <p></p>
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
