import React, { useState, useEffect } from 'react';
import Calculator from './Calculator';
import Swal from 'sweetalert2';
import { api } from '../../CommonUtitlites/AxiosSetup/axiosDefault';
import {userId, role} from '../../CommonUtitlites/Others/commonExportVariable';
import {errorHandler} from '../../CommonUtitlites/Others/errorHandle';
import useGetUserProject from '../../CommonUtitlites/customHooks/useGetUserProject';
import SearchInputPostgres from '../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInputForPostgresIdIssue';
import useGetVendorsProjectWise from '../../CommonUtitlites/customHooks/useGetProjectWiseVendors';
import SearchInput from '../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInput';
import SearchInputVendor from '../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInputVendor';
export default function Hydrotest() {
  let projects = useGetUserProject();
  const [projectSelected, setProjectSelected] = useState({ id: "", name: "",projectCode:"" });
  const [blockSelected, setBlockSelected] = useState("");
  const [gpSelected, setGpSelected] = useState("");
  const [gps, setGps] = useState([]);

  let vendors = useGetVendorsProjectWise(projectSelected.id);
  const [selectedVendor, setSelectedVendor] = useState({ id: "", name: "" });
  const handleProject = async (data) => {
    const selectedProjectId = data.id;
    setSelectedVendor({id:"",name:""})
    setGps([])
    setBlockSelected("")

    let project = projects.find((project) => project.id === selectedProjectId);

    setProjectSelected({ name: project.name, id: project.id, projectCode:project.projectCode });

    // let response = api.post("/get-all-gps", {
    //   locationName: project.name,
    //   userId,
    //   role,
    // });
    // response = await errorHandler(response);
    // console.log(response);
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
    projectName: '',
    block: '',
    gp: '',
    vendorName: '',
    // staff: '',
    dpm: '',
    totalScope: '',
    hydrotestDoneTillDate: '',
    balance: '',
    labour: '',
    dateInput:'', 
    quantity: '',
    cummulative: '',
    labourCount: '',
    cummulativeDate: '',
    balanceDate: '',
    progress: '',
    status: '',
  });

  const [data, setData] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDownload = () => {
    // Get form values
    const form = document.getElementById("myForm8");
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    handleDownload();
    // Handle form submission here, you can access form data using formData state.
    console.log('data',formData, data);
    let result = api.post('/create-edit-hydrotest',{userId,role,formData,tableData:data})
    result = await errorHandler(result)
    console.log('after api', result);

    Swal.fire({
      title:result.data.message,
      timer:2000
    })
  };

  useEffect(() => {
    // Add code to set the current date when the component is mounted
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    // Ensure two-digit format for day and month
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

    // Set the formatted date in the formData
    setFormData((prevData) => ({
      ...prevData,
      dateInput: formattedDate,
    }));
  }, []);

  return (
    <div className="container mt-4">
    <form className="form-grid" id="myForm8" onSubmit={handleSubmit}>
    <h6 className="text-decoration-underline">Hydrotest Form</h6>
      <div className="row mb-0">
          <div className="col-md-6">
          <div className="form-group">
            <SearchInputPostgres
            placeholder={"Select Project"}
            items={projects}
            title={"Project"}
            id={"projectDetails"}
            ResultOnClick={(data) => handleProject(data)}
          />
            </div>
          <div className="form-group">
            <label htmlFor="block">Block Name*</label>
            <input
                name='block'
                id='block'
                disabled
                placeholder="Block"
                className="form-control"
                value={blockSelected}
              />
          </div>
          <div className="form-group">
          <SearchInput
            placeholder={"Select GP"}
            items={gps}
            title={"Select Gp"}
            id={"gpdetails"}
            ResultOnClick={(data) => handleGpChange(data)}
          />
            {/* <label htmlFor="gp">GP Name*</label>
            <select
              className="form-control"
              id="gp"
              name="gp"
              value={formData.gp}
              onChange={handleChange}
              required
            >
              <option value="">GP Name</option>
              <option value="GP 1">GP 1</option>
              <option value="GP 2">GP 2</option>
              <option value="GP 3">GP 3</option>
            </select> */}
          </div>
          <div className="form-group">
           <label htmlFor="totalScope">Total Scope*</label>
           <input
             className="form-control"
             type="text"
             id="totalScope"
             name="totalScope"
             value={formData.totalScope}
             onChange={handleChange}
             placeholder="Total Scope"
             required
           />
         </div>
         
         <div className="form-group">
           <label htmlFor="hydrotestDoneTillDate">Hydrotesting done till date*</label>
           <input
             className="form-control"
             type="date"
             id="hydrotestDoneTillDate"
             name="hydrotestDoneTillDate"
             value={formData.hydrotestDoneTillDate}
             onChange={handleChange}
             placeholder="Hydrotesting done till date"
             required
           />
         </div>
         <div className="form-group">
         <label htmlFor="labour">Labour*</label>
            <input
              className="form-control"
              type="text"
              id="labour"
              name="labour"
              value={formData.labour}
              onChange={handleChange}
              placeholder="Labour"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="quantity">Quantity*</label>
            <input
              className="form-control"
              type="text"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cummulativeDate">Cumulative Done as on Date*</label>
            <input
              className="form-control"
              type="text"
              id="cummulativeDate"
              name="cummulativeDate"
              value={formData.cummulativeDate}
              onChange={handleChange}
              placeholder="Cumulative Done as on Date"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="balanceDate">Balance*</label>
            <input
              className="form-control"
              type="text"
              id="balanceDate"
              name="balanceDate"
              value={formData.balanceDate}
              onChange={handleChange}
              placeholder="Balance"
              required
            />
          </div>
          {/* Add more form fields as needed */}
        </div>
        <div className="col-md-6">
        <div className="form-group">
        <SearchInputVendor
            placeholder={"Select Vendor"}
            items={vendors}
            title={"Vendor"}
            id={"vendorDetails"}
            ResultOnClick={(data) => setSelectedVendor(data)}
          />
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
           <label htmlFor="balance">Balance*</label>
           <input
             className="form-control"
             type="text"
             id="balance"
             name="balance"
             value={formData.balance}
             onChange={handleChange}
             placeholder="Balance"
             required
           />
         </div>
         
         <div className="form-group">
           <label htmlFor="dateInput">Today's Date</label>
           <input
           disabled
             className="form-control"
             type="date"
             id="dateInput"
             name="dateInput"
             value={formData.dateInput}
             onChange={handleChange}
           />
         </div>
         <div className="form-group">
          <label htmlFor="cummulative">Hydrotest cumulative for June'23*</label>
          <input
            className="form-control"
            type="text"
            id="cummulative"
            name="cummulative"
            value={formData.cummulative}
            onChange={handleChange}
            placeholder="Hydrotest cumulative for June'23"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="labourCount">Labour Count*</label>
          <input
            className="form-control"
            type="text"
            id="labourCount"
            name="labourCount"
            value={formData.labourCount}
            onChange={handleChange}
            placeholder="Labour Count"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="progress">% Progress*</label>
          <input
            className="form-control"
            type="text"
            id="progress"
            name="progress"
            value={formData.progress}
            onChange={handleChange}
            placeholder="% Progress"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="status">Status*</label>
          <input
            className="form-control"
            type="text"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            placeholder="Status"
            required
          />
        </div>

        </div>
      </div>
<Calculator data={(data)=>setData(data)}/>

      <div className="d-flex mt-3" style={{ justifyContent: "space-around" }}>
          <button
            className="btn btn-outline-primary mx-4"
            // disabled={verifyGST && verifyPan ? false : true}
            type="submit"
          >
            Submit / Download
          </button>
          </div>
    </form>
    </div>
  );
}
