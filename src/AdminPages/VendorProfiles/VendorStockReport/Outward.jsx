import React, { useEffect, useState } from 'react'
import {userId, role, userName } from '../../../CommonUtitlites/Others/commonExportVariable'
import { errorHandler } from '../../../CommonUtitlites/Others/errorHandle'
import { api } from '../../../CommonUtitlites/AxiosSetup/axiosDefault'
import { format } from 'date-fns'
export default function Outward({projectId, itemSelected, vendorName, gpName}) {

    const [data, setData] = useState([])
    useEffect(() => {
        const getData =  async() =>{
        let result = api.post('/stock-outward-projectWise&itemWise', {userId,gpName, vendorName, role, userName, projectId:projectId, itemSelected:itemSelected})
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
                        <th scope="col" style={cellStyle}>S.No.</th>
                        <th scope="col" style={cellStyle}>Date</th>
                        
                        <th scope="col" style={cellStyle}>GP Name</th>
                        <th scope="col" style={cellStyle}>Material Name</th>
                        {/* <th scope="col" style={cellStyle}>MaterialDescription</th> */}
                        {/* <th scope="col" style={cellStyle}>UOM</th> */}
                        <th scope="col" style={cellStyle}>Quantity Issued</th>
                        {/* <th scope="col" style={cellStyle}>GP</th> */}
                        <th scope="col" style={cellStyle}>Vendor Name</th>
                        <th scope="col" style={cellStyle}>MIN No.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                          <tr key={item._id}>
                        <td scope="col" style={cellStyle}>{index+1}</td>
                        <td scope="col" style={cellStyle}>{format(new Date(item.date), 'dd-MM-yyyy')}</td>
                        
                        <td scope="col" style={cellStyle}>{item.gpName}</td>
                        <td scope="col" style={cellStyle}>{`${item.materialCategory}/${item.materialSubCategory}/${item.materialDescription}`}</td>
                        {/* <td scope="col" style={cellStyle}>{item.materialCategory}{"/"}{item.materialSubCategory}{"/"}{item.materialDescription}</td> */}
                        {/* <th scope="col" style={cellStyle}>{item.uom}</th> */}
                        <td scope="col" style={cellStyle}>{item.quantity_issued}</td>
                        {/* <th scope="col" style={cellStyle}>{item.gpName}</th> */}
                        <td scope="col" style={cellStyle}>{item.vendorName}</td>
                        <td scope="col" style={cellStyle}>{item.minId}</td>
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
