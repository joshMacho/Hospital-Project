import { useEffect, useState } from "react";
import Loading from "./Loading.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const consultationRoom = [
  "Consulting Room 1",
  "Consulting Room 2",
  "Consulting Room 3",
  "Consulting Room 4",
];

function AddConsultation({ isOpen, isClosed, data, editMode, doneEditing }) {
  const [patientid, setPatientid] = useState("");
  const [consultation, setConsultation] = useState({
    id: "",
    patient: "",
    patient_id: "",
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
  const [formEdit, setFormEdit] = useState(false);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    if (editMode) {
      setConsultation(data);
      setFormEdit(editMode);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConsultation((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePatientSelect = (e) => {
    const { name, value } = e.target;
    setConsultation((prevData) => ({ ...prevData, [name]: value }));
    const selectedName = e.target.options[e.target.selectedIndex].text;
    setConsultation((prevData) => ({ ...prevData, patient: selectedName }));
  };

  const resetFields = () => {
    setConsultation({
      id: "",
      patient: "",
      patient_id: "",
      doctor: "",
      consultation_room: "",
      pulse: "",
      temperature: "",
      weight: "",
      heart_rate: "",
      date: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post("http://localhost:8090/addConsultations", consultation)
      .then((response) => {
        console.log("inserted Successfully");
        resetFields();
        isClosed();
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleUpdate = (e, id) => {
    e.preventDefault();
  };

  return (
    <>
      {isOpen && (
        <div className="popup-overlay">
          <form
            onSubmit={
              formEdit ? (e) => handleUpdate(e) : (e) => handleSubmit(e)
            }
            className="flex flex-col justify-center relative items-center rounded-lg shadow shadow-slate-500 w-[400px]"
          >
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
                  className="focus:outline-none bg-gray-100 pl-2 rounded-sm placeholder:font-ekuzoaLight"
                  type="text"
                  placeholder="Pulse"
                  name="pulse"
                  id="pulse"
                  value={consultation.pulse}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col justify-start w-[300px] mb-2">
                <label className="font-ekuzoaMedium" htmlFor="temperature">
                  Temperature
                </label>
                <input
                  className="focus:outline-none bg-gray-100 pl-2 rounded-sm placeholder:font-ekuzoaLight"
                  type="text"
                  placeholder="Temperature"
                  name="temperature"
                  id="temperature"
                  value={consultation.temperature}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col justify-start w-[300px] mb-2">
                <label className="font-ekuzoaMedium" htmlFor="weight">
                  Weight
                </label>
                <input
                  className="focus:outline-none bg-gray-100 pl-2 rounded-sm placeholder:font-ekuzoaLight"
                  type="text"
                  placeholder="Weight"
                  name="weight"
                  id="weight"
                  value={consultation.weight}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col justify-start w-[300px] mb-2">
                <label className="font-ekuzoaMedium" htmlFor="heart_rate">
                  Heart Rate
                </label>
                <input
                  className="focus:outline-none bg-gray-100 pl-2 rounded-sm placeholder:font-ekuzoaLight"
                  type="text"
                  placeholder="Heart Rate"
                  name="heart_rate"
                  value={consultation.heart_rate}
                  onChange={handleInputChange}
                  id="heart_rate"
                />
              </div>
              <div className="flex flex-col justify-start w-[300px] mb-2">
                <label className="font-ekuzoaMedium" htmlFor="patient">
                  Patient Name
                </label>
                <select
                  className="bg-gray-100"
                  id="patient"
                  name="patient_id"
                  required
                  value={patientInfo.patient}
                  onChange={handlePatientSelect}
                >
                  <option value=""></option>
                  {patientInfo.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col justify-start w-[300px] mb-2">
                <label className="font-ekuzoaMedium" htmlFor="doctor">
                  Assigned Doctor
                </label>
                <select
                  id="doctor"
                  onSelect={handleInputChange}
                  required
                  className="bg-gray-100"
                  name="doctor"
                  value={consultation.doctor}
                  onChange={handleInputChange}
                >
                  <option value=""></option>
                  {doctorsInfo.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col justify-start w-[300px] mb-2">
                <label
                  className="font-ekuzoaMedium"
                  htmlFor="consultation_room"
                >
                  Consulting Room
                </label>
                <select
                  id="consultation_room"
                  name="consultation_room"
                  required
                  onSelect={handleInputChange}
                  className="bg-gray-100"
                  value={consultation.consultation_room}
                  onChange={handleInputChange}
                >
                  <option></option>
                  {consultationRoom.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="submit-div">
              <button disabled={loading}>
                <p>{formEdit ? "Update" : "Save"}</p>
                {loading ? <Loading /> : ""}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
export default AddConsultation;
