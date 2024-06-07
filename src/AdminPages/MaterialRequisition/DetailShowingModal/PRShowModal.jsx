import React, { useEffect, useState } from "react";
// import ShowDataTable from "./ShowDataTableByEditorJs";
import ShowDataTable from "./ShowDataTableByEditorJs";
import { formatDate } from "../../../CommonUtitlites/Others/formattingDateAndName";
import { userId, role } from "../../../CommonUtitlites/Others/commonExportVariable";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";

export default function PRShowModal({ data}) {


  return (
    <div className="form-grid">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="indentId">Indent/PR No.</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Indent/MR No."
                id="indentId"
                name="indentId"
                value={data.prId}
              />
            </div>
            <div className="form-group">
              <label htmlFor="indentDate">Indent Date</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Indent Date"
                id="indentDate"
                name="indentDate"
                value={formatDate(new Date(data.prDate))}
              />
            </div>
            <div className="form-group">
              <label htmlFor="indentStatus">MR Status</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter MR Status"
                id="indentStatus"
                name="indentStatus"
                value={data.status?"Approved":"NotApproved"}
              />
            </div>
            <div className="form-group">
              <label htmlFor="vendor">Employer</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Vendor"
                id="vendor"
                name="vendor"
                value={data.employer}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="block">Delivery Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Block"
                id="block"
                name="block"
                value={data.deliveryAdd}
              />
            </div>
            <div className="form-group">
              <label htmlFor="gp">Project</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter GP"
                id="gp"
                name="gp"
                value={data.projectName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="store">Material Description</label>
              <input
                type="text"
                className="form-control"
                placeholder="No Description Given"
                id="store"
                name="store"
                value={data.materialDesc}
              />
            </div>

            <div className="form-group">
              <label htmlFor="remark">Remarks</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Remark"
                id="remark"
                name="remark"
                value={data.remarks}
              />
            </div>
          </div>
        </div>
        <ShowDataTable data={data}/>

      </div>
    
    </div>
  );
}
