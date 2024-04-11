import React, { useState, useEffect, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import axios from "axios";
import { API_BASE_URL } from "../apibase";

const Table = (props) => {
  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: "name", //access nested data with dot notation
        header: "Patient Name",
        size: 200,
      },
      {
        accessorKey: "doctor", //access nested data with dot notation
        header: "Doctor Name",
        size: 200,
      },
      {
        accessorKey: "consultationroom", //access nested data with dot notation
        header: "Consultation Room",
        size: 200,
      },
      {
        accessorKey: "status", //access nested data with dot notation
        header: "Status",
        size: 200,
      },
      {
        accessorKey: "date", //access nested data with dot notation
        header: "Date",
        size: 200,
      },
      {
        accessorKey: "action", //access nested data with dot notation
        header: "Action",
        size: 200,
      },
    ],
    []
  );

  const curr = JSON.parse(localStorage.getItem("currentuser"));

  useEffect(() => {
    fetchData();
    console.log(curr.id);
  }, []);

  // const dataFromData = [
  //   {
  //     id: 3,
  //     name: "Meyare Name",
  //     doctor: "Dr. Apia",
  //     consultationroom: "Consultation Rooxm 1",
  //     status: "Pending",
  //     date: "2024/21/04 12:34:00 AM",
  //   },
  // ];

  const [dataFromData, setDataFromData] = useState([]);
  const [dataToUseForTableM, setDataToUseForTableM] = useState([]);

  const fetchData = async () => {
    await axios
      .get(`${API_BASE_URL}/getdocConsults/${curr.id}`)
      .then((response) => {
        setDataFromData(response.data);

        const data = response.data;
        setDataToUseForTableM(
          data.map((val) => {
            return {
              name: val.patient_name,
              doctor: val.doctor_assigned,
              consultationroom: val.consultation,
              status: val.status,
              date: new Date(val.date).toISOString().split("T")[0],
              action: (
                <a
                  className="bg-green-600  text-white rounded-md p-2 bg-blend-color-dodge"
                  href={`consultationdetails/${val.id}`}
                  target="_blank"
                >
                  Work On Patient
                </a>
              ),
            };
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    dataToUseForTableM && (
      <MaterialReactTable
        columns={columns}
        data={dataToUseForTableM}
        enableColumnResizing
        enableGrouping
        enableStickyHeader
        enableStickyFooter
        initialState={{
          columnVisibility: {
            destination: false,
          },

          density: "comfortable",
          expanded: true, //expand all groups by default

          //grouping: ['shipper'], //an array of columns to group by by default (can be multiple)
          pagination: { pageIndex: 0, pageSize: 20 }, //sort by state by default
        }}
        muiToolbarAlertBannerChipProps={{ color: "primary" }}
        muiTableContainerProps={{ sx: { maxHeight: 700 } }}
      />
    )
  );
};

export default Table;
