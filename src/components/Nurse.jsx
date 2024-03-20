import React, { useState, useEffect, Suspense } from "react";
import sIcon from "../assets/icons/speaker.svg";
import patientIcon from "../assets/icons/users.svg";
import "./nurse.css";
import { useNavigate } from "react-router";
import Logout from "./Logout";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from "./apibase";

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
    const you = localStorage.getItem("currentuser");
    return you.name;
  };

  const checkAuthentication = async () => {
    const you = localStorage.getItem("currentuser");
    if (!you) {
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
        <div className="home-div">
          <Logout getUser={getUser()} logout={() => logoutUser()} />
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
