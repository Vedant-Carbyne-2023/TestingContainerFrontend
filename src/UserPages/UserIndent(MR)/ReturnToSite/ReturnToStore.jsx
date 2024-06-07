import React, { useEffect, useState } from "react";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import useGetBlock from "../../../CommonUtitlites/customHooks/useGetBlock";
import useGetGP from "../../../CommonUtitlites/customHooks/useGetGP";
import useGetStores from "../../../CommonUtitlites/customHooks/useGetStore";
import useGetVendors from "../../../CommonUtitlites/customHooks/useGetAllVendors";
import SearchInput from "../../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInput";
import {
  userId,
  role,
} from "../../../CommonUtitlites/Others/commonExportVariable.js";
import EditableTable from "./EditableTable/EditableTable";
import SearchInputVendor from "../../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInputVendor";
import getRTS from "./getRTS";
import useGetCompleteLocations from "../../../CommonUtitlites/customHooks/useGetLocation";
import useGetDateSchema from "../../../CommonUtitlites/customHooks/useGetDateSchema";
import useGetUserProject from "../../../CommonUtitlites/customHooks/useGetUserProject";

export default function ReturnToStore() {

  let projects = useGetUserProject();
  let {backDate,futureDate,todayDate} = useGetDateSchema()
  const [projectSelected, setProjectSelected] = useState({ id: "", name: "",projectCode:"" });
const [storeName, setStoreName] = useState('')
  const [blockSelected, setBlockSelected] = useState("");
  const [gpSelected, setGpSelected] = useState("");
  const [gps, setGps] = useState([]);

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

  const handleProject = async (data) => {
    const selectedProjectId = data.id;

    console.log(selectedProjectId)
    let project = projects.find((project) => project._id === selectedProjectId);
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
  const [selectedVendor, setSelectedVendor] = useState({ id: "", name: "" });

  let vendors = useGetVendors();

  // console.log(projectSelected, blockSelected, gpSelected, storeSelected, selectedVendor )

  const currentDate = new Date().toISOString().split("T")[0];
  const currentDate1 = new Date();
  currentDate1.setDate(currentDate1.getDate() + 10);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // let data = await getRTS(e);
    let data ={}
    data.userId = userId;
    data.role = role;
    data.projectId=projectSelected.id;
    data.gpName = gpSelected.name;
    data.tableData=tableData
   // console.log(data)
   data.userId=userId
   data.role=role
    let result = api.post("/create-createReturnSiteToStore", data);
    result = await errorHandler(result);
    alert(result.data.message);
  };

  const [tableData, setTableData] = useState([]);
  console.log(tableData)

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">

          <SearchInput
            placeholder={"Select Project"}
            items={projects}
            title={"Project"}
            id={"projectDetails"}
            ResultOnClick={(data) => handleProject(data)}
          />

  <label>Block</label>
          <input
          className="form-control"
          value={blockSelected}
          disabled
          />

          <SearchInput
            placeholder={"Select GP"}
            items={gps}
            title={"GP"}
            id={"gpDetails"}
            ResultOnClick={(data) => handleGpChange(data)}
          />

<label>Store</label>
  <input
          className="form-control"
          value={storeName}
          onChange={(e)=>setStoreName(e.target.value)}
          placeholder={"Select Store"}
          id={"storeDetails"}
          />
          

          <SearchInputVendor
            placeholder={"Select Vendor"}
            items={vendors}
            title={"Vendor"}
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

          {/* <div className="form-row">
            <label htmlFor="issue_till_date">Issue till date</label>
            <input
              type="date"
              className="form-control"
              id="issue_till_date"
              name="issue_till_date"
              required
              min={currentDate}
              max={formattedDate}
            />
          </div> */}
          {/* <div className="form-row">
            <label htmlFor="issue_till_date">Issue till date Upto</label>
            <input
              type="date"
              className="form-control"
              id="issue_till_date_to"
              name="issue_till_date_to"
              required
              min={currentDate}
              max={formattedDate}
            />
          </div> */}
          {/* <div className="form-row">
            <label htmlFor="material_reposed">Material Reposed</label>
            <input
              type="date"
              className="form-control"
              name="material_reposed"
              id="material_reposed"
              required
              placeholder="Material Reposed"
              min={currentDate}
            />
          </div>
          <div className="form-row">
            <label htmlFor="material_pending">Material Pending</label>
            <input
              type="text"
              className="form-control"
              name="material_pending"
              id="material_pending"
              required
              placeholder="Material Pending"
            />
          </div>
          <div className="form-row">
            <label htmlFor="material_inventory">Material Inventory</label>
            <input
              type="number"
              className="form-control"
              name="material_inventory"
              id="material_inventory"
              required
              placeholder="Material Inventory"
            />
          </div> */}
          {/* <div className="form-row">
      <label htmlFor="indent_number">Indent Number</label>
      <input type="text" className="form-control" id="indent_number" placeholder="Indent number" readOnly />
    </div> */}
        </div>
        <div className="col d-flex" style={{ justifyContent: "space-around" }}>
      
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
