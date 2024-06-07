import React, { useState } from "react";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import {
  userId,
  role,
  userName,
} from "../../../CommonUtitlites/Others/commonExportVariable";
import Swal from "sweetalert2";
import useGetAllContractors from "../../../CommonUtitlites/customHooks/useGetAllContractors";
import SearchInputVendor from "../../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInputVendor";
export default function AddContractorToBlackList({ setStatus }) {
  let contractors = useGetAllContractors();
  const [contractorId, setContractorId] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let reason = formData.get("reason");

    let result = api.post("/update-contractor-blacklist", {
      contractorId,
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
        <SearchInputVendor
          title={"Contractor Name ( Type Hints To Get Vendor )"}
          placeholder={"Select Contractor"}
          items={contractors}
          ResultOnClick={(data) => setContractorId(data.id)}
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
