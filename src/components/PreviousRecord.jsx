import "./login.css";
import { useState } from "react";
import { useForm, Controller, useFieldArray, useWatch } from "react-hook-form";
import axios from "axios";
import userIcon from "../assets/icons/user.svg";

const PreviousRecord = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [token, setToken] = useState("h");
  const onSubmit = (formData) => {
    console.log(formData);
    /*

axios.post("http://localhost:3001/api/register",{name:"",value:""}).then((res)=>
console.log("response from the server")

).catch((e)=>console.log("error occured"))

*/
  };

  const check = () => {
    axios
      .post("http://138.68.161.4:8222/emr/cis/api/v1/generate_secure_token", {
        payload: "b9-828990-24=Kwame Kwaku=2024-02-04 09:37:10",

        secretKey: "SsUn6lCGA1Fo1VtQnLclp2GRHDlyMJcI",

        hospitalId: "B9-828990-24",
      })
      .then((res) => {
        if (res.data.errorCode === "0") {
          setToken(res.data.errorMessage);
        }
      })
      .catch((e) => console.log(e));
  };
  const savePatientRecord = () => {
    axios
      .post("http://138.68.161.4:8222/emr/cis/api/v1/record_visit_info", {
        visitId: "67",

        hospitalId: "B9-828990-24",

        hospitalName: "Hospital ReactNode",

        doctorName: "JosRich",

        patientNationalId: "GHA-12345623-3",

        patientName: "Meyare",

        patientPhoneNumber: "+233541778545",

        visitDate: "2024-01-04",
      })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <a href="/">GO HOMEPAGE</a>
      <div className="flex">
        <p>CHECK PREVIOUS RECORD FROM OTHER HOSPITALS</p>
      </div>

      {token != "h" && (
        <div className="flex">
          {" "}
          <iframe
            src={`http://138.68.161.4:8222/${token}`}
            height={500}
            width={1000}
          />{" "}
        </div>
      )}
      <button
      className="flex"
        type="button"
        style={{ color: "white", backgroundColor: "pink", padding: "6px" }}
        onClick={() => check()}
      >
        CHECK PREVIOUS RECORDS
      </button>
    </div>
  );
};

export default PreviousRecord;
