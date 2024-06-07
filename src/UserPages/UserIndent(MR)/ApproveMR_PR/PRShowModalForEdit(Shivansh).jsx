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
import EditableTablePR from "../PurchaseRequisition/EditableTablePR/EditableTable";

export default function PRShowModalEdit({ data, onSubmitApprove, setStatus }) {
  // console.log('yashPRshow',data, onSubmitApprove);
  const [submit, setSubmit] = useState(false)
  const [tableData, setTableData] = useState([])
  const [selectedOption, setSelectedOption] = useState('save')
  const [loading, setLoading] = useState(false)
  const handleApprove = async ()=>{
    console.log('Tried to Approve PR');
    console.log(data.prId, onSubmitApprove);
    console.log("Approved");
    let result = api.post('/approve-prEntry', {projectId:data.projectId, prIds:data.prId,  userId, role});
    result = await errorHandler(result);
    console.log(result);
    Swal.fire({
      timer:2000,
      title:result.data.message
    })
    setSubmit(!submit)
    console.log(submit)
    setStatus(submit)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let value ={}
   
    value.prId=data.prId
    value.tableData=tableData
   
    // return;
    let result;
  try {
    
    result = api.post("/edit-prEntry", value);
   result = await errorHandler(result);
   Swal.fire({
    timer:2000,
    icon:'success',
    title:result.data.message
  })

  } catch (error) {
    Swal.fire({
      timer:2000,
      icon:'error',
      title:error
    })
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
        
<EditableTablePR tableData={(value)=>setTableData(value)} data={data.tableData}/>

   

      </div>
      {/* {onSubmitApprove && onSubmitApprove === 'Approved' ? (
        <button className="btn float-right" type="button" onClick={handleApprove}>Approve PR</button>
      ) : null} */}


      
          <div className="col d-flex mt-4" style={{ justifyContent: "space-around" }}>
          <button type="button" onClick={handleSubmit} className="btn btn-primary">
            Submit
          </button>
        </div>
    </div>
    </form>
  );
}
