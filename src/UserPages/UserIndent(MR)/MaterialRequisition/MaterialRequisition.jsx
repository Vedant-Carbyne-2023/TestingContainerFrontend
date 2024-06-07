import React, { useEffect, useState } from "react";
import useGetBlock from "../../../CommonUtitlites/customHooks/useGetBlock";
import useGetGP from "../../../CommonUtitlites/customHooks/useGetGP";
import useGetStores from "../../../CommonUtitlites/customHooks/useGetStore";
import useGetVendors from "../../../CommonUtitlites/customHooks/useGetAllVendors";
import getMR from "./getMR";
import SearchInput from "../../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInput";
import {
  currentDate,
  role,
  userId,
} from "../../../CommonUtitlites/Others/commonExportVariable";
import EditableTable from "./EditableTable/EditableTable";
import SearchInputVendor from "../../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInputVendor";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import useGetUserProject from "../../../CommonUtitlites/customHooks/useGetUserProject";
import SearchInputPostgres from "../../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInputForPostgresIdIssue";
import useGetCompleteLocations from "../../../CommonUtitlites/customHooks/useGetLocation";
import Loader from "../../../CommonUtitlites/Loader/Loader";
import useGetVendorsProjectWise from "../../../CommonUtitlites/customHooks/useGetProjectWiseVendors";
import Swal from "sweetalert2";
import createPDFForMR from "../MakePdf/MakePdfForMR";
import useGetDateSchema from "../../../CommonUtitlites/customHooks/useGetDateSchema";
import useGetContractorsProjectWise from "../../../CommonUtitlites/customHooks/useGetProjectWiseContractors";

export default function MaterialRequisition({ setStatus, OnClose }) {
  let projects = useGetUserProject();
  let {backDate,futureDate,todayDate} = useGetDateSchema()
  const [projectSelected, setProjectSelected] = useState({ id: "", name: "",projectCode:"" });
  const [selectedOption, setSelectedOption] = useState('save');
  const [blockSelected, setBlockSelected] = useState("");
  const [gpSelected, setGpSelected] = useState("");
  const [gps, setGps] = useState([]);

  let vendors = useGetVendorsProjectWise(projectSelected.id);
  let contractors = useGetContractorsProjectWise(projectSelected.id);
console.log(projectSelected.id)
  const handleProject = async (data) => {
    const selectedProjectId = data.id;

    let project = projects.find((project) => project.id === selectedProjectId);

    setProjectSelected({ name: project.name, id: project.id, projectCode:project.projectCode });

    // let response = api.post("/get-all-gps", {
    //   locationName: project.name,
    //   userId,
    //   role,
    // });
    // response = await errorHandler(response);
    // console.log(response);
    setGps(project.gpName);
  };


  const handleGpChange = async (data) => {
    setGpSelected(data);
    console.log(data);

    let response = api.post("/get-block-from-gp", {
      gpId: data.id,
      userId,
      role,
    });
    response = await errorHandler(response);
    console.log(response.data.data);
    setBlockSelected(response.data.data);
    setTableData([]);
  };

  const [storeName, setStoreName] = useState("");
  const [selectedVendor, setSelectedVendor] = useState({ id: "", name: "" });
console.log(contractors)

  const currentDate1 = new Date();
  currentDate1.setDate(currentDate1.getDate() + 10);

  const [tableData, setTableData] = useState([]);

  //Manages Reterival of MR on submit
  const [submit, setSubmit] = useState(false)
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let data = await getMR(e);

    data.userId = userId;
    data.role = role;
    data.tableData = tableData;
    data.project = projectSelected.name;
    data.projectId = projectSelected.id;
    data.projectCode = projectSelected.projectCode;
    data.block = blockSelected;
    data.gp = gpSelected.name;
    data.store = storeName;
    data.vendor = selectedVendor.name;
    let result;
    if(selectedOption=='save'){
      result = api.post("/save-indent", data);
      result = await errorHandler(result);
    
    }
    else 
{
     result = api.post("/create-indent", data);
    result = await errorHandler(result);
  
  }
   
    // onDataClick({data:data, indentId:result.data.data.indentId});
    let makePdf = await createPDFForMR(result.data)
    setLoading(false);
    Swal.fire({
      timer:2000,
      title:result.data.message
    })
    setStatus(!submit)
    setSubmit(!submit)
    OnClose(submit)
  };

  // console.log(tableData)
  const [selectedValue, setSelectedValue] = useState("Vendor"); // Initialize with an empty string or your default value


  const handleCheckboxChange = (value) => {
    setSelectedValue(value); // Update selectedValue state based on checkbox value
  };

  return (
    <>
      { loading?<Loader/>:<form onSubmit={handleSubmit}>
        <div className="form-grid">
          <SearchInputPostgres
            placeholder={"Select Project"}
            items={projects}
            title={"Project"}
            id={"projectDetails"}
            ResultOnClick={(data) => handleProject(data)}
          />


          <label>Block</label>
          <input
            disabled
            placeholder="Block"
            className="form-control"
            value={blockSelected}
          />

          <SearchInput
            placeholder={"Select GP"}
            items={gps}
            title={"Select Gp"}
            id={"gpdetails"}
            ResultOnClick={(data) => handleGpChange(data)}
          />

          <label>Stores</label>
          <input
            placeholder="Select Store"
            className="form-control"
            value={storeName}
            required
            onChange={(e) => setStoreName(e.target.value)}
          />

{/* <div>
  <label>
    Select Vendor:
    <input
      type="checkbox"
      name="vendor"
      checked={selectedValue === "Vendor"}
      onChange={() => handleCheckboxChange("Vendor")}
    />
  </label>

  <label>
    Select Contractor:
    <input
      type="checkbox"
      name="contractor"
      checked={selectedValue === "Contractor"}
      onChange={() => handleCheckboxChange("Contractor")}
    />
  </label>
</div> */}

          <SearchInputVendor
            placeholder={`Select ${selectedValue}`}
            // items={selectedValue=='Vendor'?vendors:contractors}
            items={vendors}
            title={selectedValue}
            id={"vendorDetails"}
            ResultOnClick={(data) => setSelectedVendor(data)}
          />

          <div className="form-row">
            <label htmlFor="date">Date</label>
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
          <EditableTable tableData={(data) => setTableData(data)} />
        </div>
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
    </div>

        <div className="col d-flex" style={{ justifyContent: "space-around" }}>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
      }
    </>
  );
}
