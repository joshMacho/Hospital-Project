import { useEffect, useState } from "react";
import "./staff.css";
import addIcon from "../assets/icons/plus.svg";
import ReactModal from "react-modal";
import AddStaffForm from "./AddStaffForm";
import editIcon from "../assets/icons/edit.svg";
import passwordIcon from "../assets/icons/key.svg";
import UpdatePassword from "./UpdatePassword";

ReactModal.setAppElement("#root");

function Staff() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isUpdatePasswordOpen, setIsUpdatePasswordOpen] = useState(false);
  const [empData, setEmpData] = useState([]);
  const [getSelectedEmployee, setSelectedEmployee] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await fetch("http://localhost:8090/api/Employees");
        const response = await request.json();
        console.log(response);
        setEmpData(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const openFormPopup = () => {
    setIsFormOpen(true);
  };

  const openUpdatePassword = (data) => {
    setIsUpdatePasswordOpen(true);
    setSelectedEmployee(data);
  };

  const closeFormPopup = () => {
    setIsFormOpen(false);
  };
  const closeUpdatePassword = () => {
    setIsUpdatePasswordOpen(false);
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
        <AddStaffForm
          isOpen={isFormOpen}
          isClosed={closeFormPopup}
          empData={getSelectedEmployee}
        />
      </ReactModal>
      <ReactModal
        isOpen={isUpdatePasswordOpen}
        onRequestClose={closeUpdatePassword}
        className="Modal"
        overlayClassName="Overlay"
        contentLabel="Form Popup"
      >
        <UpdatePassword
          isOpen={isUpdatePasswordOpen}
          isClosed={closeUpdatePassword}
        />
      </ReactModal>
      <div className="staff-d1">
        <div className="s-t">
          <p>Staffs</p>
        </div>
        <div className="s-table-div">
          <div className="search-div">
            <div className="but-d">
              <div className="add-div">
                <button onClick={openFormPopup}>
                  <img src={addIcon} />
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
                          <img src={passwordIcon} />
                        </button>
                        <button>
                          <img src={editIcon} />
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