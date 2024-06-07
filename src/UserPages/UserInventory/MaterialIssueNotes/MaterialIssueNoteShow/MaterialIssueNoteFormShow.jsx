import React, { useEffect, useState } from "react";

import MaterialIssueFormShowEditableTable from "./MaterialIssueFormShowEditableTable";
import { currentDate, role, userId } from "../../../../CommonUtitlites/Others/commonExportVariable";
import { api } from "../../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../../CommonUtitlites/Others/errorHandle";
import useGetMaterialIssueNoteByMINId from "../../../../CommonUtitlites/customHooks/useGetMaterialIssueNoteByMINId";



export default function MaterialIssueNoteFormShow(props) {

  
  const [tableValue, setTableValue] = useState([]);

  let {data, loading} = useGetMaterialIssueNoteByMINId(props.data.minId)


  return (
    <div>
      <div className="container form-grid">
        <div className="row">
          <div className="col-md-12">
            <img
              src="../carbyne.jpg"
              style={{ float: "left" }}
              alt="Carbyne Logo"
            />
            <h3 className="text-center">
              CARBYNE INFRASTRUCTURE PRIVATE LIMITED
            </h3>
            <p className="text-center mb-0">
              B-11, Third Floor B Block Noida, Gautam Buddha Nagar
            </p>
            <p className="text-center mb-0">Uttar Pradesh, India Pin 201301</p>
            <p className="text-center mb-0">CIN No.-U74110UP1993PTC015005</p>
            <h4 className="text-center mt-3">Material Issue Note</h4>
          </div>
        </div>
        <hr />
        <form >
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="mrNo">Material Requisition Id / Number</label>

                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter MR Number"
                  name="mrNo"
                  value={props.data.indentId}
                />
              </div>
              <div className="form-group">
                <label htmlFor="contractorName">
                  Material Requisition Vendor Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Contractor Name"
                  name="contractorName"
                  id="contractorName"
                  value={props.data.vendor}
                />
              </div>
              {
              props.data.approvedBy 

              &&

            <div className="form-group">
              <label htmlFor="approvedBy">Approved By</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Remark"
                id="approvedBy"
                name="approvedBy"
                value={props.data.approvedBy}
              />
            </div>
        }
              <div className="form-group">
                <label htmlFor="userName">
                  Material Requisition Requestor Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter User Name"
                  name="userName"
                  id="userName"
                  value={props.data.preparedBy}
                />
              </div>

              {/* <div className="form-group">
          <label htmlFor="contractorName">MR Requester Name</label>

            <input
              className="form-control"
              type="text"
              placeholder="Enter Work Order No."
              name="workOrder"
            />
          </div> */}

              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Location/Village"
                  name="location"
                  value={props.data.gp}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="projectName">Project Name</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Project Name"
                  name="projectName"
                  value={props.data.project}
                />
              </div>
              <div className="form-group">
                <label htmlFor="minDate">Material Issue Date</label>

                <input
                  className="form-control"
                  type="date"
                  placeholder="Enter Date"
                  name="minDate"
                  readOnly
                  value={currentDate}
                />
              </div>
              <div className="form-group">
                <label htmlFor="block">Block</label>

                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Block"
                  name="block"
                  value={props.data.block}
                />
              </div>
              {
          props.data.recommendedBy 

          &&

        <div className="form-group">
          <label htmlFor="recommendedBy">Recommended By</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Remark"
            id="recommendedBy"
            name="recommendedBy"
            value={props.data.recommendedBy}
          />
        </div>
    }
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">

      {
        data 
        &&

              <MaterialIssueFormShowEditableTable
              data={data}
              setTable={(data) => setTableValue(data)}
              />
            }

              <div className="row" style={{ height: "150px" }}>
                <span style={{ marginLeft: "auto", display: "flex" }}>
                  Authorised Signature With Seal
                </span>
              </div>

              <div
                className="row"
                style={{
                  height: "100px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Request By</span>
                <span>Approved By</span>
                <span>Store Keeper</span>
                <span>Received By</span>
              </div>
              <div className="row d-flex"></div>
            </div>
          </div>
          {/* <button
            className="btn btn-primary"
            style={{ borderRadius: "3rem", display: "flex", margin: "auto" }}
            type="submit"
          >
            Submit
          </button> */}
        </form>
      </div>
    </div>
  );
}
