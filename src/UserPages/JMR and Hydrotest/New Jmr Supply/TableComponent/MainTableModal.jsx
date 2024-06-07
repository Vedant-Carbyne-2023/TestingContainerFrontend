import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function MainTableModal({ boqDetails, data }) {
  const [boqData, setBoqData] = useState([]);
  const [totalAmount, setTotalAmount] = useState('');

  useEffect(() => {
    if (boqDetails) {
      setBoqData(boqDetails);
    }
  }, [boqDetails]);

 
  return (
    <div>
 <div className="row">

<div className="col-md-12 mb-3" style={{ position: "relative" }}>
    <label htmlFor="schemeNo">Scheme No</label>
    <div >
      <input
        type="text"
        className="form-control"
        id="schemeNo"
        name="schemeNo"
        placeholder="Enter scheme no"
        value={data.schemeNo}
        disabled
        required
      />
     
    </div>
  </div>

  <div className="col-md-4 mb-3">
    <label htmlFor="district">District</label>
    <input
      type="text"
      className="form-control"
      id="district"
      disabled={true}
      name="district"
      placeholder="Enter district"
      value={data.district}
      required
    />
  </div>

  <div className="col-md-4 mb-3">
    <label htmlFor="block">Block</label>
    <input
      type="text"
      className="form-control"
      id="block"
      disabled={true}
      name="block"
      placeholder="Enter block"
      value={data.block}
      required
    />
  </div>

  <div className="col-md-4 mb-3">
    <label htmlFor="gp">GP</label>
    <input
      type="text"
      className="form-control"
      id="gp"
      disabled={true}
      name="gp"
      placeholder="Enter GP"
      value={data.gp}
      required
    />
  </div>
  
  <div className="col-md-6 mb-3" style={{ position: "relative" }}>
    <label htmlFor="lastBillSerialNo">Last Bill No</label>
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        id="lastBillSerialNo"
        name="lastBillSerialNo"
        disabled
        placeholder="Enter last bill no"
        value={data.lastBillSerialNo}
        required
      />
      <div className="input-group-append">
        <button className="btn btn-outline-secondary" type="button">
          <i className="fas fa-search"></i>
        </button>
      </div>
    </div>
  </div>

  <div className="col-md-6 mb-3">
    <label htmlFor="lastBillDate"> Date of Last Bill </label>
    <input
      type="date"
      className="form-control"
      id="lastBillDate"
      disabled
      name="lastBillDate"
      placeholder="Enter date of last bill"
      value={data.lastBillDate}
      required
    />
  </div>

  <div className="col-md-6 mb-3">
    <label htmlFor="contractorSupplier">Contractor/Supplier</label>
    <input
      type="text"
      className="form-control"
      id="contractorSupplier"
      name="contractorSupplier"
      placeholder="Enter contractor/supplier"
      value={data.contractorSupplier}
      disabled
      required
    />
  </div>

  <div className="col-md-6 mb-3">
    <label htmlFor="nameOfWork">Name Of Work</label>
    <input
      type="text"
      className="form-control"
      id="nameOfWork"
      name="nameOfWork"
      placeholder="Enter name or work"
      value={data.nameOfWork}
      disabled
      required
    />
  </div>

  <div className="col-12 mb-3">
    <label htmlFor="purposeOfSupply">Purpose of Supply</label>
    <input
      type="text"
      className="form-control"
      id="purposeOfSupply"
      name="purposeOfSupply"
      placeholder="Enter purpose of supply"
      value={data.purposeOfSupply}
      required
      disabled
    />
  </div>

  <div className="col-md-6 mb-3">
    <label htmlFor="serialNoOfBill">Serial No of Bill</label>
    <input
      type="text"
      className="form-control"
      id="serialNoOfBill"
      name="serialNoOfBill"
      disabled
      placeholder="Enter serial no of bill"
      value={data.serialNoOfBill}
      required
    />
  </div>

  <div className="col-md-6 mb-3">
    <label htmlFor="dateOfThisBill">Date of This Bill</label>
    <input
      type="date"
      className="form-control"
      id="dateOfThisBill"
      name="dateOfThisBill"
      value={data.dateOfThisBill}
      required
    />
  </div>




</div>

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
                />
              </td>
              <td>
                <input
                  type="number"
                  style={{width:'fit-content'}}
                  disabled
                  value={item.quantitiesThisBill}
                  className='form-control'
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.quantitiesCumulative}
                  disabled
                  className='form-control'
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.amountPrevious}
                  className='form-control'
                  style={{width:'fit-content'}}
                  disabled
                />
              </td>
              <td>
                <input
                  type="number"
                  style={{width:'fit-content'}}
                  value={item.amountThisBill}
                  className='form-control'
                  disabled
                />
              </td>
              <td>
                <input
                  type="number"
                  disabled
                  value={item.amountCumulative}
                  className='form-control'
                  style={{width:'fit-content'}}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.remarks}
                  className='form-control'
                />
              </td>
            
              </tr>
           
            </React.Fragment>
          ))}
      </tbody>
    
    </Table>
    </div>

  );
}
