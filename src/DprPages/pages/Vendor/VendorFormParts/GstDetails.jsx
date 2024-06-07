import React, { useState } from "react";
import "./vendorCss.css";

export default function GstDetails() {
  const [gstNumber, setGstNumber] = useState("");
 

  return (
    <div className="form-group">
      <label htmlFor="gstNumber">GST Number</label>

      <div className="input-wrapper">
        <input
          className="form-control"
          placeholder="Enter GST Number"
          type="text"
          name="gstNumber"
          value={gstNumber.toUpperCase()}
          onChange={(e) => setGstNumber(e.target.value)}
        />
        
      </div>
      
      {/* <div className="d-flex px-2 flex-wrap justify-content-between">
        <a
          className={`text-decoration-none ${
            load1 ? "text-primary" : "text-dark"
          }`}
          style={{ cursor: "pointer" }}
          onClick={handleAutomate}
        >
          Click The Link To Verify
        </a>
        <a
          className={`text-decoration-none ${
            imageLoad ? "text-primary" : "text-dark"
          }`}
          style={{ cursor: "pointer" }}
          onClick={handleScreen}
        >
          Click Link To Get Short View
        </a>
      </div> */}

    </div>
  );
}
