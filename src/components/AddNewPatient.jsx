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
    sex: gender[activeGender],
    address: "",
    dob: "",
    next_of_kin: "",
    marital_status: marriage[mstatus],
    nID: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editMode) {
      setPatientDetails(data);
      setActiveGender(gender.indexOf(data.sex));
      setMStatus(marriage.indexOf(data.marital_status));
      setFormEdit(editMode);
      console.log(gender.indexOf(data.sex));
      console.log(marriage.indexOf(data.marital_status));
      console.log(data);
    }
  }, []);

  const handleGenderClick = (index) => {
    setActiveGender(index);
    setPatientDetails((previousData) => ({
      ...previousData,
      sex: gender[index],
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post("http://localhost:8090/api/addPatient", patientDetails)
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
  };

  const clearFields = () => {
    setPatientDetails({
      name: "",
      contact: "",
      email: "",
      sex: "",
      address: "",
      dob: "",
      next_of_kin: "",
      marital_status: "",
    });
    setMStatus(0);
    setActiveGender(0);
  };

  const updatePatient = async (e, id) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .put(`http://localhost:8090/api/updatepatient/${id}`, patientDetails)
      .then((response) => {
        if (response.status >= 200 && response.status < 500) {
          toast.success(response.data.message, {
            position: "top-right",
          });
          setFormEdit(false);
          clearFields();
          doneEdditing(false);
          setLoading(false);
          isClosed();
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
                ? (e) => updatePatient(e, patientDetails.id)
                : (e) => handleSubmit(e)
            }
            className="flex flex-col justify-center relative items-center rounded-lg shadow shadow-slate-500 w-[400px]"
          >
            <div>
              <p className="font-ekuzoaBold">{`${
                formEdit ? "Update Patient Details" : "Add new Patient"
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
              <div className="flex flex-col justify-start w-[300px] mb-2">
                <label htmlFor="next_of_kin" className="font-ekuzoaMedium">
                  National ID
                </label>
                <input
                  className="focus:outline-none bg-gray-100 placeholder:font-ekuzoaLight"
                  type="text"
                  placeholder="Ghana Card"
                  name="nID"
                  value={patientDetails.nID}
                  onChange={handleInputChange}
                  id="nID"
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
