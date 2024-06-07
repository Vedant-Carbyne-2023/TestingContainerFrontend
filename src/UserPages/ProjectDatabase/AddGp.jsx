import React, { useState } from "react";
import { formatTitle } from '../../CommonUtitlites/Others/formattingDateAndName';
import { api } from '../../CommonUtitlites/AxiosSetup/axiosDefault';
import { errorHandler } from '../../CommonUtitlites/Others/errorHandle';

export default function AddGp({ blockId, setStatus }) {
  
  const [gpName, setGpName] = useState("");




  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let gpName = formData.get("gpName");
    let schemeNo = formData.get("schemeNo");
    let result = api.post("/create-gp", { gpName, blockId:blockId.id, schemeNo });
    result = await errorHandler(result);
    setStatus(result.data.data._id)
    alert(result.data.message);
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="gpName">GP Name</label>
        <input
          type="text"
          required
          className="form-control"
          placeholder="Enter Gp Name"
          id="gpName"
          name="gpName"
          value={formatTitle(gpName)}
          onChange={(e) => setGpName(e.target.value)}
        />
        <label htmlFor="schemeNo">GP Scheme No</label>
        <input
          type="text"
          required
          className="form-control"
          placeholder="Enter Gp Name"
          id="schemeNo"
          name="schemeNo"
        />
     
      </div>
      <button className="btn  btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
}
