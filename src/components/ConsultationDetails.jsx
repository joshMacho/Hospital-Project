import React, { useEffect, useState } from "react";
import "./staff.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactModal from "react-modal";
import { useForm, Controller, useFieldArray, useWatch } from "react-hook-form";

ReactModal.setAppElement("#root");

const ConsultationsDetails = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const closeFormPopup = () => {
    setIsFormOpen(false);
  };
  const crms = ["Pending", "Complete"];
  const [token, setToken] = useState("h");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const { patientID } = useParams();

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

  //run this in useEffect
  const getConsultationDetails = () => {
    axios
      .post(`http://localhost:3001/patientConsultation/${patientID}`, {
        //pull patient's details and pass them to the inputs
        //check inside the useEffect on how I set the detault values for the inputs
      })
      .then((res) => {
        if (res.data.errorCode === "0") {
          setToken(res.data.errorMessage);
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    //this is how to set default values for react-hook-form
    reset({
      name: "Kwaku Macho",
      status: "Complete",
      dateofvisit: "2024-02-04",
      weight: "45Kg",
      temperature: "37C",
      pulse: "434",
      heartrate: "434",
      notes: "All is well",
      diagnose: "Malaria",
      medication: "Para",
      lab: "Do Malaria test",
    });
    //   getConsultationDetails();
  }, []);

  return (
    <>
      <form className="bg-white mx-auto p-4">
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
              />
              {errors.weight && (
                <small style={{ color: "red" }}>{errors.weight.message}</small>
              )}
            </div>

            <div className="flex-1 flex-col md:ml-20 ml-4  py-2 ">
              <label>Temperature</label>
              <input
                className="focus:outline-none rounded-sm focus:border-blue-500 focus:ring-2 focus:ring-orange-500 text-black-500 mt-2 p-2  w-full bg-gray-100"
                {...register("temperature", { required: "This is Required" })}
                type="text"
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
              />
              {errors.terminalrenotesmarks && (
                <small style={{ color: "red" }}>{errors.notes.message}</small>
              )}
            </div>
          </div>

          <div className="flex  flex-grow">
            <div className="flex-1 flex-col  py-2 ">
              <label>Diagnose</label>
              <textarea
                className="focus:outline-none rounded-sm focus:border-blue-500 focus:ring-2 focus:ring-orange-500 text-black-500 mt-2 p-2  w-full bg-gray-100"
                {...register("diagnose", {
                  required: "This is Required",
                })}
                placeholder="Diagnose"
                type="text"
              />
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
              <input
                className="focus:outline-none rounded-sm focus:border-blue-500 focus:ring-2 focus:ring-orange-500 text-black-500 mt-2 p-2  w-full bg-gray-100"
                {...register("status")}
                type="text"
              />
              {errors.status && (
                <small style={{ color: "red" }}>{errors.status.message}</small>
              )}
            </div>

            <div className="flex-1 flex-col md:ml-20 ml-4 py-2 ">
              <label>Laboratory</label>
              <input
                className="focus:outline-none rounded-sm focus:border-blue-500 focus:ring-2 focus:ring-orange-500 text-black-500 mt-2 p-2  w-full bg-gray-100"
                {...register("lab")}
                placeholder="Issue Log"
                type="text"
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
                className=" py-2 px-6 pl-8 bg-blue-600 text-white hover:bg-blue-700"
              >
                Save as Draft
              </button>
            </div>

            <div className="flex-1  flex-col  py-2">
              <button
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
    </>
  );
};

export default ConsultationsDetails;
