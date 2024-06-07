import React, { useState } from 'react'
import { ImRadioChecked, ImRadioUnchecked } from 'react-icons/im'
import Loader from './Loader/Loader'
import { role, userId, userName } from '../../../CommonUtitlites/Others/commonExportVariable'
import axios from 'axios'
import { errorHandler } from '../../../CommonUtitlites/Others/errorHandle'
import { api } from '../../../CommonUtitlites/AxiosSetup/axiosDefault'

export default function PanDetails({validatePan}) {
    const [panNumber, setPanNumber] = useState("")
    const [verifyPan, setVerifyPan] = useState(false)
    const [panLoading, setPanLoad] = useState(false)
    const [imagePanLoad, setImagePanLoad] = useState(false)

    const [aadhaarVerify, setAadhaarVerify]=useState(false)
const [aadhaarMaskedNumber, setAadhaarMaskedNumber] = useState('')
    const handleVerifyPAN = async (e) => {
      setPanLoad(true)
      let data= {};
      data.panNumber = panNumber;
  
      data.role = role;
      data.userId = userId;
      data.userName = userName;
      
      const headers = {
        'Content-Type': 'application/json', // Example: setting the Content-Type header
        Authorization: localStorage.getItem('token'), // Example: adding an Authorization header
        // Add more headers as needed
      };
    
  
     let result = api.post('/verifyPan', data, {headers})
     result = await errorHandler(result)
  
      console.log(result)
      
  
     if(result.data &&  result.data.data && result.data.data.status === 'VALID' && result.data.data.message === "PAN verified successfully"){
      setPanLoad(false)
      setVerifyPan(true)
      setAadhaarMaskedNumber(result.data.data.masked_aadhaar_number)
      setAadhaarVerify(result.data.data.aadhaar_linked    )
      validatePan(true)
      alert(result.data.data.message)
      alert(`Name On Pan Card is : ${result.data.data.registered_name}`)
     }
     else{
      
      setPanLoad(false)
      setVerifyPan(false)
      validatePan(false)
      alert("Some Error Occured")
      alert(result.data.data.message)
     }
    //  console.log(result)
          
  }


  return (
<>      <div className="form-group">
      <label htmlFor="panNumber">Pan Number</label>

      <div className="input-wrapper">
  <input
    variant="standard"
    className="mb-3 form-control"
    placeholder="Enter Pan Number"
    type="text"
    name="panNumber"
    value={panNumber.toUpperCase()}
    size="medium"
    onChange={(e) => setPanNumber(e.target.value)}
  />
  <button
  type="button"
    onClick={!verifyPan ? handleVerifyPAN : null}
    disabled={verifyPan}
  >
    {verifyPan ? (
      <ImRadioChecked color="green" title="Verified" />
    ) : panLoading ? (
      <Loader />
    ) : (
      <ImRadioUnchecked title="Click to Verify" />
    )}
  </button>
</div>

<input
                className="form-control"
                type="file"
                id="pan_front"
                
                name="pan_front"
              />
              <div className='d-flex' style={{justifyContent:'right', marginTop:'1rem'}}>
              <a href={`https://razorpay.com/gst-number-search/pan/${panNumber.toUpperCase()}`}
              target='blank'
              >
                Validate Pan Via RazorPay
              </a>
              </div>
<label>Masked Aadhaar Number</label>
<div className="input-wrapper">
<input
    variant="standard"
    className="mb-3 form-control"
    placeholder="Masked Aadhaar Number"
    type="text"
    name="aadhaarMaskedNumber"
    readOnly
    value={aadhaarMaskedNumber}
    size="medium"
    id="aadhaarVerify"
  />
    <input type="hidden" id="aadhaarVerify" name="aadhaarVerify" value={aadhaarVerify}/>

  <button
  type="button"
  disabled
  >
    {aadhaarVerify ? (
      <ImRadioChecked color="green" title="Verified" />
    ) : panLoading ? (
      <Loader />
    ) : (
      <ImRadioUnchecked title="Click to Verify" />
    )}
  </button>
</div>


    {/* <div className="d-flex px-2 flex-wrap justify-content-between">
      <a
        className={`text-decoration-none ${
          load2 ? "text-primary" : "text-dark"
        }`}
        style={{ cursor: "pointer" }}
        onClick={handleAutomatePan}
      >
        Click The Link To Verify
      </a>
      <a
        className={`text-decoration-none ${
          imagePanLoad ? "text-primary" : "text-dark"
        }`}
        style={{ cursor: "pointer" }}
        onClick={handleScreenPan}
      >
        Click Link To Get Short View
      </a>
    </div> */}
  </div>
  </>
  )
}
