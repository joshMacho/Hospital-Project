import React, { useState, useEffect, Suspense } from "react";
import sIcon from "../assets/icons/speaker.svg";
import patientIcon from "../assets/icons/users.svg";
import "./nurse.css";
import { useNavigate } from "react-router";
import Logout from "./Logout";
import nurseIcon from "../assets/images/nurse.png";

// Lazy-load Consultations component
const Consultations = React.lazy(() => import("./Consultations"));
// Lazy-load Patients component
const Patients = React.lazy(() => import("./Patients"));

function Nurse() {
  const [selectedTab, setSelectedTab] = useState(1);
  const [loginUser, setLoginUser] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const handleConsultation = (e) => {
    e.preventDefault();
    setSelectedTab(1);
  };
  const handlePatients = (e) => {
    e.preventDefault();
    setSelectedTab(2);
  };

  const getUser = () => {
    const you = JSON.parse(localStorage.getItem("currentuser"));
    return you.name;
  };

  const checkAuthentication = async () => {
    const you = JSON.parse(localStorage.getItem("currentuser"));
    if (!you) {
      navigateTo("/login");
    }
    if (you.type !== "Nurse") {
      navigateTo("/login");
    } else {
      setLoginUser(you.name);
    }
  };

  const logoutUser = async () => {
    localStorage.removeItem("currentuser");
    navigateTo("/login");
  };

  return (
    <div className="n-main-div">
      <div className="n-top-div">
        <div className="who-div">
          <div className="user-div">
            <img src={nurseIcon} />
          </div>
          <div className="home-div">
            <Logout getUser={getUser()} logout={() => logoutUser()} />
          </div>
        </div>
        <div className="t-b-div">
          <button
            onClick={handleConsultation}
            className={`${selectedTab === 1 ? "selected" : ""}`}
          >
            <img src={sIcon} alt="Consultation" />
          </button>
          <button
            onClick={handlePatients}
            className={`${selectedTab === 2 ? "selected" : ""}`}
          >
            <img src={patientIcon} alt="Patients" />
          </button>
        </div>
      </div>

      <div className="n-body-div">
        <Suspense fallback={<div>Loading...</div>}>
          {selectedTab === 1 && <Consultations />}
          {selectedTab === 2 && <Patients />}
        </Suspense>
      </div>
    </div>
  );
}
export default Nurse;
