import React, { useState, useEffect } from 'react';

export default function ShowHydrotest({formData}) {
  

  // ... other code for handleChange and handleSubmit
  // console.log('main data is here: ', formData);

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
  return (
    <div className="container">
      <form className="form-grid">
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
           <label htmlFor="totalScope">Total Scope*</label>
           <input
           disabled
             className="form-control"
             type="text"
             id="totalScope"
             name="totalScope"
             value={formData.totalScope}
             placeholder="Total Scope"
           />
         </div>

            <div className="form-group">
           <label htmlFor="hydrotestDone">Hydrotesting done till date*</label>
           <input
           disabled
             className="form-control"
             type="text"
             id="hydrotestDone"
             name="hydrotestDone"
             value={new Date(formData.doneTillDate).toLocaleDateString()}
           />
         </div>
         <div className="form-group">
         <label htmlFor="labour">Labour*</label>
            <input
              disabled
              className="form-control"
              type="text"
              id="labour"
              name="labour"
              value={formData.labour}
              placeholder="Labour"
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity*</label>
            <input
              disabled
              className="form-control"
              type="text"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              placeholder="Quantity"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cummulativeDate">Cumulative Done as on Date*</label>
            <input
              disabled
              className="form-control"
              type="text"
              id="cummulativeDate"
              name="cummulativeDate"
              value={formData.cummulativeDate}
              placeholder="Cumulative Done as on Date"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="balanceDate">Balance*</label>
            <input
              disabled
              className="form-control"
              type="text"
              id="balanceDate"
              name="balanceDate"
              value={formData.balanceDate}
              placeholder="Balance"
            />
          </div>

            {/* Other input fields */}
          </div>

          <div className="col-md-6">
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
            <div className="form-group">
              <label htmlFor="dpm">Dpm Name*</label>
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
           <label htmlFor="balance">Balance*</label>
           <input
             disabled
             className="form-control"
             type="text"
             id="balance"
             name="balance"
             value={formData.balance}
             placeholder="Balance"
           />
         </div>
         
         <div className="form-group">
           <label htmlFor="dateInput">Today's Date</label>
           <input
             disabled
             className="form-control"
             type="text"
             id="dateInput"
             name="dateInput"
             value={new Date(formData.todaysDate).toLocaleDateString()}
             placeholder="Today's Date"
           />
         </div>
         <div className="form-group">
          <label htmlFor="cummulative">Hydrotest cumulative for June'23*</label>
          <input
            disabled
            className="form-control"
            type="text"
            id="cummulative"
            name="cummulative"
            value={formData.cummulative}
            placeholder="Hydrotest cumulative for June'23"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="labourCount">Labour Count*</label>
          <input
            disabled 
            className="form-control"
            type="text"
            id="labourCount"
            name="labourCount"
            value={formData.labourCount}
            placeholder="Labour Count"
          />
        </div>
        <div className="form-group">
          <label htmlFor="percentCompleted">% Progress*</label>
          <input
            disabled
            className="form-control"
            type="text"
            id="percentCompleted"
            name="percentCompleted"
            value={formData.progress}
            placeholder="% Progress"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="status">Status*</label>
          <input
            disabled
            className="form-control"
            type="text"
            id="status"
            name="status"
            value={formData.status}
            placeholder="Status"
          />
        </div>

            {/* Other input fields */}
          </div>
        </div>
        <div className="table-responsive">
        <table className="table" style={tableStyle}>
          <thead className="sticky-thead">
            <tr>
              <th style={cellStyle}>Item Name</th>
              <th style={cellStyle}>Quantity</th>
              <th style={cellStyle}>Unit</th>
              <th style={cellStyle}>Price</th>
              {/* <th>Description</th> */}
            </tr>
          </thead>
          <tbody className="scrollable-tbody">
          {(formData.tableData)?.map((indent, key) => (
      <tr key={key}>
        <td style={cellStyle}>
                    {indent.name}
          </td>
        <td style={cellStyle}>{indent.quantity}</td>
        <td style={cellStyle}>{indent.unit}</td>
        <td style={cellStyle}>{indent.price}</td>
        {/* <td>
          <button
            className="btn btn-link text-left"
            onClick={() => handleModalOpen(indent)}
          >
            More Description
          </button>
        </td> */}
      </tr>
    ))}
  </tbody>
        </table>
      </div>
      </form>
    </div>
  );
}
