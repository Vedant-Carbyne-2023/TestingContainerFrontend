import React, { useEffect, useState } from "react";
import ShowDataTable from "./ShowDataTableByEditorJs";
import { formatDate } from "../../../CommonUtitlites/Others/formattingDateAndName";
import { userId, role } from "../../../CommonUtitlites/Others/commonExportVariable";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import Swal from "sweetalert2";
import EditableTable from "../MaterialRequisition/EditableTable/EditableTable";
import getMR from "../MaterialRequisition/getMR";
import createPDFForMR from "../MakePdf/MakePdfForMR";

export default function MrnShowModal({ data, onSubmitRecommend, onSubmitApprove, setStatus }) {
  // console.log('yashshow',data, onSubmitRecommend, onSubmitApprove);
  const [submit, setSubmit] = useState(false)
  const [tableData, setTableData] = useState([])
  const handleRecommend = async ()=>{
    // console.log('Tried to Recommend MR');
    // console.log(data.indentId, onSubmitRecommend);
    // console.log("Not Approved");
    let result = api.patch('/edit-indent', {indentId:data.indentId, userId,role, status: onSubmitRecommend});
    result = await errorHandler(result);
    Swal.fire({
      timer:3000,
      title:"Material Requisition Recommended",
      icon:"success",
    })
    setStatus(submit)
    setSubmit(!submit)
    
  }
  const handleApprove = async ()=>{
    // console.log('Tried to Approve MR');
    // console.log(data.indentId, onSubmitApprove);
    // console.log("Approved");
    let result = api.patch('/edit-indent', {indentId:data.indentId, status: onSubmitApprove, userId, role});
    result = await errorHandler(result);
    // console.log(result);
    // alert(result.data.message);
    Swal.fire({
      timer:3000,
      icon:"success",
      title:"Material Requisition Approved",
      // title:result.data.message
    })
    setStatus(submit)
    setSubmit(!submit)
  }

  const [selectedOption, setSelectedOption] = useState('save')
const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let value = await getMR(e);
    console.log(data)
    value.userId = userId;
    value.role = role;
    value.tableData = tableData;
    value.indentId=data.indentId
    value.indentStatus=data.indentStatus
    value.block=data.block
    value.gp=data.gp
    value.date=data.indentDate
    value.project=data.project
    value.projectId=data.projectId
    value.vendor=data.vendor
    value.store=data.store

    console.log(value)
    // return;
    let result;
    if(selectedOption=='save'){
      result = api.post("/save-indent", value);
      result = await errorHandler(result);
    
    }
    else 
{
     result = api.post("/create-indent", value);
    result = await errorHandler(result);
  
  }
   
    // onDataClick({data:data, indentId:result.data.data.indentId});
    let makePdf = await createPDFForMR(result.data)
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
              <label htmlFor="indentId">Indent/MR No.</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Indent/MR No."
                id="indentId"
                name="indentId" 
                disabled={data.indentStatus=='Saved'}
                value={data.indentId}
              />
            </div>
            <div className="form-group">
              <label htmlFor="indentDate">Indent Date</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Indent Date"
                id="indentDate"
                disabled={data.indentStatus=='Saved'}
                name="indentDate"
                value={formatDate(new Date(data.indentDate))}
              />
            </div>
            <div className="form-group">
              <label htmlFor="indentStatus">MR Status</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter MR Status"
                id="indentStatus"
                disabled={data.indentStatus=='Saved'}
                name="indentStatus"
                value={data.indentStatus}
              />
            </div>
            <div className="form-group">
              <label htmlFor="vendor">Vendor</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Vendor"
                id="vendor"
                disabled={data.indentStatus=='Saved'}
                name="vendor"
                value={data.vendor}
              />
            </div>
            <div className="form-group">
              <label htmlFor="preparedBy">Prepared By</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Prepared By"
                id="preparedBy"
                disabled={data.indentStatus=='Saved'}
                name="preparedBy"
                value={data.preparedBy}
              />
            </div>
            {
              data.approvedBy 

              &&

            <div className="form-group">
              <label htmlFor="approvedBy">Approved By</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Remark"
                id="approvedBy"
                name="approvedBy"
                value={data.approvedBy}
              />
            </div>
        }
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="block">Block</label>
              <input
                type="text"
                disabled={data.indentStatus=='Saved'}
                className="form-control"
                placeholder="Enter Block"
                id="block"
                name="block"
                value={data.block}
              />
            </div>
            <div className="form-group">
              <label htmlFor="gp">GP</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter GP"
                id="gp"
                disabled={data.indentStatus=='Saved'}
                name="gp"
                value={data.gp}
              />
            </div>
            <div className="form-group">
              <label htmlFor="store">Store</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Store"
                id="store"
                disabled={data.indentStatus=='Saved'}
                name="store"
                value={data.store}
              />
            </div>

            <div className="form-group">
              <label htmlFor="remark">Remark</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Remark"
                id="remark"
                name="remark"
                value={data.remark}
              />
            </div>
            {
              data.recommendedBy 

              &&

            <div className="form-group">
              <label htmlFor="recommendedBy">Recommended By</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Remark"
                id="recommendedBy"
                name="recommendedBy"
                value={data.recommendedBy}
              />
            </div>
        }
           
          </div>
        </div>
        {
data.indentStatus=='Saved'
?
<EditableTable tableData={(value)=>setTableData(value)} data={data.tableData}/>
:
        <ShowDataTable data={data} />
        }

      </div>
      {onSubmitRecommend && onSubmitRecommend === 'Not Approved' ? (
        <button className="btn float-right" type="button" onClick={handleRecommend}>Recommend MR</button>
      ) : null}
      {onSubmitApprove && onSubmitApprove === 'Approved' ? (
        <button className="btn float-right" type="button" onClick={handleApprove}>Approve MR</button>
      ) : null}
    <div>
        {
          data.indentStatus=='Saved'?
          <div>
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
        <div className="col d-flex" style={{ justifyContent: "space-around" }}>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      </div>
        :
        ""
        }
    </div>
    </div>
    </form>
  );
}

{
  /* <p>Rate: {entry.rate}</p>
<p>Tax Rate: {entry.taxRate}</p>
<p>Discount: {entry.discount}</p>
<p>Total: {entry.total}</p> */
}
{/* <div className="form-group">
<label htmlFor="itemName">Item Name</label>
<input
  type="text"
  className="form-control"
  placeholder="Enter Item Name"
  id="itemName"
  name="itemName"
  value={data.itemName}
/>
</div>
<div className="form-group">
<label htmlFor="inventoryCategory">Inventory Category</label>
<input
  type="text"
  className="form-control"
  placeholder="Enter Inventory Category"
  id="inventoryCategory"
  name="inventoryCategory"
  value={data.inventoryCategory}
/>
</div> */}