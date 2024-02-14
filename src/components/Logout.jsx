import { useState } from "react";
import logoutIocn from "../assets/icons/log-out.svg";
import { useNavigate } from "react-router-dom";
import "./logout.css";

function Logout({ getUser, logout }) {
  return (
    <>
      <div className="logout-main">
        <div className="logout-div">
          <div className="logout-action" onClick={logout}>
            <p className="log-text">{getUser}</p>
            <img src={logoutIocn} />
          </div>
        </div>
      </div>
    </>
  );
}
export default Logout;
