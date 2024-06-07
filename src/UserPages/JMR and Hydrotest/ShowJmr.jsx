import React, { useState, useEffect } from "react";
import { formatTableDate } from "../../CommonUtitlites/Others/formattingDateAndName";
import { format } from "date-fns";
import Calculator from "./Calculator";
import RevenueCalculator from "./RevenueCalculator";

export default function showJMR({ formData }) {
  console.log("we have here: ", formData);

  const [vendorCard, setVendorCard] = useState([])
  const [revenueCard, setRevenueCard] = useState([])
  return (
    <div className="container">
      <form className="form-grid">
        <h6 className="text-decoration-underline">JMR Form</h6>
        <div className="row mb-0">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="block">Block Name*</label>
              <input
                disabled
                className="form-control"
                type="text"
                id="block"
                name="block"
                value={formData.blockName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="gp">GP Name*</label>
              <input
                disabled
                className="form-control"
                type="text"
                id="gp"
                name="gp"
                value={formData.gpName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="vendorName">Vendor Name*</label>
              <input
                disabled
                className="form-control"
                type="text"
                id="vendorName"
                name="vendorName"
                value={formData.vendorName}
              />
            </div>
            {/* <div className="form-group">
            <label htmlFor="totalScope">Total Scope</label>
              <input
              disabled
                id="totalScope"
                placeholder="Total Scope"
                name="totalScope"
                className="form-control"
                value={formData.totalScope}
              />
            </div> */}

            {/* <div className="form-group">
            <label htmlFor="jmrDone">JMR Done</label>
              <input
                disabled
                id="jmrDone"
                placeholder="JMR Done"
                name="jmrDone"
                className="form-control"
                value={formData.jmrDone}
              />
            </div> */}

            {/* <div className="form-group">
            <label htmlFor="balance">Balance</label>
              <input
                disabled
                id="balance"
                placeholder="Balance"
                name="balance"
                className="form-control"
                value={formData.balance}
              />
            </div> */}

            {/* <div className="form-group">
            <label htmlFor="labour">Labour</label>
              <input
              disabled
                id="labour"
                placeholder="Labour"
                name="labour"
                className="form-control"
                value={formData.labour}
              />
            </div> */}
            {/* <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
              <input
                disabled
                id="quantity"
                placeholder="Quantity"
                name="quantity"
                className="form-control"
                value={formData.quantity}
              />
            </div> */}

            {/* Other input fields */}
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="staffName">Staff Name*</label>
              <input
                disabled
                className="form-control"
                type="text"
                id="staffName"
                name="staffName"
                value={formData.staffName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dpm">DPM Name*</label>
              <input
                disabled
                className="form-control"
                type="text"
                id="dpm"
                name="dpm"
                value={formData.dpmName}
              />
            </div>
            <div className="form-group">
            <label htmlFor="dateInput"> Date And Time Of Receipt</label>
          <input
            disabled
            type="text"
            id="dateInput"
            placeholder="Today's Date"
            className="form-control"
            value={format(new Date(formData.todaysDate), "dd-MM-yyyy hh:mm:ss")}
          />
            </div>
            {/* <div className="form-group">
            <label htmlFor="cummulative">Cummulative</label>
              <input
              disabled
                id="cummulative"
                placeholder="JMR cumulative for June'23"
                name="cummulative"
                className="form-control"
                value={formData.cummulative}
              />
            </div> */}
            {/* <div className="form-group">
            <label htmlFor="labourCount">Labour Count</label>
              <input
                disabled
                id="labourCount"
                placeholder="Labour Count"
                name="labourCount"
                className="form-control"
                value={formData.labourCount}
              />
            </div> */}
            {/* <div className="form-group">
            <label htmlFor="cummulativeDate">Cummulative Date</label>
              <input
                disabled
                id="cummulativeDate"
                placeholder="Cumulative Done as on Date"
                name="cummulativeDate"
                className="form-control"
                value={new Date(formData.cummulativeDate).toLocaleDateString()}
              />
            </div>
            <div className="form-group">
            <label htmlFor="balanceDate">Balance Date</label>
              <input
              disabled
                id="balanceDate"
                placeholder="Balance"
                name="balanceDate"
                className="form-control"
                value={new Date(formData.balanceDate).toLocaleDateString()}
              />
            </div> */}
            {/* <div className="form-group">
            <label htmlFor="percentCompleted">Progress(in %)</label>
              <input
                disabled
                id="percentCompleted"
                placeholder="% Progress"
                name="percentCompleted"
                className="form-control"
                value={formData.percentCompleted}
              />
            </div>
            <div className="form-group">
            <label htmlFor="status">Status</label>
              <input
                disabled
                id="status"
                name="status"
                placeholder="Status"
                className="form-control"
                value={formData.status}
              />
            </div> */}

            {/* Other input fields */}
          </div>
        </div>

        {/* Additional input fields */}
        
        <label>Excel Data</label>

        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover">
            <thead className="thead-dark">
              <tr>
                {formData.tableData &&
                  formData.tableData != undefined &&
                  formData.tableData[0] &&
                  formData.tableData[0].map((header, headerIndex) => (
                    <th key={headerIndex}>{header}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {formData.tableData &&
                formData.tableData != undefined &&
                formData.tableData[0] &&
                formData.tableData.slice(1).map((rowData, rowIndex) => (
                  <tr key={rowIndex}>
                    {rowData.map((cellData, cellIndex) => (
                      <td key={cellIndex}>{cellData || " "}</td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

       
        <h6 className='my-4'>Vendor Rate Card</h6>
     <Calculator  showVendorCard={formData.vendorRateCard}   data={(data)=>setVendorCard(data)}/>
      <h6 className='my-4'>Revenue Rate Card</h6>
     <RevenueCalculator showRevenueCard={formData.revenueRateCard}   data={(data)=>setRevenueCard(data)}/>

      </form>
    </div>
  );
}
