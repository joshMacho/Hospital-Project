import React, { useEffect, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";

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



  const dataFromData =[{
    id: 3,
    name: "Meyare Name",
    doctor: "Dr. Apia",
    consultationroom: "Consultation Rooxm 1",
    status: "Pending",
    date: "2024/21/04 12:34:00 AM"
    }];

    const dataToUseForTable=dataFromData.map((val)=>{
        return {
            name: val.name,
            doctor: val.doctor,
            consultationroom: val.consultationroom,
            status: val.status,
            date:"2024-02-12 23:43 AM",
            action:   <a
            className="bg-green-600  text-white rounded-md p-2 bg-blend-color-dodge"
            href={`consultationdetails/${val.id}`}
          >
           Work On Patient
          </a>
        }
         

    })

  return (

      <MaterialReactTable
        columns={columns}
        data={dataToUseForTable}
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
    
    
  );
};

export default Table;