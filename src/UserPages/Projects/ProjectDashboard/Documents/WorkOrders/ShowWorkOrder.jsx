import React, { useState } from 'react'
import WorkOrderEditableTable from './EditableTable/WorkOrderEditableTable'
import styles from './ShowWorkOrder.module.css'
import { formatDate } from "../../../../../CommonUtitlites/Others/formattingDateAndName";
export default function ShowWorkOrder({workOrder}) {
  
  const [tableData, setTableData] = useState(workOrder.tableData)
  console.log('details of specific workorder',workOrder);

//   const [Edit, setEdit] = useState(true)
  
  const formFields = [
    {
      label: "Scope Of Work",
      id: "scopeOfWork",
    },
    {
      label: "Price Basis",
      id: "priceBasis",
    },
    {
      label: "Taxes and duties",
      id: "taxesAndDuties",
    },
    {
      label: "Payment Terms",
      id: "paymentTerms",
    },
    {
      label: "Work Completion Schedule",
      id: "workCompletionSchedule",
    },
    {
      label: "Key Materials Procurement",
      id: "keyMaterialsProcurement",
    },
    {
      label: "Inspections",
      id: "inspections",
    },
    {
      label: "Defect Liability Period",
      id: "defectLiabilityPeriod",
    },
    {
      label: "Safety Requirements",
      id: "safetyRequirement",
    },
    {
      label: "Statutory Requirement",
      id: "statutoryRequirement",
    },
   
    {
      label: "Dispute - Resolution",
      id: "other",
    },
    {
      label: "Company Provided Materials",
      id: "transportation",
    },
 
    {
      label: "Performance And Termination",
      id: "performanceAndTermination",
    },
  ];

    


//   const [toggle, setToggle] = useState(false)


  return (
          <div className="container mb-5">
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
                    value={workOrder.address}
                    placeholder="Enter Address"
                    rows="3"
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="workOrderDate">Work Order Date.</label>
                  <input
                    type="text"
                    disabled
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
                    placeholder="Enter Email Id"
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
                disabled
                id="subjectOfWorkOrder"
                value={workOrder.subject}
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
                  value={formatDate (new Date(workOrder.quotationDate))}
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
                table={workOrder.tableData}
                tableData={(data)=>setTableData(data)}
                styling={true}
              />
            </div>

            <h6 style={{ margin: "2rem 0rem" }}>Terms and Conditions:</h6>

          {formFields &&
        formFields.map((field, index) => (
          <div className={styles.select_container} key={index}>
            <label htmlFor={field.id}>
              {index + 1}. {field.label}
            </label>
            
            <textarea
            style={{textAlign:"justify"}}
            disabled
              className="form-control"
              id={`textarea_${field.id}`}
              name={`textarea_${field.id}`}
              value={workOrder[field.id]}

            />
          </div>
        ))}
     
         </div>
  )
}


