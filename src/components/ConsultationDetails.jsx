import React, { useEffect, useState } from "react";
import "./staff.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useForm, Controller, useFieldArray, useWatch } from "react-hook-form";
import { API_BASE_URL } from "./apibase";
import docIcon from "../assets/images/doctor1.jpg";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";

const ConsultationsDetails = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const crms = ["Pending", "Complete"];
  const [token, setToken] = useState("h");

  const { patientID } = useParams();
  const stats = ["Discharged", "Admitted"];
  const [patientConsult, setPatientConsult] = useState({
    id: "",
    pulse: "",
    temperature: "",
    weight: "",
    heart_rate: "",
    diagnostics: "",
    medication: "",
    status: "",
    laboratory: "",
    notes: "",
  });
  const [diagnostics, setDiagnostics] = useState("");
  const [status, setStatus] = useState("");
  const [alldiag, setAlldiag] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uLoading, setuLoading] = useState(false);
  const navigateTo = useNavigate();
  const curr = JSON.parse(localStorage.getItem("currentuser"));

  const getTimestamp = () => {
    const now = new Date();

    // Get the individual components of the date
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    // Create the timestamp string in the desired format
    const timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return timestamp;
  };

  const check = async () => {
    // await axios
    //   .post("http://138.68.161.4:8222/emr/cis/api/v1/generate_secure_token", {
    //     payload: `b9-828990-24=${
    //       patientConsult.doctor_assigned
    //     }=${getTimestamp()}`,

    //     secretKey: "SsUn6lCGA1Fo1VtQnLclp2GRHDlyMJcI",

    //     hospitalId: "B9-828990-24",
    //   })
    //   .then((res) => {
    //     if (res.data.errorCode === "0") {
    //       setToken(res.data.errorMessage);
    //     }
    //   })
    //   .catch((e) => console.log(e));
    console.log(patientConsult);
  };

  useEffect(() => {
    getConsultationDetails();
    getDiagnostics();
    checkAuthentication();
  }, []);

  const getConsultationDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/getconsult/${patientID}`
      );
      //console.log(response.data.status);
      setPatientConsult({
        id: response.data.id,
        pulse: response.data.pulse,
        temperature: response.data.temperature,
        weight: response.data.weight,
        heart_rate: response.data.heart_rate,
        diagnostics:
          response.data.diagnose === null ? "" : response.data.diagnose,
        medication:
          response.data.medication === null ? "" : response.data.medication,
        status: response.data.status === null ? "" : response.data.status,
        laboratory:
          response.data.laboratory === null ? "" : response.data.laboratory,
        notes: response.data.notes === null ? "" : response.data.notes,
      });
      reset({
        name: response.data.patient_name,
        status: response.data.status,
        dateofvisit: new Date(response.data.date).toISOString().split("T")[0],
        weight: response.data.weight,
        temperature: response.data.temperature,
        pulse: response.data.pulse,
        heartrate: response.data.heart_rate,
        notes: response.data.notes,
        diagnose: response.data.diagnose,
        medication: response.data.medication,
        lab: response.data.laboratory,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching consultation details:", error);
    }
  };

  const checkAuthentication = async () => {
    const you = JSON.parse(localStorage.getItem("currentuser"));
    if (!curr) {
      navigateTo("/login");
    }
    if (curr.type !== "Doctor") {
      navigateTo("/login");
    }
  };

  const getDiagnostics = async () => {
    await axios
      .get(`${API_BASE_URL}/getDiagnostics`)
      .then((response) => {
        setAlldiag(response.data);
      })
      .catch((error) => console.log | error);
  };

  const diagSelect = (e) => {
    setPatientConsult((previousData) => ({
      ...previousData,
      diagnostics: e.target.value,
    }));
  };

  const handleConsultChange = (e) => {
    const { name, value } = e.target;
    setPatientConsult((previousData) => ({ ...previousData, [name]: value }));
  };

  const statSelect = (e) => {
    setPatientConsult((previousData) => ({
      ...previousData,
      status: e.target.value,
    }));
    console.log(e.target.value);
  };

  const logoutUser = async () => {
    localStorage.removeItem("currentuser");
    navigateTo("/login");
  };

  const getUser = () => {
    return curr.name;
  };

  const doctorsUpdate = async () => {
    setuLoading(true);
    await axios
      .put(`${API_BASE_URL}/docupdateonp/${patientConsult.id}`, patientConsult)
      .then((response) => {
        toast.success(response.data.message);
        setuLoading(false);
      })
      .catch((error) => {
        toast.error("unable to update patient");
        setuLoading(false);
      });
  };

  return (
    <div className="admin-main-div">
      <div className="top-bar-div mb-5">
        <div className="who-div">
          <div className="user-div mb-3">
            <img src={docIcon} />
          </div>
          <div className="c-div mb-3">
            <Logout getUser={getUser()} logout={() => logoutUser()} />
          </div>
        </div>
      </div>
      <div className="admin-body-div justify-center">
        <form className="bg-white mx-auto p-4 w-full">
          <header className="bg-orange-600 bg-opacity-20  sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-black text-center">Patient</h2>
            </div>
          </header>

          <div className="flex items-center justify-center flex-grow">
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
          </div>

          <div className="flex flex-col">
            <div className="flex  flex-grow">
              <div className="flex-1 flex-col  py-2 ">
                <label>Patient name</label>
                <input
                  className="focus:outline-none rounded-sm focus:border-blue-500 focus:ring-2 focus:ring-orange-500 text-black-500 mt-2 p-2  w-full bg-gray-100"
                  {...register("name", { required: "This is Required" })}
                  type="text"
                  readOnly
                />
                {errors.name && (
                  <small style={{ color: "red" }}>{errors.name.message}</small>
                )}
              </div>

              <div className="flex-1 flex-col md:ml-20 ml-4  py-2 ">
                <label>Date of Visit</label>
                <input
                  className="border-blue-500 focus:outline-none rounded-sm focus:border-blue-500 focus:ring-2 focus:ring-orange-500 text-black-500 mt-2 p-2  w-full bg-gray-100"
                  {...register("dateofvisit", { required: "This is Required" })}
                  type="date"
                  readOnly
                />
                {errors.dateofvisit && (
                  <small style={{ color: "red" }}>
                    {errors.dateofvisit.message}
                  </small>
                )}
              </div>
            </div>

            <div className="flex  flex-grow">
              <div className="flex-1 flex-col  py-2 ">
                <label>Weight</label>
                <input
                  className="focus:outline-none rounded-sm focus:border-blue-500 focus:ring-2 focus:ring-orange-500 text-black-500 mt-2 p-2  w-full bg-gray-100"
                  {...register("weight", { required: "This is Required" })}
                  type="text"
                  name="weight"
                  value={patientConsult.weight}
                  onChange={handleConsultChange}
                />
                {errors.weight && (
                  <small style={{ color: "red" }}>
                    {errors.weight.message}
                  </small>
                )}
              </div>

              <div className="flex-1 flex-col md:ml-20 ml-4  py-2 ">
                <label>Temperature</label>
                <input
                  className="focus:outline-none rounded-sm focus:border-blue-500 focus:ring-2 focus:ring-orange-500 text-black-500 mt-2 p-2  w-full bg-gray-100"
                  {...register("temperature", { required: "This is Required" })}
                  type="text"
                  name="temperature"
                  value={patientConsult.temperature}
                  onChange={handleConsultChange}
                />
                {errors.temperature && (
                  <small style={{ color: "red" }}>
                    {errors.temperature.message}
                  </small>
                )}
              </div>
            </div>

            <div className="flex  flex-grow">
              <div className="flex-1 flex-col  py-2 ">
                <label>Pulse</label>
                <input
                  className="focus:outline-none rounded-sm focus:border-blue-500 focus:ring-2 focus:ring-orange-500 text-black-500 mt-2 p-2  w-full bg-gray-100"
                  {...register("pulse", { required: "This is Required" })}
                  type="text"
                  name="pulse"
                  value={patientConsult.pulse}
                  onChange={handleConsultChange}
                />
                {errors.pulse && (
                  <small style={{ color: "red" }}>{errors.pulse.message}</small>
                )}
              </div>

              <div className="flex-1 flex-col md:ml-20 ml-4  py-2 ">
                <label>Heart Rate</label>
                <input
                  className="focus:outline-none rounded-sm border-orange-500 focus:border-blue-500 focus:ring-2 focus:ring-orange-500 text-black-500 mt-2 p-2  w-full bg-gray-100"
                  {...register("heartrate", { required: "This is Required" })}
                  type="text"
                  name="heart_rate"
                  value={patientConsult.heart_rate}
                  onChange={handleConsultChange}
                />
                {errors.heartrate && (
                  <small style={{ color: "red" }}>
                    {errors.heartrate.message}
                  </small>
                )}
              </div>
            </div>

            <div className="flex  flex-grow">
              <div className="flex-1 flex-col  py-2 ">
                <label>Notes</label>
                <textarea
                  className="focus:outline-none rounded-sm focus:border-blue-500 focus:ring-2 focus:ring-orange-500 text-black-500 mt-2 p-2  w-full bg-gray-100"
                  {...register("notes", {
                    required: "This is Required",
                  })}
                  placeholder="Notes"
                  type="text"
                  name="notes"
                  value={patientConsult.notes}
                  onChange={handleConsultChange}
                />
                {errors.terminalrenotesmarks && (
                  <small style={{ color: "red" }}>{errors.notes.message}</small>
                )}
              </div>
            </div>

            <div className="flex  flex-grow">
              <div className="flex-1 flex-col  py-2 ">
                <label>Diagnose</label>
                <select
                  className="focus:outline-none rounded-sm focus:border-blue-500 focus:ring-2 focus:ring-orange-500 text-black-500 mt-2 p-2  w-full bg-gray-100"
                  {...register("diagnose", {
                    required: "This is Required",
                  })}
                  placeholder="Diagnose"
                  type="text"
                  value={patientConsult.diagnostics}
                  onSelect={diagSelect}
                  onChange={diagSelect}
                >
                  <option value=""></option>
                  {alldiag.map((item, index) => (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {errors.diagnose && (
                  <small style={{ color: "red" }}>
                    {errors.diagnose.message}
                  </small>
                )}
              </div>
            </div>

            <div className="flex  flex-grow">
              <div className="flex-1 flex-col  py-2 ">
                <label>Medication</label>
                <textarea
                  className="focus:outline-none rounded-sm focus:border-blue-500 focus:ring-2 focus:ring-orange-500 text-black-500 mt-2 p-2  w-full bg-gray-100"
                  {...register("medication", {
                    required: "This is Required",
                  })}
                  placeholder="Medication"
                  type="text"
                  name="medication"
                  value={patientConsult.medication}
                  onChange={handleConsultChange}
                />
                {errors.medication && (
                  <small style={{ color: "red" }}>
                    {errors.medication.message}
                  </small>
                )}
              </div>
            </div>

            <div className="flex  flex-grow">
              <div className="flex-1 flex-col py-2 ">
                <label>Status</label>
                <select
                  className="focus:outline-none rounded-sm focus:border-blue-500 focus:ring-2 focus:ring-orange-500 text-black-500 mt-2 p-2  w-full bg-gray-100"
                  {...register("status")}
                  type="text"
                  value={patientConsult.status}
                  onSelect={statSelect}
                  onChange={statSelect}
                >
                  {stats.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                {errors.status && (
                  <small style={{ color: "red" }}>
                    {errors.status.message}
                  </small>
                )}
              </div>

              <div className="flex-1 flex-col md:ml-20 ml-4 py-2 ">
                <label>Laboratory</label>
                <input
                  className="focus:outline-none rounded-sm focus:border-blue-500 focus:ring-2 focus:ring-orange-500 text-black-500 mt-2 p-2  w-full bg-gray-100"
                  {...register("lab")}
                  placeholder="Issue Log"
                  type="text"
                  name="laboratory"
                  value={patientConsult.laboratory}
                  onChange={handleConsultChange}
                />
                {errors.lab && (
                  <small style={{ color: "red" }}>{errors.lab.message}</small>
                )}
              </div>
            </div>

            <hr />
            <div className="flex justify-items-center flex-grow mt-2 bg-green-400 bg-opacity-20">
              <div className="flex-1  flex-col py-2">
                <a
                  href="/consultations"
                  className=" py-2 px-6 mr-8  bg-red-600 text-white hover:bg-red-700"
                >
                  Close
                </a>
              </div>
              <div className="flex-1  flex-col  py-2">
                <button
                  type="button"
                  className=" flex justify-center items-center space-x-3 py-2 px-6 pl-8 bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => doctorsUpdate()}
                >
                  <p>Save</p>
                  {uLoading && <Loading />}
                </button>
              </div>

              <div className="flex-1  flex-col  py-2">
                <button
                  disabled={loading}
                  type="button"
                  onClick={() => check()}
                  className=" py-2 px-6 pl-8 bg-green-600 text-white hover:bg-green-700"
                >
                  Check Previous History
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConsultationsDetails;
