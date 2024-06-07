import React, { useState } from "react";
import Loader from "./Loader/Loader";
import { role, userId, userName } from "../../../CommonUtitlites/Others/commonExportVariable";
import axios from "axios";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";

export default function UidDetails({validateAadhaar}) {
  const [uidNumber, setUidNumber] = useState("");
  const [uidLoading, setUidLoad] = useState(false);
  const [verifyUid, setVerifyUid] = useState(false);

  const [verifyOtp, setVerifyOtp] = useState(false);
  const [enterOtp, setEnterOtp] = useState(false);

  const [otpLoading, setOtpLoad] = useState(false);
  const [otp, setOtp] = useState("");
  const [refId, setRefId] = useState("");

  const handleVerifyUid = async (e) => {
    setUidLoad(true)
    let data= {};
    data.uidNumber = uidNumber;

    data.role = role;
    data.userId = userId;
    data.userName = userName;
    
    const headers = {
      'Content-Type': 'application/json', // Example: setting the Content-Type header
      Authorization: localStorage.getItem('token'), // Example: adding an Authorization header
      // Add more headers as needed
    };
  

   let result = api.post('/verifyUid', data, {headers})
   result = await errorHandler(result)

    console.log(result)
    

   if(result.data && result.data.data.status ==="SUCCESS"){
     setEnterOtp(true)
     setRefId(result.data.data.ref_id)
    // setOtpLoad(true)
    alert(result.data.data.message)
   }
   else{
    setUidLoad(false)
    alert("Some Error Occured")
    alert(result.data.data.message)
   }
   console.log(result)

}


const handleVerifyOtp = async (e) => {
    setOtpLoad(true)
    let data= {};
    data.ref_id = refId;
    data.otp = otp;

    data.role = role;
    data.userId = userId;
    data.userName = userName;
    
    const headers = {
      'Content-Type': 'application/json', // Example: setting the Content-Type header
      Authorization: localStorage.getItem('token'), // Example: adding an Authorization header
      // Add more headers as needed
    };
  

   let result = api.post('/verifyOtp', data, {headers})
   result = await errorHandler(result)

    // console.log(result)
    

   if(result.data && result.data.data.status ==="VALID" && result.data.data.message=="Aadhaar Card Exists"){
     alert(result.data.data.message)
     alert(`Name on Aadhaar Card is ${result.data.data.name}`)
    setOtpLoad(false)
    setUidLoad(false)
    setVerifyUid(true)
    validateAadhaar(true)
    setEnterOtp(false)
   }
   else{
    setOtpLoad(false)
    alert("Some Error Occured")
    validateAadhaar(false)
    alert(result.data.code)
    alert(result.data.message)
   }
  //  console.log(result)

}

console.log(enterOtp)
 
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

        <div className="end-adornment">
          <button
          type="button"
            onClick={!verifyUid ? handleVerifyUid : null}
            disabled={verifyUid}
          >
            {verifyUid ? (
              <span
                className="check-circle"
                style={{ color: "green" }}
                title="Verified"
              >
                &#10004;
              </span>
            ) : uidLoading ? (
              <Loader />
            ) : (
              <span className="radio-off" title="Click to Verify">
                &#9675;
              </span>
            )}
          </button>
        </div>
      </div>


      <div style={{display:enterOtp?"block":"none"}}>
     
        <label>Enter OTP</label>
        <div className="input-wrapper">
      <input
        className="form-control"
        placeholder="Enter OTP"
        type="tel"
        name="otp"
        value={otp}
        onChange={(e)=>setOtp(e.target.value)}
        style={{ display: enterOtp ? 'block' : 'none' }}
      />

      <div className="end-adornment">
        <button
        type="button"
          onClick={!verifyOtp ? handleVerifyOtp : null}
          disabled={verifyOtp}
        >
          {verifyOtp ? (
            <span className="check-circle" style={{ color: 'green' }} title="Verified">&#10004;</span>
          ) : otpLoading ? (
            <Loader />
          ) : (
            <span className="radio-off" title="Click to Verify">&#9675;</span>
          )}
        </button>
      </div>
    </div>
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
