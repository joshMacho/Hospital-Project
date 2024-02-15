import { useEffect, useState } from "react";
import "./addStaff.css";
import Loading from "./Loading.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { API_BASE_URL } from "./apibase.js";

const staffType = [
  "Admin",
  "Nurse",
  "Doctor",
  "Pharmacist",
  "Lab Technician",
  "Surgeon",
];

function AddStaffForm({ isOpen, isClosed, data, editMode, doneEditing }) {
  const [types, setTypes] = useState([]);
  const [editState, setEditState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeType, setActiveType] = useState(0);
  const [rePassword, setRepassword] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "",
    type: staffType[activeType],
    username: "",
    email: "",
    contact: "",
    password: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/types`);
        const results = await response.json();
        setTypes(results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (editMode) {
      setUserDetails(data);
      setActiveType(staffType.indexOf(data.type));
      setEditState(editMode);
    }
  }, [editState]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userDetails.password === rePassword) {
      setLoading(true);
      await axios
        .post(`${API_BASE_URL}/insertEmp`, userDetails)
        .then((response) => {
          toast.success(response.data.message, {
            position: "top-right",
          });

          setLoading(false);
          isClosed();
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    } else {
      toast.error("Password missmatch", {
        position: "top-right",
      });
    }
  };

  const updateStaffDetails = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .put(`${API_BASE_URL}/updateEmployee/${userDetails.id}`, userDetails)
      .then((response) => {
        toast.success(response.data.message, {
          position: "top-right",
        });
        setLoading(false);
        isClosed();
        doneEditing(false);
      })
      .catch((error) => {
        toast.error(response.data.message, {
          position: "bottom-center",
        });
        setLoading(false);
      });
  };

  const handleClose = () => {
    doneEditing(false);
    isClosed();
  };

  return (
    <>
      {isOpen && (
        <div className="popup-overlay">
          <form
            className="form-div"
            onSubmit={editState ? updateStaffDetails : handleSubmit}
          >
            <div
              className="cursor-pointer p-1 border border-black rounded-md absolute top-2 right-2 bg-slate-500 text-white"
              onClick={handleClose}
            >
              Close
            </div>
            <div className="head-div">
              <p>{editMode ? "Update Staff" : "Add New Staff"}</p>
            </div>
            <div className="all-inputs">
              <div className="inner-input-div">
                <label htmlFor="name">Name</label>
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
              <div className={`inner-input-div ${editState ? "hidden" : ""}`}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={userDetails.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  {...(!editMode && { required: true })}
                />
              </div>
              <div className={`inner-input-div ${editState ? "hidden" : ""}`}>
                <label htmlFor="rePassword">Re-password</label>
                <input
                  type="password"
                  id="rePassword"
                  name="rePassword"
                  value={rePassword}
                  onChange={(e) => setRepassword(e.target.value)}
                  placeholder="Confirm Password"
                  {...(!editMode && { required: true })}
                />
              </div>
            </div>
            <div className="submit-div">
              <button disabled={loading}>
                <p>{editState ? "Update" : "Save"}</p>
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
