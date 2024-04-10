import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { API_BASE_URL } from "./components/apibase";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [patientData, setPatientData] = useState([]);
  const [reload, setReload] = useState(true);
  const [sreload, setsReload] = useState(true);
  const [empData, setEmpData] = useState([]);
  const [logs, setLogs] = useState([]);
  const [lreload, setlReload] = useState(true);

  useEffect(() => {
    if (reload) {
      fetchPdata();
    }
  }, [reload]);

  useEffect(() => {
    if (sreload) {
      fetchEdata();
    }
  }, [sreload]);

  useEffect(() => {
    if (lreload) {
      fetchLdata();
    }
  }, [lreload]);

  const fetchPdata = async () => {
    await axios
      .get(`${API_BASE_URL}/patients`)
      .then((response) => {
        setPatientData(response.data);
        setReload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchEdata = async () => {
    await axios
      .get(`${API_BASE_URL}/Employees`)
      .then((response) => {
        setEmpData(response.data);
        setsReload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchLdata = async () => {
    await axios
      .get(`${API_BASE_URL}/getLogs`)
      .then((response) => {
        setLogs(response.data);
        setlReload(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <GlobalContext.Provider
      value={{
        patientData,
        setPatientData,
        reload,
        setReload,
        empData,
        setEmpData,
        sreload,
        setsReload,
        logs,
        setLogs,
        lreload,
        setlReload,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
