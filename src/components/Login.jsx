import "./login.css";
import { useState } from "react";
import axios from "axios";
import userIcon from "../assets/icons/user.svg";
import passwordIcon from "../assets/icons/lock.svg";
import Loading from "./Loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigateTo = useNavigate();
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((logins) => ({ ...logins, [name]: value }));
    //send the data to backend using axios
    //eg.
    setError(false);

    // axios
    //   .post("http://localhost:3001/api/register", { name, value })
    //   .then((res) => console.log("response from the server"))
    //   .catch((e) => console.log("error occured"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post(
        "http://localhost:8090/api/login",
        {
          username: loginData.userName,
          password: loginData.password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        navTree(response.data);
        //console.log(response.data);
        setLoading(false);

        setLoading(false);
      })
      .catch((error) => {
        console.log("Error: ", error.response.data);
        setLoading(false);
      });
  };

  const navTree = (path) => {
    switch (path) {
      case "Doctor":
        navigateTo("/consultations");
        break;
      case "Nurse":
        navigateTo("/nurse");
        break;
      case "Admin":
        navigateTo("/admin");
        break;
      default:
        navigateTo("/");
    }
  };

  return (
    <div className="login-main-div">
      <div className="f-div div-props ">
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
                  id="userName"
                  name="userName"
                  value={loginData.userName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="login-input-div">
              <div className={`login-elements-div ${error ? "error" : ""}`}>
                <img src={passwordIcon} />
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="button-div">
            <button type="submit" disabled={loading}>
              {loading ? <Loading /> : ""}
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
