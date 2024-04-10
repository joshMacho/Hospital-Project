import React, { useEffect, useState, Suspense } from "react";
import searchIcon from "../assets/icons/search.svg";
import deleteIcon from "../assets/icons/delete.svg";
import "./patient.css";
import ReactModal from "react-modal";
import axios from "axios";
import editIcon from "../assets/icons/edit.svg";
import { API_BASE_URL } from "./apibase";
import { useGlobal } from "../GlobalContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactModal.setAppElement("#root");

// Lazy-load AddNewPatient component
const AddNewPatient = React.lazy(() => import("./AddNewPatient"));

function Patients() {
  const curr = JSON.parse(localStorage.getItem("currentuser"));
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { patientData, setPatientData } = useGlobal();
  const [editmode, setEditmode] = useState(false);
  const [modalData, setModalData] = useState(null);
  const { reload, setReload } = useGlobal();

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   if (reload) {
  //     fetchData();
  //   }
  //   setReload(false);
  // }, [reload]);

  const fetchData = async () => {
    await axios
      .get(`${API_BASE_URL}/patients`)
      .then((response) => {
        setPatientData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const handleDoneEditting = (isDone) => {
    setEditmode(isDone);
  };

  const deletePat = async (e, data) => {
    e.preventDefault();
    e.stopPropagation();
    const isConfirmed = window.confirm(
      `Are you sure you want to delete user ${data.name}`
    );
    if (!isConfirmed) {
      return;
    }
    await axios
      .delete(`${API_BASE_URL}/deletePat/${data.id}`)
      .then((response) => {
        toast.success(response.data.message);
        makeLog(data);
        setReload(true);
      })
      .catch((error) =>
        toast.error(
          "Error deleting\nNote: you cannot delete patient with a consultation"
        )
      );
  };

  const makeLog = async (data) => {
    await axios
      .post(`${API_BASE_URL}/logs`, {
        action_event: "DELETED",
        affected: data.name,
        officer: curr.name,
        table_action: "Employees",
      })
      .catch((e) => console.log(e));
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
        <Suspense fallback={<div>Loading...</div>}>
          <AddNewPatient
            isOpen={isFormOpen}
            isClosed={closeFormPopup}
            data={modalData}
            editMode={editmode}
            doneEdditing={handleDoneEditting}
          />
        </Suspense>
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
        {patientData.length > 0 ? (
          <table className="border border-black mx-1">
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
                <th>.</th>
              </tr>
            </thead>
            <tbody>
              {patientData.map((data, index) => (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.contact}</td>
                  <td>{data.sex}</td>
                  <td>{data.dob}</td>
                  <td>{data.address}</td>
                  <td>{data.marital_status}</td>
                  <td>{data.next_of_kin}</td>
                  <td>
                    <button onClick={() => openModalWithData(data)}>
                      <img src={editIcon} alt="Edit" />
                    </button>
                    <button onClick={(e) => deletePat(e, data)}>
                      <img src={deleteIcon} alt="delete" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center p-5">No patients found.</div>
        )}
      </div>
    </div>
  );
}
export default Patients;
