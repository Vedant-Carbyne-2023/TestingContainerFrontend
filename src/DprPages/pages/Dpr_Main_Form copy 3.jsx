import React,{useState} from 'react'
import * as XLSX from 'xlsx';
import { api } from '../functions/axiosDefault';
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
      const convertArrayToObjects = async(arrayOfArrays) => {
        const [keys, ...values] = arrayOfArrays;
        const result = await values.map((row) =>
          Object.fromEntries(keys.map((key, index) => [key, row[index]]))
        );
        return result;
      };
      let data2 =  await convertArrayToObjects(jsonData)
      handleSubmit(data2)
      setExcelData(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  const handleSubmit = async (data) => {
    try {
      await Promise.all(
        data.map(async (dataa) => {
          const result = await api.post(`/createfhtcDpr`, dataa);
          await errorHandler(result);
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
