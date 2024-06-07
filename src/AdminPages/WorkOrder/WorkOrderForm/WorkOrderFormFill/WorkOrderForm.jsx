import React, { useEffect, useState } from "react";
import AdminNavbar from "../../../../CommonUtitlites/AdminNavbar/AdminNavbarC";
import { currentDate } from "../../../../CommonUtitlites/Others/commonExportVariable";
import SearchInputVendor from "../../../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInputVendor";
import useGetVendors from "../../../../CommonUtitlites/customHooks/useGetAllVendors";
import WorkOrderEditableTable from "../EditableTable/WorkOrderEditableTable";

import html2pdf from "html2pdf.js";
import { api } from "../../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../../CommonUtitlites/Others/errorHandle";
import CustomModal from "../../../../CommonUtitlites/ModalPopUp/CustomModal";
import Swal from 'sweetalert2';
import Loader from "../../../../CommonUtitlites/Loader/Loader";
import AddTermAndCondition from "../../AddTermAndConditions/AddTermAndCondition";
import styles from "./WorkOrder.module.css";
import {
  userId,
  role,
  userName,
} from "../../../../CommonUtitlites/Others/commonExportVariable";
import useGetVendorsAndContractors from "../../../../CommonUtitlites/customHooks/useGetAllVendorsAndContractors";
import EditTermAndCondition from "../../EditTermAndConditions/EditTermAndCondition";
import LoaderWithModal from "../../../../CommonUtitlites/Loader/LoaderWithModal";
import SearchInput from "../../../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInput";
import useGetAllProjectsForAdmin from "../../../../CommonUtitlites/customHooks/useGetAllProjectsForAdmin";
import useGetDateSchema from "../../../../CommonUtitlites/customHooks/useGetDateSchema";
import { formFields } from "../../../../UserPages/WorkOrder/formFields";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';


export default function WorkOrderForm(props) {

  let [backDate, futureDate, todayDate] = [new Date(), new Date(), new Date()];

// Adjust the dates
backDate.setDate(todayDate.getDate() - 1); // Set backDate to yesterday
futureDate.setDate(todayDate.getDate() + 1); // Set futureDate to tomorrow

  const [vendors, setVendors] = useState([]); 
  // let vendors = useGetVendorsAndContractors();
  const [vendorData, setVendorData] = useState("");
const [projectData, setProjectData] = useState({id:"",name:""})
  const [tableData, setTableData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('save');

  const [addToggle, setAddToggle] = useState("");
  const [loading, setLoading] = useState(false);
  // let allProjects = useGetAllProjectsForAdmin()
  let allProjects = []
  const handleVendorSelect = (data) => {
    let vendor = vendors.find((vendor) => vendor._id === data.id);
    setVendorData(vendor);
    // console.log(vendor);
  };


  // const handleProjectSelect = (data) => {
  //   console.log(data)
  //   // let project = allProjects.find((vendor) => vendor._id === data.id);
  //   // setVendorData(vendor);
  //   console.log(vendor);
  // };

  const [popUp1, setPopUp1] = useState(false);
  const [popUp2, setPopUp2] = useState(false);

// console.log(props.pdfStatus)
  

  
  const [templateId, setTemplateId] = useState("");
  const [templates, setTemplates] = useState([]);

  const [formFieldWithOptions, setFormFieldWithOptions] = useState([
    { fieldId: "", fieldLabel: "", options: "" },
  ]);

  const handleSelectedTemplate = async (id) => {
    if(id==0){
      setTemplateId(0)
      return;}
    // console.log(id)
    setTemplateId(id);
    setFormFieldWithOptions([]);
    let result = api.post(
      `/workorder/get-wo-termsAndConditionTemplate-selectedTemplate`,
      {
        userId,
        role,
        templateId: id,
      }
    );
    result = await errorHandler(result);
    // console.log(result, "hereo");

    const processedFieldIds = new Set();

    const updatedFormFieldWithOptions = await Promise.all(
      formFields.map(async (field) => {
        if (processedFieldIds.has(field.id)) {
          return []; // Skip processing if fieldId is already processed
        }
        processedFieldIds.add(field.id); // Mark fieldId as processe
        const options = result.data.data;
        let resultArray = {
          fieldId: field.id,
          fieldLabel: field.label,
          options: options[field.id],
        };
        return resultArray;
      })
    );

    // Flatten the nested array of options
    const flattenedOptions = updatedFormFieldWithOptions.flat();
    // console.log(flattenedOptions);
    setFormFieldWithOptions(flattenedOptions);
  };

  const handleQuillChange = (fieldId, html) => {
    // Find the index of the object with the matching fieldId
    const fieldIndex = formFieldWithOptions.findIndex(
      (field) => field.fieldId === fieldId
    );
  
    if (fieldIndex !== -1) {
      // Create a copy of the formFieldWithOptions array
      const updatedFormFields = [...formFieldWithOptions];
  
      // Update the object at the specified index with the new HTML content
      updatedFormFields[fieldIndex] = {
        ...updatedFormFields[fieldIndex],
        options: html,
      };
  
      // Set the updated array back to the state
      setFormFieldWithOptions(updatedFormFields);
    }
  };

  useEffect(() => {
    const getTemplateNames = async () => {
      let result = api.post("/workorder/get-wo-termsAndConditionTemplate", {userId,role});
      result = await errorHandler(result);
      // console.log(result);
      setTemplates(result.data.data);
    };
    getTemplateNames();
  }, []);

  const [selectedOptions, setSelectedOptions] = useState({});

  const handleSelectChange = (event, fieldId) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [fieldId]: event.target.value,
    }));
  };

  const handleTextareaChange = (event, fieldId) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [fieldId]: event.target.value,
    }));
  };

