import { useEffect, useState } from "react";
import searchIcon from "../assets/icons/search.svg";
import AddConsultation from "./AddConsultation";
import ReactModal from "react-modal";
import axios from "axios";
import editIcon from "../assets/icons/edit.svg";
import { API_BASE_URL } from "./apibase";
import "./patient.css";

function Consultations() {
  const [consultations, setConsultations] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (reload) {
      fetchData();
    }
    setReload(false);
  }, [reload]);

  const fetchData = async () => {
    await axios
      .get(`${API_BASE_URL}/getconsults`)
      .then((response) => {
        setConsultations(response.data);
      })
      .catch((error) => {
        console.log("Error fetching patient data ", error);
      });
  };

  const [isFormOpen, setIsFormOpen] = useState(false);
  const openFormPopup = () => {
    setIsFormOpen(true);
  };

  const closeFormPopup = () => {
    setIsFormOpen(false);
    setReload(true);
  };

  const openModalWithData = (data) => {
    setModalData(data);
    setIsFormOpen(true);
    setEditmode(true);
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
        <AddConsultation
          isOpen={isFormOpen}
          isClosed={closeFormPopup}
          data={modalData}
        />
      </ReactModal>
      <div className="mx-2 my-3">
        <div>
          <p className="font-ekuzoaLight text-[25px]">Consultations </p>
        </div>
      </div>
      <div className="flex justify-between item-center mx-2">
        <div>
          <button
            onClick={openFormPopup}
            className="flex justify-center items-center border border-black rounded-md"
          >
            <p className="p-1">Add Consultation</p>
          </button>
        </div>
        <div className="border border-black flex justify-center items-center space-x-2 rounded-md">
          <img src={searchIcon} className="w-[20px]" />
          <input
            className="font-ekuzoaLight text-slate-500 bg-transparent "
            type="text"
            placeholder="Search Patient"
            id="search"
          />
        </div>
      </div>
      <div className="n-table-div">
        {consultations.length > 0 ? (
          <table className="border border-black mx-1">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Doctor Name</th>
                <th>Consultation</th>
                <th>Status</th>
                <th>Date</th>
                <th>.</th>
              </tr>
            </thead>
            <tbody>
              {consultations.map((consult, index) => (
                <tr key={index}>
                  <td>{consult.patient_name}</td>
                  <td>{consult.doctor_assigned}</td>
                  <td>{consult.consultation}</td>
                  <td>{consult.status}</td>
                  <td>{new Date(consult.date).toISOString().split("T")[0]}</td>
                  <td>
                    <button
                      onClick={() => openModalWithData(consult)}
                      disabled={true} // Note: Consider enabling this if you want to allow editing.
                      className="disabled:opacity-30"
                    >
                      <img src={editIcon} alt="Edit" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center p-5">No consultations found.</div>
        )}
      </div>
    </div>
  );
}
export default Consultations;
