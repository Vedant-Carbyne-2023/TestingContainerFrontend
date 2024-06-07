import React, { useState, useEffect } from 'react';
import Calculator from './Calculator';
import { api } from '../../CommonUtitlites/AxiosSetup/axiosDefault';
import {userId, role} from '../../CommonUtitlites/Others/commonExportVariable'
import Swal from 'sweetalert2';
import {errorHandler} from '../../CommonUtitlites/Others/errorHandle'
import useGetUserProject from '../../CommonUtitlites/customHooks/useGetUserProject';
import SearchInputPostgres from '../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInputForPostgresIdIssue';
import useGetVendorsProjectWise from '../../CommonUtitlites/customHooks/useGetProjectWiseVendors';
import SearchInput from '../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInput';
import SearchInputVendor from '../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInputVendor';
import { formatTableDate } from '../../CommonUtitlites/Others/formattingDateAndName';
import ExcelDataExtractor from './ExcelExtractor';
import DownloadExcelFromBase64Button from './DownloadExcel';
export default function JMR() {
  let projects = useGetUserProject();
  const [projectSelected, setProjectSelected] = useState({ id: "", name: "",projectCode:"" });
  const [blockSelected, setBlockSelected] = useState("");
  const [gpSelected, setGpSelected] = useState("");
  const [gps, setGps] = useState([]);
  const [tableData, setTableData] = useState([])
  
  let vendors = useGetVendorsProjectWise(projectSelected.id);
const [vendorCardValue, setVendorCardValue] = useState([])
const [revenueCardValue, setRevenueCardValue] = useState([])



  const [selectedVendor, setSelectedVendor] = useState({ id: "", name: "" });
  const handleProject = async (data) => {
    const selectedProjectId = data.id;
    setSelectedVendor({id:"",name:""})
    setGps([])
    setBlockSelected("")

    let project = projects.find((project) => project.id === selectedProjectId);

    setProjectSelected({ name: project.name, id: project.id, projectCode:project.projectCode });

  
    console.log('project is', project);
    setGps(project.gpName);
  };

  

  const handleGpChange = async (data) => {
    setGpSelected(data);
    console.log('check', data, projectSelected, selectedVendor);

    let response = api.post("/get-block-from-gp", {
      gpId: data.id,
      userId,
      role,
    });
    response = await errorHandler(response);
    console.log('we got',response);
    setBlockSelected(response.data.data);
  };
  
  

  const [formData, setFormData] = useState({
    jmrId: '',
    projectName: '',
    blockName: '',
    gpName: '',
    vendorName: '',
    staff: '',
    dpm: '',
    totalScope: '',
    balance: '',
    balanceDate: '',
    cummulative: '',
    cummulativeDate: '',
    dateInput: '',
    quantity: '',
    progress: '',
    status: '',
  });

  const [revenueRateCard, setRevenueRateCard] = useState([])
  const [vendorRateCard, setVendorRateCard] = useState([])



  const handleSearch = async () => {
    try {
      const response = await api.post("/get-latest-jmr", {
        jmrId: formData.jmrId,
        userId,
        role,
      });
      const responseData = await errorHandler(response);
      console.log(responseData)
      // Now, update the state using the responseData
      const data = responseData.data.data;
      // console.log(data)
      let project = projects.find((proj) => proj.name === data.projectName);
      setProjectSelected({
        id: project.id,
        name: project.name,
        projectCode: project.projectCode,
      });
      console.log(responseData)
      setVendorCardValue(responseData.data.data.vendorRateCard)
      setRevenueCardValue(responseData.data.data.revenueRateCard)

      console.log(vendorCardValue, revenueCardValue)
      // setTableData(responseData.data.tableData)
  
      let vendor = vendors.find((proj) => proj.vendorName === data.vendorName);
      setSelectedVendor({ id: vendor._id, name: vendor.vendorName });

      let gp = project.gpName.find(gp => gp.name === data.gpName)
      setGpSelected({id:gp._id, name:gp.name})
      handleGpChange({id:gp._id, name:gp.name})
      
      
      setFormData({
        jmrId: data.jmrId,
        staff: data.staffName,
        dpm: data.dpmName,
        totalScope: data.totalScope,
        dateInput:data.todaysDate[data.todaysDate.length - 1],
        balance: '',
        cummulative: parseInt(responseData.data.previousBill),
        quantity:'',
        progress: '',
        status: '',
      });
      
      console.log(vendor, projectSelected);
      console.log("State updated successfully");
    } catch (error) {
      // Handle any errors that occur during the API request or state update
      console.error("An error occurred:", error);
    }
  };
  


  const handleChange = (e) => {
    const { name, value } = e.target;
 
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    formData.blockName=blockSelected
    formData.gpName=gpSelected.name
    formData.projectName=projectSelected.name
    formData.vendorName=selectedVendor.name
    formData.balance =  parseInt(formData.totalScope)- parseInt(formData.quantity) - parseInt(formData.cummulative)
    formData.cummulative = parseInt(formData.cummulative)?parseInt(formData.cummulative)+parseInt(formData.quantity) : formData.quantity
    console.log(formData)
    // return;

    console.log(vendorRateCard, revenueRateCard)

    // return;

    handleDownload();
    // Handle form submission here, you can access form data using formData state.
    // console.log('data', formData, data);
    let result = api.post('/create-jmr',{userId,role,formData,tableData, vendorRateCard,revenueRateCard})
    result = await errorHandler(result)
    // console.log('after api call', result);

    Swal.fire({
      title:result.data.message,
      timer:2000
    })
  };

  
  




// call it wherever you want
  const handleDownload = () => {
    // Get form values
    const form = document.getElementById("myForm9");
    const formData = new FormData(form);
    let csvContent = "data:text/csv;charset=utf-8,";

    // Convert form data to CSV format
    formData.forEach(function (value, key) {
      csvContent += `"${key}","${value}"\n`;
    });

    // Create a Blob object for the CSV content
    const blob = new Blob([csvContent], { type: "text/csv" });

    // Create a download link and trigger the download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "form_data9.csv";
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();

    // Clean up the link element and revoke the Blob URL
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    return;
  };

  return (
    <div className="container mt-4">
      <form className="form-grid" id="myForm9" onSubmit={handleSubmit}>
        <h6 className="text-decoration-underline">JMR Form</h6>
        <div className="row mb-0">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="jmrId">JMR Id (Scheme Number)</label>
              <div className="input-group">
                <input
                  id="jmrId"
                  placeholder="JMR Id Scheme Number"
                  name="jmrId"
                  className="form-control"
                  value={formData.jmrId}
                  onChange={handleChange}
                  required
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={handleSearch}
                  >
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="block">Block Name*</label>
              <input
                name="block"
                id="block"
                disabled
                placeholder="Block"
                className="form-control"
                value={blockSelected}
              />
            </div>
            <div className="form-group">
              <SearchInput
                placeholder={"Select GP"}
                required={gpSelected?false:true}
                items={gps}
                title={"Select Gp"}
                id={"gpdetails"}
                ResultOnClick={(data) => handleGpChange(data)}
              />
              <div>
                <label>Gp Selected</label>
                <input className="form-control" disabled value={gpSelected.name} />
              </div>
            </div>
            <div className="form-group">
              <SearchInputVendor
              required={selectedVendor?false:true}
                placeholder={"Select Vendor"}
                items={vendors}
                title={"Vendor"}
                id={"vendorDetails"}
                ResultOnClick={(data) => setSelectedVendor(data)}
              />
              <div>
                <label>Vendor Selected</label>
                <input className="form-control" disabled value={selectedVendor.name} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="totalScope">Total Scope</label>
              <input
                id="totalScope"
                placeholder="Total Scope"
                name="totalScope"
                type="number"
                className="form-control"
                value={formData.totalScope}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="balance">Balance(Total Scope - Cummulative)</label>
              <input
                id="balance"
                disabled
                placeholder="Balance"
                name="balance"
                type="number"
                className="form-control"
                value={
                  formData.totalScope -
                  (formData.cummulative ? parseInt(formData.cummulative) + parseInt(formData.quantity) : parseInt(formData.quantity))
                }
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateInput">Today's Date</label>
              <input
                disabled
                type="date"
                id="dateInput"
                placeholder="Today's Date"
                className="form-control"
                value={formatTableDate(new Date())}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <SearchInputPostgres
                placeholder={"Select Project"}
                required={projectSelected?false:true}
                items={projects}
                title={"Project"}
                id={"projectDetails"}
                ResultOnClick={(data) => handleProject(data)}
              />
              <div>
                <label>Project Selected</label>
                <input disabled className="form-control" value={projectSelected.name} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="staff">Staff Name*</label>
              <select
                className="form-control"
                id="staff"
                name="staff"
                value={formData.staff}
                onChange={handleChange}
                required
              >
                <option value="">Staff Name</option>
                <option value="Staff 1">Staff 1</option>
                <option value="Staff 2">Staff 2</option>
                <option value="Staff 3">Staff 3</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="dpm">DPM Name*</label>
              <select
                className="form-control"
                id="dpm"
                name="dpm"
                value={formData.dpm}
                onChange={handleChange}
                required
              >
                <option value="">DPM Name</option>
                <option value="DPM 1">DPM 1</option>
                <option value="DPM 2">DPM 2</option>
                <option value="DPM 3">DPM 3</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="cummulative">Cummulative</label>
              <input
                id="cummulative"
                placeholder="JMR cumulative for June'23"
                name="cummulative"
                type="number"
                disabled
                className="form-control"
                value={parseInt(formData.cummulative) + parseInt(formData.quantity)}
                onChange={handleChange}
                required
              />
            </div>
            {/* <div className="form-group">
              <label htmlFor="progress">Progress(in %)</label>
              <input
                id="progress"
                placeholder="% Progress"
                name="progress"
                className="form-control"
                value={formData.progress}
                onChange={handleChange}
                required
              />
            </div> */}
            <div className="form-group">
              <label htmlFor="quantity">This Bill Quantity</label>
              <input
                id="quantity"
                placeholder="Quantity"
                name="quantity"
                type="number"
                className="form-control"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <input
                id="status"
                name="status"
                placeholder="Status"
                className="form-control"
                value={formData.status}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

       
  <DownloadExcelFromBase64Button />


        <ExcelDataExtractor  setData = {(data)=>setTableData(data)} 
         setVendorCard={(data)=>setVendorRateCard(data)}
          setRevenueCard={(data)=>setRevenueRateCard(data)}
          revenueCardValue={revenueCardValue}
          vendorCardValue={vendorCardValue}
          
          />
        <div className="d-flex mt-3 mb-3" style={{ justifyContent: 'space-around' }}>
          <button
            id="downloadButton9"
            className="btn btn-outline-primary mx-4"
            type="submit"
          >
            Submit / Download
          </button>
        </div>
      </form>
    </div>
  );
}