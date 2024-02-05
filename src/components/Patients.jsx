import { useState } from "react";
import searchIcon from "../assets/icons/search.svg";
import "./patient.css";

function Patients() {
  return (
    <div className="w-full flex flex-col">
      <div className="mx-2">
        <div>
          <p>Patients </p>
        </div>
      </div>
      <div className="flex justify-between item-center mx-2">
        <div>
          <button className="flex justify-center items-center border border-black ">
            <p className="p-1">Add Patient</p>
          </button>
        </div>
        <div className="border border-black flex justify-center items-center space-x-2 rounded-md">
          <img src={searchIcon} className="w-[20px]" />
          <input
            className="font-ekuzoaLight text-slate-500 bg-transparent "
            type="text"
            placeholder="Search Patient"
          />
        </div>
      </div>
      <div className="n-table-div">
        <table>
          <thead>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Sex</th>
            <th>DOB</th>
            <th>Address</th>
            <th>Marital Status</th>
            <th>Next of Kin</th>
          </thead>
        </table>
      </div>
    </div>
  );
}
export default Patients;
