import { useEffect, useState } from "react";
import "./addStaff.css";
import Loading from "./Loading.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const staffType = [
  "Admin",
  "Nurse",
  "Doctor",
  "Pharmacist",
  "Lab Technician",
  "Surgeon",
];

function AddStaffForm({ isOpen, isClosed }) {
  const [types, setTypes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8090/api/types");
        const results = await response.json();
        setTypes(results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const [loading, setLoading] = useState(false);
  const [activeType, setActiveType] = useState(0);
  const [userDetails, setUserDetails] = useState({
    name: "",
    type: staffType[activeType],
    username: "",
    email: "",
    contact: "",
    password: "",
    rePassword: "",
  });

  const handleSuccessNotification = (e) => {
    e.preventDefault();
    toast.success("Operation successful!", {
      position: "top-right", // You can customize the position
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTypeClick = (index) => {
    setActiveType(index);
    setUserDetails((previousData) => ({
      ...previousData,
      type: staffType[index],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userDetails);
  };

  return (
    <>
      {isOpen && (
        <div className="popup-overlay">
          <form className="form-div">
            <button
              className="p-1 border border-black rounded-md absolute top-2 right-2 bg-slate-500 text-white"
              onClick={isClosed}
            >
              Close
            </button>
            <div className="head-div">
              <p>Add New Staff</p>
            </div>
            <div className="all-inputs">
              <div className="inner-input-div">
                <label htmlFor="name" onClick={handleSuccessNotification}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userDetails.name}
                  onChange={handleInputChange}
                  placeholder="Staff Fullname"
                  required
                />
              </div>
              <div className="inner-input-div">
                <label>Type</label>
                <div className="type-list">
                  {types.map((staffType, index) => (
                    <div
                      key={index}
                      className={`type ${activeType === index ? "active" : ""}`}
                      onClick={() => handleTypeClick(index)}
                    >
                      {staffType.name}

                      {activeType === index && <div className="dot"></div>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="inner-input-div">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={userDetails.username}
                  onChange={handleInputChange}
                  placeholder="User-name"
                  required
                />
              </div>
              <div className="inner-input-div">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={userDetails.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="inner-input-div">
                <label htmlFor="contact">Contact</label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={userDetails.contact}
                  onChange={handleInputChange}
                  placeholder="Eg. +233xxxxxxxxx"
                  required
                />
              </div>
              <div className="inner-input-div">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={userDetails.password}
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
                  value={userDetails.rePassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                  required
                />
              </div>
            </div>
            <div className="submit-div">
              <button disabled={loading} onClick={handleSuccessNotification}>
                <p>Save</p>
                {loading ? <Loading /> : ""}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
export default AddStaffForm;
