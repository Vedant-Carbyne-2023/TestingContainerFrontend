import React, { useState } from "react";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import useGetUserProject from "../../../CommonUtitlites/customHooks/useGetUserProject";
import SearchInputPostgres from "../../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInputForPostgresIdIssue";
import EditableTablePR from "./EditableTablePR/EditableTable";

export default function PurchaseRequisitionShow({data}) {
console.log(data)


  return (
    <>
      <form className="form-grid" >
        <div>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                  
              <div className="form-group">
                  <label htmlFor="prId">Purchase Requisition Id</label>
                  <input
                    type="text"
                    className="form-control"
                    id="prId"
                    placeholder="Enter Storage Location"
                    value={data.prId}
                    name="prId"
                  />
                </div>
              <div className="form-group">
                  <label htmlFor="projectName">Project Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="projectName"
                    placeholder="Enter Storage Location"
                    value={data.projectName}
                    name="projectName"
                  />
                </div>
               

                <div className="form-group">
                  <label htmlFor="storageLocation">Storage Location</label>
                  <input
                    type="text"
                    className="form-control"
                    id="storageLocation"
                    placeholder="Enter Storage Location"
                    value={data.deliveryAdd}
                    name="storageLocation"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="miDate">Purchase Requisition Date</label>
                  <input
                    type="date"
                    readOnly
                    value={new Date(data.prDate).toISOString().split('T')[0]}
                    className="form-control"
                    id="prDate"
                    placeholder="prDate"
                    name="prDate"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="employer">
                    Purchase Requester Name (Employee)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="employer"
                    disabled
                    value={data.employer}
                    placeholder="Enter Employee Name"
                    name="employer"
                  />
                </div>
              </div>
            </div>
          </div>
          <EditableTablePR tableData={data.tableData} />

          <label htmlFor="report">MTC Report / TPI Report Required.</label>
          <select
            id="report"
            name="report"
            className="form-control"
            value={data.qualityInstruction}
            placeholder="Enter Documents Required with Materials"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
          <label htmlFor="remarks">Remarks</label>
          <textarea
            id="remarks"
            name="remarks"
            className="form-control"
            value={data.remarks}
            placeholder="Enter Remarks"
          />
           <div className="px-4">
            <div className="row mb-2 text-center">
              <div className="col-md-2"></div>
              <div className="col-md-3 ">
                <label>Prepared</label>
              </div>
              <div className="col-md-3 ">
                <label>Checked</label>
              </div>
              <div className="col-md-3">
                <label>Approved</label>
              </div>
            </div>
            <div
              className="row mb-2"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div className="col-md-2">Name</div>
              <input className="col-md-3 form-control" value={data.preparedBy}/>
              <input className="col-md-3 form-control" value={data.approvedBy}/>
              <input className="col-md-3 form-control" value={data.approvedBy}/>
            </div>
            {/* <div
              className="row mb-4"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div className="col-md-2">Designation</div>
              <div className="col-md-3 form-control"></div>
              <div className="col-md-3 form-control"></div>
              <div className="col-md-3 form-control"></div>
            </div> */}
          </div>
          {/* <button type="button" className="btn btn-primary" onClick={handlePrint}>
      Print
    </button> */}
          {/* <button type="submit" className="d-flex ml-auto btn btn-primary">
            Submit
          </button> */}
        </div>
      </form>
    </>
  );
}
