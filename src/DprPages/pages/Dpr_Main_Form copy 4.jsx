import React,{useState} from 'react'
import * as XLSX from 'xlsx';
import { api } from '../functions/axiosDefault';
import { errorHandler } from '../functions/errorHandle';
export default function Dpr_Main_Form() {
  const [excelData, setExcelData] = useState(null);
  const [fhtcData, setFhtcData] = useState([])
  const handleFileChange = async(e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async(event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      console.log("Here")
    
      function createDateFromExcelFormat(dateString) {
        // Split the date string into day, month, and year
        console.log(dateString)
        var dateComponents = dateString.split('.');
      
        // Create a new Date object in JavaScript (months are 0-based, so we subtract 1 from the month)
        var jsDate = new Date(dateComponents[2], dateComponents[1] - 1, dateComponents[0]);
      
        return jsDate;
      }

      const convertArrayToObjects = async (arrayOfArrays) => {
        const [keys, dates, ...values] = arrayOfArrays;
        const result = [];
      
        for (let i = 0; i < values.length; i++) {
          const gpName = values[i][1];
          const projectName = values[i][2];
          const staffName = values[i][3];
      
          const drillingDates = filterDates(values[i][4], values[i][5]);
          const compressorDates = filterDates(values[i][8], values[i][9]);
          const opUnitDates = filterDates(values[i][10], values[i][11]);
      
          const loweringDate = values[i][7] ? createDateFromExcelFormat(values[i][7]) : "-";
          const gravellingDate = values[i][6] ? createDateFromExcelFormat(values[i][6]) : "-";
      
          const objectData = {
            gpName,
            projectName,
            staffName,
            drillingDates,
            compressorDates,
            gravellingDate:gravellingDate!="-"?gravellingDate:null,
            loweringDate:loweringDate!="-"?loweringDate:null,
            opUnitDates,
            typeOfUser: "Employee",
          };
          
          if (!hasInvalidDate(drillingDates) || !hasInvalidDate(compressorDates) || !hasInvalidDate(opUnitDates)) {
            // Only add the object to the result if all date values are valid
            result.push(objectData);
          }
      
          // console.log(objectData);
        }
      
        return result;
      };

      const filterDates = (startDate, endDate) => {
        const start = startDate ? createDateFromExcelFormat(startDate) : "-";
        const end = endDate ? createDateFromExcelFormat(endDate) : "-";
      if(start=="-" && end == "-") return null
      else if(start!="-" && end == "-"){
        return[{
          typeOfDate: "Start Date", workingDate: start
        }]
      }
      else
        {return [
          { typeOfDate: "Start Date", workingDate: start },
          { typeOfDate: "End Date", workingDate: end },
        ];}
      };
      const hasInvalidDate = (dates) => {
        // Check if dates is null or has any invalid date
        return !dates || dates.some(date => date.workingDate === "-");
      };
      
      // Example usage:
     
      
      let data2 =  await convertArrayToObjects(jsonData)
      console.log(data2)
      
      handleSubmit(data2)
      setExcelData(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  const handleSubmit = async (data) => {
    try {
      await Promise.all(
        data.map(async (dataa) => {
          let result = api.post("/borewellDailyDpr", dataa);
          result = await errorHandler(result);
          console.log(result);
        })
      );
    } catch (error) {
      console.error('Error during API calls:', error);
    }
  };
  


  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      {excelData && (
        <table>
          <thead>
            <tr>
              {excelData[0].map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {excelData.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
