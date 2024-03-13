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
    const checkAuthentication = async () => {
      try {
        // Make a request to a backend endpoint to validate the token
        const response = await axios.get(`${API_BASE_URL}/validate`, {
          withCredentials: true,
        });
        if (response.data.user.type === "Nurse") {
          setLoginUser(response.data.user.name);
        } else {
          toast.error("Authentication is not for this page", {
            position: "top-right",
          });
          navigateTo("/");
        }
      } catch (error) {
        console.log(error.response.error);
        navigateTo("/");
      }
    };

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
    <div className="n-main-div">
      <div className="n-top-div">
        <div className="home-div">
          <Logout getUser={getUser()} logout={() => logout()} />
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
