import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import SubTable from "./SubTable";
import SubSubTable from "./SubSubTable";
import "react-tooltip/dist/react-tooltip.css";

import { Tooltip } from "react-tooltip";
import { A } from "aws-amplify-react/lib-esm/AmplifyTheme";

export default function MainTable({ boqDetails }) {
  const [boqData, setBoqData] = useState([])

  useEffect(() => {
    if(boqDetails){

      setBoqData(boqDetails)
    }
  }, [boqDetails])
  console.log(boqDetails)

  const handleInputChange = (e, parentIndex, rowIndex, field) => {
    // Update your state based on the input changes
    // Example logic:
    console.log(e.target.value)
    const updatedData = [...boqData]; // Make a copy of your data array
    updatedData[parentIndex].subtable[rowIndex][field] = e.target.value;

    // If updating quantity.thisBill, calculate amount.thisBill
    if (field === 'quantitiesThisBill') {
      const quantity = updatedData[parentIndex].subtable[rowIndex]['quantitiesThisBill'];
      const rate = updatedData[parentIndex].subtable[rowIndex]['rate'];
      updatedData[parentIndex].subtable[rowIndex]['amountThisBill'] = quantity * rate;
    }
    console.log(updatedData)
    // Update your state with the modified data array
    setBoqData(updatedData);
  };

  const handleInputChangeSubSubTable = (e, parentIndex, subParentIndex, rowIndex, field) => {
    // Your logic to handle input changes for SubSubTable
    // Example:

    console.log(e.target.value)
    const updatedData = [...boqData];
    updatedData[parentIndex].subtable[subParentIndex].subsubtable[rowIndex][field] = e.target.value;

    // If updating quantitiesThisBill field, calculate amountThisBill
    if (field === 'quantitiesThisBill') { 
      const quantitiesThisBill = updatedData[parentIndex].subtable[subParentIndex].subsubtable[rowIndex]['quantitiesThisBill'];;
      const rate = updatedData[parentIndex].subtable[subParentIndex].subsubtable[rowIndex]['rate'];
      updatedData[parentIndex].subtable[subParentIndex].subsubtable[rowIndex]['amountThisBill'] = quantitiesThisBill * rate;
    }

    // Update your state with the modified data array
    setBoqData(updatedData);

    // Pass the changes up to the parent component
    // handleInputChange(e, parentIndex, subIndex, field);
  };

  const [totalAmount, setTotalAmount] = useState('')
  const CalculateTotal = () => {
    let total = 0;
  
    boqData.forEach((row) => {
      // Add the amountThisBill from the row level
      if (row.amountThisBill) {
        total += row.amountThisBill;
      }
  
      // Check if the row has subtables
      if (row.subtable && Array.isArray(row.subtable)) {
        row.subtable.forEach((subTable) => {
          // Add the amountThisBill from the subtable level
          if (subTable.amountThisBill) {
            total += subTable.amountThisBill;
          }
  
          // Check if the subtable has subsubtables
          if (subTable.subsubtable && Array.isArray(subTable.subsubtable)) {
            subTable.subsubtable.forEach((subSubTable) => {
              // Add the amountThisBill from the subsubtable level
              if (subSubTable.amountThisBill) {
                total += subSubTable.amountThisBill;
              }
              // You can continue nesting for further levels if needed
            });
          }
        });
      }
    });
  
    // 'total' now contains the sum of all 'amountThisBill' values
    console.log('Total:', total);
    setTotalAmount(total)
  };
  

  return (
    <Table>
       <thead>
          <tr>
            <th> Boq Item No.</th>
            <th style={{width:'20rem'}}>Description</th>
            <th colSpan="5">Boq Details</th>
            <th colSpan="3">Quantities</th>
            <th colSpan="3">Amount</th>
            <th rowSpan="2">Remarks</th>
          </tr>
          <tr>
            <th colSpan="1"></th>
            <th colSpan="1">Main Abstract</th>
            <th>UOM</th>
            <th>WTD%</th>
            <th>Quantity</th>
            <th>Unit Rate</th>
            <th>Total Amount</th>
            <th>Previous</th>
            <th>This Bill</th>
            <th>Cummulative</th>
            <th>Previous</th>
            <th>This Bill</th>
            <th>Cummulative</th>
          </tr>
        </thead>
      <tbody>
        {boqData &&
          boqData.map((item, index) => (
            <React.Fragment key={index}>
              <tr>
                {/* <td>{index + 1}</td> */}
                <td>{item.code}</td>
                <td style={{ textAlign: "left" }}>
                  <div
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={item.description}
                  >
                    <textarea className="form-control">
                      {item.description}
                    </textarea>
                  </div>
                  <Tooltip
                    id="my-tooltip"
                    style={{
                      width: "20rem",
                    }}
                  />
                </td>

                <td>{item.uom}</td>
                <td>{item.wtd}</td>
                <td>{item.quantity}</td>
                <td>{item.rate}</td>
                <td>{item.quantity * item.rate}</td>
                <td>
                <input
                  type="number"
                  disabled
                  value={item.quantities && item.quantities.previous}
                  className='form-control'
                  onChange={(e) => handleInputChange(e, item.itemNo, 'quantities.previous')}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.quantities && item.quantities.thisBill}
                  className='form-control'
                  onChange={(e) => handleInputChange(e, item.itemNo, 'quantities.thisBill')}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.quantities && item.quantities.cumulative}
                  disabled
                  className='form-control'
                  onChange={(e) => handleInputChange(e, item.itemNo, 'quantities.cumulative')}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.amount && item.amount.previous}
                  className='form-control'
                  disabled
                  onChange={(e) => handleInputChange(e, item.itemNo, 'amount.previous')}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.amount && item.amount.thisBill}
                  className='form-control'
                  disabled
                  onChange={(e) => handleInputChange(e, item.itemNo, 'amount.thisBill')}
                />
              </td>
              <td>
                <input
                  type="number"
                  disabled
                  value={item.amount && item.amount.cumulative}
                  className='form-control'
                  onChange={(e) => handleInputChange(e, item.itemNo, 'amount.cumulative')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.remarks && item.remarks}
                  className='form-control'
                  onChange={(e) => handleInputChange(e, item.itemNo, 'remarks')}
                />
              </td>
            
              </tr>
              {item.subtable && (
                <SubTable subTableData={item.subtable} parentIndex={index} handleInputChange={handleInputChange}  handleInputChangeSubSubTable={handleInputChangeSubSubTable}/>
              )}
            </React.Fragment>
          ))}
      </tbody>
      <tfoot>
    <div className="d-flex" style={{justifyContent:'flex-end'}}>
      <button onClick={()=>CalculateTotal()}> Click To Calculate Total Amount</button>
      {
        totalAmount &&
        <span>{totalAmount}</span>
      }

    </div>

      </tfoot>
    </Table>

  );
}
