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
      const sheet = workbook.Sheets["Sheet4"];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      console.log("Here")
    
    

      const convertArrayToObjects = async (arrayOfArrays) => {
        const [keys, ...values] = arrayOfArrays;
        const result = [];
      
        for (let i = 0; i < values.length; i++) {
          const gpName = values[i][1];
          const projectName = "Carbyne (Sudhakara) Azamgarh";
          const staffName = values[i][2];
      
          let pipeDia = [
            {diaOfPipe:values[i][4],
              scopeOfWork:values[i][3]?values[i][3]:0
            },
            {diaOfPipe:values[i+1][4],
              scopeOfWork:values[i+1][3]?values[i+1][3]:0
            },
            {diaOfPipe:values[i+2][4],
              scopeOfWork:values[i+2][3]?values[i+2][3]:0
            },
            {diaOfPipe:values[i+3][4],
              scopeOfWork:values[i+3][3]?values[i+3][3]:0
            },
            {diaOfPipe:values[i+4][4],
              scopeOfWork:values[i+4][3]?values[i+4][3]:0
            },
            {diaOfPipe:values[i+5][4],
              scopeOfWork:values[i+5][3]?values[i+5][3]:0
            },
            {diaOfPipe:values[i+6][4],
              scopeOfWork:values[i+6][3]?values[i+6][3]:0
            },
            {diaOfPipe:values[i+7][4],
              scopeOfWork:values[i+7][3]?values[i+7][3]:0
            },
            {diaOfPipe:values[i+8][4],
              scopeOfWork:values[i+8][3]?values[i+8][3]:0
            }

          ]
      
          const objectData = {
            gpName,
            projectName,
            staffName,
            pipeDia,
            vendorName:"Dummy",
            typeOfUser: "Employee",
            dprCreatedBy:"Vedant"
          };
        
          console.log(objectData);
          result.push(objectData)
          i+=10
        }
      
        return result;
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
          let result = api.post("/createPipeDpr", dataa);
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
