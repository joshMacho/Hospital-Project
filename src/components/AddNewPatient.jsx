import { useState } from "react";
import Loading from "./Loading.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const gender = ["Male", "Female"];
const marriage = ["Single", "Married", "Divorced", "Widow"];

function AddNewPatient({ isOpen, isClosed }) {
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    contact: "",
    email: "",
    gender: "",
    address: "",
    dob: "",
    next_of: "",
    m_status: "",
  });
  const [activeGender, setActiveGender] = useState(0);
  const [mstatus, setMStatus] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleGenderClick = (index) => {
    setActiveGender(index);
    setPatientDetails((previousData) => ({
      ...previousData,
      gender: gender[index],
    }));
  };
  const handleStatusClick = (index) => {
    setMStatus(index);
    setPatientDetails((previousData) => ({
      ...previousData,
      marital_status: marriage[index],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSuccessNotification = (e) => {
    e.preventDefault();
    toast.success("Patient Added", {
      position: "top-right", // You can customize the position
    });
    isClosed();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8090/api/addPatient",
        patientDetails
      );
      handleSuccessNotification;
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="popup-overlay">
          <form className="flex flex-col justify-center relative items-center rounded-lg shadow shadow-slate-500 w-[400px]">
            <div>
              <p className="font-ekuzoaBold">Add new Patient</p>
            </div>
            <div
              className="p-1 border cursor-pointer border-black rounded-md absolute top-2 right-2 bg-slate-500 text-white"
              onClick={isClosed}
            >
              Close
            </div>
            <div className="flex flex-col justify-center items-center mt-5  ">
              <div className="flex flex-col justify-start w-[300px] mb-2">
                <label className="font-ekuzoaMedium">Name</label>
                <input
                  className="focus:outline-none bg-gray-100 placeholder:font-ekuzoaLight"
                  type="text"
                  placeholder="Patient Name"
                  name="name"
                  required
                  value={patientDetails.name}
                  onChange={handleInputChange}
                  id="name"
                />
              </div>
              <div className="flex flex-col justify-start w-[300px] mb-2">
                <label className="font-ekuzoaMedium">Email</label>
                <input
                  className="focus:outline-none bg-gray-100 placeholder:font-ekuzoaLight"
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={patientDetails.email}
                  onChange={handleInputChange}
                  id="email"
                />
              </div>
              <div className="flex flex-col justify-center w-[300px] mb-2">
                <label className="font-ekuzoaMedium mb-2">Gender</label>
                <div className="type-list">
                  {gender.map((gender, index) => (
                    <div
                      key={index}
                      className={`type ${
                        activeGender === index ? "active" : ""
                      }`}
                      onClick={() => handleGenderClick(index)}
                    >
                      {gender}

                      {activeGender === index && <div className="dot"></div>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-start w-[300px] mb-2">
                <label className="font-ekuzoaMedium">Contact</label>
                <input
                  className="focus:outline-none bg-gray-100 placeholder:font-ekuzoaLight"
                  type="text"
                  placeholder="Contact"
                  name="contact"
                  required
                  value={patientDetails.contact}
                  onChange={handleInputChange}
                  id="contact"
                />
              </div>
              <div className="flex flex-col justify-start w-[300px] mb-2">
                <label htmlFor="dob" className="font-ekuzoaMedium">
                  DOB
                </label>
                <input
                  className="focus:outline-none bg-gray-100 placeholder:font-ekuzoaLight"
                  type="text"
                  placeholder="Date of Birth"
                  name="dob"
                  required
                  value={patientDetails.dob}
                  onChange={handleInputChange}
                  id="dob"
                />
              </div>
              <div className="flex flex-col justify-center w-[300px] mb-2">
                <label className="font-ekuzoaMedium mb-2">Gender</label>
                <div className="type-list">
                  {marriage.map((marriage, index) => (
                    <div
                      key={index}
                      className={`type ${mstatus === index ? "active" : ""}`}
                      onClick={() => handleStatusClick(index)}
                    >
                      {marriage}

                      {mstatus === index && <div className="dot"></div>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-start w-[300px] mb-2">
                <label htmlFor="address" className="font-ekuzoaMedium">
                  Address
                </label>
                <input
                  className="focus:outline-none bg-gray-100 placeholder:font-ekuzoaLight"
                  type="text"
                  placeholder="Address"
                  name="address"
                  required
                  value={patientDetails.address}
                  onChange={handleInputChange}
                  id="address"
                />
              </div>
              <div className="flex flex-col justify-start w-[300px] mb-2">
                <label htmlFor="next_of" className="font-ekuzoaMedium">
                  Next of Kin
                </label>
                <input
                  className="focus:outline-none bg-gray-100 placeholder:font-ekuzoaLight"
                  type="text"
                  placeholder="Next of kin"
                  name="next_of"
                  value={patientDetails.next_of}
                  onChange={handleInputChange}
                  id="next_of"
                />
              </div>
            </div>
            <div className="submit-div">
              <button disabled={loading} onClick={handleSubmit}>
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
export default AddNewPatient;
