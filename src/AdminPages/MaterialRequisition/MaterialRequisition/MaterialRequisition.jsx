import React, { useEffect, useState } from "react";
import useGetBlock from "../../../CommonUtitlites/customHooks/useGetBlock";
import useGetGP from "../../../CommonUtitlites/customHooks/useGetGP";
import useGetStores from "../../../CommonUtitlites/customHooks/useGetStore";
import useGetVendors from "../../../CommonUtitlites/customHooks/useGetAllVendors";
import getMR from "./getMR";
import SearchInput from "../../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInput";
import { currentDate, role, userId, userName } from "../../../CommonUtitlites/Others/commonExportVariable";
import EditableTable from "./EditableTable/EditableTable";
import SearchInputVendor from "../../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInputVendor";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import useGetCompleteLocations from "../../../CommonUtitlites/customHooks/useGetLocation";
import Swal from 'sweetalert2';
import useGetAllProjectsForAdmin from "../../../CommonUtitlites/customHooks/useGetAllProjectsForAdmin";
import SearchInputPostgres from "../../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInputForPostgresIdIssue";
import useGetVendorsProjectWise from "../../../CommonUtitlites/customHooks/useGetProjectWiseVendors";
import Loader from "../../../CommonUtitlites/Loader/Loader";
import createPDFForMR from "../MakePdf/MakePdfForMR";
import useGetDateSchema from "../../../CommonUtitlites/customHooks/useGetDateSchema";

export default function MaterialRequisition({OnClose, status}) {
  let projects = useGetAllProjectsForAdmin();
  let {backDate,futureDate,todayDate} = useGetDateSchema()
  
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
    setGps(project.gpName);
  };


  const handleGpChange = async (data) => {
    setGpSelected(data);
    // console.log(data);

    let response = api.post("/get-block-from-gp", {
      gpId: data.id,
      userId,
      role,
    });
    response = await errorHandler(response);
    // console.log(response.data.data);
    setBlockSelected(response.data.data);
    setTableData([]);
  };

  const [storeName, setStoreName] = useState("");


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

    let result = api.post("/create-indent", data);
    result = await errorHandler(result);
    console.log(result.data)
    // onDataClick({data:data, indentId:result.data.data.indentId});
    let makePdf = await createPDFForMR(result.data)
    setLoading(false);
    Swal.fire({
      timer:2000,
      title:result.data.message
    })
    status(!submit)
    setSubmit(!submit)
    OnClose(submit)
  };

  // console.log(tableData)

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
