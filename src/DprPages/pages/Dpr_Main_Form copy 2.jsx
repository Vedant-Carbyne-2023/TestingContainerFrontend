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
    
      function generateDatesForJanuary2024() {
        const startDate = new Date('2024-01-01');
        const endDate = new Date('2024-01-31');
      
        const datesArray = [];
        const currentDate = new Date(startDate);
      
        while (currentDate <= endDate) {
          datesArray.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
      
        return datesArray;
      }
      const convertArrayToObjects = async (arrayOfArrays) => {
        const [date, keys, ...values] = arrayOfArrays;
        const dates = generateDatesForJanuary2024();
        const result = [];
        for (let i = 0; i < values.length; i++) {
          let h = 0;
          const gpName = values[i][2];
          const projectName = values[i][0];
          const staffName = values[i][3];
          let oldData = values[i][4];
          let cummulativeWork = oldData;
      
          for (let j = 0; j < dates.length; j++) {
            const labourCount = values[i][h + 5] ? values[i][h + 5] : 0;
            const workDone = values[i][h + 6] ? values[i][h + 6] : 0;
      
            cummulativeWork += workDone;
      
            const objectData = {
              gpName,
              projectName,
              staffName,
              labourCount,
              workDone,
              fhtcDate: dates[j],
              cummulativeWork,
              typeOfUser: "Employee",
              reason: "First Push By Vedant",
              remarks: "First Push By Vedant",
              status: "First Push By Vedant",
            };
            //  await api.post("/fhtcDailyDpr", objectData);
            console.log(objectData)
            result.push(objectData);
            h += 2;
          }
        }
      
        return result;
      };
      
      let data2 =  await convertArrayToObjects(jsonData)
      // console.log(data2)
      
      // handleSubmit(data2)
      setExcelData(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  const handleSubmit = async (data) => {
    try {
      await Promise.all(
        data.map(async (dataa) => {
          let result = api.post("/fhtcDailyDpr", dataa);
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
