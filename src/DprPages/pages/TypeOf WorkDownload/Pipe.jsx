import React, { useState, useEffect } from "react";
import ExcelJS from "exceljs";
import { api } from "../../functions/axiosDefault";
import moment from "moment";

const Pipe = ({ month, year }) => {
  // const [data, setData] = useState([]);
  const [pipeData, setPipeData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.post("/getPipeDprAll");
        const responseData = response.data.data;
        setPipeData(responseData);
        console.log("PIPE DATA :", responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);



  const generateExcel = async () => {
    let data = await fetchData()
    const selectedMonth = month; // For November
    const daysInMonth = new Date(year, selectedMonth, 0).getDate();

    // Generate headers
    const headers = [
      "S. No.",
      "Block",
      "GP Name",
      "Vendor Name",
      "Staff Name",
      "Dpm Name",
      "Scope Of Work",
      "Pipe Dia(RMT)",
    ];
    const headers2 = Array.from({ length: daysInMonth * 4 }, (_, index) => {
      const day = index % 4 === 0 ? Math.floor(index / 4) + 1 : "";
      return day === ""
        ? ""
        : `${day < 10 ? "0" + day : day}-${selectedMonth < 10 ? "0" + selectedMonth : selectedMonth
        }-${year}`;
    });
    const headers4 = Array.from({ length: daysInMonth * 4 }, (_, index) => {
      if (index % 4 === 0) return "Labour Count";
      else if (index % 4 === 1) return "Cummulative Till Date";
      else if (index % 4 === 2) return "Work Done";
      else return "Remarks";
    });

    const combinedHeaders = [...headers, ...headers2];
    const alignment = { horizontal: "center", vertical: "middle" };

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    // Add headers and styles
    worksheet.addRow(combinedHeaders).font = { bold: true };
    worksheet.addRow([...Array(8), ...headers4]).font = { bold: true };

    combinedHeaders.forEach((_, index) => {
      const column = worksheet.getColumn(index + 1);
      column.width = 20;
      column.alignment = { horizontal: "center" };
    });
    const mergedCells = [
      "A1:A2",
      "B1:B2",
      "C1:C2",
      "D1:D2",
      "E1:E2",
      "F1:F2",
      "G1:G2",
      "H1:H2",
    ];

    mergedCells.forEach((mergedRange) => {
      worksheet.mergeCells(mergedRange);
      const startCell = worksheet.getCell(mergedRange.split(":")[0]);
      startCell.alignment = alignment;
    });
    // Merging cells for headers
    for (let i = 9; i < combinedHeaders.length; i += 4) {
      const startCell = getExcelColumnName(i) + "1";
      const endCell = getExcelColumnName(i + 3) + "1";
      worksheet.mergeCells(startCell + ":" + endCell);
    }

    let rowIndex;

    data.forEach((rowData, index) => {
      rowIndex = worksheet.addRow([
        index + 1,
        rowData.projectName,
        rowData.gpName,
        rowData.vendorName,
        "",
        "",
        rowData.scopeOfWork,
        "63",
      ]).number;

      ["75", "90", "110", "140", "160", "180", "200"].forEach((pipeType) => {
        worksheet.addRow(["", "", "", "", "", "", "", pipeType]);
      });

      if (rowData.pipeDpr) {
        rowData.pipeDpr.forEach((dailyEntry, entryIndex) => {
          const date = moment(dailyEntry.dprDetails.todaysDate).format(
            "DD-MM-YYYY"
          );
          const dateIndex = combinedHeaders.indexOf(date);

          if (dateIndex !== -1) {
            const row = worksheet.getRow(rowIndex);
            row.getCell(dateIndex + 1).value =
              dailyEntry.dprDetails.labourCount;

            dailyEntry.dprDetails.pipeData.forEach((workDoneValue, i) => {
              const newRow = worksheet.getRow(rowIndex + i);
              newRow.getCell(dateIndex + 2).value =
                workDoneValue.workDoneTillDate;
              newRow.getCell(dateIndex + 3).value = workDoneValue.workDoneToday;
            });

            row.getCell(dateIndex + 4).value = dailyEntry.dprDetails.remarks;
          }
        });
      }
    });

    // Merge cells for columns 1 to 7
    const startRow = 3;
    for (let i = 1; i < 8; i++) {
      for (let row = startRow; row <= worksheet.rowCount; row += 8) {
        const startCell = `${getExcelColumnName(i)}${row}`;
        const endCell = `${getExcelColumnName(i)}${row + 7}`;
        worksheet.mergeCells(`${startCell}:${endCell}`);
        worksheet.getCell(startCell).alignment = alignment;
      }
    }

    // Merge cells based on the specified pattern
    for (let i = 9; i < combinedHeaders.length; i++) {
      for (let row = startRow; row <= worksheet.rowCount; row += 8) {
        const startCell = `${getExcelColumnName(i)}${row}`;
        const endCell = `${getExcelColumnName(i)}${row + 7}`;
        if (i % 2 === 1 && i % 4 === 1) {
          worksheet.mergeCells(`${startCell}:${endCell}`);
          worksheet.getCell(startCell).alignment = alignment;
        } else if (i % 2 === 0 && i % 4 === 0) {
          worksheet.mergeCells(`${startCell}:${endCell}`);
          worksheet.getCell(startCell).alignment = alignment;
        }
      }
    }

    // Apply all borders
    worksheet.eachRow({ includeEmpty: true }, (cell, rowNumber, colNumber) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Save or download the workbook
    const fileName = "your_excel_file.xlsx";
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

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <button onClick={generateExcel} className='btn btn-primary'>Download Pipe Excel</button>
      </div>

      <div style={{ width: '100%', overflowX: 'auto', border: '1px solid #000' }}>
        <table style={{ minWidth: '2500px' }} className="table table-bordered">
          <thead>
            <tr>
              <th rowSpan={1} className="bold-border" style={{ textAlign: 'center' }}>
                S.No.
              </th>
              <th rowSpan={1} className="bold-border" style={{ textAlign: 'center' }}>
                Date
              </th>
              <th rowSpan={1} className="bold-border" style={{ textAlign: 'center' }}>
                Block
              </th>
              <th rowSpan={1} className="bold-border" style={{ textAlign: 'center' }}>
                GP Name
              </th>
              <th rowSpan={1} className="bold-border" style={{ textAlign: 'center' }}>
                Engineer Name
              </th>
              <th rowSpan={1} className="bold-border" style={{ textAlign: 'center' }}>
                Vendor Name
              </th>
              <th rowSpan={1} className="bold-border" style={{ textAlign: 'center' }}>
                Scope
              </th>
              <th rowSpan={1} className="bold-border" style={{ textAlign: 'center' }}>
                Executed Till Date
              </th>
              <th colSpan={1} className="bold-border " style={{ textAlign: 'center' }}>
                Balance
              </th>
              <th colSpan={1} className="bold-border" style={{ textAlign: 'center' }}>
                Pipe Laying Till Date
              </th>
              <th colSpan={1} className="bold-border" style={{ textAlign: 'center' }}>
                Commulative
              </th>
              <th colSpan={1} className="bold-border" style={{ textAlign: 'center' }}>
                Labour Count
              </th>
              <th colSpan={1} className="bold-border" style={{ textAlign: 'center' }}>
                Reason
              </th>
              <th colSpan={1} className="bold-border" style={{ textAlign: 'center' }}>
                Dia (RMT)
              </th>
              {/* Add the following to create heading for createdAt dates */}
              {pipeData.length > 0 &&
      pipeData[0].pipeDpr.map((dailyEntry, entryIndex) => (
        <React.Fragment key={`heading_${entryIndex}`}>
          <th colSpan={4} className="bold-border" style={{ textAlign: 'center' }}>
            {moment(dailyEntry.dprDetails.todaysDate).format("DD-MM-YYYY")}
          </th>
        </React.Fragment>
      ))}

            </tr>


          </thead>
          <tbody>
            {pipeData.map((rowData, index) => (

              <tr>
                <td>{index + 1}</td>
                <td>{moment(rowData.createdAt).format("DD-MM-YYYY HH:mm:ss")}</td>

                <td>{rowData.projectName}</td>
                <td>{rowData.gpName}</td>
                <td>{rowData.engineerName}</td>
                <td>{rowData.vendorName}</td>
                <td>{rowData.scopeOfWork}</td>
                <td>{rowData.executed}</td>
                <td>{rowData.balance}</td>
                <td>{rowData.pipelying}</td>

                <td>{rowData.pipeDpr[rowData.pipeDpr.length - 1]?.dprDetails?.cummulativeWork}</td>
                <td>{rowData.pipeDpr[rowData.pipeDpr.length - 1]?.dprDetails?.labourCount}</td>
                <td>{rowData.pipeDpr[rowData.pipeDpr.length - 1]?.dprDetails?.remarks}</td>
                <td>{rowData.pipeDpr[rowData.pipeDpr.length - 1]?.dprDetails?.dia}</td>

              </tr>


            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pipe;

function getExcelColumnName(colIndex) {
  let colName = "";
  while (colIndex > 0) {
    const remainder = colIndex % 26 || 26;
    colName = String.fromCharCode(remainder + 64) + colName;
    colIndex = Math.floor((colIndex - 1) / 26);
  }
  return colName;
}
