import React, { useState } from "react";
import { formatTitle } from '../../CommonUtitlites/Others/formattingDateAndName';
import { api } from '../../CommonUtitlites/AxiosSetup/axiosDefault';
import { errorHandler } from '../../CommonUtitlites/Others/errorHandle';
import {userId, role, userName} from '../../CommonUtitlites/Others/commonExportVariable'
import Swal from "sweetalert2";

export default function EditGp({ gp, setStatus }) {
  console.log('in Edit we got', gp);
  
//   const [gpName, setGpName] = useState("");
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // let gpName = formData.get("gpName");
    // let gpName = formData.get("gpName");
    let schemeNo = formData.get("schemeNo");
    console.log(gp.id,gp.name,latitude,longitude);
    let result = api.post("/edit-gp", { gpId: gp.id, latitude, longitude, userId, role, userName, schemeNo });
    result = await errorHandler(result);
    console.log('res',result);
    setStatus(result.data.data._id)
    // alert(result.data.message);
    Swal.fire(result.data.message);
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="gpLatitude">GP Latitude</label>
        <input
          type="text"
          // required
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
          // required
          className="form-control"
          placeholder="Enter Gp Longitude"
          id="gpLongitude"
          name="gpLongitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="schemeNo">GP Scheme No</label>
        <input
          type="number"
          // required
          className="form-control"
          placeholder="Enter Scheme No"
          id="schemeNo"
          name="schemeNo"
          // value={longitude}
          // onChange={(e) => setLongitude(e.target.value)}
        />
      </div>
      <button className="btn  btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
}
