import React, { useState } from "react";


export default function UidDetails() {
  const [uidNumber, setUidNumber] = useState("");


  



  return (
    <>
      {" "}
      <label htmlFor="aadhaarNumber">Aadhaar Number</label>
      <div className="input-wrapper">
        <input
          className="form-control"
          placeholder="Enter Aadhaar Number"
          type="text"
          name="aadhaarNumber"
          value={uidNumber}
          onChange={(e) => setUidNumber(e.target.value)}
        />

       
      </div>


      


      <label htmlFor="aadhaar_front">Upload Front of Adhaar </label>
      <input
        className="form-control"
        type="file"
        id="aadhaar_front"
        name="aadhaar_front"
      />
      <label htmlFor="aadhaar_back">Upload Back of Adhaar </label>
      <input
        className="form-control"
        type="file"
        id="aadhaar_back"
        name="aadhaar_back"
      />
    </>
  );
}
