import React, { useState } from "react";
import { api } from "../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../CommonUtitlites/Others/errorHandle";
import {userId, role, userName} from '../../CommonUtitlites/Others/commonExportVariable'
import useGetVendors from "../../CommonUtitlites/customHooks/useGetAllVendors";
import Swal from "sweetalert2";
export default function AddVendorToBlackList({ setStatus }) {
  let vendors = useGetVendors();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let vendorId = formData.get("vendorId");
    let reason = formData.get("reason");
    
    
    let result = api.post("/update-vendor-blacklist", { vendorId,reason, userName, userId, role });
    result = await errorHandler(result);
    
    if (result.data && result.data.message==true) Swal.fire({title:"Successfully Added To BlackListed", timer:2000});

    setStatus(result.data.data._id);

  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="vendorId">Vendor Name</label>
        <select
          type="text"
          className="form-control"
          placeholder="Enter Vendor Name"
          id="vendorId"
          required
          name="vendorId"
        >
          {
            vendors && vendors.map(vendor=>
              <option value={vendor._id}>{vendor.vendorName}</option>
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
