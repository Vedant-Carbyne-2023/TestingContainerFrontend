import React, { useState } from "react";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import {userId, role, userName} from '../../../CommonUtitlites/Others/commonExportVariable'
import Swal from "sweetalert2";
import useGetAllContractors from "../../../CommonUtitlites/customHooks/useGetAllContractors";
export default function AddContractorToBlackList({ setStatus }) {
  let contractors = useGetAllContractors();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let contractorId = formData.get("contractorId");
    let reason = formData.get("reason");
    
    
    let result = api.post("/update-contractor-blacklist", { contractorId,reason, userName, userId, role });
    result = await errorHandler(result);
    
    if (result.data && result.data.message==true) Swal.fire({title:"Successfully Added To BlackListed", timer:2000});

    setStatus(result.data.data._id);

  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="contractorId">Contractor Name</label>
        <select
          type="text"
          className="form-control"
          placeholder="Enter Vendor Name"
          id="contractorId"
          required
          name="contractorId"
        >
          {
            contractors && contractors.map(contractor=>
              <option value={contractor._id}>{contractor.contractorName}</option>
              )
          }
        </select>
        <label htmlFor="reason">Enter Reason</label>
        <textarea
        
        required
        className="form-control"
        name="reason"
        id="reason"
        
        />

        </div>
      <button className="btn  btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
}
