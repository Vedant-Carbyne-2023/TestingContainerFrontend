import React, { useEffect, useState } from "react";
import { formatDate } from "../../../CommonUtitlites/Others/formattingDateAndName";
const ShowPurchaseOrder = ({ entry }) => {
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
              <label htmlFor="poDate">Purchase Order Generation Date:</label>
              <input
                disabled
                className="form-control"
                id="poDate"
                name="poDate"
                value={entry.poDate}
                placeholder="Enter the respective field"
              />
            </div>
             
                <div className="form-group">
                  <label htmlFor="msName">Name of M/S:</label>
                  <input
                    className="form-control"
                    id="msName"
                    name="msName"
                    disabled
                    value={entry.msName}
                    placeholder="Enter Name"
                  />
                </div>
                <div className="form-group">
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
                </div>
                <div className="form-group">
                <label htmlFor="gstOfMs">GST Of M/S</label>
    
                  <input
                    disabled
                    className="form-control"
                    type="text"
                    placeholder="Enter GST Of MS"
                    name="gstOfMs"
                    id="gstOfMs"
                    readOnly
                    value={entry.msGst}
                  />
            </div>
              </div>
              <div className="col-md-6">
              <div className="form-group">
              <label htmlFor="projectName">Project Name:</label>
              <input
                disabled
                className="form-control"
                id="projectName"
                name="projectName"
                value={entry.projectName}
                placeholder="Enter the respective field"
              />
              </div>
              <div className="form-group">
              <label htmlFor="poValidity">Validity:</label>
              <input
                disabled
                className="form-control"
                id="poValidity"
                name="poValidity"
                value={entry.poValidity}
                placeholder="Enter the respective field"
              />
              </div>
              <div className="form-group">
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
            </div>
            <div className="form-group">
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
            </div>
            </div>
            </div>
            {/* 1st row end here */}
            <hr />
        <div className="row">
          <div className="col-md-12">
            <div
              className="row"
              style={{ justifyContent: "space-around", alignItems: "center" }}
            >
              <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="subjectPO">Subject:</label>
                <input
                  disabled
                  className="form-control"
                //   style={{ width: "42rem" }}
                  type="text"
                  placeholder="NA"
                  name="subjectPO"
                  id="subjectPO"
                  value={entry.subjectOfPo}
                />
              </div>
              </div>
              <div className="col-md-6">
              <div className="form-group">
              <label htmlFor="refSite">Enter Reference Site:</label>
                <input
                disabled
                  className="form-control"
                  type="text"
                  placeholder="NA"
                  name="refSite"
                  id="refSite"
                  value={entry.referrenceSite}
                />
              </div>
              </div>
            </div>
            <p>Dear Sir,</p>
            <p style={{textAlign:"justify"}}>
              As per telephonic conversation held with you with reference of
              Quotation and final negotiation with you date
              <input
                disabled
                className="form-control form-control-sm"
                style={{ display: "inline-block", width: "auto" }}
                type="date"
                required
                name="quotationDate"
                id="quotationDate"
                value={entry.quotationDate}
              />{" "}
              we are pleased to issuing a purchase order to your firm. The rate
              of material will be as per mention below details.
            </p>
          </div>
        </div>
        {/* 2 row end here */}
        {/* here we will show table data: */}
        <div style={{overflowX:"auto"}}>
           {
            <div className="table-responsive">
            <table className="table" style={tableStyle}>
              <thead className="sticky-thead">
                <tr>
                  <th style={cellStyle} >S.No.</th>
                  <th style={cellStyle} >Material Category</th>
                  <th style={cellStyle} >Material SubCategory</th>
                  <th style={cellStyle} >Material Description</th>
                  <th style={cellStyle} >UOM</th>
                  <th style={cellStyle} >Quantity</th>
                  <th style={cellStyle} >Rate</th>
                  <th style={cellStyle} >Amount</th>
                  <th style={cellStyle} >Sgst</th>
                  <th style={cellStyle} >Sgst Amount</th>
                  <th style={cellStyle} >Cgst</th>
                  <th style={cellStyle} >Cgst Amount</th>
                  <th style={cellStyle} >Igst</th>
                  <th style={cellStyle} >Igst Amount</th>
                  <th style={cellStyle} >Remark</th>
                </tr>
              </thead>
              <tbody>
                {entry &&
                  entry.tableData?.map((indent) => (
                    <tr>
                     
                        <td style={cellStyle}>{indent.sNo}</td>
                        <td style={cellStyle}>{indent.materialCategory}</td>
                      <td style={cellStyle}>{indent.materialSubCategory}</td>
                      <td style={cellStyle}>{indent.materialDescription}</td>
                      <td style={cellStyle}>{indent.uom}</td>
                      <td style={cellStyle}>{indent.quantity}</td>
                      <td style={cellStyle}>{indent.rate}</td>
                      <td style={cellStyle}>{indent.amount}</td>
                      <td style={cellStyle}>{indent.sgst}</td>
                      <td style={cellStyle}>{indent.sgstamount}</td>
                      <td style={cellStyle}>{indent.cgst}</td>
                      <td style={cellStyle}>{indent.cgstamount}</td>
                      <td style={cellStyle}>{indent.igst}</td>
                      <td style={cellStyle}>{indent.igstamount}</td>
                      <td style={cellStyle}>{indent.remark}</td>
                      
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
           }
        </div>
        {/* Terms and Conditions here */}
        <div className="row">
          <div className="col-md-12"> 
            <br />
            <p>Other Terms &amp; Condition:</p>
            <ol>
              <div
                className="row d-flex"
                style={{ paddingBottom: "1rem", alignItems: "center" }}
              >
                <li>
                  Billing Address:{" "}
                  
                </li>
                <textarea
                  disabled
                  type="text"
                  id="billingAddress"
                  style={{textAlign:"justify"}}
                  name="billingAddress"
                  className="form-control"
                  defaultValue={entry.billingAddress}
                />
              
              </div>
              <div
                className="row d-flex"
                style={{ paddingBottom: "1rem", alignItems: "center" }}
              >
                <li>
                  Delivery Address:{" "}
                 
                </li>
                <textarea
                disabled
                style={{textAlign:"justify"}}
                  type="text"
                  id="deliveryAddress"
                  name="deliveryAddress"
                  className="form-control"
                  defaultValue={entry.deliveryAddress}
                />
                {/* <button
                  className="btn btn-primary"
                  style={{ borderRadius: "3rem" }}
                  onclick="changeDeliveryAddress()"
                >
                  Change Address
                </button> */}
              </div>
              
              <div
              className="row d-flex"
              style={{ paddingBottom: "1rem", alignItems: "center" }}
              >
                <li>
                  Secondary Delivery Address (Optional):{" "}
                </li>
                <textarea
                disabled
                style={{textAlign:"justify"}}
                  type="text"
                  id="secondaryDeliveryAddressInput"
                  name="secondaryDeliveryAddressInput"
                  className="form-control"
                  value={entry.secondaryDeliveryAddress}
                />
              </div>
              <div
              className="row d-flex"
              style={{ paddingBottom: "1rem", alignItems: "center" }}
              >
                <li>
                Delivery Terms:{" "}
                </li>
                <textarea
                disabled
                style={{textAlign:"justify"}}
                  type="text"
                  id="deliveryTerms"
                  name="deliveryTerms"
                  className="form-control"
                  value={entry.deliveryTerms}
                />
              </div>
              <div
              className="row d-flex"
              style={{ paddingBottom: "1rem", alignItems: "center" }}
              >
                <li>
                Delivery Time:{" "}
                </li>
                <textarea
                disabled
                style={{textAlign:"justify"}}
                  type="text"
                  id="deliveryTime"
                  name="deliveryTime"
                  className="form-control"
                  value={entry.deliveryTime}
                />
              </div>
              <div
              className="row d-flex"
              style={{ paddingBottom: "1rem", alignItems: "center" }}
              >
                <li>
                Payment Terms:{" "}
                </li>
                <textarea
                disabled
                style={{textAlign:"justify"}}
                  type="text"
                  id="paymentTerms"
                  name="paymentTerms"
                  className="form-control"
                  value={entry.paymentTerms}
                />
              </div>
              <div
              className="row d-flex"
              style={{ paddingBottom: "1rem", alignItems: "center" }}
              >
                <li>
                TPI Status / Others :{" "}
                </li>
                <textarea
                disabled
                style={{textAlign:"justify"}}
                  type="text"
                  id="tpiStatus"
                  name="tpiStatus"
                  className="form-control"
                  value={entry.tpiStatus}
                />
              </div>
              <div
              className="row d-flex"
              style={{ paddingBottom: "1rem", alignItems: "center" }}
              >
                <li>
                Contact At HO:{" "}
                </li>
                <textarea
                disabled
                style={{textAlign:"justify"}}
                  type="text"
                  id="contactAtHeadOffice"
                  name="contactAtHeadOffice"
                  className="form-control"
                  value={entry.contactAtHeadOffice}
                />
              </div>
              <div
              className="row d-flex"
              style={{ paddingBottom: "1rem", alignItems: "center" }}
              >
                <li>
                Quantity &amp; Quality:{" "}
                </li>
                <textarea
                disabled
                style={{textAlign:"justify"}}
                  type="text"
                  id="qualityAndQuantity"
                  name="qualityAndQuantity"
                  className="form-control"
                  value={entry.qualityAndQuantity}
                />
              </div>
              <div
              className="row d-flex"
              style={{ paddingBottom: "1rem", alignItems: "center" }}
              >
                <li>
                Other Term In DPR:{" "}
                </li>
                <textarea
                disabled
                style={{textAlign:"justify"}}
                  type="text"
                  id="otherTermsInDPR"
                  name="otherTermsInDPR"
                  className="form-control"
                  value={entry.otherTermsInDPR}
                />
              </div>
              
              <li>
                Jurisdictions: All disputes and claims will be mutually
                discussed and agreed upon at site level. In case of any
                difference of opinion, the decision of "Contracts Head" of LC
                Infra Project Pvt Ltd shall be final and binding. Arbitrators,
                if needed, shall be appointed by Carbyne Infrastructure Pvt.
                Ltd. in Delhi only. Any further dispute shall be settled in the
                courts of jurisdictions of Delhi. Vendor should dispatch the
                material within a week of TPI, in case of delay 2% deduction
                should be applicable.
              </li>
              <li>
                * Please send the original copy of the Bill to our site office
                and one copy of the Bill to our Corporate Office along with a
                copy of PO.
              </li>
              <li>
                * We reserve the right to amend Items and quantity of items,
                Purchase order as per the requirement of Project/Department.
              </li>
            </ol>
            <p>
              Kindly accept the Purchase Order and its Terms Conditions also
              provide its signed copy with a stamp.
            </p>
          </div>
          {/* <button
            className="btn btn-primary"
            style={{ borderRadius: "3rem", display: "flex", margin: "auto" }}
          >
            Add Transport Bill
          </button>
          <button
            className="btn btn-primary"
            style={{ borderRadius: "3rem", display: "flex", margin: "auto" }}
          >
            Add GST Bill
          </button>
          <button
            className="btn btn-primary"
            style={{ borderRadius: "3rem", display: "flex", margin: "auto" }}
          >
            Add Eway Bill
          </button> */}
        </div>

        </div>
              
        {/* <div>
              <p>PR No.: {entry.prId}</p>
              <p>PR Date: {formatDate(new Date(entry.prDate))}</p>
              <p>Project:{entry.projectName}</p>
              <p>Client Name: {entry.clientName}</p>
              <p>Delivery Address: {entry.deliveryAdd}</p>
              <p>Material Description: {entry.materialDesc}</p>
              <p>Quantity: {entry.quantity}</p>
              <p>Unit: {entry.unit}</p>
              <p>Remark: {entry.remark}</p>
        </div> */}
        </>
     );
}
 
export default ShowPurchaseOrder;