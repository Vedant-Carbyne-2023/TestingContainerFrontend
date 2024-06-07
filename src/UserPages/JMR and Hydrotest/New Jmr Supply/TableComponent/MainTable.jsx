import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function MainTable({ boqDetails, setTableDataInForm }) {
  const [boqData, setBoqData] = useState([]);
  const [totalAmount, setTotalAmount] = useState('');

  useEffect(() => {
    if (boqDetails) {
      setBoqData(boqDetails);
    }
  }, [boqDetails]);

  const handleInputChange = (e, rowIndex, field) => {
    const updatedData = [...boqData];
   

    if (field === 'quantitiesThisBill') {
      const previousQuantity = parseFloat(updatedData[rowIndex]['quantitiesThisBill']?updatedData[rowIndex]['quantitiesThisBill']:0);      const previousAmount = parseFloat(updatedData[rowIndex]['amountThisBill']?updatedData[rowIndex]['amountThisBill']:0);
      let quantityCumulative = parseFloat(
        boqData[rowIndex]['quantitiesCumulative']?
        previousQuantity?boqData[rowIndex]['quantitiesCumulative']-previousQuantity:boqData[rowIndex]['quantitiesCumulative']
        :0
      ) ;
      let amountCumulative = parseFloat(
        boqData[rowIndex]['amountCumulative']?
        previousAmount?boqData[rowIndex]['amountCumulative']-previousAmount:boqData[rowIndex]['amountCumulative']
        :0
      ) ;

      const quantity = parseFloat(e.target.value); 
      updatedData[rowIndex]['quantitiesThisBill'] = quantity;
      quantityCumulative+= parseFloat(quantity?quantity:0)
      

      const rate = parseFloat(updatedData[rowIndex]['rate']);
      const amountThisBill = isNaN(quantity) || isNaN(rate) ? 0 : quantity * rate;
        amountCumulative+=amountThisBill
      updatedData[rowIndex]['quantitiesCumulative'] = quantityCumulative;
      updatedData[rowIndex]['amountThisBill'] = amountThisBill;
      updatedData[rowIndex]['amountCumulative'] = amountCumulative;
    }
    else{
      updatedData[rowIndex][field] = e.target.value;
    } 
    setBoqData(updatedData);
  };

  useEffect(() => {
    
  if(boqData){
    setTableDataInForm(boqData)
  }
  }, [boqData])
  

  const calculateTotal = () => {
    let total = 0;

    boqData.forEach((row) => {
      total += parseFloat(row.amountThisBill || 0);

      if (row.subtable && Array.isArray(row.subtable)) {
        row.subtable.forEach((subTable) => {
          total += parseFloat(subTable.amountThisBill || 0);

          if (subTable.subsubtable && Array.isArray(subTable.subsubtable)) {
            subTable.subsubtable.forEach((subSubTable) => {
              total += parseFloat(subSubTable.amountThisBill || 0);
            });
          }
        });
      }
    });

    setTotalAmount(total);
  };

  return (
    <Table>
       <thead>
          <tr>
            <th> Boq Item No.</th>
            <th style={{width:'20rem'}}>Description</th>
            <th colSpan="4">Boq Details</th>
            <th colSpan="3">Quantities</th>
            <th colSpan="3">Amount</th>
            <th rowSpan="2">Remarks</th>
          </tr>
          <tr>
            <th colSpan="1"></th>
            <th colSpan="1" style={{width:'fit-content'}}>Main Abstract</th>
            <th>UOM</th>
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
                <td>{item.indexCode}</td>
                <td style={{ textAlign: "left" }}>
                  <div style={{width:'fit-content'}}
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

                <td>{item.unit}</td>
                <td>{item.qty}</td>
                <td>{item.rate}</td>
                <td>{item.qty * item.rate}</td>
                <td>
                <input
                  type="number"
                  disabled
                  style={{width:'fit-content'}}
                  value={item.quantitiesPrevious}
                  className='form-control'
                  onChange={(e) => handleInputChange(e, index, 'quantitiesPrevious')}
                />
              </td>
              <td>
                <input
                  type="number"
                  style={{width:'fit-content'}}

                  value={item.quantitiesThisBill}
                  className='form-control'
                  onChange={(e) => handleInputChange(e, index, 'quantitiesThisBill')}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.quantitiesCumulative }
                  disabled
                  className='form-control'
                  // onChange={(e) => handleInputChange(e, index, 'quantitiesCumulative')}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.amountPrevious}
                  className='form-control'
                  style={{width:'fit-content'}}
                  disabled
                  onChange={(e) => handleInputChange(e, index, 'amountPrevious')}
                />
              </td>
              <td>
                <input
                  type="number"
                  style={{width:'fit-content'}}
                  value={item.amountThisBill}
                  className='form-control'
                  disabled
                  onChange={(e) => handleInputChange(e, index, 'amountThisBill')}
                />
              </td>
              <td>
                <input
                  type="number"
                  disabled
                  value={item.amountCumulative}
                  className='form-control'
                  style={{width:'fit-content'}}
                  onChange={(e) => handleInputChange(e, index, 'amountCumulative')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.remarks}
                  className='form-control'
                  onChange={(e) => handleInputChange(e, index, 'remarks')}
                />
              </td>
            
              </tr>
           
            </React.Fragment>
          ))}
      </tbody>
      <tfoot>
    {/* <div className="d-flex" style={{justifyContent:'flex-end'}}>
      <button onClick={()=>CalculateTotal()}> Click To Calculate Total Amount</button>
      {
        totalAmount &&
        <span>{totalAmount}</span>
      }

    </div> */}

      </tfoot>
    </Table>

  );
}
