import React from "react";
import ShowDataTable from "./ShowDataTableByEditorJs"; 
import { formatDate } from "../../../CommonUtitlites/Others/formattingDateAndName";

export default function MtoShowModal({ data }) {
  // console.log('mto has',data);
  return (
    <div className="form-grid">
  <div className="container">
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="mtoId">MTO No.</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter MTO No."
            id="mtoId"
            name="mtoId"
            value={data.mtoId}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mtoDate">MTO Date</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter MTO Date"
            id="mtoDate"
            name="mtoDate"
            value={formatDate(new Date(data.mtoDate))}
          />
        </div>
       
        <div className="form-group">
          <label htmlFor="viewEwayBill">MTO Remark</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter View Eway Bill"
            id="viewEwayBill"
            name="viewEwayBill"
            value={data.remark}
          />
        </div>
        <div className="form-group">
          <label htmlFor="projectName">Project</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter View Eway Bill"
            id="projectName"
            name="projectName"
            value={data.projectName}
          />
        </div>
      </div>
      
      <div className="col-md-6">
     
        <div className="form-group">
          <label htmlFor="mtoContractorName">Contractor / Person Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Contractor / Person Name"
            id="mtoContractorName"
            name="mtoContractorName"
            value={data.mtoContractorName}
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="blockPanchayatName">Block Panchayat Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Block Panchayat Name"
            id="blockPanchayatName"
            name="blockPanchayatName"
            value={data.blockPanchayatName}
          />
        </div> */}
        <div className="form-group">
          <label htmlFor="toGp">Transferred To Gp:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Remark"
            id="toGp"
            name="toGp"
            value={data.transferToGpName}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fromGp">Transferred From Gp:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Remark"
            id="fromGp"
            name="fromGp"
            value={data.transferFromGpName}
          />
        </div>
       
      </div>
    </div>
    <ShowDataTable data={data}/>
  </div>
</div>

  );
}

{
  /* <p>Rate: {data.rate}</p>
<p>Tax Rate: {data.taxRate}</p>
<p>Discount: {data.discount}</p>
<p>Total: {data.total}</p> */
}
