import React, { useState } from "react";
export default function BankDetails() {
  const [bankInfo, setBankInfo] = useState({
    bankAccName: "",
    bankAccNo: "",
    bankIfscNo: "",
  });



  
  return (
    <div className="container">
      <h6 className="text-decoration-underline my-3">
        Bank Details

       
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
