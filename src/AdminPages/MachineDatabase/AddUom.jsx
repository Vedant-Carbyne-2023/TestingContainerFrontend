import React, { useState } from "react";
import { api } from "../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../CommonUtitlites/Others/errorHandle";
import {userId, role} from '../../CommonUtitlites/Others/commonExportVariable'
export default function AddUom({ setStatus }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let uomName = formData.get("uomName");
    let result = api.post("/create-uom", { uomName, userId, role });
    result = await errorHandler(result);

    setStatus(result.data.data._id);

    if (result.data && result.data.message) alert(result.data.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="uomName">UOM</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter UOM Name"
          id="uomName"
          name="uomName"
        />
      </div>
      <button className="btn  btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
}
