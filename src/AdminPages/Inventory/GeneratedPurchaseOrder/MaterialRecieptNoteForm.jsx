import React, { useEffect, useState } from "react";
import MaterialReceiptNoteEditableTable from "./MaterialReceiptNoteEditableTable";
import { currentDate } from "../../../CommonUtitlites/Others/commonExportVariable";
import {userId, role, userName} from '../../../CommonUtitlites/Others/commonExportVariable'
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import createPDFforMaterialReceiptNote from "./MakePdfForMaterialReceiptNote";
import Loader from "../../../CommonUtitlites/Loader/Loader";
import Swal from "sweetalert2";
import useGetDateSchema from "../../../CommonUtitlites/customHooks/useGetDateSchema";
export default function MaterialRecieptNoteForm({ data, projectId }) {

  let {backDate,futureDate,todayDate} = useGetDateSchema();
  // console.log(data);

  
  const [tableData, setTableData] = useState([])

useEffect(() => {
  const getFunction = async()=>{
    let result = api.post("/get-getMrnRelatedToPo",{userId, role,poId:data.poId, vendorName:data.msName}) 
    result=await errorHandler(result)
    // console.log(result)
    setTableData(result.data.data)
  }
  getFunction()
}, [data])

const fields = [
  { label: 'Material Receipt Date', name: 'mrnDate', type:'date', defaultValue:currentDate, readOnly: todayDate && (!futureDate && !backDate), max: backDate?currentDate:"", min: futureDate?currentDate:'' },
  { label: 'PO Number', name: 'poNumber', defaultValue:data.poId, readOnly:true },
  { label: 'Vendor Name', name: 'vendorName' , defaultValue:data.msName, readOnly:true },
  { label: 'Invoice Number', name: 'invoiceNumber' },
  { label: 'Invoice Date', name: 'invoiceDate', type:'date', defaultValue:currentDate },
  { label: 'Transporter Name', name: 'transporterName' },
  // { label: 'GR Date', name: 'grDate', type:'date' },
  // { label: 'GR Document File Key', name: 'grDocumentFileKey' },
  { label: 'Vehicle Number', name: 'vehicleNumber' },
  { label: 'Eway Bill Number', name: 'ewayBillNumber' },
  { label: 'Storage Location', name: 'storageLocation' },

  // { label: 'MRN Contractor Name', name: 'mrnContractorName' },
  // { label: 'MRN GP Name', name: 'mrnGpName' },
  { label: 'Remark', name: 'remark' },
];
  const [loading, setLoading] = useState(false);  

  const handleSubmit = async(e)=>{
    setLoading(true)
    e.preventDefault()
    const formData = {
      vendorName: data.msName,
      poId: data.poId,
      mrnDate: e.target.mrnDate.value,
      projectName: data.projectName,
      projectId,
      tableData:tableData,
      userId,
      role,
      invoiceNumber: e.target.invoiceNumber.value,
      invoiceDate: e.target.invoiceDate.value,
      transporterName: e.target.transporterName.value,
      vehicleNumber: e.target.vehicleNumber.value,
      ewayBillNumber: e.target.ewayBillNumber.value,
      storageLocation: e.target.storageLocation.value,
      remark: e.target.remark.value,
      company: selectedCompany,
    };
    // console.log('form data',formData);
    let result = api.post("/create-mrnEntry", formData);
    result = await errorHandler(result);
    // console.log('final',result);
    let mrnPdf = await createPDFforMaterialReceiptNote({data:result.data.data, tableData:result.data.tableData, billingAddress:billingAddress})
    setLoading(false)
    Swal.fire({
      title:result.data.message,
    timer:2000
    })
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

  console.log(fields)
  return (
    <div>
      <div className="container form-grid">
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
            <h4 className="text-center">Material Reciept Note</h4>

            {/* original */}
            {/* <img
              src="./carbyne.jpg"
              style={{ float: "left" }}
              alt="Carbyne Logo"
            />
            <h3 className="text-center">
              CARBYNE INFRASTRUCTURE PRIVATE LIMITED
            </h3>
            <p className="text-center mb-0">
              B-11, Third Floor B Block Noida, Gautam Buddha Nagar
            </p>
            <p className="text-center mb-0">Uttar Pradesh, India Pin 201301</p>
            <p className="text-center mb-0">CIN No.-U74110UP1993PTC015005</p>
            <h4 className="text-center mt-3">Material Reciept Note</h4> */}
          </div>
        </div>
        <hr />
        { loading?<Loader/>:
        
        <form onSubmit={handleSubmit}>
        <div className="grid-container row">
          <div className="col-md-6">
            {fields.slice(0, Math.ceil(fields.length / 2)).map((field, index) => (
              <div className="grid-item form-row" key={index}>
                <label htmlFor={field.name}>{field.label}:</label>
                <input placeholder={field.label} readOnly={field.readOnly} defaultValue={field.defaultValue?field.defaultValue:""} type={field.type?field.type:"text"} className='form-control' name={field.name} id={field.name} max={field.max?field.max:""} min={field.min?field.min:""} />
              </div>
            ))}
          </div>

          <div className="col-md-6">
            {fields.slice(Math.ceil(fields.length / 2)).map((field, index) => (
              <div className="grid-item form-row" key={index}>
                 <label htmlFor={field.name}>{field.label}:</label>
                <input placeholder={field.label} readOnly={field.readOnly} defaultValue={field.defaultValue?field.defaultValue:""} type={field.type?field.type:"text"} className='form-control' name={field.name} id={field.name} />
              </div>
            ))}
          </div>
          
        </div>



        <div className="row mt-2">
            <div className="col-md-12">

{
  tableData.length>0

  &&

  <MaterialReceiptNoteEditableTable  tableData={tableData} settingTable={(tableData)=>setTableData(tableData)}/>

}

  
  <div className="row" style={{ height: "150px" }}>
    <span style={{ marginLeft: "auto", display: "flex" }}>
      Authorised Signature With Seal
    </span>
  </div>
  <div
    className="row"
    style={{
      height: "100px",
      display: "flex",
      justifyContent: "space-between",
    }}
  >
    <span>Request By</span>
    <span>Approved By</span>
    <span>Store Keeper</span>
    <span>Received By</span>
  </div>
  <div className="row d-flex">
 
    {/* <button
      className="btn btn-primary"
      style={{
        borderRadius: "3rem",
        display: "flex",
        margin: "auto",
      }}
      type="button"
      onClick={() => window.print()}
    >
      Print
    </button> */}
  </div>
</div>
</div>

        <button className='btn float-right btn-lg' type='submit'>Submit</button>
      </form>

      
      }
      </div>
    </div>
  );
}
