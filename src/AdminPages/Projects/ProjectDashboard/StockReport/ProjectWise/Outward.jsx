import React, { useEffect, useState } from 'react'
import { api } from "../../../../../CommonUtitlites/AxiosSetup/axiosDefault";
import {userId, role,userName } from "../../../../../CommonUtitlites/Others/commonExportVariable";
import { errorHandler } from "../../../../../CommonUtitlites/Others/errorHandle";
export default function Outward({projectId, itemSelected}) {
    const [data, setData] = useState([])
    useEffect(() => {
        const getData =  async() =>{
        let result = api.post('/stock-outward-projectWise&itemWise', {userId, role, userName, projectId:projectId, itemSelected:itemSelected})
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
  return (
    <>
     <div className="container mt-4" style={{ maxWidth: "100%" }}>
                  <div className='mt-2'> 
                    <table className="table">
                    <thead>
                      <tr>
                        <th scope="col" style={cellStyle}>S. No.</th>
                        <th scope="col" style={cellStyle}>MIN No.</th>
                        <th scope="col" style={cellStyle}>Quantity Issued</th>
                        <th scope="col" style={cellStyle}>Vendor Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                          <tr key={item._id}>
                        <td scope="col" style={cellStyle}>{index+1}</td>
                        <td scope="col" style={cellStyle}>{item.minId}</td>
                        <td scope="col" style={cellStyle}>{item.quantity_issued}</td>
                        <td scope="col" style={cellStyle}>{item.vendorName}</td>
                          </tr>
                       ))}
                        <tr>
                <td></td>
                <td></td>
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
