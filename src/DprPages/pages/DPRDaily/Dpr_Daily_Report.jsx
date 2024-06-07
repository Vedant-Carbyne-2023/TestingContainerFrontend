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
    const createWorksheet = (workbook, sheetName, headers, subheaders, projectNames) => {
      const worksheet = workbook.addWorksheet(sheetName);
  
      // Add combined headers in a single row
      worksheet.addRow([todayDate]);
      worksheet.addRow([...headers]);
      worksheet.addRow([...subheaders]); // Adding empty row for subheaders
  
      // Set column widths and styles
      headers.forEach((header, index) => {
        const column = worksheet.getColumn(index + 1);
        worksheet.getColumn(index + 1).alignment = { horizontal: "center" };
        column.width = 20; // Adjust the width based on your preference
      });
  
      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(2).font = { bold: true };
  
      // Merging cells for the headers
      for (let i = 4; i < headers.length; i += 4) {
        const startCell = getExcelColumnName(i) + "1";
        const endCell = getExcelColumnName(i + 3) + "1";
        worksheet.mergeCells(startCell + ":" + endCell);
      }
      worksheet.mergeCells("A2:A3");
      worksheet.mergeCells("B2:B3");
      worksheet.mergeCells("C2:C3");
      worksheet.mergeCells("D2:G2");
  
      // worksheet.getCell("A2").alignment = { horizontal: "center", vertical:"center" };
      // worksheet.getCell("B2").alignment = { horizontal: "center", vertical:"center" };
      // worksheet.getCell("C2").alignment = { horizontal: "center", vertical:"center" };
  
      return worksheet;
    };
  
    const addDataToWorksheet = (worksheet, projectData, projectNames, gp) => {
      gpData.forEach((gp, index) => {
        const rowData = [index + 1, "Block Data", gp.name];
        projectNames.forEach((projectName) => {
          if (projectName === "fhtc" ||projectName === "pipe" || projectName === "boundaryWall"|| projectName === "oht") {
            const projectData = data[projectName];
            console.log(projectData);
  
            const item = projectData.find(
              (entry) => entry[`${projectName}Dpr`][0]?.dprDetails.gpName === gp.name
            );
  
            if (item) {
              const value = item[`${projectName}Dpr`][0].dprDetails;
              console.log(value);
  
              rowData.push(
                item.vendorName,
                value.labourCount,
                projectName === "pipe"? value.cummulativeWork :value.workDone,
                value.remarks
              );
            } else {
              rowData.push("", "", "", "");
            }
          }
        });
        worksheet.addRow(rowData);
      });
    };
    const addDataToWorksheetForBP = (worksheet, projectData, projectNames, gp) => {
      gpData.forEach((gp, index) => {
        const rowData = [index + 1, "Block Data", gp.name];
        projectNames.forEach((projectName) => {
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
    };
  
    const getExcelColumnName = (colIndex) => {
      let colName = "";
      while (colIndex > 0) {
        const remainder = colIndex % 26 || 26;
        colName = String.fromCharCode(remainder + 64) + colName;
        colIndex = Math.floor((colIndex - 1) / 26);
      }
      return colName;
    };
  
    const workbook = new ExcelJS.Workbook();
  
    // Sheet 1
    const sheet1Headers = [
      "S. No.",
      "Block",
      "GP Name",
      "FHTC",
     
    ];
    const sheet1SubHeaders = [
      
      "",
      "",
      "",
      "Vendor Name",
      "Labour",
      "Work Done",
      "Status",
    ];
    const sheet1 = createWorksheet(workbook, "FHTC Daily Dpr", sheet1Headers, sheet1SubHeaders, ["fhtc"]);
    addDataToWorksheet(sheet1, data["fhtc"], ["fhtc"]);
  
    // Sheet 2
    const sheet2Headers = [
      "S. No.",
      "Block",
      "GP Name",
      "Boundary Wall",
    
    ];

    const sheet2SubHeaders = [
      
      "",
      "",
      "",
      "Vendor Name",
      "Labour",
      "Work Done",
      "Status",
    ];
    const sheet2 = createWorksheet(workbook, "Boundary Wall Daily Dpr", sheet2Headers,sheet2SubHeaders, ["boundaryWall"]);
    addDataToWorksheet(sheet2, data["boundaryWall"], ["boundaryWall"]);

    const sheet3Headers = [
      "S. No.",
      "Block",
      "GP Name",
      "OHT",
     
    ];
    const sheet3SubHeaders = [
      
      "",
      "",
      "",
      "Vendor Name",
      "Labour",
      "Work Done",
      "Status",
    ];
    const sheet3 = createWorksheet(workbook, "OHT Daily Dpr", sheet3Headers,sheet3SubHeaders, ["oht"]);
    addDataToWorksheet(sheet3, data["oht"], ["oht"]);

    const sheet4Headers = [
      "S. No.",
      "Block",
      "GP Name",
      "BoreWell",
  
    ];
    const sheet4SubHeaders = [
      
      "",
      "",
      "",
      "Vendor Name",
      "Labour Yesterday",
      "Labour Today",
      "Status",
    ];
    const sheet4 = createWorksheet(workbook, "Borewell Daily Dpr", sheet4Headers,sheet4SubHeaders, ["borewell"]);
    addDataToWorksheetForBP(sheet4, data["borewell"], ["borewell"]);
  
    const sheet5Headers = [
      "S. No.",
      "Block",
      "GP Name",
      "Pipe",
     
    ];
    const sheet5SubHeaders = [
      
      "",
      "",
      "",
      "Vendor Name",
      "Labour",
      "Cummulative Work Done On That Day",
      "Status",
    ];
    const sheet5 = createWorksheet(workbook, "Pipe Daily Dpr", sheet5Headers,sheet5SubHeaders, ["pipe"]);
    addDataToWorksheet(sheet5, data["pipe"], ["pipe"]);

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
  

  const handleChange = async (e, fieldType) => {
    const { name, value } = e.target;
    setSelectedProject(value)
    if (fieldType === "projectName") {
      let result = api.post('/get-all-gps', { locationName: value })
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
              : value.opUnitDates.length > 0 && value.opUnitDates[value.opUnitDates.length - 1].typeOfDate === 'End Date'
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




