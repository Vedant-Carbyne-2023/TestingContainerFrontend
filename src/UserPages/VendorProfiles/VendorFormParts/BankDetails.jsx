import React, { useState } from "react";
import {ImRadioUnchecked} from 'react-icons/im'
import {ImRadioChecked} from 'react-icons/im'
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import {role, userId, userName} from '../../../CommonUtitlites/Others/commonExportVariable'
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import axios from "axios";
import Loader from "./Loader/Loader";
export default function BankDetails({validateBank}) {
  const [bankInfo, setBankInfo] = useState({
    bankAccName: "",
    bankAccNo: "",
    bankIfscNo: "",
  });
  const [verifyBankInfo, setverifyBankInfo] = useState(false)
  const [bankInfoLoading, setBankInfoLoading] = useState(false);
  const [load1, setLoad1] = useState(false);


  const handleVerifyBankInfo = async (e) => {
    setBankInfoLoading(true)

    if (bankInfo.bankAccName === "" || bankInfo.bankAccNo === "" || bankInfo.bankIfscNo === "") {
        alert("Please Enter Correct Info")
        return;
    }

    let data= {};
    data.bankAccName = bankInfo.bankAccName;
    data.bankAccNo = bankInfo.bankAccNo;
    data.bankIfscNo = bankInfo.bankIfscNo;
    data.role = role;
    data.userId = userId;
    data.userName = userName;
    
    const headers = {
      'Content-Type': 'application/json', // Example: setting the Content-Type header
      Authorization: localStorage.getItem('token'), // Example: adding an Authorization header
      // Add more headers as needed
    };
  

    let result = api.post('/verifyBankInfo', data, {headers})
   result = await errorHandler(result)

    console.log(result.data.data)

   if(result.data && result.data.data.accountStatus === "VALID" && result.data.data.accountStatusCode === "ACCOUNT_IS_VALID" && result.data.data.status === "SUCCESS"){
    setverifyBankInfo(true)
    validateBank(true)
    if(data.bankAccName!=result.data.data.data.nameAtBank){
      alert(`Account Holder Name Is ${result.data.data.data.nameAtBank} Please correct in Input Field`)
    }

    alert(result.data.data.message)
    setBankInfoLoading(false)
   }
   else{
    setverifyBankInfo(false)
    validateBank(false)
    alert("Some Error Occured")
    alert(result.data.data.message)
    setBankInfoLoading(false)
   }
  //  console.log(result)
        
}

  return (
    <div className="container">
      <h6 className="text-decoration-underline my-3">
        Bank Details

        <button onClick={handleVerifyBankInfo} disabled={verifyBankInfo} type="button">
          {verifyBankInfo ? (
            <ImRadioChecked color="green" title="Verified" />
          ) : bankInfoLoading?(<Loader/>):
          
          (
            <ImRadioUnchecked title="Click to Verify Bank Info" />
          )}
        </button>
      </h6>

      <div className="form-group">
        <div className="form-group">
          <label htmlFor="accountHolderName">Account Holder Name</label>
          <input
            className="form-control"
            placeholder="Enter Bank Account Holder Name"
            type="text"
            name="accountHolderName"
            value={bankInfo.bankAccName.toUpperCase()}
            onChange={(e) =>
              setBankInfo((acc) => ({ ...acc, bankAccName: e.target.value }))
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="accountNumber">Account Number</label>
          <input
            className="form-control"
            placeholder="Enter Bank Account Number"
            type="tel"
            name="accountNumber"
            value={bankInfo.bankAccNo}
            onChange={(e) =>
              setBankInfo((acc) => ({ ...acc, bankAccNo: e.target.value }))
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="ifscCode">IFSC Number</label>
          <input
            className="form-control"
            placeholder="Enter IFSC Code"
            type="text"
            name="ifscCode"
            value={bankInfo.bankIfscNo.toUpperCase()}
            onChange={(e) =>
              setBankInfo((acc) => ({ ...acc, bankIfscNo: e.target.value }))
            }
          />
        </div>
      </div>
    </div>
  );
}
