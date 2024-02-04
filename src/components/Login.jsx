import "./login.css";
import { useState } from "react";
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginData);
  };

  return (
    <div className="login-main-div">
      <div className="image-div div-props"></div>
      <div className="form-div div-props">
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
