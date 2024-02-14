import { useState, useEffect } from "react";
import sIcon from "../assets/icons/speaker.svg";
import patientIcon from "../assets/icons/users.svg";
import "./nurse.css";
import Consultations from "./Consultations";
import Patients from "./Patients";
import { useNavigate } from "react-router";
import Logout from "./Logout";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Nurse() {
  const [selectedTab, setSelectedTab] = useState(1);
  const [loginUser, setLoginUser] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Make a request to a backend endpoint to validate the token
        await axios
          .get("http://localhost:8090/api/validate", { withCredentials: true })
          .then((response) => {
            if (response.data.user.type === "Nurse") {
              toast.error("Authentication is not for this page", {
                position: "top-right",
              });
              navigateTo("/");
            } else {
              setLoginUser(response.data.user.name);
            }
          });
        // If the token is valid, do nothing
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
