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
      const sheet = workbook.Sheets["Sheet5"];
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
        const [date, ...values] = arrayOfArrays;
        const dates = generateDatesForJanuary2024();
        const result = [];
        for (let i = 0; i < values.length; i++) {
          let h = 0;
          const gpName = values[i][1];
          
          for (let j = 0; j < dates.length; j++) {
            const labourCount = values[i][h + 2] ? values[i][h + 2] : 0;
      
            // cummulativeWork += workDone;
            if(labourCount!=0)
            {

              const objectData = {
                gpName,
                labourCount,
                todaysDate:dates[j]
              };
              //  await api.post("/addlabourcount", objectData);
              console.log(objectData)
              result.push(objectData);
            }
            h += 2;
          }
        }
      
        return result;
      };
      
      let data2 =  await convertArrayToObjects(jsonData)
      // console.log(data2)
      
      handleSubmit(data2)
      setExcelData(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  const handleSubmit = async (data) => {
    try {
      await Promise.all(
        data.map(async (dataa) => {
          let result = api.post("/addlabourcount", dataa);
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
