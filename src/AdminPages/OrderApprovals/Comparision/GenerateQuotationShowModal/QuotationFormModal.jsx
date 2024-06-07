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
import { error } from "jquery";

function QuotationFormShowModal({data}) {
const [vendor, setVendor] = useState("")



  
console.log(data)
 

  return (
    <div>
     {
     data &&
     
     <div id="form" className="form-grid">
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
            value={data.employer}
            id="employeName"
            placeholder="Employer Name"
            required
          />

        </div>

     

        <div className="form-row">
        <label htmlFor="vendorName"> Vendor Or Contractor</label>
          <input
            type="text"
            className="form-control"
            name="vendorName"
            value={data.vendorName}
            id="vendorName"
            placeholder="Vendor Name"
            required
          />

        </div>
       

        <EditableTableForQuotationShow tableData={data.tableData} />

      </div>}
    </div>
  );
}

export default QuotationFormShowModal;
