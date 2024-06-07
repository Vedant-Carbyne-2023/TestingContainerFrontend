import React, { useState } from "react";
import { formatTitle } from '../../CommonUtitlites/Others/formattingDateAndName';
import { api } from '../../CommonUtitlites/AxiosSetup/axiosDefault';
import { errorHandler } from '../../CommonUtitlites/Others/errorHandle';
import {userId, role, userName} from '../../CommonUtitlites/Others/commonExportVariable'
export default function AddStore({ gpId, setStatus }) {
  const [storeName, setStoreName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let storeName = formData.get("storeName");
    let result = api.post("/create-store", { storeName, gpId: gpId.id, userId,role, userName });
    result = await errorHandler(result);
    setStatus(result.data.data._id)
    alert(result.data.message);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="storeName">Store Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Store Name"
          required
          id="storeName"
          name="storeName"
          value={formatTitle(storeName)}
          onChange={(e) => setStoreName(e.target.value)}
        />
      </div>
      <button className="btn  btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
}
