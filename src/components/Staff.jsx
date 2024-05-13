import React, { useEffect, useState, Suspense, useRef } from "react";
import "./staff.css";
import addIcon from "../assets/icons/plus.svg";
import ReactModal from "react-modal";
import { useGlobal } from "../GlobalContext";
import axios from "axios";
import { API_BASE_URL } from "./apibase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import upArrow from "../assets/icons/broken-up.svg";
import downArrow from "../assets/icons/broken-down.svg";

ReactModal.setAppElement("#root");

// Lazy-load AddStaffForm component
const AddStaffForm = React.lazy(() => import("./AddStaffForm"));
// Lazy-load UpdatePassword component
const UpdatePassword = React.lazy(() => import("./UpdatePassword"));

function Staff() {
  const curr = JSON.parse(localStorage.getItem("currentuser"));
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isUpdatePasswordOpen, setIsUpdatePasswordOpen] = useState(false);
  const { empData, setEmpData } = useGlobal();
  const [getSelectedEmployee, setSelectedEmployee] = useState({});
  const { sreload, setsReload } = useGlobal();
  const [editData, setEditData] = useState({});
  const [editM, setEditM] = useState(false);
  const [currentemp, setCurrentemp] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setCurrentemp(null);
    }
  };

  const openFormPopup = () => {
    setIsFormOpen(true);
  };

  const openUpdatePassword = (data) => {
    setIsUpdatePasswordOpen(true);
    setSelectedEmployee({
      name: data.name,
      id: data.id,
    });
  };
  const openFormEdit = (data) => {
    setEditData({
      name: data.name,
      type: data.type,
      contact: data.contact,
      username: data.username,
      email: data.email,
      id: data.id,
    });
    setIsFormOpen(true);
    setEditM(true);
  };

  const closeFormPopup = () => {
    setIsFormOpen(false);
    setsReload(true);
  };
  const closeUpdatePassword = () => {
    setIsUpdatePasswordOpen(false);
  };

  const handledDoneEditting = (isDone) => {
    setEditM(isDone);
  };

  const deleteEmp = async (e, data) => {
    e.preventDefault();
    e.stopPropagation();
    const isConfirmed = window.confirm(
      `Are you sure you want to delete user ${data.name}`
    );
    if (!isConfirmed) {
      return;
    }
    await axios
      .delete(`${API_BASE_URL}/deleteEmp/${data.id}`)
      .then((response) => {
        toast.success(response.data.message);
        makeLog(data);
        setsReload(true);
      });
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

  const showOptions = (e, id) => {
    e.stopPropagation();
    currentemp === id ? setCurrentemp(null) : setCurrentemp(id);
  };

  return (
    <div className="staff-main-div">
      <ReactModal
        isOpen={isFormOpen}
        onRequestClose={closeFormPopup}
        className="Modal"
        overlayClassName="Overlay"
        contentLabel="Form Popup"
      >
        <Suspense fallback={<div>Loading...</div>}>
          <AddStaffForm
            isOpen={isFormOpen}
            isClosed={closeFormPopup}
            data={editData}
            editMode={editM}
            doneEditing={handledDoneEditting}
          />
        </Suspense>
      </ReactModal>

      <ReactModal
        isOpen={isUpdatePasswordOpen}
        onRequestClose={closeUpdatePassword}
        className="Modal"
        overlayClassName="Overlay"
        contentLabel="Form Popup"
      >
        <Suspense fallback={<div>Loading...</div>}>
          <UpdatePassword
            isOpen={isUpdatePasswordOpen}
            isClosed={closeUpdatePassword}
            empData={getSelectedEmployee}
          />
        </Suspense>
      </ReactModal>
      <div className="staff-d1">
        <div className="s-t">
          <p>Staff</p>
        </div>
        <div className="s-table-div">
          <div className="search-div">
            <div className="but-d">
              <div className="add-div">
                <button onClick={openFormPopup}>
                  <img src={addIcon} alt="Add" />
                  <p>Add New</p>
                </button>
              </div>
            </div>
            <div className="search-i-div">
              <input type="text" placeholder="Search Staff" />
            </div>
          </div>
          <div className="t-table-div">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Department</th>
                  <th className="hidden lg:table-cell">Username</th>
                  <th className="hidden md:table-cell">Email</th>
                  <th className="hidden lg:table-cell">Contact</th>
                  <th className="hidden lg:table-cell">Date</th>
                  <th>.</th>
                </tr>
              </thead>
              <tbody>
                {empData.map((data) => (
                  <tr
                    key={data.id}
                    className={`${currentemp === data.id ? "selectedEmp" : ""}`}
                  >
                    <td>{data.name}</td>
                    <td>{data.type}</td>
                    <td className="hidden lg:table-cell">{data.username}</td>
                    <td className="hidden md:table-cell">{data.email}</td>
                    <td className="hidden lg:table-cell">{data.contact}</td>
                    <td className="hidden lg:table-cell">
                      {new Date(data.dateOf).toISOString().split("T")[0]}
                    </td>
                    <td className=" flex justify-center items-center relative">
                      <div className="actions">
                        <img
                          src={currentemp === data.id ? downArrow : upArrow}
                          alt="actions"
                          onClick={(e) => showOptions(e, data.id)}
                        />
                        {currentemp === data.id && (
                          <div className="dropdown-div" ref={dropdownRef}>
                            <div
                              className="drop-item"
                              onClick={() => openUpdatePassword(data)}
                            >
                              <p>Update Password</p>
                            </div>
                            <div
                              className="drop-item"
                              onClick={() => openFormEdit(data)}
                            >
                              <p>Update Employee</p>
                            </div>
                            <div
                              className="drop-item"
                              onClick={(e) => deleteEmp(e, data)}
                            >
                              <p>Delete Employee</p>
                            </div>
                          </div>
                        )}
                        {/* <button onClick={() => openUpdatePassword(data)}>
                          <img
                            src={passwordIcon}
                            alt="Password"
                            className="actimg"
                          />
                        </button>
                        <button onClick={() => openFormEdit(data)}>
                          <img src={editIcon} alt="Edit" className="actimg" />
                        </button>
                        <button onClick={(e) => deleteEmp(e, data)}>
                          <img src={deleteIcon} alt="Edit" className="actimg" />
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Staff;
