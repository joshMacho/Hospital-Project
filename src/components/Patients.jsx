import { useEffect, useState } from "react";
import searchIcon from "../assets/icons/search.svg";
import "./patient.css";
import ReactModal from "react-modal";
import AddNewPatient from "./AddNewPatient";
import axios from "axios";
import editIcon from "../assets/icons/edit.svg";

ReactModal.setAppElement("#root");

function Patients({ setFieldsforEdit }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [patientData, setPatientData] = useState([]);
  const [editmode, setEditmode] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8090/api/patients")
      .then((response) => {
        setPatientData(response.data);
      })
      .catch((error) => {
        console.log("Error fetching patient data ", error);
      });
    setReload(false);
  }, []);

  useEffect(() => {
    if (reload) {
      axios
        .get("http://localhost:8090/api/patients")
        .then((response) => {
          setPatientData(response.data);
        })
        .catch((error) => {
          console.log("Error fetching patient data ", error);
        });
      setReload(false);
    }
  }, [reload]);

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

  return (
    <div className="w-full flex flex-col">
      <ReactModal
        isOpen={isFormOpen}
        onRequestClose={closeFormPopup}
        className="Modal"
        overlayClassName="Overlay"
        contentLabel="Form Popup"
      >
        <AddNewPatient
          isOpen={isFormOpen}
          isClosed={closeFormPopup}
          data={modalData}
          editMode={editmode}
          doneEdditing={handleDoneEditting}
        />
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
                    <img src={editIcon} alt="" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Patients;
