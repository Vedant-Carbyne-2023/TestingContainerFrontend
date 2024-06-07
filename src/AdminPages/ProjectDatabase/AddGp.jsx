import React, { useState } from "react";
import { formatTitle } from '../../CommonUtitlites/Others/formattingDateAndName';
import { api } from '../../CommonUtitlites/AxiosSetup/axiosDefault';
import { errorHandler } from '../../CommonUtitlites/Others/errorHandle';
import {userId, role, userName} from '../../CommonUtitlites/Others/commonExportVariable'
import Swal from "sweetalert2";

export default function AddGp({ blockId, setStatus }) {
  
  const [gpName, setGpName] = useState("");
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let gpName = formData.get("gpName");
    let result = api.post("/create-gp", { gpName, latitude,longitude, blockId:blockId.id, userId, role, userName });
    result = await errorHandler(result);
    console.log('res', result);
    setStatus(result.data.data._id)
    // alert(result.data.message);
    Swal.fire(result.data.message);
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
      </div>
      <div className="form-group">
        <label htmlFor="gpLatitude">GP Latitude</label>
        <input
          type="number"
          required
          className="form-control"
          placeholder="Enter Gp Latitude"
          id="gpLatitude"
          name="gpLatitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="gpLongitude">GP Longitude</label>
        <input
          type="number"
          required
          className="form-control"
          placeholder="Enter Gp Longitude"
          id="gpLongitude"
          name="gpLongitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
      </div>
      <button className="btn  btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
}
