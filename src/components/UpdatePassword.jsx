import { useState } from "react";
import "./updatePass.css";
import Loading from "./Loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function UpdatePassword({ isOpen, isClosed, empData }) {
  const [loading, setLoading] = useState(false);
  const [formPassword, setFormPassword] = useState({
    password: "",
    rePassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormPassword((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formPassword.password === formPassword.rePassword) {
      setLoading(true);
      axios
        .put(
          `http://localhost:8080/api/updatepatient/${empData.id}`,
          formPassword.password
        )
        .then((response) => {
          toast.success(response.data.message, {
            position: "top-center",
          });
          setLoading(false);
          isClosed();
        });
    } else {
      toast.error("Password missmatch", {
        position: "top-right",
      });
      setLoading(false);
    }
  };
  return (
    <div className="popup-overlay">
      <form className="pass-form-div" onSubmit={handleSubmit}>
        <div
          className="border w-10 border-black rounded-md absolute -top-4 -right-7 bg-slate-500 text-white"
          onClick={isClosed}
        >
          .
        </div>
        <div className="head-div">
          <p className="mb-5">{empData.name}</p>
        </div>
        <div className="all-inputs mb-5">
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
