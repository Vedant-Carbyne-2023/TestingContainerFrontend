import React, { useEffect, useState } from "react";
// import ShowDataTable from "./ShowDataTableByEditorJs";
import ShowDataTable from "./ShowDataTableByEditorJs";
import { formatDate } from "../../../CommonUtitlites/Others/formattingDateAndName";
import { userId, role } from "../../../CommonUtitlites/Others/commonExportVariable";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import Swal from "sweetalert2";
import createPDFForPR from "../MakePdf/MakePdfForPR";
import getPR from "../PurchaseRequisition/getPR";
import EditableTablePR from "../PurchaseRequisition/EditableTablePR/EditableTablePR";

export default function PRShowModal({ data, onSubmitApprove, setStatus }) {
  console.log('yashPRshow',data, onSubmitApprove);
  const [submit, setSubmit] = useState(false)
  const [tableData, setTableData] = useState([])
  const [selectedOption, setSelectedOption] = useState('save')
  const [loading, setLoading] = useState(false)
  const handleApprove = async ()=>{
    // console.log('Tried to Approve PR');
    // console.log(data.prId, onSubmitApprove);
    // console.log("Approved");
    let result = api.post('/approve-prEntry', {projectId:data.projectId, prIds:data.prId,  userId, role});
    result = await errorHandler(result);
    // console.log(result);
    Swal.fire({
      timer:2000,
      title:result.data.message
    })
    setSubmit(!submit)
    setStatus(submit)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let value = await getPR(e);
    value.projectId=data.projectId
    value.projectCode=data.projectCode
    value.projectName=data.projectName
    value.userId=userId
    value.date=data.prDate
    value.role=role
    value.prId=data.prId
    value.tableData=tableData
    value.employer=data.employer
    value.status=data.status
    console.log(value)
    // return;
    let result;
    if(selectedOption=='save'){
      result = api.post("/save-prEntry", value);
      result = await errorHandler(result);
    
    }
    else 
{
   result = api.post("/create-prEntry", value);
  result = await errorHandler(result);
  
  }
    // onDataClick({data:data, indentId:result.data.data.indentId});
    let makePdf = await createPDFForPR(result.data)
    setLoading(false);
    Swal.fire({
      timer:2000,
      title:result.data.message
    })
    setStatus(submit)
    setSubmit(!submit)
    OnClose(submit)
  };

  return (
    <form onSubmit={handleSubmit}>
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
            {/* <div className="form-group">
              <label htmlFor="store">Material Description</label>
              <input
                type="text"
                className="form-control"
                placeholder="No Description Given"
                id="store"
                name="store"
                value={data.materialDesc}
              />
            </div> */}

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
        {
data.status=='Saved'
?
<EditableTablePR tableData={(value)=>setTableData(value)} data={data.tableData}/>
:
        <ShowDataTable data={data} />
        }

      </div>
      {onSubmitApprove && onSubmitApprove === 'Approved' ? (
        <button className="btn float-right" type="button" onClick={handleApprove}>Approve PR</button>
      ) : null}

{
          data.status=='Saved'?
          <div className="select-options d-flex" style={{justifyContent:"space-around"}}>
          <div
            className={`select-option ${selectedOption === 'save' ? 'selected' : ''}`}
            onClick={() => setSelectedOption('save')}
            style={{cursor:'pointer'}}
          >
           <h6> Save</h6>
            {selectedOption === 'save' && <h4 className="checkbox-icon">✔</h4>}
          </div>
          <div
            className={`select-option ${selectedOption === 'submit' ? 'selected' : ''}`}
            onClick={() => setSelectedOption('submit')}
            style={{cursor:'pointer'}}
          >
         <h6>   Submit</h6>
            {selectedOption === 'submit' && <h4 className="checkbox-icon">✔</h4>}
          </div>
        </div>
        :
        ""
        }
        {
  data.status=='Saved' &&
          <div className="col d-flex" style={{ justifyContent: "space-around" }}>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        }
    </div>
    </form>
  );
}
