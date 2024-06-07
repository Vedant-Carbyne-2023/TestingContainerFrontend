import React from 'react';

export default function SubSubTable({ subSubTableData, parentIndex, handleInputChangeSubSubTable, subParentIndex }) {
  return (
    <>
      {subSubTableData.map((subsubtable, index) => (
        <tr key={index}>
          {/* <td>{parentIndex + 1}.{index + 1}</td> */}
          <td>{subsubtable.code}</td>
          <td style={{textAlign:'left'}}>{subsubtable.description}</td>
          <td>{subsubtable.uom}</td>
          <td>{subsubtable.wtd}</td>
          <td>{subsubtable.quantity}</td>
          <td>{subsubtable.rate}</td>
          <td>{subsubtable.quantity * subsubtable.rate}</td>

          <td>
                <input
                  type="number"
                  disabled
                  value={subsubtable.quantities && subsubtable.quantities.previous}
                  className='form-control'
                  onChange={(e) => handleInputChangeSubSubTable(e, parentIndex, subParentIndex, index, 'quantities.previous')}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={subsubtable.quantitiesThisBill?subsubtable.quantitiesThisBill:""}
                  className='form-control'
                  onChange={(e) => handleInputChangeSubSubTable(e, parentIndex, subParentIndex, index, 'quantitiesThisBill')}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={subsubtable.quantities && subsubtable.quantities.cumulative}
                  disabled
                  className='form-control'
                  onChange={(e) => handleInputChangeSubSubTable(e, parentIndex, subParentIndex, index, 'quantities.cumulative')}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={subsubtable.amount && subsubtable.amount.previous}
                  className='form-control'
                  disabled
                  onChange={(e) => handleInputChangeSubSubTable(e, parentIndex, subParentIndex, index,'amount.previous')}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={subsubtable.amountThisBill?subsubtable.amountThisBill:""}
                  className='form-control'
                  disabled
                  onChange={(e) => handleInputChangeSubSubTable(e, parentIndex, subParentIndex, index,'amountThisBill')}
                />
              </td>
              <td>
                <input
                  type="number"
                  disabled
                  value={subsubtable.amount && subsubtable.amount.cumulative}
                  className='form-control'
                  onChange={(e) => handleInputChangeSubSubTable(e, parentIndex, subParentIndex, index, 'amount.cumulative')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={subsubtable.remarks && subsubtable.remarks}
                  className='form-control'
                  onChange={(e) => handleInputChangeSubSubTable(e,parentIndex, subParentIndex, index, 'remarks')}
                />
              </td>
              
        </tr>
      ))}
    </>
  );
}
