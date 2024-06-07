import React, { useEffect, useState } from "react";
import { ImRadioUnchecked } from "react-icons/im";
import { ImRadioChecked } from "react-icons/im";
import Loader from "./Loader/Loader";
import "./vendorCss.css";
import { role, userId, userName } from "../../../CommonUtitlites/Others/commonExportVariable";
import axios from "axios";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";

export default function GstDetails({validateGst}) {
  const [gstNumber, setGstNumber] = useState("");
  const [verifyGST, setVerifyGST] = useState(false);
  const [gstLoading, setGstLoad] = useState(false);
  const [load1, setLoad1] = useState(false);
  const [image, setImage] = useState("");
  const [imageLoad, setImageLoad] = useState(false);

  const handleVerifyGST = async (e) => {
    setGstLoad(true);

    let data= {};
    data.gstNumber = gstNumber;

    data.role = role;
    data.userId = userId;
    data.userName = userName;
    
    const headers = {
      'Content-Type': 'application/json', // Example: setting the Content-Type header
      Authorization: localStorage.getItem('token'), // Example: adding an Authorization header
      // Add more headers as needed
    };
  

    try {
      let result = api.post('/verifyGST', data, {headers})
      result = await errorHandler(result)
      
   


    console.log(result)
    

   if(result.data && result.data.data.valid === true && result.data.data.message === "GSTIN Exists"){
     setGstLoad(false)
    setVerifyGST(true)
    validateGst(true)
    alert(`Name of Firm is : ${result.data.data.legal_name_of_business}`)
   }
   else{
    setGstLoad(false)
    setVerifyGST(false)
    validateGst(false)
    alert("Some Error Occured")
    alert(result.data.data.message)
   }
  //  console.log(result)
} catch (error) {
  setGstLoad(false)
  setVerifyGST(false)
  alert(error)
}

  };

  const handleAutomate = async () => {
    // setLoad1(true);

    let data= {};
    data.gstNumber = gstNumber;

    data.role = role;
    data.userId = userId;
    data.userName = userName;
    
    const headers = {
      'Content-Type': 'application/json', // Example: setting the Content-Type header
      Authorization: localStorage.getItem('token'), // Example: adding an Authorization header
      // Add more headers as needed
    };
  

   let result = api.post('/automate', data, {headers})
   result = await errorHandler(result)

    console.log(result)
    
  };

  const handleScreen = async () => {
    let data= {};
    data.gstNumber = gstNumber;

    data.role = role;
    data.userId = userId;
    data.userName = userName;
    
    const headers = {
      'Content-Type': 'application/json', // Example: setting the Content-Type header
      Authorization: localStorage.getItem('token'), // Example: adding an Authorization header
      // Add more headers as needed
    };
  

   let result = api.post('/screenShot', data, {headers})
   result = await errorHandler(result)

    console.log(result)


  };
  const [isGstApplicable, setIsGstApplicable] = useState("true"); // Default to 'yes'


  useEffect(() => {
    if(isGstApplicable=='false'){
      validateGst(true)
    }
    else{
      validateGst(false)
    }
  }, [isGstApplicable])
  

  return (
    <div className="form-group">
      <label htmlFor="gstNumber">GST Number</label>


      <div style={{ marginTop: '1rem' }}>
        <label>Is this vendor/contractor applicable for GST?</label>
        <div>
          <label>
            <input
              type="radio"
              name="gstApplicable"
              value={"true"}
              checked={isGstApplicable === "true"}
              onChange={(e) => setIsGstApplicable(e.target.value)}
            />
            Yes
          </label>
          <label style={{ marginLeft: '1rem' }}>
            <input
              type="radio"
              name="gstApplicable"
              value={"false"}
              checked={isGstApplicable === "false"}
              onChange={(e) => setIsGstApplicable(e.target.value)}
            />
            No
          </label>
        </div>
      </div>

      <div className="input-wrapper">
        <input
          className="form-control"
          placeholder="Enter GST Number"
          type="text"
          name="gstNumber"
          value={gstNumber.toUpperCase()}
          onChange={(e) => setGstNumber(e.target.value)}
          disabled={isGstApplicable !== "true"}
        />
        <button
          type="button"
          className={`end-adornment-button ${!verifyGST ? "clickable" : ""}`}
          onClick={!verifyGST ? handleVerifyGST : null}
          disabled={verifyGST || isGstApplicable !== "true"}
        >
          {verifyGST ? (
            <ImRadioChecked color="green" title="Verified" />
          ) : gstLoading ? (
            <Loader />
          ) : (
            <ImRadioUnchecked title="Click to Verify" />
          )}
        </button>
      </div>

      <div className='d-flex' style={{ justifyContent: 'space-between', marginTop: '1rem' }}>
        <a
          href={`https://razorpay.com/gst-number-search/${gstNumber.toUpperCase()}`}
          target='blank'
          rel="noopener noreferrer"
        >
          Validate GST Via Razor Pay
        </a>
        <a
          href={`https://services.gst.gov.in/services/searchtp`}
          target='blank'
          rel="noopener noreferrer"
        >
          Validate GST Via Official Website
        </a>
      </div>

      
    </div>
  );
}