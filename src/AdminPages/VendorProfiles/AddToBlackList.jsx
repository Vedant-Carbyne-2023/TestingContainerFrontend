import React, { useState } from "react";
import { api } from "../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../CommonUtitlites/Others/errorHandle";
import {
  userId,
  role,
  userName,
} from "../../CommonUtitlites/Others/commonExportVariable";
import useGetVendors from "../../CommonUtitlites/customHooks/useGetAllVendors";
import Swal from "sweetalert2";
import SearchInput from "../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInput";
import SearchInputVendor from "../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInputVendor";
export default function AddVendorToBlackList({ setStatus }) {
  let vendors = useGetVendors();
  const [vendorId, setVendorId] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let vendorId = formData.get("vendorId");
    let reason = formData.get("reason");

    let result = api.post("/update-vendor-blacklist", {
      vendorId,
      reason,
      userName,
      userId,
      role,
    });
    result = await errorHandler(result);

    if (result.data && result.data.message == true)
      Swal.fire({ title: "Successfully Added To BlackListed", timer: 2000 });

    setStatus(result.data.data._id);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        {/* <label htmlFor="vendorId">Vendor Name</label> */}
        <SearchInputVendor
          title={"Vendor Name ( Type Hints To Get Vendor )"}
          placeholder={"Select Vendor"}
          items={vendors}
          ResultOnClick={(data) => setVendorId(data.id)}
        />
        <label htmlFor="reason">Enter Reason</label>
        <textarea required className="form-control" name="reason" id="reason" />
      </div>
      <button className="btn  btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
}