//   const companies = [
//     "Select Company",
//     "CARBYNE INFRASTRUCTURE PRIVATE LIMITED",
//     // "LC INFRA PROJECTS PRIVATE LIMITED",
//     "SKYMETTLE BUILDCON PRIVATE LIMITED",
//     // Add more companies here if needed
//   ];

//   const companyAddresses = {
//     "CARBYNE INFRASTRUCTURE PRIVATE LIMITED": {
//       billingAddress: `CARBYNE INFRASTRUCTURE PRIVATE LIMITED: 
// Third Floor, B-11, B Block, Sector 4, Noida, Gautam Buddha Nagar, Uttar Pradesh, 201301, GSTIN 09AACCG0218K1ZR`,
//       deliveryAddress: `CARBYNE INFRASTRUCTURE PRIVATE LIMITED: 
// Third Floor, B-11, B Block, Sector 4, Noida, Gautam Buddha Nagar,Uttar Pradesh, 201301, GSTIN 09AACCG0218K1ZR`,
//     },
//     //     "LC INFRA PROJECTS PRIVATE LIMITED": {
//     //       billingAddress: `LC INFRA PROJECTS PRIVATE LIMITED:
//     // 409 Iscon Elegance Nr. Jain Temple Prahlad Nagar Cross Road,S G Highway, Ahmadabad Gujrat India Pin 380015,   CIN U45209GJ2018PTC103009`,
//     //       deliveryAddress: `LC INFRA PROJECTS PRIVATE LIMITED:
//     // 409 Iscon Elegance Nr. Jain Temple Prahlad Nagar Cross Road,S G Highway, Ahmadabad Gujrat India Pin 380015,   CIN U45209GJ2018PTC103009`,
//     //     },
//     "SKYMETTLE BUILDCON PRIVATE LIMITED": {
//       billingAddress: `SKYMETTLE BUILDCON PRIVATE LIMITED:  
// Khasra No 206, Near Vaishano Dharamkata, Link Road, Main Road, N.H 370 Marg,Post Offce - Shohratgarh, Village - Chahtra, Naugarh, Siddharthnagar, Uttar Pradesh, GSTIN 09ABBCS7752A1ZE`,
//       deliveryAddress: `SKYMETTLE BUILDCON PRIVATE LIMITED: 
// Khasra No 206, Near Vaishano Dharamkata, Link Road, Main Road, N.H 370 Marg,  Post Offce - Shohratgarh, Village - Chahtra, Naugarh, Siddharthnagar, Uttar Pradesh, GSTIN 09ABBCS7752A1ZE`,
//     },
//     // Add more company addresses here if needed
//   };
const [selectedCompany, setSelectedCompany] = useState("");
const [selectedCompanyAddress, setSelectedCompanyAddress] = useState("");
const [billingAddress, setBillingAddress] = useState("");
const [deliveryAddress, setDeliveryAddress] = useState("");
  const [selectedValue, setSelectedValue] = useState("Vendor"); // Initialize with an empty string or your default value

  // Function to handle the select change event
  const handleSelectChange2 = (event) => {
    setSelectedValue(event.target.value);
    // console.log('we chose', event.target.value);
  };
  const handleCheckboxChange = (event) => {
    setSelectedValue(event.target.checked ? "Vendor" : "Contractor");
  };


  useEffect(() => {
    const getVendors = async () => {
      let response;
      if(selectedValue==="Vendor"){
        console.log('we got vendors list');
        response = await api.post('/vendor/get-vendors', { userId, role, userName });
        response = await errorHandler(response);
        if (response.data && response.data.data) {
          setVendors(response.data.data);
          console.log('vens', response.data.data);
        }
      }
      if(selectedValue==="Contractor"){
        console.log('we got contractors list');
        response = await api.post('/get-contractors', { userId, role, userName });
        response = await errorHandler(response);
        if (response.data && response.data.data) {
          setVendors(response.data.data);
          console.log('cons', response.data.data);
        }
      }
    };
    getVendors();
  }, [selectedValue]);

  const handleCompanyChange = (e) => {
    console.log(e.target.value)
    if(e.target.value=="") {
      setSelectedCompany("");
      setBillingAddress("");
      setDeliveryAddress("");
      setSelectedCompanyAddress("");

      return;
    }
    let projectFind = allProjects.find((project)=>project._id === e.target.value)
    console.log(projectFind)
    setSelectedCompany(projectFind.companyName);
    setSelectedCompanyAddress(projectFind.companyAddress);

    setBillingAddress(projectFind.companyBillingAddress);
    setDeliveryAddress(projectFind.companyDeliveryAddress);
  };

  const [workOrderId, setWorkOrderId] = useState("")

  const [toggle, setToggle] = useState(false);
  const handlePDF = async (e) => {
    e.preventDefault();
    // console.log("Herer");
    
    // console.log(e.target);
    let formData = {
      vendorId: vendorData.vendor_code||vendorData.contractor_code,
      vendorName: vendorData.vendorName||vendorData.contractorName,
      projectData:projectData,
      name: e.target.name.value,
      address: e.target.address.value,
      workOrderDate: e.target.workOrderDate.value,
      gstInNo: e.target.gstinNo.value,
      panNo: e.target.panNo.value,
      kindAttn: e.target.kindAttn.value,
      mobileNo: e.target.mobileNo.value,
      emailId: e.target.emailId.value,
      subject: e.target.subjectOfWorkOrder.value,
      quotationDate: e.target.workOrderQuotationDate.value,
      tableData: tableData,
      billingAddress: e.target.billingAddress.value,
      deliveryAddress: e.target.deliveryAddress.value,
      nameOfCompanyInAddress: selectedCompany,
      companyAddress:selectedCompanyAddress,
      role: role,
      userId: userId,
    };
    // console.log(formFieldWithOptions)
    const formFieldWithOptionsObject = formFieldWithOptions.reduce(
      (acc, field) => ({
        ...acc,
        [field.fieldId]: field.options,
      }),
      {}
    );

    formData = {
      ...formData, // Copy the existing properties from formData
      ...formFieldWithOptionsObject, // Merge formFieldWithOptionsObject2
    };

    setLoading(true);

    if(!projectData){
      Swal.fire({
        title:"Please Select Project First",
        timer:3000,
        icon:'warning'
      })
    }
    let result;
    if(selectedOption=='save'){
      result = api.post("/workorder/save-workOrder", formData);
      result = await errorHandler(result);
      console.log('saved', result);
      Swal.fire(result.data.message);
    } else{
      result = api.post("/workorder/create-workOrder", formData);
      result = await errorHandler(result);
      setWorkOrderId(result.data.data.workOrderId)
      props.onDataClick({
        tableData: result.data.data.tableData,
        data: result.data.data,
      });
    }
    // console.log(result);


    setLoading(false);
  };



  
  const handleSendEmail = async(result)=>{

    let response = api.post('/workOrder-sendEmail', {userId, role, workOrderId:workOrderId})
    response = await errorHandler(response)
    // console.log(response.data)
    
    Swal.fire({
      icon:"success",
      title:"Successfully Email Sent",
      message:response.data.message
    })


  }

  return (
    <>
      <h4>
        {" "}
        <center>
          <u>Work Order Form</u>
        </center>
      </h4>

      <div id="form_data">
        {/* <div className="text-center">
          <h6>Work Order</h6>

          <h5> CARBYNE INFRASTRUCTURE PRIVATE LIMITED</h5>
          <p>
            Third Floor. B-11. B Block, Sector 4 Noida, Gautam Buddha Nagar,
            Uttar Pradesh; 201301
          </p>
        </div> */}
        <form onSubmit={handlePDF}>
          <div className="container mb-5">
            <div className="row p-0">
              <div className="col-md-6">
              {/* <div className="form-group"> */}
                {/* <label htmlFor="ven">Choose:</label>
                <select name="ven" value={selectedValue} onChange={handleSelectChange2}>
                  <option value="Vendor">Vendor</option>
                  <option value="Contractor">Contractor</option>
                </select> */}
                {/* <label>
                  Switch Vendor/Contractor:
                  <input
                    type="checkbox"
                    name="ven"
                    checked={selectedValue === "Vendor"}
                    onChange={handleCheckboxChange}
                  />
                </label>
              </div> */}
                <SearchInputVendor
                  title={selectedValue}
                  placeholder={`Select ${selectedValue}`}
                  items={vendors}
                  ResultOnClick={(data) => handleVendorSelect(data)}
                />
             

                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <textarea
                    className="form-control"
                    id="name"
                    name="name"
                    value={vendorData.tradeName}
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
                    defaultValue={vendorData.registeredOfficeAddress}
                    placeholder="Enter Address"
                    rows="3"
                  />
                </div>
                {/* <div className="form-group">
            <label htmlFor="workOrderNo">Work Order No.</label>
            <input
              type="text"
              className="form-control"
              id="workOrderNo"
              name="workOrderNo"
              placeholder="Enter the respective field"
            />
          </div> */}
                <div className="form-group">
                  <label htmlFor="workOrderDate">Work Order Date</label>
                  <input
                    type="date"
                    readOnly={todayDate && (!futureDate && !backDate)}
                    defaultValue={currentDate}
                    // disabled
                    className="form-control"
                    id="workOrderDate"
                    name="workOrderDate"
                    max={backDate?currentDate:""}
                    min={futureDate?currentDate:''}
                    placeholder="Date"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
              <SearchInput
                  title={"Project"}
                  placeholder={"Select Project"}
                  items={allProjects}

                  ResultOnClick={(data) => setProjectData(data)}
                />
                <div className="form-group">
                  <label htmlFor="gstinNo">GSTIN No.</label>
                  <input
                    type="text"
                    className="form-control"
                    id="gstinNo"
                    name="gstinNo"
                    value={vendorData.gstNumber}
                    placeholder="Enter GSTIN No."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="panNo">PAN No.</label>
                  <input
                    type="text"
                    className="form-control"
                    id="panNo"
                    name="panNo"
                    value={vendorData.panNumber}
                    placeholder="Enter PAN No."
                  />
                </div>
                {vendorData.authorizedContactPerson &&
                vendorData.authorizedContactPerson.length > 0 ? (
                  <>
                    <div className="form-group">
                      <label htmlFor="kindAttn">Kind Attn:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="kindAttn"
                        name="kindAttn"
                        defaultValue={
                          vendorData.authorizedContactPerson[0].name
                        }
                        placeholder="Enter Kind Attn:"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="mobileNo">Mob. No</label>
                      <input
                        type="text"
                        defaultValue={
                          vendorData.authorizedContactPerson[0].contactNumber
                        }
                        className="form-control"
                        id="mobileNo"
                        name="mobileNo"
                        placeholder="Enter Mob. No"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="emailId">Email Id</label>
                      <input
                        type="email"
                        className="form-control"
                        defaultValue={
                          vendorData.authorizedContactPerson[0].email
                        }
                        id="emailId"
                        name="emailId"
                        placeholder="Enter Email Id"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="form-group">
                      <label htmlFor="kindAttn">Kind Attn:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="kindAttn"
                        name="kindAttn"
                        placeholder="Enter Kind Attn:"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="mobileNo">Mob. No</label>
                      <input
                        type="text"
                        className="form-control"
                        id="mobileNo"
                        name="mobileNo"
                        placeholder="Enter Mob. No"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="emailId">Email Id</label>
                      <input
                        type="email"
                        className="form-control"
                        id="emailId"
                        name="emailId"
                        placeholder="Enter Email Id"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="row mt-2">
              <label>Subject</label>
              <textarea
                className="form-control"
                placeholder="Please Enter Subject"
                name="subjectOfWorkOrder"
                id="subjectOfWorkOrder"
              ></textarea>
            </div>

            <div className="row mt-2">
              <span style={{ fontSize: "medium", textAlign: "justify" }}>
                Dear sir, As per your quotation dated
                <input
                  className="form-control"
                  style={{
                    width: "auto",
                    display: "inline-block",
                    margin: "1rem",
                  }}
                  type="date"
                  required
                  id="workOrderQuotationDate"
                  name="workOrderQuotationDate"
                />
                and further discussion, We are pleased to issue work order,
                details as under:-
              </span>
            </div>

            <div className="mt-4">
              <WorkOrderEditableTable
                tableData={(data) => setTableData(data)}
              />
            </div>

            <h4 style={{ marginBottom: "2rem" }}>Terms and Conditions:</h4>

            {/* <div>
              <label>1. Scope Of Work</label>
              <select
                className="form-control"
                placeholder="Please Enter Scope Of Work"
                name="scopeOfWork"
                // value={scopeOfWork}
                onChange={(e) => setScopeOfWorkOption(e.target.value)}
              >
                <option>Select Scope Of Work *</option>
                {
                  scopeOfWork && scopeOfWork.map(scope =>
                    
                <option value={scope.value}>
                    {scope.title}
                </option>
                    )
                }


              </select>
              <button
                className="btn my-3 btn-block"
                type="button"
                onClick={() => handleModalOpen("scopeOfWork")}
              >
                Add Option
              </button>

              <textarea
                    style={{ textAlign: "justify" }}
                    className="form-control"
                    id={`textarea_scopeOfWork`}
                    name={`textarea_scopeOfWork`}
                    defaultValue={scopeOfWorkOption}
                  />
            </div> */}

            <select
              className="form-control"
              value={templateId}
              onChange={(e) => handleSelectedTemplate(e.target.value)}
              required
            >
              <option value={0}>Select Template</option>
              {templates.map((template) => (
                <option value={template._id}>{template.name}</option>
              ))}
            </select>
            <button
              className="btn my-3 btn-block"
              type="button"
              onClick={() => setPopUp1(true)}
            >
              Add Template
            </button>
            <button
              className="btn my-3 btn-block"
              type="button"
              onClick={() => setPopUp2(true)}
            >
              Edit Template
            </button>

        {formFieldWithOptions &&
              formFieldWithOptions.map((field, index) => (
                <div className={styles.select_container} key={index}>
                  <label htmlFor={field.fieldId}>
                    {index + 1}. {field.fieldLabel}
                  </label>

                  <div className="form-group">
              <div className="editor-container">
                <ReactQuill
                  defaultValue={field.options}
                  onChange={(html) => handleQuillChange(field.fieldId, html)}
                />
              </div>
            </div>
                  {/* <textarea
                    style={{ textAlign: "justify" }}
                    className="form-control"
                    id={`textarea_${field.fieldId}`}
                    name={`textarea_${field.fieldId}`}
                    defaultValue={field.options || ""}
                    onChange={(e) => handleTextareaChange(e, field.fieldId)}
                  /> */}
                </div>
              ))}

            <div>
              <label htmlFor="project">Select Project </label>
              <select
                id="project"
                // required
                name="project"
                className="form-control mb-4  "
                onChange={handleCompanyChange}
              >
                <option key={""} value={""}>Select Project</option>
                {allProjects.map((project) => (
                  <option key={project._id} value={project._id}>{project.name}</option>
                ))}
              </select>

              {selectedCompany !== "Select Company" && (
                <div className="row">
                  <div className="col-md-4">
                    <h6>Billing Address</h6>
                    <textarea
                      style={{ textAlign: "justify" }}
                      className="form-control"
                      id="billingAddress"
                      name="billingAddress"
                      rows={6}
                      defaultValue={billingAddress}
                    />
                  </div>
                  <div className="col-md-4">
                    <h6>Delivery Address</h6>
                    <textarea
                      style={{ textAlign: "justify" }}
                      className="form-control"
                      id="deliveryAddress"
                      name="deliveryAddress"
                      rows={6}
                      defaultValue={
                        deliveryAddress
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <h3>{selectedCompany}</h3>
                    <p>Authorised Signatory</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <CustomModal
            title={`Add Term And Conditions`}
            isOpen={popUp1}
            onClose={() => setPopUp1(false)}
            size={"large"}
          >
            <AddTermAndCondition
              setToggle={(toggle) => setAddToggle(toggle)}
            />
          </CustomModal>
          <CustomModal
            title={`Edit Term And Conditions`}
            isOpen={popUp2}
            onClose={() => setPopUp2(false)}
            size={"large"}
          >
            <EditTermAndCondition  
              setEdit={(toggle) => setPopUp2(false)}
            />
          </CustomModal>
          {
            loading?
            <LoaderWithModal />
            :

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


                      <div
                      className="d-flex mb-3" style={{justifyContent:"space-around"}}>
                        
          <button
            className="btn "
            style={{ outline: "2px solid black" }}
            type="submit"
          >
            Click To make PDF
          </button>
          {/* {props.pdfStatus !== "" && 
            <button
              className="btn"
              style={{ outline: "2px solid black" }}
              onClick={() => handleSendEmail(props.workOrderId)}
              type="button"
            >
              Email PDF
            </button>
          } */}
</div>
            </div>
         
        }
        </form>

        {/* //containteer */}
      </div>
    </>
  );
}
