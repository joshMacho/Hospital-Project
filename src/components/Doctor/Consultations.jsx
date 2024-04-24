import React, { useEffect } from "react";
import docIcon from "../../assets/images/doctor1.jpg";
import Table from "./Table";
import Logout from "../Logout";
import { useNavigate } from "react-router-dom";

const Consultations = () => {
  const navigateTo = useNavigate();
  const curr = JSON.parse(localStorage.getItem("currentuser"));

  const logoutUser = async () => {
    localStorage.removeItem("currentuser");
    navigateTo("/login");
  };

  const getUser = () => {
    return curr.name;
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    if (!curr) {
      navigateTo("/login");
    }
    if (curr.type !== "Doctor") {
      navigateTo("/login");
    }
  };

  return (
    <div className="admin-main-div">
      <div className="top-bar-div mb-5">
        <div className="who-div">
          <div className="user-div mb-3">
            <img src={docIcon} />
          </div>
          <div className="c-div mb-3">
            <Logout getUser={getUser()} logout={() => logoutUser()} />
          </div>
        </div>
      </div>
      <div className="admin-body-div justify-center">
        <Table />
      </div>
    </div>
  );
};

export default Consultations;
