import React, { useState } from "react";
import styles from "./quotation.module.css";

import EditableTableForQuotation from "./EditableTableForQuotation";
import {
  role,
  userId,
  userName,
} from "../../../CommonUtitlites/Others/commonExportVariable";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import useGetAllProjectsForAdmin from "../../../CommonUtitlites/customHooks/useGetAllProjectsForAdmin";
import SearchInputPostgres from "../../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInputForPostgresIdIssue";
import useGetVendors from "../../../CommonUtitlites/customHooks/useGetAllVendors";
import SearchInputVendor from "../../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInputVendor";

function QuotationForm() {
  const [table, setTable] = useState([]);
const [project, setProject] = useState('')
const [vendor, setVendor] = useState("")

  console.log(vendor);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

  
    const prId = formData.get("prId");
    let data = {};
    data.vendorId = vendor.id;
    data.vendorName = vendor.name;
    data.projectName = project.name;
    data.projectId = project.id;
    data.tableData = table;
    data.userId = userId;
    data.role = role;
    data.userName = userName;
    data.prId = prId;

    console.log(data)

    let result = api.post('/create-quotation', data);
    result = await errorHandler(result);
    console.log(result);
    alert(result.data.message)
    return;
  };

  const [isContractor, setIsContractor] = useState(true);

  const handleToggle = () => {
    setIsContractor(!isContractor);
  };

let projects = useGetAllProjectsForAdmin()
let vendors = useGetVendors()


  return (
    <div>
      <form id="form" className="form-grid" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-row">
          <label htmlFor="prId">PR Id</label>
          <input
            type="text"
            className="form-control"
            name="prId"
            id="prId"
            placeholder="PR Id"
            required
          />
        </div>
        <div className="form-row">
          
         <SearchInputPostgres
         title={"Projects"}
         placeholder={"Select Project"}
         items={projects} 
         ResultOnClick={(data)=>setProject(data)}
         />
        </div>

        <div className={`${styles.formCheck} ${styles.formSwitch}`}>
          <input
            type="checkbox"
            className={`${styles.formCheckInput} ${styles.sliderCheckbox}`}
            style={{ display: "none" }}
            id="toggleSwitch"
            checked={isContractor}
            onChange={handleToggle}
          />
          <label
            className={`${styles.formCheckLabel} ${styles.slider}`}
            htmlFor="toggleSwitch"
          >
            {/* {isContractor ? 'Switch to Vendor' : 'Switch to Contractor'} */}
          </label>
        </div>
        {/* <span>
          {" "}
          Toggle To {isContractor ? "Switch to Vendor" : "Switch to Contractor"}
        </span> */}

        <SearchInputVendor
        title={`Select ${isContractor ? "Switch to Vendor" : "Switch to Contractor"}`}
        placeholder={`Select ${isContractor ? "Switch to Vendor" : "Switch to Contractor"}`}
        items={vendors}
        ResultOnClick={(data)=>setVendor(data)}
        />

        <EditableTableForQuotation setTableData={(data) => setTable(data)} />

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <button className="btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default QuotationForm;
