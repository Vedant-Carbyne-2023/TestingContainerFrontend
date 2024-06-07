import React, { useEffect, useState } from "react";
import styles from './quotation.module.css'
import {
  role,
  userId,
  userName,
} from "../../../../CommonUtitlites/Others/commonExportVariable";
import { api } from "../../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../../CommonUtitlites/Others/errorHandle";
import EditableTableForQuotationShow from "./EditableTableForQuotationShow";
import useGetVendors from "../../../../CommonUtitlites/customHooks/useGetAllVendors";
import SearchInputVendor from "../../../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInputVendor";

function QuotationFormShow({data}) {
const [project, setProject] = useState('')
const [vendor, setVendor] = useState("")

const [tableData, setTableData] = useState([])

useEffect(() => {
  console.log(data)
  setProject(data)
}, [data])

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

  
    const prId = formData.get("prId");
    let data = {};
    data.vendorId = vendor.id;
    data.vendorName = vendor.name;
    data.projectName = project.projectName;
    data.projectId = project.projectCode;
    data.tableData = tableData;
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

// let projects = useGetAllProjectsForAdmin()
let vendors = useGetVendors()
console.log(tableData);

  return (
    <div>
      <form id="form" className="form-grid" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-row">
          <label htmlFor="prId">PR Id</label>
          <input
            type="text"
            className="form-control"
            name="prId"
            value={data.prId}
            id="prId"
            placeholder="PR Id"
            required
          />
        </div>

        <div className="form-row">
        <label htmlFor="projectName">Project Name</label>
          <input
            type="text"
            className="form-control"
            name="projectName"
            value={data.projectName}
            id="projectName"
            placeholder="Project Name"
            required
          />

        </div>

        <div className="form-row">
        <label htmlFor="employeName">Employer Name</label>
          <input
            type="text"
            className="form-control"
            name="employeName"
            value={userName}
            id="employeName"
            placeholder="Employer Name"
            required
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

       

        <EditableTableForQuotationShow tableData={data.tableData} setTableData={(tableData)=>setTableData(tableData)} />

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

export default QuotationFormShow;
