import React, { useEffect, useState } from 'react';
import { read, utils } from 'xlsx';
import Dropzone from 'react-dropzone';
import Calculator from './Calculator';
import RevenueCalculator from './RevenueCalculator';

function ExcelDataExtractor({setData,setVendorCard, setRevenueCard, vendorCardValue, revenueCardValue}) {
  const [excelData, setExcelData] = useState([]);
  const [rateCard, setRateCard] = useState([]);

  const [vendorLength, setVendorLength] = useState([])
  const [revenueLength, setRevenueLength] = useState([])

  // console.log(vendorCardValue, "vednat");

  useEffect(() => {
    if(excelData){
      setData(excelData)
    }
  }, [excelData])

  const [fields, setFields] = useState([
    { length: 0, rate: 0, total: 0 },
    { length: 0, rate: 0, total: 0 },
    { length: 0, rate: 0, total: 0 },
  ]);

  const calculateTotal = () => {
    const updatedFields = fields.map((field) => ({
      ...field,
      total: field.length * field.rate,
    }));

    setFields(updatedFields);
  };

  const calculateGrandTotal = () => {
    const grandTotal = fields.reduce((total, field) => total + field.total, 0);
    return grandTotal;
  };


  const handleFileUpload = (files) => {
    const file = files[0];
  
    const reader = new FileReader();
  
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = read(data, { type: 'array' });
  
      const rawData = utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {
        header: 1,
        raw: true,
        defval: '',
      });
  
      const results = {
        soilLength: 0.0,
        boeLength: 0.0,
        ccLength: 0.0,
        btLength: 0.0,
        soilDismentillingQty: 0.0,
        boeDismentillingQty: 0.0,
        ccDismentillingQty: 0.0,
        btDismentillingQty: 0.0,
        excavationQty: 0.0,
      };
  
      for (let i = 2; i < rawData.length; i++) {
        const [,, , , , length, width, depth, type] = rawData[i];
        const volume = length * width * depth;
        console.log( length, width, depth, type)  

  
        results[type.toLowerCase() + 'Length'] += length;
        if(type.toLowerCase()!=='soil')
        {
          results[type.toLowerCase() + 'DismentillingQty'] += length*width;
        }
        results.excavationQty += volume;
      }
  
      const excelData = rawData.filter((row) =>
        row.some((cell) => cell !== null && cell !== '')
      );
  
      const calculatedRateCard = calculateRateCard(excelData);
  
      setVendorLength([
        { soilLength: parseFloat(results.soilLength.toFixed(2)) },
        { boeLength: parseFloat(results.boeLength.toFixed(2)) },
        { ccLength: parseFloat(results.ccLength.toFixed(2)) },
        { btLength: parseFloat(results.btLength.toFixed(2)) },
      ]);
  
      setRevenueLength([
        // { soilDismentillingQty: parseFloat(results.soilDismentillingQty.toFixed(2)) },
        { boeDismentillingQty: parseFloat(results.boeDismentillingQty.toFixed(2)) },
        { ccDismentillingQty: parseFloat(results.ccDismentillingQty.toFixed(2)) },
        { btDismentillingQty: parseFloat(results.btDismentillingQty.toFixed(2)) },
        { excavationQty: parseFloat(results.excavationQty.toFixed(2)) },
      ]);
  
      setExcelData(excelData);
      setRateCard(calculatedRateCard);
    };
  
    reader.readAsArrayBuffer(file);
  };
  
  

  const calculateRateCard = (data) => {
    // Your rate calculation logic here
    // You can use data from the Excel sheet and perform calculations
    // Return the rate card as an array or object
  };


  return (
    <div>
      <Dropzone onDrop={handleFileUpload}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className='my-4'>
            <input className='form-control btn' {...getInputProps()} />
            <button type='button' className='btn'>Drag and drop an Excel file here, or click to select one.</button>
          </div>
        )}
      </Dropzone>
      
      <h2>Excel Data</h2>
      <table className="table table-bordered table-striped table-hover">
  <thead className="thead-dark">
    <tr>
      {excelData && excelData!=undefined &&  excelData[0] &&
        excelData[0].map((header, headerIndex) => (
          <th key={headerIndex}>{header}</th>
        ))}
    </tr>
  </thead>
  <tbody>
    {excelData && excelData!=undefined &&  excelData[0] &&
      excelData.slice(1).map((rowData, rowIndex) => (
        <tr key={rowIndex}>
          {rowData.map((cellData, cellIndex) => (
            <td key={cellIndex}>{cellData || ' '}</td>
          ))}
        </tr>
      ))}
  </tbody>
</table>



      

      <div>
      <div>
      <h6 className='my-4'>Vendor Rate Card</h6>
     <Calculator data={(data) => setVendorCard(data)} lengths={vendorLength} vendorCard={vendorCardValue}/>
      <h6 className='my-4'>Revenue Rate Card</h6>
     <RevenueCalculator data={(data) => setRevenueCard(data)} lengths={revenueLength} revenueCard={revenueCardValue}/>
      {/* <h2>Grand Total: ${calculateGrandTotal().toFixed(2)}</h2> */}
    </div>
      </div>
    </div>
  );
}

export default ExcelDataExtractor;
