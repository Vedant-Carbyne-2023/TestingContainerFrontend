import React, { useEffect, useState } from 'react';
import SubSubTable from './SubSubTable';

export default function SubTable({ subTableData, parentIndex, handleInputChange, handleInputChangeSubSubTable  }) {

  // const [subtable, setSubtable] = useState([])

  // useEffect(() => {
  //   if(subTableData){
  //     setSubtable(subTableData)
  //   }
  // }, [subTableData])
  

 
  return (
    <>
      {subTableData.map((data, index) => 
      
      {
        console.log(data.quantitiesThisBill, data.amountThisBill)
      return (
        <React.Fragment key={index}>
          <tr>
            {/* <td>{parentIndex + 1}.{index + 1}</td> */}
            <td>{data.code}</td>
            <td style={{textAlign:'left', fontWeight:'bold'}}>{data.description}</td>
            <td>{data.uom}</td>
            <td>{data.wtd}</td>
            <td>{data.quantity}</td>
            <td>{data.rate}</td>
            <td>{data.quantity * data.rate}</td>
            <td>
                <input
                  type="number"
                  disabled
                  value={data.quantities && data.quantities.previous}
                  className='form-control'
                  onChange={(e) => handleInputChange(e, parentIndex, index, 'quantities.previous')}
                />
              </td>
              <td>
                <input
                 style={{width:'fit-content'}}
                 type='number'
                  value={data.quantitiesThisBill?data.quantitiesThisBill:""}
                  className='form-control'
                  onChange={(e) => handleInputChange(e,  parentIndex, index, 'quantitiesThisBill')}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={data.quantities && data.quantities.cumulative}
                  disabled
                  className='form-control'
                  onChange={(e) => handleInputChange(e,  parentIndex, index, 'quantities.cumulative')}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={data.amount && data.amount.previous}
                  className='form-control'
                  disabled
                  onChange={(e) => handleInputChange(e,  parentIndex, index, 'amount.previous')}
                />
              </td>
              <td>
                <input
                style={{width:'fit-content'}}
                  value={data.amountThisBill?data.amountThisBill:""}
                  className='form-control'
                  disabled
                  onChange={(e) => handleInputChange(e, parentIndex, index, 'amountThisBill')}
                />
              </td>
              <td>
                <input
                  type="number"
                  disabled
                  value={data.amount && data.amount.cumulative}
                  className='form-control'
                  onChange={(e) => handleInputChange(e,  parentIndex, index, 'amount.cumulative')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={data.remarks && data.remarks}
                  className='form-control'
                  onChange={(e) => handleInputChange(e,  parentIndex, index,'remarks')}
                />
              </td>
          </tr>
          {data.subsubtable && (
            <SubSubTable subSubTableData={data.subsubtable} parentIndex={parentIndex} subParentIndex={index} handleInputChangeSubSubTable={handleInputChangeSubSubTable}  />
          )}
        </React.Fragment>
      )})}
    </>
  );
}
