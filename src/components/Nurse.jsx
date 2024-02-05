import { useState } from "react";
import sIcon from "../assets/icons/speaker.svg";
import patientIcon from "../assets/icons/users.svg";
import "./nurse.css";
import Consultations from "./Consultations";
import Patients from "./Patients";

function Nurse() {
  const [selectedTab, setSelectedTab] = useState(1);

  const handleConsultation = (e) => {
    e.preventDefault();
    setSelectedTab(1);
  };
  const handlePatients = (e) => {
    e.preventDefault();
    setSelectedTab(2);
  };

  return (
    <div className="n-main-div">
      <div className="n-top-div">
        <div className="t-b-div">
          <button
            onClick={handleConsultation}
            className={`${selectedTab === 1 ? "selected" : ""}`}
          >
            <img src={sIcon} />
          </button>
          <button
            onClick={handlePatients}
            className={`${selectedTab === 2 ? "selected" : ""}`}
          >
            <img src={patientIcon} />
          </button>
        </div>
      </div>
      <div className="n-body-div">
        {selectedTab === 1 && <Consultations />}
        {selectedTab === 2 && <Patients />}
      </div>
    </div>
  );
}
export default Nurse;
