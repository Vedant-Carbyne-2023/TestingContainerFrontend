import React, { useState, useEffect } from 'react';
import ExcelJS from 'exceljs';
import { api } from '../../functions/axiosDefault';
import moment from 'moment';


const Fhtc = ({month, year}) => {
  // const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await api.post('/getFhtcDprAll');
      const responseData = response.data.data;
      // console.log("API DATA",responseData);
      return responseData
  // setData(responseData)
      // Check if the response data has the expected structure
      // if (responseData && responseData.fhtcDpr && Array.isArray(responseData.fhtcDpr) && responseData.fhtcDpr.length > 0) {
      //   setData(responseData.fhtcDpr);
      // } else {
      //   console.error('Invalid or empty data received from the API.');
      // }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  


  // useEffect(() => {
  //   fetchData();
  // }, []);

  const generateExcel = async () => {
    let data = await fetchData()
    const selectedMonth = month; // For November

    // Get the number of days in the selected month
    const daysInMonth = new Date(year, selectedMonth, 0).getDate();
console.log(daysInMonth)
    // Generate headers based on the number of days in the month
    const headers = ['S. No.', 'Block', 'GP Name', 'Vendor Name', 'Staff Name', 'Dpm Name', 'Scope Of Work' ];
    const headers2 = Array.from({ length: daysInMonth * 4 }, (_, index) => {
      const day = index % 4 === 0 ? Math.floor(index / 4) + 1 : '';
      return day === '' ? '' : `${day<10?'0'+day:day}-${selectedMonth < 10 ? '0' + selectedMonth : selectedMonth}-${year}`;
    });
    const headers4 = Array.from({ length: daysInMonth * 4 }, (_, index) => {
        if (index % 4 === 0) {
          return "Labour Count";
        } else if (index % 4 === 1) {
          return "Work Done";
        } else if (index % 4 === 2) {
          return "Cummulative As On Date";
        } else {
          return "Remarks";
        }
      });
      

    const combinedHeaders = [...headers, ...headers2];
    
    
    const headers3 = [
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      
      
    ];
    
    const combinedSubHeaders = [...headers3, ...headers4];

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    // Add combined headers in a single row
    worksheet.addRow(combinedHeaders);
    worksheet.addRow(combinedSubHeaders);

    // Set column widths and styles
    combinedHeaders.forEach((header, index) => {
      const column = worksheet.getColumn(index + 1);
      worksheet.getColumn(index +1).alignment = { horizontal: 'center' };
      column.width = 30;
    });

    worksheet.getRow(1).font = { bold: true };

    worksheet.getRow(2).font = { bold: true };

    // Merging cells for the headers
    const getExcelColumnName = (colIndex) => {
      let colName = '';
      while (colIndex > 0) {
        const remainder = colIndex % 26 || 26;
        colName = String.fromCharCode(remainder + 64) + colName;
        colIndex = Math.floor((colIndex - 1) / 26);
      }
      return colName;
    };
    for (let i = 8; i < combinedHeaders.length; i += 4) {
      const startCell = getExcelColumnName(i) + '1';
      const endCell = getExcelColumnName(i + 3) + '1';
      console.log(startCell + ':' + endCell)
      worksheet.mergeCells(startCell + ':' + endCell);
    }
    

data.forEach((rowData, index) => {
  const row = worksheet.addRow([index + 1, rowData.projectName, rowData.gpName, rowData.vendorName, "", "",rowData.scopeOfWork ]);

  // Assuming there is a property named "fhtcDpr" in the API response containing daily data
  if (rowData.fhtcDpr) {
    rowData.fhtcDpr.forEach((dailyEntry, entryIndex) => {
      const date = moment(dailyEntry.dprDetails.fhtcDate).format('DD-MM-YYYY'); // Assuming there is a property named "date" in the API response
      // Find the index of the date in the headers
      const dateIndex = combinedHeaders.indexOf(date);
      console.log(dateIndex)

      // Check if the date is found in the headers
      if (dateIndex !== -1) {
        // row.getCell(dateIndex + 1).value = date;
        row.getCell(dateIndex +1 ).value = dailyEntry.dprDetails.labourCount;
        row.getCell(dateIndex + 2).value = dailyEntry.dprDetails.workDone;
        row.getCell(dateIndex + 3).value = dailyEntry.dprDetails.cummulativeWork;
        row.getCell(dateIndex + 4).value = dailyEntry.dprDetails.remarks;
      }
    });
  }
});

    const fileName = 'your_excel_file.xlsx';
    await workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    });
  };
  
  

  return (
    <div>
      <button onClick={generateExcel} className='btn btn-primary'>Download Fhtc Excel</button>
    </div>
  );
};

export default Fhtc;
