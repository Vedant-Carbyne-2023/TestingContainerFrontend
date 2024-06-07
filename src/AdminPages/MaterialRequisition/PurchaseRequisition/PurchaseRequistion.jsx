import React, { useState } from "react";
import getPR from "./getPR";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import { role, userId, userName } from "../../../CommonUtitlites/Others/commonExportVariable";
import useGetUserProject from "../../../CommonUtitlites/customHooks/useGetUserProject";
import SearchInputPostgres from "../../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInputForPostgresIdIssue";
import EditableTablePR from "./EditableTablePR/EditableTablePR";
import Loader from "../../../CommonUtitlites/Loader/Loader";
import Swal from 'sweetalert2';
import createPDFForPR from "../MakePdf/MakePdfForPR";
import useGetDateSchema from "../../../CommonUtitlites/customHooks/useGetDateSchema";


export default function PurchaseRequisition({status, OnClose}) {
  let {backDate,futureDate,todayDate} = useGetDateSchema()
  const currentDate = new Date().toISOString().split("T")[0];
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(false)
  let projects = useGetUserProject()

  const [project, setProject] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let data = await getPR(e);
    data.projectId=project.id
    data.projectCode=project.projectCode
    data.projectName=project.name
    data.tableData=tableData
    data.employer=localStorage.getItem("user_Name");
    data.userId=userId;
    data.role=role;
    data.userName=userName;
    let result = api.post("/create-prEntry", data);
    result = await errorHandler(result);
    let makePdf = await createPDFForPR(result.data)
    Swal.fire({title:result.data.message,
    timer:2000
    });
    alert(result.data.message);
    setState(!state)
    status(state)
    OnClose(state)
    setLoading(false);
  };

  

  const handleProject = async (project)=>{
    setProject({ name: project.name, id: project.id, projectCode:project.projectCode });

  }

  return (
    <>
      {loading?<Loader/>:
      <form className="form-grid" onSubmit={handleSubmit}>
        <div>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                  
                  <div className="mb-2">
                  <SearchInputPostgres
            placeholder={"Select Project"}
            items={projects}
            title={"Project"}
            id={"projectDetails"}
            ResultOnClick={(data) => handleProject(data)}
          />
</div>
               

                <div className="form-group">
                  <label htmlFor="storageLocation">Storage Location</label>
                  <input
                    type="text"
                    className="form-control"
                    id="storageLocation"
                    placeholder="Enter Storage Location"
                    name="storageLocation"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="miDate">Purchase Requisition Date</label>
                  <input
              type="date"
              readOnly={todayDate && (!futureDate && !backDate)}
              className="form-control"
              name="date"
              id="date"
              defaultValue={currentDate}
              max={backDate?currentDate:""}
              min={futureDate?currentDate:''}
              placeholder="Date"
              required
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
                    value={localStorage.getItem("user_Name")}
                    placeholder="Enter Employer Name"
                    name="employer"
                  />
                </div>
              </div>
            </div>
          </div>
          <EditableTablePR tableData={(data) => setTableData(data)} />

          <label htmlFor="report">MTC Report / TPI Report Required.</label>
          <select
            id="report"
            name="report"
            className="form-control"
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
            placeholder="Enter Remarks"
          />
          {/* <div className="px-4">
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
              <div className="col-md-2">Signature</div>
              <div className="col-md-3 form-control"></div>
              <div className="col-md-3 form-control"></div>
              <div className="col-md-3 form-control"></div>
            </div>
            <div
              className="row mb-2"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div className="col-md-2">Name</div>
              <div className="col-md-3 form-control"></div>
              <div className="col-md-3 form-control"></div>
              <div className="col-md-3 form-control"></div>
            </div>
            <div
              className="row mb-4"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div className="col-md-2">Designation</div>
              <div className="col-md-3 form-control"></div>
              <div className="col-md-3 form-control"></div>
              <div className="col-md-3 form-control"></div>
            </div>
          </div> */}
          {/* <button type="button" className="btn btn-primary" onClick={handlePrint}>
      Print
    </button> */}
          <button type="submit" className="d-flex ml-auto btn btn-primary">
            Submit
          </button>
        </div>
      </form>
     }
    </>
  );
}
