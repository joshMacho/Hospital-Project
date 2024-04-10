import axios from "axios";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "./apibase";
import { useGlobal } from "../GlobalContext";
import Loading from "./Loading";

function Logs() {
  const { logs, setLogs } = useGlobal();
  const { lreload, setlReload } = useGlobal();

  const refreshLogs = () => {
    setlReload(true);
  };

  return (
    <div className="staff-main-div">
      <div className="staff-d1">
        <div className="s-t">
          <p>System Logs</p>
        </div>
        <div className="s-table-div">
          <div className="search-div">
            <div className="but-d"></div>
            <div className="search-i-div">
              <input type="text" placeholder="Search Staff" />
            </div>
          </div>
          <div className="t-table-div">
            <div className=" flex items-center justify-start top-3 left-0 ">
              <button
                disabled={lreload}
                onClick={refreshLogs}
                className="flex justify-center items-center shadow-md ml-3 bg-slate-300 space-x-3 rounded-md"
              >
                <p className="p-1 font-ekuzoaBold">Reload</p>
                {lreload && <Loading />}
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Action</th>
                  <th>On Patient</th>
                  <th className="hidden lg:table-cell">Officer</th>
                  <th className="hidden md:table-cell">On Table</th>
                  <th className="hidden lg:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((data, index) => (
                  <tr key={index}>
                    <td>{data.action_event}</td>
                    <td>{data.affected}</td>
                    <td className="hidden lg:table-cell">{data.officer}</td>
                    <td className="hidden md:table-cell">
                      {data.table_action}
                    </td>
                    <td className="hidden lg:table-cell">{data.dateof}</td>
                    {/* <td className="hidden lg:table-cell">
                      {new Date(data.dateOf).toISOString().split("T")[0]}
                    </td> */}
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

export default Logs;
