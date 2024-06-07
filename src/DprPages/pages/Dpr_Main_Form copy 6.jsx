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
      const sheet = workbook.Sheets["Sheet3"];
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
      
        for (let i = 0; i < values.length; i += 11) {
          const gpName = values[i][2];
          console.log(gpName)
          const projectName = "Carbyne (Sudhakara) Azamgarh";
          const staffName = values[i][3];
      
          let data_63 = values[i][4];
          let data_75 = values[i + 1][4];
          let data_90 = values[i + 2][4];
          let data_110 = values[i + 3][4];
          let data_125 = values[i + 4][4];
          let data_140 = values[i + 5][4];
          let data_160 = values[i + 6][4];
          let data_180 = values[i + 7][4];
          let data_200 = values[i + 8][4];
      
          let pipeData = [];
      
          for (let j = 0; j < dates.length; j++) {
            pipeData.push({
              pipeDia: 63,
              workDoneTillDate: data_63 + (values[i][j + 5] ? values[i][j + 5] : 0),
              workDoneToday: values[i][j + 5] ? values[i][j + 5] : 0,
            });
      
            pipeData.push({
              pipeDia: 75,
              workDoneTillDate: data_75 + (values[i + 1][j + 5] ? values[i + 1][j + 5] : 0),
              workDoneToday: values[i + 1][j + 5] ? values[i + 1][j + 5] : 0,
            });
      
            pipeData.push({
              pipeDia: 90,
              workDoneTillDate: data_90 + (values[i + 2][j + 5] ? values[i + 2][j + 5] : 0),
              workDoneToday: values[i + 2][j + 5] ? values[i + 2][j + 5] : 0,
            });
      
            pipeData.push({
              pipeDia: 110,
              workDoneTillDate: data_110 + (values[i + 3][j + 5] ? values[i + 3][j + 5] : 0),
              workDoneToday: values[i + 3][j + 5] ? values[i + 3][j + 5] : 0,
            });
      
            pipeData.push({
              pipeDia: 125,
              workDoneTillDate: data_125 + (values[i + 4][j + 5] ? values[i + 4][j + 5] : 0),
              workDoneToday: values[i + 4][j + 5] ? values[i + 4][j + 5] : 0,
            });
      
            pipeData.push({
              pipeDia: 140,
              workDoneTillDate: data_140 + (values[i + 5][j + 5] ? values[i + 5][j + 5] : 0),
              workDoneToday: values[i + 5][j + 5] ? values[i + 5][j + 5] : 0,
            });
      
            pipeData.push({
              pipeDia: 160,
              workDoneTillDate: data_160 + (values[i + 6][j + 5] ? values[i + 6][j + 5] : 0),
              workDoneToday: values[i + 6][j + 5] ? values[i + 6][j + 5] : 0,
            });
      
            pipeData.push({
              pipeDia: 180,
              workDoneTillDate: data_180 + (values[i + 7][j + 5] ? values[i + 7][j + 5] : 0),
              workDoneToday: values[i + 7][j + 5] ? values[i + 7][j + 5] : 0,
            });
      
            pipeData.push({
              pipeDia: 200,
              workDoneTillDate: data_200 + (values[i + 8][j + 5] ? values[i + 8][j + 5] : 0),
              workDoneToday: values[i + 8][j + 5] ? values[i + 8][j + 5] : 0,
            });
      
            // Update data values with cumulative values
            data_63 += values[i][j + 5] ? values[i][j + 5] : 0;
            data_75 += values[i + 1][j + 5] ? values[i + 1][j + 5] : 0;
            data_90 += values[i + 2][j + 5] ? values[i + 2][j + 5] : 0;
            data_110 += values[i + 3][j + 5] ? values[i + 3][j + 5] : 0;
            data_125 += values[i + 4][j + 5] ? values[i + 4][j + 5] : 0;
            data_140 += values[i + 5][j + 5] ? values[i + 5][j + 5] : 0;
            data_160 += values[i + 6][j + 5] ? values[i + 6][j + 5] : 0;
            data_180 += values[i + 7][j + 5] ? values[i + 7][j + 5] : 0;
            data_200 += values[i + 8][j + 5] ? values[i + 8][j + 5] : 0;
          
      
            if (pipeData.some(pipe => pipe.workDoneToday !== 0)) {
              const objectData = {
                gpName,
                projectName,
                staffName,
                todaysDate: dates[j], // Assuming you want to use the first date in the array
                pipeDate: dates[j],
                tableData:pipeData,
                cummulativeWork: pipeData.reduce((sum, pipe) => sum + pipe.workDoneToday, 0),
              };
              pipeData = [];
              console.log(objectData);
              result.push(objectData);
            }
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
          let result = api.post("/pipeDailyDpr", dataa);
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
