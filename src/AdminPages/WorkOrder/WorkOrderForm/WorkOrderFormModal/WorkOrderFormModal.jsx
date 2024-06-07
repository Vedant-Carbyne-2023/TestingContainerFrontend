import React, { useState,useEffect } from 'react'
import WorkOrderEditableTable from './EditableTable/WorkOrderEditableTable'
import styles from './WorkOrder.module.css'
import { formatDate } from '../../../../CommonUtitlites/Others/formattingDateAndName';
import { role, userId, userName } from '../../../../CommonUtitlites/Others/commonExportVariable';
import { api } from '../../../../CommonUtitlites/AxiosSetup/axiosDefault';
import { errorHandler } from '../../../../CommonUtitlites/Others/errorHandle';
import Swal from 'sweetalert2';
import { formFields } from '../../../../UserPages/WorkOrder/formFields';
import ReactQuill from 'react-quill';
export default function WorkOrderFormModal({workOrder, onDataClick, amend_permission, saved}) {

  //console.log('we have: ', saved, workOrder);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(workOrder); // Initialize with the initial workOrder data.
  const [tableData, setTableData] = useState(workOrder.tableData)
  //console.log('here',tableData)
  const [workOrders, setWorkOrders] = useState([]);
  const [selectedWorkOrderAmend, setSelectedWorkOrderAmend] = useState(workOrder.amend);
  const handleSelectChange = (event) => {
    let amd=parseInt(event.target.value);
    //console.log('selected is: ',amd, typeof(amd));
    setSelectedWorkOrderAmend(event.target.value);
    const reqd=workOrders.find((workOrder) => workOrder.amend === amd);
    // //console.log('got is: ',reqd[0]);
    //console.log('old',workOrder);
    setSelectedWorkOrder(reqd);
    workOrder=reqd;
    //console.log('new',workOrder);
    setTableData(reqd.tableData);
    // Perform any actions you want when a work order is selected.
    //console.log(selectedWorkOrder)
  };
  const getWorkOrder = async () =>{
    // let result = api.post("/workorder/get-all-workOrder-by-id", {workOrderId:workOrder.workOrderId,userId,role,userName})
    let result = api.post("/workorder/get-all-workOrder-by-id", {workOrderId:workOrder.workOrderId,userId,role,userName})
    result=await errorHandler(result)
    //console.log('res is: ',result.data.data);
    // alert(result.data.message)
    setWorkOrders(result.data.data)
    setSelectedWorkOrder(workOrder);
    setTableData(workOrder.tableData);
  }
  useEffect(() => {
    
    getWorkOrder()
  }, [workOrder])

  
  const [Edit, setEdit] = useState(true)

  const [selectedOption, setSelectedOption] = useState('save');
  
  

  const [updatedWorkOrder, setUpdatedWorkOrder] = useState("")
    
  const handleSendEmail = async()=>{
    // //console.log(workOrder, updatedWorkOrder)
    return;
    let response = api.post('/workOrder-sendEmail', {userId, role, workOrderId: updatedWorkOrder?updatedWorkOrder.workOrderId:workOrder.workOrderId, amend:updatedWorkOrder.amend?updatedWorkOrder.amend:workOrder.amend})
    response = await errorHandler(response)
    // //console.log(response.data)
    
    Swal.fire({
      title:"Successfully Email Sent",
      message:response.data.message
    })


  }


  const [toggle, setToggle] = useState(false)

  const handlePDF = async (e) => {
    e.preventDefault();
    // //console.log("Herer");
    // //console.log(e)

    const formData = {
      vendorId: workOrder.vendorId,
      vendorName: workOrder.vendorName,
      workOrderId: workOrder.workOrderId,
      workOrderStatus: 'UnSaved',
      name: e.target.name.value,
      address: e.target.address.value,
      workOrderDate: workOrder.workOrderDate,
      gstInNo: e.target.gstinNo.value,
      panNo: e.target.panNo.value,
      kindAttn: e.target.kindAttn.value,
      // mobileNo: e.target.mobileNo.value,
      emailId: e.target.emailId.value,
      subject: e.target.subjectOfWorkOrder.value,
      quotationDate: e.target.workOrderQuotationDate.value,
      tableData: tableData,
    
      billingAddress: workOrder.billingAddress,
      deliveryAddress: workOrder.deliveryAddress,
      nameOfCompanyInAddress: workOrder.nameOfCompanyInAddress,
      // cipl@123
      role: role,
      userId: userId,
      projectData:
      projectData.id!=""?
      projectData
      :
      {id:workOrder.projectId,
      name:workOrder.projectName }
    };
    const idValuePairs = formFieldWithOptions.reduce((acc, field) => {
      acc[field.id] = field.value;
      return acc;
    }, {});
    
    const formDataWithIdValuePairs = {
      ...formData,
      ...idValuePairs
    };
    //console.log( formDataWithIdValuePairs);

    // return;
    if(saved===true){
      //console.log('we are tring to create from save');
      //console.log('we selected',selectedOption);
      if(selectedOption=='save'){
        //console.log('form data',formData);
        let result = api.post("/save-workOrder", formData);
        result = await errorHandler(result);
        setUpdatedWorkOrder(result.data.data)
        //console.log('saved', result);
        Swal.fire(result.data.message);
        setToggle(!toggle);
      } else{
        //console.log('we will submit here');
        formData.workOrderStatus = 'Saved';
        let result = api.post("/create-workOrder", formData);
        result = await errorHandler(result); 
      }
    } else{
      let result = api.post("/edit-workOrder", formData);
      result = await errorHandler(result);
      // //console.log(result);
      setUpdatedWorkOrder(result.data.data)
      Swal.fire(result.data.message);
      // alert(result.data.message)
      setToggle(!toggle);
      onDataClick({
        tableData: result.data.data.tableData,
        data: result.data.data,
        toggle: toggle,
      });
    }
  };

  const [formFieldWithOptions, setFormFieldWithOptions] = useState([
    { id: "", label: "", value: "" },
  ]);
  // //console.log(formFieldWithOptions)
  useEffect(() => {
    if (workOrder) {
      const updatedFormFieldWithOptions = formFields.map((field) => ({
        id: field.id,
        label: field.label,
        value: workOrder[field.id] || "", // Default value if workOrder[field.id] is undefined
      }));
      setFormFieldWithOptions(updatedFormFieldWithOptions);
    }
  }, [workOrder, formFields]);
  

  const handleQuillChange = (fieldId, html) => {
    const fieldIndex = formFieldWithOptions.findIndex((field) => field.id === fieldId);
  // //console.log(fieldIndex, html)
  const hasMoreThanOneElement = formFieldWithOptions.length > 1;
  const allValuesEmpty = formFieldWithOptions.every(field => field.value === "");
  const isValidToProceed = hasMoreThanOneElement ? !allValuesEmpty : formFieldWithOptions[0]?.value !== "";

  if (fieldIndex !== -1 && isValidToProceed) {
      if (html && html !== formFieldWithOptions[fieldIndex].value) {
        // Only update the state if the content has changed
        setTimeout(() => {
          const updatedFormFields = formFieldWithOptions;
          //console.log(updatedFormFields[fieldIndex])
          updatedFormFields[fieldIndex] = {
            ...updatedFormFields[fieldIndex],
            value: html,
          };
          // //console.log(updatedFormFields);
          setFormFieldWithOptions(updatedFormFields);
        }, 2000); // 2 seconds timeout
      }
    }
  };
  

  return (
    <form onSubmit={handlePDF}>
          <div className="container mb-5">

            <button className='btn mx-auto d-flex'
            disabled={!amend_permission}
            type='button' onClick={()=>setEdit(!Edit)}>Edit Ammends</button>
            <div>
            <label htmlFor="selectWorkOrder">Select Work Order Amend:</label>
                 <select
                   className="form-control"
                   id="selectWorkOrder"
                   name="selectWorkOrder"
                   value={selectedWorkOrderAmend}
                   onChange={handleSelectChange}
                 >
                   <option value="">Select a Amend</option>
                   {workOrders.map((workOrder) => (
                     <option key={workOrder.amend} value={workOrder.amend}>
                       {workOrder.amend}
                     </option>
                   ))}
                 </select>
            </div>
            <div className="row p-0">
              <div className="col-md-6">
               

                  <div className="form-group">
              <label htmlFor="workOrderNo">Work Order No.</label>
              <input
                type="text"
                disabled
                className="form-control"
                id="workOrderNo"
                name="workOrderNo"
                value={workOrder.workOrderId}
                placeholder="Enter the respective field"
              />
            </div>
             
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <textarea
                    className="form-control"
                    id="name"
                    name="name"
                    disabled
                    value={workOrder.vendorName}
                    placeholder="Enter Name"
                    rows="3"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address:</label>
                  <textarea
                    className="form-control"
                    id="address"
                    name="address"
                    defaultValue={workOrder.address}
                    placeholder="Enter Address"
                    rows="3"
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="workOrderDate">Work Order Date.</label>
                  <input
                    type="text"
                    // disabled
                    value={formatDate(new Date(workOrder.workOrderDate))}
                    className="form-control"
                    id="workOrderDate"
                    name="workOrderDate"
                    placeholder="Enter the respective field"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="gstinNo">GSTIN No.</label>
                  <input
                    type="text"
                    className="form-control"
                    id="gstinNo"
                    disabled
                    name="gstinNo"
                    value={workOrder.gstInNo}
                    placeholder="Enter GSTIN No."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="panNo">PAN No.</label>
                  <input
                    type="text"
                    className="form-control"
                    id="panNo"
                    disabled
                    name="panNo"
                    value={workOrder.panNo}
                    placeholder="Enter PAN No."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="kindAttn">Kind Attn:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="kindAttn"
                    disabled
                    name="kindAttn"
                    value={workOrder.kindAttn}
                    placeholder="Enter Kind Attn:"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="mobNo">Mob. No</label>
                  <input
                    type="text"
                    value={workOrder.mobileNo}
                    className="form-control"
                    id="mobNo"
                    disabled
                    name="mobNo"
                    placeholder="Enter Mob. No"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="emailId">Email Id</label>
                  <input
                    type="email"
                    className="form-control"
                    value={workOrder.emailId}
                    id="emailId"
                    disabled
                    name="emailId"
                    placeholder="NA"
                  />
                </div>
              </div>
            </div>

            <div className="row mt-2">
              <label>Subject</label>
              <textarea
                className="form-control"
                placeholder="Please Enter Subject"
                name="subjectOfWorkOrder"
                disabled={Edit?true:false}
                id="subjectOfWorkOrder"
                defaultValue={selectedWorkOrder.subject}
              ></textarea>
            </div>

            <div className="row mt-2">
              <span style={{ fontSize: "medium" }}>
              Dear sir, As per your quotation dated
                <input
                  className="form-control"
                  style={{
                    width: "auto",
                    display: "inline-block",
                    margin: "1rem",
                  }}
                  type="text"
                  required
                  value={formatDate (new Date(selectedWorkOrder.quotationDate))}
                  id="workOrderQuotationDate"
                  name="workOrderQuotationDate"
                />
                and further discussion, We are pleased to issue work order,
                details as under:-
              </span>
            </div>
{/* 
            <div className="mt-4">
              <WorkOrderEditableTable
                data={workOrder.tableData}
              />
            </div> */}
             <div className="mt-4">
              <WorkOrderEditableTable
                table={selectedWorkOrder.tableData}
                tableData={(data)=>setTableData(data)}
                styling={Edit?true:false}
              />
            </div>

            <h6 style={{ margin: "2rem 0rem" }}>Terms and Conditions:</h6>

            {formFieldWithOptions.length > 0 &&
        formFieldWithOptions.map((field, index) =>{ 
          return (
          <div className={styles.select_container} key={index}>
            <label htmlFor={field.id}>
              {index + 1}. {field.label}
            </label>
            
            <div className="form-group">
            <div className="editor-container">
            <ReactQuill
 value={field.value} // Set initial value
 
  onChange={(e) => handleQuillChange(field.id, e)}
  
  readOnly={Edit} // You can set readOnly based on your requirements
  style={{ minHeight: "200px" }}
  // Use dangerouslySetInnerHTML to set the inner HTML
  dangerouslySetInnerHTML={{ __html: field.value }}
/>

            </div>
            </div>


          </div>
        )})}
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
    <div className='d-flex mt-3' style={{justifyContent:"space-around"}}>
        <button className='btn' type='submit'>Submit And Download Pdf</button>
        {/* <button className='btn' type='button' onClick={()=>handleSendEmail()}>Send Email On Registered Mail </button> */}
        </div>
        </div>
     
         </div>
         </form>
  )
}


