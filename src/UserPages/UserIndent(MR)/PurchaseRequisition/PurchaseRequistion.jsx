import React, { useState } from "react";
import getPR from "./getPR";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import useGetUserProject from "../../../CommonUtitlites/customHooks/useGetUserProject";
import SearchInputPostgres from "../../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInputForPostgresIdIssue";
import EditableTablePR from "./EditableTablePR/EditableTable";
import Loader from "../../../CommonUtitlites/Loader/Loader";
import { role, userId } from "../../../CommonUtitlites/Others/commonExportVariable";
import Swal from "sweetalert2";
import createPDFForPR from "../MakePdf/MakePdfForPR";
import useGetDateSchema from "../../../CommonUtitlites/customHooks/useGetDateSchema";

export default function PurchaseRequisition({OnClose, setStatus}) {
  let {backDate,futureDate,todayDate} = useGetDateSchema()
  const currentDate = new Date().toISOString().split("T")[0];
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(false)
  const [selectedOption, setSelectedOption] = useState('save')
    let projects = useGetUserProject()
  
    const [project, setProject] = useState("")
  console.log(project)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let data = await getPR(e);
    data.projectId=project.id
    data.projectCode=project.projectCode
    data.projectName=project.name
    data.userId=userId
    data.role=role
    data.tableData=tableData
   

    let result;
    if(selectedOption=='save'){
      result = api.post("/save-prEntry", data);
      result = await errorHandler(result);
    
    }
    else 
{
  result = api.post("/create-prEntry", data);
  result = await errorHandler(result);
  
  }
   

    let makePdf = await createPDFForPR(result.data)
    
    setLoading(false);
    Swal.fire({title:result.data.message,
    timer:2000,
    icon:'success'
    });
    setState(!state)
    setStatus(state)
  };

  

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
                  title={"Projects"}
                  placeholder={"Select Project"}
                  items={projects}
                  ResultOnClick={(data) => setProject(data)}
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
                  <label htmlFor="date">Purchase Requisition Date</label>
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
         <div className="select-options d-flex my-3" style={{ justifyContent: "space-around", alignItems: 'center' }}>
  <div
    className={`select-option ${selectedOption === 'save' ? 'selected' : ''}`}
    onClick={() => setSelectedOption('save')}
    style={{ cursor: 'pointer' }}
  >
    <h6>Save</h6>
    {selectedOption === 'save' && <h4 className="checkbox-icon">✔</h4>}
  </div>
  <div
    className={`select-option ${selectedOption === 'submit' ? 'selected' : ''}`}
    onClick={() => setSelectedOption('submit')}
    style={{ cursor: 'pointer' }}
  >
    <h6>Submit</h6>
    {selectedOption === 'submit' && <h4 className="checkbox-icon">✔</h4>}
  </div>
</div>

          <button type="submit" className="btn btn-primary mx-auto d-flex">
            Submit
          </button>
        </div>
      </form>
     }
    </>
  );
}
