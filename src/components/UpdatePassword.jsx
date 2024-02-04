import { useState } from "react";
import "./updatePass.css";
import Loading from "./Loading";

function UpdatePassword({ isOpen, isClosed, empData }) {
  const [loading, setLoading] = useState(false);
  const [formPassword, setFormPassword] = useState({
    password: "",
    rePassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formPassword.password === formPassword.rePassword) {
    }
  };
  return (
    <div className="popup-overlay">
      <form className="pass-form-div">
        <button
          className="border w-10 border-black rounded-md absolute -top-4 -right-7 bg-slate-500 text-white"
          onClick={isClosed}
        >
          .
        </button>
        <div className="head-div">
          <p>Joshua Kusi-Manu</p>
        </div>
        <div className="all-inputs">
          <div className="inner-input-div">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formPassword.password}
              onChange={handleInputChange}
              placeholder="Password"
              required
            />
          </div>
          <div className="inner-input-div">
            <label htmlFor="rePassword">Re-password</label>
            <input
              type="password"
              id="rePassword"
              name="rePassword"
              value={formPassword.rePassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              required
            />
          </div>
        </div>
        <div className="submit-div">
          <button disabled={loading}>
            <p>Update Password</p>
            {loading ? <Loading /> : ""}
          </button>
        </div>
      </form>
    </div>
  );
}
export default UpdatePassword;
