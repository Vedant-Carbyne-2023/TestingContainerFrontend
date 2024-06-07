import React, { useState, useEffect } from "react";
import { api } from "../../functions/axiosDefault"; // Adjust the path based on your project structure
import moment from "moment"; // Import the moment library
import ExcelJS from "exceljs";
import { errorHandler } from "../../functions/errorHandle";
import Swal from "sweetalert2"; /// Adjust the path based on your project structure
// import { Tooltip as ReactTooltip } from "react-tooltip";
// import 'react-tooltip/dist/index.css';
import styles from '../../../AdminPages/TableModule/TableSticky.module.css';


const Dpr_Daily_Report = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [gpData, setGpData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
const [projectData, setProjectData] = useState([])
const [selectedProject, setSelectedProject] = useState('')
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setIsLoading(true);

        // Fetch data for the fixed project name "Siddharth Nagar"
        const response = await api.post("/get-dpr-projects");
        console.log("Project Details Response:", response); // Log the response

        const result = await errorHandler(response);

        if (result?.data?.success) {
          const projectData = result.data.data;
          console.log("here", projectData);
          setProjectData(projectData)
          // Check if locationName exists in the projectData
         

    
        } else {
          console.error(
            "Error fetching Project details:",
            result?.data?.message
          );
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Call the specific API for project details
    fetchProjectDetails();
  }, []);

  const [todayDate, setTodayDate] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // New state for live search


  const fetchDataForAll = async () => {
    try {
      setIsLoading(true);
      const ohtResponse = await api.post("/getOhtDprYesterday", { todayDate });
      const pipeResponse = await api.post("/getPipeDprYesterday", {
        todayDate,
      });
      const borewellResponse = await api.post("/getBorewellDprYesterday", {
        todayDate,
      });
      const yesterdayPipeResponse = await api.post("/getPipeDprYesterday", {
        todayDate: moment(todayDate).subtract(1, 'days').format('YYYY-MM-DD'),
      });

      const yesterdayBorewellResponse = await api.post("/getBorewellDprYesterday", {
        todayDate: moment(todayDate).subtract(1, 'days').format('YYYY-MM-DD'),
      });
      const fhtcResponse = await api.post("/getFhtcDprYesterday", {
        todayDate,
      });
      const boundaryWallResponse = await api.post(
        "/getBoundaryWallDprYesterday",
        { todayDate }
      );
      const pumpHouseResponse = await api.post("/getPumpHouseDprYesterday", {
        todayDate,
      });

      setData({
        oht: ohtResponse.data.data,
        pipe: pipeResponse.data.data,
        borewell: borewellResponse.data.data,
        pipey: yesterdayPipeResponse.data.data,
        borewelly: yesterdayBorewellResponse.data.data,
        fhtc: fhtcResponse.data.data,
        boundaryWall: boundaryWallResponse.data.data,
        pumpHouse: pumpHouseResponse.data.data,
      });

      console.log("API DATA", {
        oht: ohtResponse.data.data,
        pipe: pipeResponse.data.data,
        borewell: borewellResponse.data.data,
        pipey: yesterdayPipeResponse.data.data,
        borewelly: yesterdayBorewellResponse.data.data,
        fhtc: fhtcResponse.data.data,
        boundaryWall: boundaryWallResponse.data.data,
        pumpHouse: pumpHouseResponse.data.data,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const generateExcel = async () => {
    const headers = [
      "S. No.",
      "Block",
      "GP Name",
      "BoreWell",
      "",
      "",
      "",
      "Pipe-Line",
      "",
      "",
      "",
      "FHTC",
      "",
      "",
      "",
      "Boundary Wall",
      "",
      "",
      "",
      "Pump House",
      "",
      "",
      "",
      "OHT",
      "",
      "",
      "",
    ];
    const projectNames = ["borewell", "pipe", "fhtc", "boundaryWall", "pumpHouse", "oht"];

    // const headers2 = projectNames.flatMap((projectName) => [
    //   ...Array.from(
    //     { length: 4 },
    //     (_, index) =>
    //       `${["Vendor Name", "Labour", "Work Done", "Status"][index]}`
    //   ),
    // ]);

    const combinedHeaders = [...headers];

    const headers3 = ["", "", ""];

    const combinedSubHeaders = [
      ...headers3,
      "Vendor Name",
      "Labour Yesterday",
      "Labour Today",
      "Status",
      "Vendor Name",
      "Labour Yesterday",
      "Labour Today",
      "Status",
      "Vendor Name",
      "Labour",
      "Work Done",
      "Status",
      "Vendor Name",
      "Labour",
      "Work Done",
      "Status",
      "Vendor Name",
      "Labour",
      "Work Done",
      "Status",
      "Vendor Name",
      "Labour",
      "Work Done",
      "Status",
    ];

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    // Add combined headers in a single row
    worksheet.addRow(combinedHeaders);
    worksheet.addRow(combinedSubHeaders);

    // Set column widths and styles
    combinedHeaders.forEach((header, index) => {
      const column = worksheet.getColumn(index + 1);
      worksheet.getColumn(index + 1).alignment = { horizontal: "center" };
      column.width = 20; // Adjust the width based on your preference
    });

    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(2).font = { bold: true };

    // Merging cells for the headers
    const getExcelColumnName = (colIndex) => {
      let colName = "";
      while (colIndex > 0) {
        const remainder = colIndex % 26 || 26;
        colName = String.fromCharCode(remainder + 64) + colName;
        colIndex = Math.floor((colIndex - 1) / 26);
      }
      return colName;
    };

    for (let i = 4; i < combinedHeaders.length; i += 4) {
      const startCell = getExcelColumnName(i) + "1";
      const endCell = getExcelColumnName(i + 3) + "1";
      worksheet.mergeCells(startCell + ":" + endCell);
    }
    worksheet.mergeCells("A1:A2");
    worksheet.mergeCells("B1:B2");
    worksheet.mergeCells("C1:C2");

    worksheet.getCell("A1").alignment = { horizontal: "center" };
    worksheet.getCell("B1").alignment = { horizontal: "center" };
    worksheet.getCell("C1").alignment = { horizontal: "center" };

    // Add data rows
    // Add data rows
    gpData.forEach((gp, index) => {
      const rowData = [index + 1, "Block Data", gp.name];
      projectNames.forEach((projectName) => {
        const projectData = data[projectName];
        const isBorewellOrPipe = projectName === "borewell" || projectName === "pipe";
        const sourceDataKey = isBorewellOrPipe ? `${projectName}y` : projectName;
        const sourceData = data[sourceDataKey];

        const item = projectData.find(
          (entry) => entry[`${projectName}Dpr`][0]?.dprDetails.gpName === gp.name
        );

        if (item) {
          const value = item[`${projectName}Dpr`][0].dprDetails;

          if (isBorewellOrPipe) {
            const sourceItem = sourceData?.find(
              (entry) => entry[`${projectName}Dpr`]?.[0]?.dprDetails.gpName === gp.name
            );
            const laborCount =
              sourceItem?.[`${projectName}Dpr`]?.[0]?.dprDetails?.labourCount || "";

            rowData.push(
              item.vendorName,
              laborCount,
              value.labourCount,
              value.remarks
            );
          } else {
            rowData.push(
              item.vendorName,
              value.labourCount,
              value.workDone,
              value.remarks
            );
          }
        } else {
          // If the item is not found, add empty cells
          rowData.push("", "", "", "");
        }
      });

      worksheet.addRow(rowData);
    });


    // Apply all borders to cells
    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    const fileName = "ALL_DATA_EXCEL.xlsx";

    // Write to the Excel file and trigger download
    await workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    });
  };

  const handleChange = async(e, fieldType)=>{
    const { name, value } = e.target;
    setSelectedProject(value)
    if (fieldType === "projectName") {
      let result =  api.post('/get-all-gps',{locationName:value})
      result = await errorHandler(result)
      setGpData(result.data.data || []);
    }
  }
  const [filterData, setFilterData] = useState(false);

  const handleFilterData = () => {
    setFilterData(true);
  };
  return (
    <div>
       <div className="col-md-12">
          <label htmlFor="projectName" title="Select Project From DropDown">Project Name</label>
          <select
            className="form-select"
            id="projectName"
            name="projectName"
            value={selectedProject}
            onChange={(e) => handleChange(e, "projectName")}
          >
            <option value="">Select Project Name</option>
            {projectData.map((project) => (
              <option key={project._id} value={project.name}>
                {project.name}
              </option>
            ))}
          </select>
          {/* <p style={{ fontSize: '12px', color: '#777', marginTop: '5px' }}>Shortcut: Ctrl+P</p> */}
        </div>


      <div className="col-md-3 mt-1" style={{ margin: "auto" }}>
        <input
          className="form-control"
          type="date"
          onChange={(e) => setTodayDate(e.target.value)}
        />
      </div>
      <div className="col-md-3 mt-2" style={{ margin: "auto" }}>
      <label htmlFor="searchGP" >Search GP Name</label>
        <input
          className="form-control"
          type="text"
          placeholder="Search GP Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div
        className="col-md-6"
        style={{
          margin: "auto",
          display: "flex",
          justifyContent: "space-around",
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
      >
        <button
          className="btn btn-primary"
          onClick={fetchDataForAll}
          disabled={isLoading}
        >
          {isLoading
            ? "Fetching Data..."
            : "Fetch All Data for Today and Yesterday"}
        </button>
        <button
          className="btn btn-primary"
          onClick={generateExcel}
          disabled={isLoading}
        >
          {isLoading ? "Generating Excel..." : "Generate Excel"}
        </button>
      </div>
      <button
          className="btn btn-primary"
          onClick={handleFilterData}
          disabled={isLoading}
        >
          {isLoading ? "Filtering Data..." : "Filter Data"}
        </button>
        <div style={{ maxHeight: '700px', overflowY: 'auto' }}>
      <div className={`${styles.tableContainer} container-fluid d-flex mt-2`}>
    <div className={`${styles.tableWrapper} col`}>
      <table className={`${styles.table} table`}>
        <thead className={`${styles.stickyHeader} sticky`}>
          <tr>
            <th rowSpan={2} className="bold-border">
              GP Name
            </th>
            <th colSpan={2} className="bold-border">
              BoreWell
            </th>
            <th colSpan={2} className="bold-border">
              Pipe-Line
            </th>
            <th colSpan={2} className="bold-border">
              FHTC
            </th>
            <th colSpan={2} className="bold-border">
              OHT
            </th>
            <th colSpan={2} className="bold-border">
              Boundary Wall
            </th>
            <th colSpan={2} className="bold-border">
              Pump House
            </th>
          </tr>
          <tr>
            {/* <th>Vendor Name</th> */}
            {/* <th>Labour Yesterday</th> */}
            <th>Labour Today</th>
            <th className="bold-border">Status</th>
            {/* <th>Vendor Name</th> */}
            {/* <th>Labour Yesterday</th> */}
            <th>Labour Today</th>
            <th className="bold-border">Cummulative Work</th>
            {/* <th>Vendor Name</th> */}
            <th>Labour Count</th>
            <th className="bold-border">Work Done</th>
            {/* <th className="bold-border">Remarks</th> */}
            {/* <th>Vendor Name</th> */}
            <th>Labour Count</th>
            <th className="bold-border">Work Done</th>
            {/* <th className="bold-border">Remarks</th> */}
            {/* <th>Vendor Name</th> */}
            <th>Labour Count</th>
            <th className="bold-border">Work Done</th>
            {/* <th className="bold-border">Remarks</th> */}
            {/* <th>Vendor Name</th> */}
            <th>Labour Count</th>
            <th className="bold-border">Work Done</th>
            {/* <th className="bold-border">Remarks</th> */}
          </tr>

        </thead>
        <tbody>
        {gpData &&
            gpData
              .filter((gp) =>
                gp.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .filter((gp) => {
                if (filterData) {
                  // Check if there is data for the GP in any cell
                  return ["borewell", "pipe", "fhtc", "oht", "boundaryWall", "pumpHouse"].some(
                    (type) => {
                      const projectData = data[type];
                      const item = projectData.find(
                        (entry) => entry[`${type}Dpr`]?.[0]?.dprDetails?.gpName === gp.name
                      );
                      return item !== undefined;
                    }
                  );
                }
                return true; // If filterData is false, show all rows
              })
              .map((gp) => (
              <tr key={gp._id}>
                <td className="bold-border">{gp.name}</td>
                {["borewell", "pipe", "fhtc", "oht", "boundaryWall", "pumpHouse"].map(
                  (type) =>
                    data[type] && (
                      <TableCell
                        key={type}
                        data={data[type]}
                        gp={gp.name}
                        type={type}
                        sourceData={type === "borewell" ? data.borewelly : data.pipey}
                      />
                    )
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    </div>
    </div>
    </div>
  );
};

export default Dpr_Daily_Report;

const TableCell = ({ data, gp, type, sourceData }) => {
  const item = data?.find(
    (entry) => entry[`${type}Dpr`]?.[0]?.dprDetails?.gpName === gp
  );

  if (item) {
    const value = item[`${type}Dpr`]?.[0]?.dprDetails || {};
    const editHistory = value.editHistory || [];

    let tooltipDataForLabourCount = editHistory
      .map((edit) => {
        const labourCountField = edit.editedFields.find(field => field.fieldName === "labourCount");

        if (labourCountField) {
          return `Labour Count: ${labourCountField.originalValue}\n(Edited On ${moment(new Date(editHistory[0].editedOn)).format('DD-MM-YYYY')})`

        }

        return null; // If "labourCount" field is not found
      })
      .filter(line => line !== null) // Remove null values (entries without "labourCount" edits)
      .join("\n");


    let tooltipDataForWorkDone = editHistory
      .map((edit) => {
        const labourCountField = edit.editedFields.find(field => field.fieldName === "workDone");

        if (labourCountField) {
          return `Work Done: ${labourCountField.originalValue}\n(Edited On ${moment(new Date(editHistory[0].editedOn)).format('DD-MM-YYYY')}) `;
        }

        return null; // If "labourCount" field is not found
      })
      .filter(line => line !== null) // Remove null values (entries without "labourCount" edits)
      .join("\n");

    const hasLabCountEdit = editHistory && editHistory.length > 0
      ? editHistory[0].editedFields.some(edit => edit.fieldName === 'labourCount')
      : false;
    const hasWDCountEdit = editHistory && editHistory.length > 0
      ? editHistory[0].editedFields.some(edit => edit.fieldName === 'workDone')
      : false;

    if (type === "pipe") {
      const sourceItem = sourceData?.find(
        (entry) => entry[`${type}Dpr`]?.[0]?.dprDetails.gpName === gp
      );
      const laborCount =
        sourceItem?.[`${type}Dpr`]?.[0]?.dprDetails?.labourCount || "";

      return (
        <>
          {/* <td className={hasLabCountEdit ? 'edited-cell' : ''}>
            <div className="tooltip-container">
              {item.vendorName || ""}
              {tooltipDataForLabourCount && (
                <div className="tooltip">
                  {tooltipDataForLabourCount}
                </div>
              )}
            </div>
          </td> */}
          {/* <td>{laborCount}</td> */}
          <td>{value.labourCount || ""}</td>
          <td className="bold-border">{value.cummulativeWork || ""}</td>
        </>
      );
    }
    else if (type === "borewell") {
      const sourceItem = sourceData?.find(
        (entry) => entry[`${type}Dpr`]?.[0]?.dprDetails.gpName === gp
      );
      const laborCount =
        sourceItem?.[`${type}Dpr`]?.[0]?.dprDetails?.labourCount || "";

      return (
        <>
          {/* <td className={hasLabCountEdit ? 'edited-cell' : ''}>
            <div className="tooltip-container">
              {item.vendorName || ""}
              {tooltipDataForLabourCount && (
                <div className="tooltip">
                  {tooltipDataForLabourCount}
                </div>
              )}
            </div>
          </td>
          <td>{laborCount}</td> */}
          <td>{value.labourCount || ""}</td>
          <td className="bold-border" title={value.drillingDates.length === 1 ? `Reason: - ${value.drillingDates[0].reason}` : "Reason: - "}>
            {value.drillingDates.length === 1
              ? "Borewell started"
              : value.opUnitDates.length > 0 && value.opUnitDates[value.opUnitDates.length-1].typeOfDate === 'End Date'
                  ? "Borewell ended"
              : value.drillingDates.length > 1
                ? "Borewell in progress"
                  : ""}
          </td>
        </>
      );
    }
    else {
      return (
        <>
          {/* <td >
            {item.vendorName || ""}

          </td> */}
          <td className={` ${hasLabCountEdit ? 'edited-cell' : ''} tooltip-container`} style={{ backgroundColor: hasLabCountEdit ? 'red' : 'transparent' }}>
            {value.labourCount || ""}
            {tooltipDataForLabourCount && (
              <div className="tooltip">
                {tooltipDataForLabourCount}
              </div>
            )}
          </td>
          <td className={` ${hasWDCountEdit ? 'edited-cell' : ''} tooltip-container`} style={{ backgroundColor: hasWDCountEdit ? 'red' : 'transparent' }}>
            {value.workDone || ""}
            {tooltipDataForWorkDone && (
              <div className="tooltip">
                {tooltipDataForWorkDone}
              </div>
            )}
          </td>
          {/* <td className="bold-border">{value.remarks || ""}</td> */}
        </>
      );
    }
  } else {
    return (
      <>
        {/* <td></td> */}
        <td></td>
        <td className="bold-border"></td>
        {/* <td className="bold-border"></td> */}
      </>
    );
  }
};




