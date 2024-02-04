import "./login.css";
import { useState } from "react";
import axios from "axios";
import userIcon from "../assets/icons/user.svg";

function Login() {
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {


    const { name, value } = e.target;
    setLoginData((logins) => ({ ...logins, [name]: value }));
  //send the data to backend using axios
//eg.

axios.post("http://localhost:3001/api/register",{name,value}).then((res)=>
console.log("response from the server")

).catch((e)=>console.log("error occured"))


  
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginData);
  };

  return (
    <div className="login-main-div">
      <div className="image-div div-props"></div>
      <div className="form-div div-props">

        <a href="/admin">GO TO ADMIN PAGE</a>
        <div className="s-tit">
          <p>M-H-S</p>
        </div>
        <div className={`error-div ${error ? "block" : "hidden"}`}>
          <p>Invalid login details</p>
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

export default Login;
