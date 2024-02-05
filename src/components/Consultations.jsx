import { useState } from "react";
import searchIcon from "../assets/icons/search.svg";

function Consultations() {
  return (
    <div className="w-full flex flex-col">
      <div className="mx-2 my-3">
        <div>
          <p className="font-ekuzoaLight text-[25px]">Consultations </p>
        </div>
      </div>
      <div className="flex justify-between item-center mx-2">
        <div>
          <button className="flex justify-center items-center border border-black rounded-md">
            <p className="p-1">Add Consultation</p>
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
        <table className="border border-black mx-1">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Doctor Name</th>
              <th>Consultation</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}
export default Consultations;
