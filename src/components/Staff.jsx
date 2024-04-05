import React, { useEffect, useState, Suspense } from "react";
import "./staff.css";
import addIcon from "../assets/icons/plus.svg";
import ReactModal from "react-modal";
import editIcon from "../assets/icons/edit.svg";
import passwordIcon from "../assets/icons/key.svg";
import axios from "axios";
import { API_BASE_URL } from "./apibase";

ReactModal.setAppElement("#root");

// Lazy-load AddStaffForm component
const AddStaffForm = React.lazy(() => import("./AddStaffForm"));
// Lazy-load UpdatePassword component
const UpdatePassword = React.lazy(() => import("./UpdatePassword"));

function Staff() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isUpdatePasswordOpen, setIsUpdatePasswordOpen] = useState(false);
  const [empData, setEmpData] = useState([]);
  const [getSelectedEmployee, setSelectedEmployee] = useState({});
  const [reload, setReload] = useState(false);
  const [editData, setEditData] = useState({});
  const [editM, setEditM] = useState(false);

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
      .get(`${API_BASE_URL}/Employees`)
      .then((response) => {
        setEmpData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
    setReload(true);
  };
  const closeUpdatePassword = () => {
    setIsUpdatePasswordOpen(false);
  };

  const handledDoneEditting = (isDone) => {
    setEditM(isDone);
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
                {empData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.name}</td>
                    <td>{data.type}</td>
                    <td className="hidden lg:table-cell">{data.username}</td>
                    <td className="hidden md:table-cell">{data.email}</td>
                    <td className="hidden lg:table-cell">{data.contact}</td>
                    <td className="hidden lg:table-cell">
                      {new Date(data.dateOf).toISOString().split("T")[0]}
                    </td>
                    <td className=" flex justify-center items-center">
                      <div className="actions">
                        <button onClick={() => openUpdatePassword(data)}>
                          <img src={passwordIcon} alt="Password" />
                        </button>
                        <button onClick={() => openFormEdit(data)}>
                          <img src={editIcon} alt="Edit" />
                        </button>
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
