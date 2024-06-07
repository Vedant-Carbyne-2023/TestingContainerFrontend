import React, { useEffect, useState } from "react";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import useGetBlock from "../../../CommonUtitlites/customHooks/useGetBlock";
import useGetGP from "../../../CommonUtitlites/customHooks/useGetGP";
import useGetStores from "../../../CommonUtitlites/customHooks/useGetStore";
import useGetVendors from "../../../CommonUtitlites/customHooks/useGetAllVendors";
import SearchInput from "../../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInput";
import Swal from 'sweetalert2';
import {
  userId,
  role, 
  userName,
} from "../../../CommonUtitlites/Others/commonExportVariable.js";
import EditableTable from "./EditableTable/EditableTable";
import SearchInputVendor from "../../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInputVendor";
import getRTS from "./getRTS";
import useGetCompleteLocations from "../../../CommonUtitlites/customHooks/useGetLocation";
import useGetDateSchema from "../../../CommonUtitlites/customHooks/useGetDateSchema";

export default function ReturnToStore() {

  let {backDate,futureDate,todayDate} = useGetDateSchema();

  let projects = useGetCompleteLocations();

  const [projectSelected, setProjectSelected] = useState({ id: "", name: "" });

  let blocks = useGetBlock(projectSelected.id);

  const [blockSelected, setBlockSelected] = useState({ id: "", name: "" });

  let gps = useGetGP(blockSelected.id);

  const [gpSelected, setGpSelected] = useState({ id: "", name: "" });

  let stores = useGetStores(gpSelected.id);

  const [storeSelected, setStoreSelected] = useState({ id: "", name: "" });

  const [selectedVendor, setSelectedVendor] = useState({ id: "", name: "" });

  let vendors = useGetVendors();

  // console.log(projectSelected, blockSelected, gpSelected, storeSelected, selectedVendor )

  const currentDate = new Date().toISOString().split("T")[0];
  const currentDate1 = new Date();
  currentDate1.setDate(currentDate1.getDate() + 10);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = await getRTS(e);
    data.userId = userId;
    data.role = role;
    let result = api.post("/create-indent", {data, userId, role, userName});
    result = await errorHandler(result);
    Swal.fire(result.data.message);
    // alert(result.data.message);
  };

  const [tableData, setTableData] = useState([]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">

          <SearchInput
            placeholder={"Select Project"}
            items={projects}
            title={"Project"}
            id={"projectDetails"}
            ResultOnClick={(data) => setProjectSelected(data)}
          />

          <SearchInput
            placeholder={"Select Block"}
            items={blocks}
            title={"Block"}
            id={"blockDetails"}
            ResultOnClick={(data) => setBlockSelected(data)}
          />

          <SearchInput
            placeholder={"Select GP"}
            items={gps}
            title={"GP"}
            id={"gpDetails"}
            ResultOnClick={(data) => setGpSelected(data)}
          />

          <SearchInput
            placeholder={"Select Store"}
            items={stores}
            title={"Store"}
            id={"storeDetails"}
            ResultOnClick={(data) => setStoreSelected(data)}
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
