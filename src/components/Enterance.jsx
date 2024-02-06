import "./ent.css";
import adminIcon from "../assets/icons/lock.svg";
import doctorIcon from "../assets/icons/thermometer.svg";
import nurseIcon from "../assets/icons/activity.svg";
import { useNavigate } from "react-router";

function Enterance() {
  const navigateTo = useNavigate();

  const goToNurse = () => {
    navigateTo("/nurse");
  };
  const goToAdmin = () => {
    navigateTo("/admin");
  };

  const gotoConsultations = () => {
    navigateTo("/consultations");
  };
  return (
    <div className="m-d">
      <div className="t-d">
        <p>MHS Hospital Services</p>
      </div>
      <div className="d-div">
        <div
          className="btn-div bg-slate-500 shadow-slate-500"
          onClick={goToAdmin}
        >
          <button className="flex justify-start items-center">
            <img src={adminIcon} />
            <p className="ml-5">ADMIN</p>
          </button>
        </div>
        <div
          className="btn-div bg-slate-600 shadow-slate-600"
          onClick={gotoConsultations}
        >
          <button className="flex justify-center items-center">
            <p className="mr-5">DOCTOR</p>
            <img src={doctorIcon} />
          </button>
        </div>
        <div
          className="btn-div bg-slate-700 shadow-slate-700"
          onClick={goToNurse}
        >
          <button className="flex justify-end items-center">
            <img src={nurseIcon} />
            <p className="mr-20 ml-5">NURSE</p>
          </button>
        </div>
      </div>
    </div>
  );
}
export default Enterance;
