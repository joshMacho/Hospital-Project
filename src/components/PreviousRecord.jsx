import "./login.css";
import { useState } from "react";
import axios from "axios";
import userIcon from "../assets/icons/user.svg";

const  PreviousRecord=()=> {
  
    const check = ()=>{

axios.post("http://localhost:3001/api/register",{name,value}).then((res)=>
console.log("response from the server")

).catch((e)=>console.log("error occured"))


  
  };


  return (
    <div className="login-main-div">
      <div className="image-div div-props"></div>
      <div className="form-div div-props">

        <a href="/">GO HOMEPAGE</a>
        <div className="s-tit">
          <p>HCS</p>
        </div>
       
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="i-f">
            <div className="login-input-div">
              <div className={`login-elements-div ${error ? "error" : ""}`}>
                <img src={userIcon} />
                <input
                  type="text"
                  placeholder="UserName"
                  name="userName"
                  value={loginData.userName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="login-input-div">
              <div className={`login-elements-div ${error ? "error" : ""}`}>
                <img src={userIcon} />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={loginData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="button-div">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PreviousRecord;
