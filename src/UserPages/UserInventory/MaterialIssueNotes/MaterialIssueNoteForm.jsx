import React, { useEffect, useState } from "react";

import useGetUserProject from "../../../CommonUtitlites/customHooks/useGetUserProject";
import MaterialIssueFormEditableTable from "./MaterialIssueFormEditableTable";
import { currentDate } from "../../../CommonUtitlites/Others/commonExportVariable";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import {role, userId} from '../../../CommonUtitlites/Others/commonExportVariable'
import Loader from "../../../CommonUtitlites/Loader/Loader";
import useGetMaterialIssueNoteByMINId from "../../../CommonUtitlites/customHooks/useGetMaterialIssueNoteByMINId";
import Swal from "sweetalert2";
import createPDF from "./MakePdfForMaterialIssueNote";
import createPDFForGrn from "./MakePdfForGRN";
import useGetDateSchema from "../../../CommonUtitlites/customHooks/useGetDateSchema";
import useGetAllProjectsForAdmin from "../../../CommonUtitlites/customHooks/useGetAllProjectsForAdmin";
export default function MaterialIssueNoteForm(props) {
  let allProjects = useGetAllProjectsForAdmin()
  let {backDate,futureDate,todayDate} = useGetDateSchema();
  const [tableValue, setTableValue] = useState([]);
const [data, setData] = useState([])
  useEffect(() => {
    const getFunction = async()=>{
      let result = api.post("/get-latest-min",{userId, role,indentId:props.data.indentId}) 
      result=await errorHandler(result)
      // console.log(result)
      setData(result.data.data)
    }
    if(props.data.indentId)
    getFunction()
  
  }, [props.data])
  const [minDate, setMinDate] = useState(currentDate)

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    let projectId = props.data.projectId
    // let result = api.patch("/update-item", {
    //   projectId,
    //   // project,
    //   userId,
    //   gpName: props.data.gp,
    //   role,
    //   tableValue,
    //   company: selectedCompany,
    // });
    
    // result = await errorHandler(result)

    // // console.log(result)
    // if(!result.data || !result.data.data) return;

    let result = api.post("/create-minEntry", {
      projectId,
      detailsOfMr:props.data,
      userId,
      role,
      tableValue,
      company: selectedCompany,
    });

    result = await errorHandler(result)
    // console.log('our data',result)
    let pdf = await createPDF({data:result.data.data,tableData:result.data.tableData, billingAddress:billingAddress});
    let grnPdf = await createPDFForGrn({data:result.data.data,tableData:result.data.tableData, billingAddress:billingAddress});

    // alert(result.data.message)
    Swal.fire({
      timer:2000,
      icon:'success',
      title:result.data.message
    })

    setLoading(false);

    // props.onDataClick(result.data.data)
   
    // setLoading(false);
    // console.log(result)
  };

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

  
useEffect(() => {
  console.log('here', props.data.projectId);

  // Function to find the project and set state
  const findAndSetProject = async () => {
    if (props.data.projectId) {
      try {
        const findProject = allProjects.find((projectName) => projectName.id === props.data.projectId);
        if (findProject) {
          setSelectedCompany(findProject.companyName);
          setBillingAddress(findProject.companyBillingAddress);
          setDeliveryAddress(findProject.companyDeliveryAddress);
        }
      } catch (error) {
        console.error("Error setting project-related states:", error);
      }
    }
  };

  // Create a Promise to ensure that state updates complete before continuing
  const stateUpdatePromise = new Promise((resolve) => {
    findAndSetProject(); // Call the function to set the states
    resolve(); // Resolve the promise once the state updates are complete
  });

  // Use the Promise in the effect dependency array
  stateUpdatePromise.then(() => {
    // This code block will run after the state updates are complete
    console.log("State updates are complete.");
  });

}, [props.data.projectId, allProjects]);

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
    <div>
      { loading?<Loader/>:<div className="container form-grid">
      {/* <div>
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
            </div> */}
        <div className="row">
          <div className="col-md-12">
          <img src={selectedCompany==="CARBYNE INFRASTRUCTURE PRIVATE LIMITED"?"../carbyne.jpg":""} style={{ float: "left" }} />
            <h2 className="text-center" style={{fontWeight:"bold"}}>
              {selectedCompany}
            </h2>
            <h6 className="text-center mb-5">
              {billingAddress}
              </h6>
            <h4 className="text-center">Material Issue Note</h4>
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
            <h4 className="text-center mt-3">Material Issue Note</h4> */}
          </div>
        </div>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="mrNo">Material Requisition Id / Number</label>

                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter MR Number"
                  name="mrNo"
                  value={props.data.indentId}
                />
              </div>
              <div className="form-group">
                <label htmlFor="contractorName">
                  Material Requisition Vendor Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Contractor Name"
                  name="contractorName"
                  id="contractorName"
                  value={props.data.vendor}
                />
              </div>
              <div className="form-group">
                <label htmlFor="userName">
                  Material Requisition Requestor Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter User Name"
                  name="userName"
                  id="userName"
                  value={props.data.preparedBy}
                />
              </div>
              {
              props.data.approvedBy 

              &&

            <div className="form-group">
              <label htmlFor="approvedBy">Approved By</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Remark"
                id="approvedBy"
                name="approvedBy"
                value={props.data.approvedBy}
              />
            </div>
        }  
              {/* <div className="form-group">
          <label htmlFor="contractorName">MR Requester Name</label>

            <input
              className="form-control"
              type="text"
              placeholder="Enter Work Order No."
              name="workOrder"
            />
          </div> */}

              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Location/Village"
                  name="location"
                  value={props.data.gp}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="projectName">Project Name</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Project Name"
                  name="projectName"
                  value={props.data.project}
                />
              </div>
              <div className="form-group">
                <label htmlFor="minDate">Material Issue Date</label>

                <input
                  className="form-control"
                  type="date"
                  readOnly={todayDate && (!futureDate && !backDate)}
                  placeholder="Date"
                  name="minDate"
                  max={backDate?currentDate:""}
                  min={futureDate?currentDate:''}
                  // readOnly
                  defaultValue={minDate}
                  onChange={(e)=>setMinDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="block">Block</label>

                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Block"
                  name="block"
                  value={props.data.block}
                />
              </div>
              {
          props.data.recommendedBy 

          &&

        <div className="form-group">
          <label htmlFor="recommendedBy">Recommended By</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Remark"
            id="recommendedBy"
            name="recommendedBy"
            value={props.data.recommendedBy}
          />
        </div>
    }
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">

              <MaterialIssueFormEditableTable
                data={data}
                setTable={(data) => setTableValue(data)}
              />

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
              <div className="row d-flex"></div>
            </div>
          </div>
          <button
            className="btn btn-primary"
            style={{ borderRadius: "3rem", display: "flex", margin: "auto" }}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
      }
    </div>
  );
}
