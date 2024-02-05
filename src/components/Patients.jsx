import { useState } from "react";
import searchIcon from "../assets/icons/search.svg";
import "./patient.css";
import ReactModal from "react-modal";
import AddNewPatient from "./AddNewPatient";

ReactModal.setAppElement("#root");

function Patients() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openFormPopup = () => {
    setIsFormOpen(true);
  };

  const closeFormPopup = () => {
    setIsFormOpen(false);
  };
  return (
    <div className="w-full flex flex-col">
      <ReactModal
        isOpen={isFormOpen}
        onRequestClose={closeFormPopup}
        className="Modal"
        overlayClassName="Overlay"
        contentLabel="Form Popup"
      >
        <AddNewPatient isOpen={isFormOpen} isClosed={closeFormPopup} />
      </ReactModal>
      <div className="mx-2 my-3">
        <div>
          <p className="font-ekuzoaLight text-[25px]">Patients </p>
        </div>
      </div>
      <div className="flex justify-between item-center mx-2">
        <div>
          <button
            onClick={openFormPopup}
            className="flex justify-center items-center border border-black "
          >
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
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Sex</th>
              <th>DOB</th>
              <th>Address</th>
              <th>Marital Status</th>
              <th>Next of Kin</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}
export default Patients;
