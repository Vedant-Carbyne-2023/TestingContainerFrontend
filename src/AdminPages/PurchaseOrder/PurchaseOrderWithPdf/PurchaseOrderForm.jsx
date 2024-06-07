import React, { useEffect, useState } from "react";
// import { calculateRowAmount, setCGST, setIGST, setSGST } from './pOf.js'

import EditableTable from "./EditableTable.jsx";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle.js";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault.js";
import { currentDate, role, userId, userName } from "../../../CommonUtitlites/Others/commonExportVariable.js";
import CustomModal from "../../../CommonUtitlites/ModalPopUp/CustomModal.jsx";
import Loader from "../../../CommonUtitlites/Loader/Loader.jsx";
import useGetAllProjectsForAdmin from "../../../CommonUtitlites/customHooks/useGetAllProjectsForAdmin.js";
import EditableTableShow from "./EditableTableShow.jsx";
import useGetDateSchema from "../../../CommonUtitlites/customHooks/useGetDateSchema.js";
import Swal from "sweetalert2";


export default function PurchaseOrderForm({vendorId, prId, onDataClick, setToggle}) {

  let {backDate,futureDate,todayDate} = useGetDateSchema();

  //quotationData Have found from PR ID also
  const [prIdsave, setPrId] = useState('')

  const [quotationData, setQuotationData] = useState([])
  const [vendor, setVendor] = useState([])
 const [project, setProject] = useState("")
 const [loading, setLoading] = useState(false);
  useEffect(() => {
   const getVendor = async()=>{
    // setLoading(true);
    
    let result = api.post("/get-vendor-by-id", {userId, role, userName, vendorId:vendorId})
    result = await errorHandler(result)
    setVendor(result.data.data)
    console.log(vendor)
    // setLoading(false);
   }
   if(vendorId){

     getVendor()    
   }
   setPrId(prId)
   const handleResponse = async () => {
    // setLoading(true);
    console.log("dfgdfg")
    let result = api.post("/get-quotations", {
      prId,
      userId,
      role, 
      userName,
    });
    result = await errorHandler(result);
    console.log(result.data)
    setQuotationData(result.data.data);
    setProject(result.data.data[0].quotations[0].projectName)
    // setLoading(false);
  };

  if (prId!="") {
    handleResponse();
  }

  }, [vendorId, prId])
  

  console.log(vendor)

  const [tableData, setTableData] = useState([])

  const inputFieldIds = [
    "company",
    "quotationDate",
    "nameOfMs",
    "addressOfMs",
    "gstOfMs",
    "projectName",
    "validity",
    "durationType",
    "contactPerson",
    "mobilePerson",
    "emailPerson",
    "orderStatus",
    "subjectPO",
    "refSite",
    "poDate",
    "billingAddress",
    "deliveryAddress",
    "secondaryDeliveryAddressInput",
    "deliveryTerms",
    "deliveryTime",
    "paymentTerms",
    "tpiStatus",
    "contactAtHeadOffice",
    "qualityAndQuantity",
    "otherTermsInDPR",
  ];

  const handleSubmit = async(e) =>{
    e.preventDefault()
    console.log(e.target)
    const form = new FormData(e.target);
    const formData = {}
  
    inputFieldIds.forEach((id) => {
      const value = form.get(id);
      formData[id]=value
      
    });

    console.log(tableData);
    let result = api.post('/create-poEntry',{userId, role, formData, tableData, prId:prId})
    result = await errorHandler(result)
    console.log(result)
    Swal.fire({title:result.data.message, timer:2000})
    // alert("Purchase Order sent for Approval");

    let data = result.data.data

    console.log(data.poId)

    onDataClick({data:data, tableData:data.tableData})
    

    // setLoading(false);
  }
  const companies = [
    "Select Company",
    "CARBYNE INFRASTRUCTURE PRIVATE LIMITED",
    "LC INFRA PROJECTS PRIVATE LIMITED",
    "SKYMETTLE BUILDCON PRIVATE LIMITED",
    // Add more companies here if needed
  ];

  const companyAddresses = {
    "CARBYNE INFRASTRUCTURE PRIVATE LIMITED": {
      billingAddress: `Third Floor, B-11, B Block, Sector 4, Noida, Gautam Buddha Nagar, Uttar Pradesh, 201301, GSTIN 09AACCG0218K1ZR`,
      deliveryAddress: `Third Floor, B-11, B Block, Sector 4, Noida, Gautam Buddha Nagar, Uttar Pradesh, 201301, GSTIN 09AACCG0218K1ZR`,
    },
        "LC INFRA PROJECTS PRIVATE LIMITED": {
          billingAddress: `409 Iscon Elegance Nr. Jain Temple Prahlad Nagar Cross Road, S G Highway, Ahmadabad Gujrat India Pin 380015,   CIN U45209GJ2018PTC103009`,
          deliveryAddress: ` 409 Iscon Elegance Nr. Jain Temple Prahlad Nagar Cross Road, S G Highway, Ahmadabad Gujrat India Pin 380015,   CIN U45209GJ2018PTC103009`,
        },
    "SKYMETTLE BUILDCON PRIVATE LIMITED": {
      billingAddress: `Khasra No 206, Near Vaishano Dharamkata, Link Road, Main Road, N.H 370 Marg,Post Offce - Shohratgarh, Village - Chahtra, Naugarh, Siddharthnagar, Uttar Pradesh, GSTIN 09ABBCS7752A1ZE`,
      deliveryAddress: `Khasra No 206, Near Vaishano Dharamkata, Link Road, Main Road, N.H 370 Marg,  Post Offce - Shohratgarh, Village - Chahtra, Naugarh, Siddharthnagar, Uttar Pradesh, GSTIN 09ABBCS7752A1ZE`,
    },
    // Add more company addresses here if needed
  };




  const [selectedCompany, setSelectedCompany] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const handleCompanyChange = (e) => {
    const selectedCompany = e.target.value;
    setSelectedCompany(selectedCompany);
    setBillingAddress(companyAddresses[selectedCompany]?.billingAddress || "");
    setDeliveryAddress(companyAddresses[selectedCompany]?.deliveryAddress || "");
  };



  return (
    <>
    { loading?<Loader/>:<div className="form-grid mt-5">
      <form onSubmit={handleSubmit}>
      <div className="container-fluid" style={{padding:"0 4rem"}}>
      <div>
              <select
                id="company"
                required
                name="company"
                className="form-control my-4"
                value={selectedCompany}
                onChange={handleCompanyChange}
              >
                {companies.map((company) => (
                  <option key={company}>{company}</option>
                ))}
              </select>
            </div>
        <div className="row">
          <div className="col-md-12">
            <img src={selectedCompany==="CARBYNE INFRASTRUCTURE PRIVATE LIMITED"?"./carbyne.jpg":""} style={{ float: "left" }} />
            <h2 className="text-center" style={{fontWeight:"bold"}}>
              {selectedCompany}
            </h2>
            <h6 className="text-center mb-5">
              {billingAddress}
              </h6>
            {/* <p class="text-center">Website: <a href="http://laxmibiz.com">laxmibiz.com</a></p> */}
            <h4 className="text-center">Purchase Order</h4>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-6">
            {/* <div className="form-group">
          <input
            className="form-control"
            type="text"
            readOnly=""
            placeholder="Enter PO Number"
            name="poNo"
            id="poNo"
          />
        </div> */}
            <div className="form-group">
              <label>Purchase Order Generation Date</label>
              <input
                className="form-control"
                type="date"
                readOnly={todayDate && (!futureDate && !backDate)}
                defaultValue={currentDate}
                max={backDate?currentDate:""}
                min={futureDate?currentDate:''}
                placeholder="Date"
                name="poDate"
                id="poDate"
                // readOnly
              />
            </div>
            <div className="form-group">
            <label>Name Of M/S</label>

              <input
                className="form-control"
                type="text"
                placeholder="Enter Name Of MS"
                name="nameOfMs"
                readOnly
                id="nameOfMs"
                value={vendor.tradeName}
              />
            </div>
            <div className="form-group">
            <label>Address Of M/S</label>
              
              <textarea
                id="addressOfMs"
                placeholder="Address Of MS"
                className="form-control"
                name="addressOfMs"
                rows={4}
                readOnly
                cols={50}
                value={vendor.registeredOfficeAddress}
              />
            </div>
            <div className="form-group">
            <label>GST Of M/S</label>

              <input
                className="form-control"
                type="text"
                placeholder="Enter GST Of MS"
                name="gstOfMs"
                id="gstOfMs"
                readOnly
                value={vendor.gstNumber}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
            <label>Project Name</label>

              <input
            className="form-control"
            readOnly
            type="text"
            placeholder="Enter Project Name"
            name="projectName"
            id="projectName"
 
    value={project}
          />
          
            </div>
            <label>Validity</label>
            <div className="form-group d-flex">

              <input
                type="tel"
                required
                className="form-control"
                id="validity"
                name="validity"
                placeholder="Enter Validity"
                min={1}
                max={9999}
              />
              <select id="durationType" className="form-control">
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>

        {
          vendor.authorizedContactPerson ?
          <> 
            
            <div className="form-group">
            <label>Name Of Contact Person</label>

              <input
                className="form-control"
                type="text"
                placeholder="Name Of Contact Person"
                name="contactPerson"
                id="contactPerson"
                defaultValue={vendor.authorizedContactPerson[0].name}
                
              />
            </div>
            <div className="form-group">
            <label>Mob. No. Of Contact Person</label>

              <input
                className="form-control"
                type="tel"
                placeholder="Mob. No. Of Contact Person"
                name="mobilePerson"
                id="mobilePerson"
                defaultValue={vendor.authorizedContactPerson[0].contactNumber}
                />
            </div>
            <div className="form-group">
                <label>Email Of Contact Person</label>
              <input
                className="form-control"
                type="email"
                placeholder="Email Of Contact Person"
                name="emailPerson"
                id="emailPerson"
                defaultValue={vendor.authorizedContactPerson[0].email}
              />
            </div>
            </>
            :
            <>
            <div className="form-group">
            <label>Name Of Contact Person</label>

              <input
                className="form-control"
                type="text"
                placeholder="Name Of Contact Person"
                name="contactPerson"
                id="contactPerson"

              />
            </div>
            <div className="form-group">
            <label>Mob. No. Of Contact Person</label>

              <input
                className="form-control"
                type="tel"
                placeholder="Mob. No. Of Contact Person"
                name="mobilePerson"
                id="mobilePerson"
                />
            </div>
            <div className="form-group">
                <label>Email Of Contact Person</label>
              <input
                className="form-control"
                type="email"
                placeholder="Email Of Contact Person"
                name="emailPerson"
                id="emailPerson"
              />
            </div>
            </>

        }
          
            <label>Select Order Status</label>

            <select
              className="form-control"
              id="orderStatus"
              name="orderStatus"
            >
           
              <option>Open</option>
              <option>Close</option>
              <option>Short Close</option>
            </select>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-12">
            <div
              className="row"
              style={{ justifyContent: "space-around", alignItems: "center" }}
            >
              <div className="form-group">

                <h6>Subject:</h6>
                <input
                  className="form-control"
                  style={{ width: "50vw" }}
                  type="text"
                  placeholder="Subject Of PO"
                  name="subjectPO"
                  id="subjectPO"
                />
              </div>
              <div className="form-group">
                <h6>Enter Reference Site:</h6>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Reference Site"
                  name="refSite"
                  id="refSite"
                />
              </div>
            </div>
            <p>Dear Sir,</p>
            <p style={{textAlign:"justify"}}>
              As per telephonic conversation held with you with reference of
              Quotation and final negotiation with you date
              <input
                className="form-control form-control-sm"
                style={{ display: "inline-block", width: "auto" }}
                type="date"
                required
                name="quotationDate"
                id="quotationDate"
              />{" "}
              we are pleased to issuing a purchase order to your firm. The rate
              of material will be as per mention below details.
            </p>
          </div>
        </div>
        <div style={{overflowX:"auto"}}>
          <EditableTableShow quotationData={quotationData} vendorId={vendorId} setTableData={(tableData)=>setTableData(tableData)}/>
          </div>
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
                  type="text"
                  id="billingAddress"
                  style={{textAlign:"justify"}}
                  name="billingAddress"
                  className="form-control"
                  defaultValue={billingAddress}
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
                style={{textAlign:"justify"}}
                  type="text"
                  id="deliveryAddress"
                  name="deliveryAddress"
                  className="form-control"
                  defaultValue={deliveryAddress}
                />
                {/* <button
                  className="btn btn-primary"
                  style={{ borderRadius: "3rem" }}
                  onclick="changeDeliveryAddress()"
                >
                  Change Address
                </button> */}
              </div>
              <div>
                <li style={{ paddingBottom: "1rem" }}>
                  Secondary Delivery Address (Optional):{" "}
                  <span id="secondaryDeliveryAddress" />
                  <input
                    type="text"
                    id="secondaryDeliveryAddressInput"
                    className="form-control"
                  />
                </li>
              </div>
              <li style={{ paddingBottom: "1rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <p>Delivery Terms:</p>{" "}
                  <input
                    type="text"
                    id="deliveryTerms"
                    name="deliveryTerms"
                    className="form-control"
                    style={{ width: "45rem" }}
                  />
                </div>
              </li>
              <li style={{ paddingBottom: "1rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <p>Delivery Time: </p>{" "}
                  <input
                    type="text"
                    id="deliveryTime"
                    name="deliveryTime"
                   
                    className="form-control"
                    style={{ width: "45rem" }}
                  />
                </div>
              </li>
              <li style={{ paddingBottom: "1rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <p>Payment Terms: </p>{" "}
                  <input
                    type="text"
                    id="paymentTerms"
                    name="paymentTerms"
               
                    className="form-control"
                    style={{ width: "45rem" }}
                  />
                </div>
              </li>
              <li style={{ paddingBottom: "1rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <p>TPI Status / Others : </p>{" "}
                  <input
                       id="tpiStatus"
                       name="tpiStatus"
                    type="text"
                    className="form-control"
                    style={{ width: "45rem" }}
                  />
                </div>
              </li>
              <li style={{ paddingBottom: "1rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <p>Contact At HO: </p>{" "}
                  <input
                    id="contactAtHeadOffice"
                    name="contactAtHeadOffice"
                    type="text"
                    className="form-control"
                    style={{ width: "45rem" }}
                  />
                </div>
              </li>
              <li style={{ paddingBottom: "1rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <p>Quantity &amp; Quality: </p>{" "}
                  <input
                    id="qualityAndQuantity"
                    name="qualityAndQuantity"
                    type="text"
                    className="form-control"
                    style={{ width: "45rem" }}
                  />
                </div>
              </li>
              <li style={{ paddingBottom: "1rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <p>Other Term In DPR: </p>{" "}
                  <input
                   id="otherTermsInDPR"
                   name="otherTermsInDPR"
                    type="text"
                    className="form-control"
                    style={{ width: "45rem" }}
                  />
                </div>
              </li>
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
        <div className="row mt-4">
          <button
          type="submit"
            className="btn btn-primary"
            style={{ borderRadius: "3rem", display: "flex", margin: "auto" }}
          >
            Submit
          </button>
          <button
            className="btn btn-primary"
            type="button"
            style={{ borderRadius: "3rem", display: "flex", margin: "auto" }}
            onClick={()=>print()}
          >
            Print
          </button>
        </div>
      </div>
      </form>
    </div>
    }
    </>
  );
}
