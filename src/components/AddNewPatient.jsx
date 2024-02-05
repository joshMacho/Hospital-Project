import { useEffect, useState } from "react";
import Loading from "./Loading.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const gender = ["Male", "Female"];
const marriage = ["Single", "Married", "Divorced", "Widow"];

function AddNewPatient({ isOpen, isClosed, data, editMode, doneEdditing }) {
  const [activeGender, setActiveGender] = useState(0);
  const [mstatus, setMStatus] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [formEdit, setFormEdit] = useState(false);
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    contact: "",
    email: "",
    gender: gender[activeGender],
    address: "",
    dob: "",
    next_of_kin: "",
    marital_status: marriage[mstatus],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editMode) {
      setPatientDetails(data);
      setActiveGender(gender.indexOf(data.sex));
      setMStatus(marriage.indexOf(data.marital_status));
      setFormEdit(editMode);
    }
  }, []);

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
  const handleSuccessNotification = (e, message) => {
    e.preventDefault();
    toast.success(message, {
      position: "top-right", // You can customize the position
    });
    isClosed();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(patientDetails);
    // setLoading(true);
    // try {
    //   const response = await axios.post(
    //     "http://localhost:8090/api/addPatient",
    //     patientDetails
    //   );
    //   handleSuccessNotification();
    //   clearFields();
    //   setLoading(false);
    // } catch (error) {
    //   setLoading(false);
    //   console.log(error);
    // }
  };

  const clearFields = () => {
    setPatientDetails({
      name: "",
      contact: "",
      email: "",
      gender: "",
      address: "",
      dob: "",
      next_of_kin: "",
      marital_status: "",
    });
    setMStatus(0);
    setActiveGender(0);
  };

  const updateStaff = async (e, id) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .put(`http://localhost:8090/api/updatepatient/${id}`, patientDetails)
      .then((response) => {
        if (response.status >= 200) {
          isClosed();
          console.log("successfully done it");
          setFormEdit(false);
          clearFields();
          doneEdditing(false);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(true);
        console.log(error);
      });
  };

  const handleClose = () => {
    isClosed();
    setFormEdit(false);
    clearFields();
    doneEdditing(false);
  };
  return (
    <>
      {isOpen && (
        <div className="popup-overlay">
          <form
            onSubmit={
              formEdit
                ? (e) => updateStaff(e, patientDetails.id)
                : (e) => handleSubmit(e)
            }
            className="flex flex-col justify-center relative items-center rounded-lg shadow shadow-slate-500 w-[400px]"
          >
            <div>
              <p className="font-ekuzoaBold">{`${
                formEdit ? "Update Staff" : "Add new Patient"
              }`}</p>
            </div>
            <div
              className="p-1 border cursor-pointer border-black rounded-md absolute top-2 right-2 bg-slate-500 text-white"
              onClick={handleClose}
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
                <label className="font-ekuzoaMedium mb-2">Marital Status</label>
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
                <label htmlFor="next_of_kin" className="font-ekuzoaMedium">
                  Next of Kin
                </label>
                <input
                  className="focus:outline-none bg-gray-100 placeholder:font-ekuzoaLight"
                  type="text"
                  placeholder="Next of kin"
                  name="next_of_kin"
                  value={patientDetails.next_of_kin}
                  onChange={handleInputChange}
                  id="next_of_kin"
                />
              </div>
            </div>
            <div className="submit-div">
              <button disabled={loading}>
                <p>{`${formEdit ? "Update Staff" : "Save"}`}</p>
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
