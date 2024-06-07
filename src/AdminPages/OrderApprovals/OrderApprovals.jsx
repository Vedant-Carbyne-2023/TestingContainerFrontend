import React, { useEffect, useState } from "react";
import { api } from '../../CommonUtitlites/AxiosSetup/axiosDefault';
import { authenticateUser } from "../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from '../../CommonUtitlites/Others/errorHandle';
import CustomModal from "../../CommonUtitlites/ModalPopUp/CustomModal";
import Loader from "../../CommonUtitlites/Loader/Loader";
import {
    userId,
    role,
} from  "../../CommonUtitlites/Others/commonExportVariable";
import {
    MDBContainer,
    MDBCol,
} from 'mdb-react-ui-kit';
import WorkOrder from "./WorkOrder/WorkOrder";
import PurchaseOrder from "./PurchaseOrder/PurchaseOrder";
import Comparision from "./Comparision/PurchaseOrder";
import ChangeRequests from "./ChangeRequests/ChangeRequests";
import Issues from "./Issues/Issues";

const OrderApprovals = () => {
    const [activeComponent, setActiveComponent] = useState("workorder");
  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };
  // css update
  const [showDropdown2, setShowDropdown2] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown2(!showDropdown2);
  };
    return ( 
        <>
           <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ zIndex: '1' }}>
        <span><b>Order Approvals</b></span>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown2"
        aria-controls="navbarNavDropdown2"
        aria-expanded={showDropdown2 ? "true" : "false"}
        aria-label="Toggle navigation"
        onClick={() => setShowDropdown2(!showDropdown2)}
      >
        {/* <span className="navbar-toggler-icon"></span> */}
        <i class="fa-solid fa-caret-down"></i>
      </button>
      <div
        className={`collapse navbar-collapse ${showDropdown2 ? "show" : ""}`}
        id="navbarNavDropdown2"
      >
        <ul className="navbar-nav w-100 d-flex justify-content-between">
          <li className="nav-item mt-1">
                  <button
                  className={`btn btn-sm btn-outline-secondary ${activeComponent === "workorder" ? "active" : ""}`}
                   // className={`btn ${
                   //   activeComponent === "Create BOQFormGpWise" ? "active" : ""
                   // }`}
                   onClick={() => handleButtonClick("workorder")}
                  //  style={{ borderColor: "navy", zIndex: "100", padding: "0.2rem 0.5rem"   }}
                 >
                   WorkOrders
                 </button>
            {/* <button
              type="button"
              id="addPoMrn"
              className="btn btn-sm btn-outline-primary"
              onClick={() => setIsModalOpen2(true)}
              style={{ borderColor: "navy", zIndex: "100", padding: "0.2rem 0.5rem"   }}
            >
               <i className="fas fa-plus"></i>
               <b> &nbsp; Material Requisition </b>
             </button> */}
          </li>
          <li className="nav-item mt-1">
          <button
                   className={`btn btn-sm btn-outline-secondary ${activeComponent === "purchaseorder" ? "active" : ""}`}
                   // className={`btn ${
                   //   activeComponent === "Get BOQForm" ? "active" : ""
                   // }`}
                   onClick={() => handleButtonClick("purchaseorder")}
                 >
                   PurchaseOrders
                 </button>
          </li>
          <li className="nav-item mt-1">
          <button
                   className={`btn btn-sm btn-outline-secondary ${activeComponent === "comparision" ? "active" : ""}`}
                   // className={`btn ${
                   //   activeComponent === "Get BOQForm" ? "active" : ""
                   // }`}
                   onClick={() => handleButtonClick("comparision")}
                 >
                   Comparision
                 </button>
          </li>
          <li className="nav-item mt-1">
          <button
            className={`btn btn-sm btn-outline-secondary ${activeComponent === "change" ? "active" : ""}`}
            // className={`btn ${
            //   activeComponent === "Get BOQFormGpWise" ? "active" : ""
            // }`}
            onClick={() => handleButtonClick("change")}
          >
            Change Requests
          </button>
          </li>
          <li className="nav-item mt-1">
          <button
            className={`btn btn-sm btn-outline-secondary ${activeComponent === "issue" ? "active" : ""}`}
            // className={`btn ${
            //   activeComponent === "Get BOQFormGpWise" ? "active" : ""
            // }`}
            onClick={() => handleButtonClick("issue")}
          >
            Issues
          </button>
          </li>
        </ul>
      </div>
    </nav>
            {/* <div className="title">
                <span>Order Approvals</span>
                <button
                  className={`btn col-6 col-md-2 mb-2 ml-2 ${activeComponent === "workorder" ? "active" : ""}`}
                   onClick={() => handleButtonClick("workorder")}
                 >
                   WorkOrders
                 </button>
                 <button
                   className={`btn col-6 col-md-2 mb-2 ml-2 ${activeComponent === "purchaseorder" ? "active" : ""}`}
                   onClick={() => handleButtonClick("purchaseorder")}
                 >
                   PurchaseOrders
                 </button>
                 <button
            className={`btn col-6 col-md-2 mb-2 ml-2 ${activeComponent === "unknown" ? "active" : ""}`}
            onClick={() => handleButtonClick("change")}
          >
            Change Requests
          </button>
            </div> */}
            <div>
              {activeComponent === "comparision" && (
                <div >
                <Comparision/>
                </div>
              )}
              {activeComponent === "workorder" && (
                <div style={{overflow:'auto',display:'flex', justifyContent:'center', alignItems:'center'}}>
                <WorkOrder/>
                </div>
              )}
              {activeComponent === "purchaseorder" && (
                <div style={{overflow:'auto',display:'flex', justifyContent:'center', alignItems:'center'}}>
                <PurchaseOrder/>
                </div>
              )}
              {activeComponent === "change" && (
                <ChangeRequests/>
              )}
              {activeComponent === "issue" && (
                <Issues/>
              )}
            </div>
        </>
     );
}
 
export default OrderApprovals;