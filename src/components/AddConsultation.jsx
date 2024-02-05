import { useEffect, useState } from "react";
import Loading from "./Loading.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function AddConsultation({ isOpen, isClosed }) {
  const [consultation, setConsultation] = useState({
    id: "",
    patient: "",
    doctor: "",
    consultation_room: "",
    pulse: "",
    temperature: "",
    weight: "",
    heart_rate: "",
    date: "",
  });
  const [patientInfo, setPatientInfo] = useState([]);
  const [doctorsInfo, setDoctorsInfo] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8090/api/patients")
      .then((response) => {
        setPatientInfo(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8090/api/doctors")
      .then((response) => {
        setDoctorsInfo(response.data);
      })
      .catch((error) => {
        console.log("Error fetching doctors: ", error);
      });
  });

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <>
      {isOpen && (
        <div className="popup-overlay">
          <form className="flex flex-col justify-center relative items-center rounded-lg shadow shadow-slate-500 w-[400px]">
            <div>
              <p className="font-ekuzoaBold">Add Consultation</p>
            </div>
            <div
              className="p-1 border cursor-pointer border-black rounded-md absolute top-2 right-2 bg-slate-500 text-white"
              onClick={isClosed}
            >
              Close
            </div>
            <div className="flex flex-col justify-center items-center mt-5  ">
              <div className="flex flex-col justify-start w-[300px] mb-2">
                <label className="font-ekuzoaMedium" htmlFor="pulse">
                  Pulse
                </label>
                <input
                  className="focus:outline-none bg-gray-100 placeholder:font-ekuzoaLight"
                  type="text"
                  placeholder="Pulse"
                  name="pulse"
                  id="pulse"
                />
              </div>
              <div className="flex flex-col justify-start w-[300px] mb-2">
                <label className="font-ekuzoaMedium" htmlFor="temperature">
                  Temperature
                </label>
                <input
                  className="focus:outline-none bg-gray-100 placeholder:font-ekuzoaLight"
                  type="text"
                  placeholder="Temperature"
                  name="temperature"
                  id="temperature"
                />
              </div>
              <div className="flex flex-col justify-start w-[300px] mb-2">
                <label className="font-ekuzoaMedium" htmlFor="weight">
                  Weight
                </label>
                <input
                  className="focus:outline-none bg-gray-100 placeholder:font-ekuzoaLight"
                  type="text"
                  placeholder="Weight"
                  name="weight"
                  id="weight"
                />
              </div>
              <div className="flex flex-col justify-start w-[300px] mb-2">
                <label className="font-ekuzoaMedium" htmlFor="heart_rate">
                  Heart Rate
                </label>
                <input
                  className="focus:outline-none bg-gray-100 placeholder:font-ekuzoaLight"
                  type="text"
                  placeholder="Heart Rate"
                  name="heart_rate"
                  id="heart_rate"
                />
              </div>
              <div className="flex flex-col justify-start w-[300px] mb-2">
                <label className="font-ekuzoaMedium" htmlFor="patient">
                  Patient Name
                </label>
                <select
                  id="patient"
                  value={patientInfo.patient}
                  onChange={handleSelectChange}
                >
                  <option value="">Select...</option>
                  {patientInfo.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col justify-start w-[300px] mb-2">
                <label className="font-ekuzoaMedium" htmlFor="patient">
                  Assigned Doctor
                </label>
                <select
                  value={patientInfo.doctor}
                  onChange={handleSelectChange}
                >
                  <option value="">Select...</option>
                  {doctorsInfo.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
export default AddConsultation;
