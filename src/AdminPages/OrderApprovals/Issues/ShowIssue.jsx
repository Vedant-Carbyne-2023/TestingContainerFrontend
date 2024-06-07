import React, { useEffect, useState } from "react";
import { formatDate } from "../../../CommonUtitlites/Others/formattingDateAndName";
const ShowIssue = ({ entry }) => {
    console.log('data',entry);
    const tableStyle = {
        border: '1px solid black',
        borderCollapse: 'collapse',
        width: '100%',
      };
      const cellStyle = {
        border: '1px solid black',
      
        padding: '8px',
        textAlign: 'center',
      };
    return ( 
        <>
        <div className="container mb-5">
            <div className="row p-0">
                {/* <h5>{entry.billingAddress}</h5> */}
              <div className="col-md-6">
              <div className="form-group">
              <label htmlFor="issueDate">Issue Generation Date:</label>
              <input
                disabled
                className="form-control"
                id="issueDate"
                name="issueDate"
                value={formatDate(new Date(entry.createdAt))}
                placeholder="Enter the respective field"
              />
            </div>
             
                <div className="form-group">
                  <label htmlFor="errorCode">Error Code:</label>
                  <input
                    className="form-control"
                    id="errorCode"
                    name="errorCode"
                    disabled
                    value={entry.errorCode}
                    placeholder="Enter Name"
                  />
                </div>
                {/* <div className="form-group">
                  <label htmlFor="msAddress">Address of M/S:</label>
                  <textarea
                    className="form-control"
                    id="msAddress"
                    name="msAddress"
                    value={entry.msAddress}
                    placeholder="Enter Address"
                    rows="4"
                    disabled
                  />
                </div> */}
                <div className="form-group">
                <label htmlFor="userName">Submitted By:</label>
    
                  <input
                    disabled
                    className="form-control"
                    type="text"
                    placeholder="Enter GST Of MS"
                    name="userName"
                    id="userName"
                    readOnly
                    value={entry.userName}
                  />
            </div>
              </div>
              <div className="col-md-6">
              <div className="form-group">
              <label htmlFor="screenName">Screen Name:</label>
              <input
                disabled
                className="form-control"
                id="screenName"
                name="screenName"
                value={entry.screenName}
                placeholder="Enter the respective field"
              />
              </div>
              <div className="form-group">
              <label htmlFor="poValidity">Issue Solved:</label>
              <input
                disabled
                className="form-control"
                id="poValidity"
                name="poValidity"
                value={entry.isSolved?'Yes':'No'}
                placeholder="Enter the respective field"
              />
              </div>
              {/* <div className="form-group">
            <label htmlFor="contactPerson">Name Of Contact Person:</label>

              <input
                disabled
                className="form-control"
                type="text"
                placeholder="Name Of Contact Person"
                name="contactPerson"
                id="contactPerson"
                value={entry.contactPersonName}
                />
            </div> */}
            {/* <div className="form-group">
            <label htmlFor="contactPersonMobile">Mob. No. Of Contact Person:</label>

              <input
                disabled
                className="form-control"
                type="text"
                placeholder="Name Of Contact Person"
                name="contactPersonMobile"
                id="contactPersonMobile"
                value={entry.contactPersonMobile}
                />
            </div>
            <div className="form-group">
            <label htmlFor="contactPersonEmail">Email Of Contact Person:</label>

              <input
                disabled
                className="form-control"
                type="text"
                placeholder="Name Of Contact Person"
                name="contactPersonEmail"
                id="contactPersonEmail"
                value={entry.contactPersonEmail}
                />
            </div>
            <div className="form-group">
            <label htmlFor="orderStatus">Order Status:</label>

              <input
                disabled
                className="form-control"
                type="text"
                placeholder="Name Of Contact Person"
                name="orderStatus"
                id="orderStatus"
                value={entry.orderStatus}
                />
            </div> */}
            </div>
            </div>
            {/* 1st row end here */}
            {/* <hr /> */}
        <div className="row p-0">
          <div className="col-md-12">
          <div className="form-group">
                  <label htmlFor="msAddress">Message:</label>
                  <textarea
                    className="form-control"
                    id="msAddress"
                    name="msAddress"
                    value={entry.message}
                    placeholder="NA"
                    rows="2"
                    disabled
                  />
                </div>
          </div>
        </div>
        {/* 2 row end here */}
        {/* Terms and Conditions here */}

        </div>
        </>
     );
}
 
export default ShowIssue;