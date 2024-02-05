import { useState } from "react";
import Loading from "./Loading.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function AddConsultation({ isOpen, isClosed }) {
  const [consultation, setConsultation] = useState({
    patient: "",
    doctor: "",
    consultation_room: "",
    pulse: "",
    temperature: "",
    weight: "",
    heart_rate: "",
  });
  return (
    <div>
      <div></div>
    </div>
  );
}
export default AddConsultation;
