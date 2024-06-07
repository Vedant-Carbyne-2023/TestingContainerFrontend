import React, { useEffect, useState } from 'react'
import {userId, role, userName } from '../../CommonUtitlites/Others/commonExportVariable'
import { errorHandler } from '../../CommonUtitlites/Others/errorHandle'
import { api } from '../../CommonUtitlites/AxiosSetup/axiosDefault'
import * as XLSX from 'xlsx';

export default function Outward({projectId, itemSelected, }) {
    const [data, setData] = useState([])
    useEffect(() => {
        const getData =  async() =>{
        let result = api.post('/stock-outward-projectWise&itemWiseTillDate', {userId, role, userName, projectId:projectId, itemSelected:itemSelected, })
        result =  await errorHandler(result)
        console.log(result.data)
        setData(result.data.data)
        // alert(result.data.message)
    }
    getData()
    }, [projectId, itemSelected])
    const tableStyle = {
        border: '1px solid black',
        borderCollapse: 'collapse',
        width: '100%',
      };
      const cellStyle = {
        border: '1px solid black',
      
        padding: '8px',
        textAlign: 'center',
      };
    console.log(data)
    const totalMrnQuantity = data.reduce(
      (total, item) => total + parseInt(item.quantity_issued),
      0
    );


    const downloadExcel = () => {
      // Constructing the data array
      const excelData = [
        ["S. No.", "MIN No.", "Gp Name", "Vendor Name", "Quantity Issued"],
        // Mapping over table data to populate excelData
        ...data.map((item, index) => [
          index + 1,
          item.minId,
          item.gpName,
          item.vendorName,
          item.quantity_issued,
        ]),
        ["", "", "", "Total:", totalMrnQuantity], // Add total row at the end
      ];
    
      // Convert the data array to worksheet
      const ws = XLSX.utils.aoa_to_sheet(excelData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Outward Data");
      XLSX.writeFile(wb, "outward_data.xlsx");
    };
    
  return (
    <>
     <div className="container mt-4" style={{ maxWidth: "100%" }}>
                  <div className='mt-2'>
                  <button onClick={downloadExcel} className="btn btn-primary">
                        Download Excel
                    </button> 
                    <table className="table">
                    <thead>
                      <tr>
                        <th scope="col" style={cellStyle}>S. No.</th>
                        <th scope="col" style={cellStyle}>MIN No.</th>
                        <th scope="col" style={cellStyle}>Gp Name</th>
                        <th scope="col" style={cellStyle}>Vendor Name</th>
                        {/* <th scope="col" style={cellStyle}>MaterialDescription</th> */}
                        {/* <th scope="col" style={cellStyle}>UOM</th> */}
                        <th scope="col" style={cellStyle}>Quantity Issued</th>
                        {/* <th scope="col" style={cellStyle}>GP</th> */}
                        
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                          <tr key={item._id}>
                        <td scope="col" style={cellStyle}>{index+1}</td>
                        <td scope="col" style={cellStyle}>{item.minId}</td>
                        <td scope="col" style={cellStyle}>{item.gpName}</td>
                        <td scope="col" style={cellStyle}>{item.vendorName}</td>
                        {/* <td scope="col" style={cellStyle}>{item.materialCategory}{"/"}{item.materialSubCategory}{"/"}{item.materialDescription}</td> */}
                        {/* <th scope="col" style={cellStyle}>{item.uom}</th> */}
                        <td scope="col" style={cellStyle}>{item.quantity_issued}</td>
                        {/* <th scope="col" style={cellStyle}>{item.gpName}</th> */}
                        
                          </tr>
                       ))}
                        <tr>
                <td></td>
                <td></td>
                {/* <td></td> */}
                {/* <td></td> */}
                <th>Total:</th>

                <td>{totalMrnQuantity}</td>
              </tr>
                    </tbody>
                    </table>
                  </div>
                 </div>
    </>
  )
}
