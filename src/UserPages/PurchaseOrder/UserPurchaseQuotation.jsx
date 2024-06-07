import React, { useEffect, useRef, useState } from "react";
import QuotationForm from "./QuotationForm/QuotationForm";
import CustomModalPDF from "../../CommonUtitlites/ModalPopUpWithPDF/CustomModal";
import { useNavigate } from "react-router-dom";
import Comparision from "./ComparisionStatement/Comparision";
import MiddleWareForPrintPurchaseOrder from "./PurchaseOrderWithPdf/MiddleWareForPrintMiddleWareForPrintPurchaseOrder";
import ShowQuotations from "./PurchaseQuotation/ShowQuotations";
import PurchaseOrderTable from "./PurchaseOrderWithPdf/PurchaseOrderTable";
import PurchaseRequistionTable from "./PurchaseRequisition/PurchaseRequistionTable";
import { role } from "../../CommonUtitlites/Others/commonExportVariable";
import ComparisionApproval from "./ComparisionStatementApproval/ComparisionApproval";
import ShowComparisions from "./PurchaseComparisionForApproval/ShowComparisions";
import ShowApprovedComparisions from "./ShowApprovedComparisionStatement/ShowApprovedComparisions";
import ApprovedComparision from "./ApprovedComparisionStatement/ApprovedComparision";
import ShowApprovedComparisionsForUser from "./ShowApprovedCSForUser/ShowApprovedComparisionsForUser";
import useGetRolePermissionComponentWise from "../../CommonUtitlites/customHooks/useGetPermissionComponentWise";

export default function UserPurchaseQuotation({compPermission}) {
  let permission = useGetRolePermissionComponentWise(compPermission)
  const [permissions, setPermissions] = useState([])

  useEffect(() => {
    const permissionObject = permission.map(item => ({
      [item.permission]: item.value
    }));
   setPermissions(permissionObject)

  }, [permission])
  
  console.log(permissions)


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);
  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };
  const [activeComponent, setActiveComponent] = useState(
    "Purchase Requisition"
  );


  const [prId, setPrId] = useState("");

  const [vendorId, setVendorId] = useState("");

  const [comparisionId, setComparisionId] = useState("");

  const [selectedVendors, setSelectedVendors] = useState([]);

  const [showDropdown2, setShowDropdown2] = useState(false);

  return (
    <>
      <div>
        {/* <div className="title">
          <span>Purchase Order (s)</span>
          <button
            type="button"
            id="addPurchaseOrder"
            class="btn btn-sm btn-outline-primary"
            data-toggle="modal"
            data-target="#myModal"
            onClick={() => setIsModalOpen3(!isModalOpen3)}
            style={{ borderColor: "navy", zIndex: "100" }}
          >
            <b> &nbsp; Generate Qutation</b>
          </button>
          xxxxxxxxxxxxxxxxxxxxxxxxxxxx
          <button
            type="button"
            id="addPurchaseOrder"
            class="btn btn-sm btn-outline-primary"
            data-toggle="modal"
            data-target="#myModal"
            onClick={()=>setIsModalOpen3(!isModalOpen3)}
            style={{ borderColor: "navy", zIndex: "100" }}
          >
            <b> &nbsp; Comparision Statement</b>
          </button>
          xxxxxxxxxxxxxxxxxxxxxxxxxxx
          <button
            type="button"
            id="addPurchaseOrder"
            class="btn btn-sm btn-outline-primary"
            onClick={() => setIsModalOpen(!isModalOpen)}
            style={{ borderColor: "navy", zIndex: "100" }}
          >
            <b> &nbsp; Generate Purchase Order</b>
          </button>

          <div class="search-bar">
            <input type="text" class="form-control" placeholder="Search" />
            <div class="search-icon-container">
              <div class="search-icon">
                <div class="icon">
                  <i class="fas fa-search"></i>
                </div>
              </div>
            </div>
          </div>
        </div> */}

      {/* <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ zIndex: '1' }}>
      <span><b>Purchase Order (s)</b></span>
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
        <i class="fa-solid fa-caret-down"></i>
      </button>
      <div
        className={`collapse navbar-collapse ${showDropdown2 ? "show" : ""}`}
        id="navbarNavDropdown2"
      >
        <ul className="navbar-nav w-100 d-flex justify-content-between"> */}
          {/* <li className="nav-item mt-1">
          <button
            type="button"
            id="addPurchaseOrder"
            class="btn btn-sm btn-outline-primary"
            data-toggle="modal"
            data-target="#myModal"
            onClick={() => setIsModalOpen3(!isModalOpen3)}
            style={{ borderColor: "navy", zIndex: "100", padding: "0.95rem 0.5rem" }}
          >
            <b> &nbsp; Generate Qutation</b>
          </button>
          </li>
          <li className="nav-item mt-1">
          <button
            type="button"
            id="addPurchaseOrder"
            class="btn btn-sm btn-outline-primary"
            onClick={() => setIsModalOpen(!isModalOpen)}
            style={{ borderColor: "navy", zIndex: "100", padding: "0.95rem 0.5rem" }}
          >
            <b> &nbsp; Generate Purchase Order</b>
          </button>
          </li> */}
          {/* <li className="nav-item mt-1">
          <div class="search-bar">
          <input type="text" class="form-control" placeholder="Search" />
            <div class="search-icon-container">
               <div class="search-icon">
                   <div class="icon">
                    <i class="fas fa-search"></i>
                   </div>
              </div>
            </div>
          </div>
          </li>
        </ul>
        </div>
      </nav> */}

        <div
          className="row p-0 m-0 mt-2 d-flex"
          style={{ justifyContent: "space-around" }}
        >

          {
            permissions.some(item => item.show===true)

            &&
            <>
          <button
          className={`btn ${
            activeComponent === "Purchase Requisition" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("Purchase Requisition")}
          >
            Purchase Requisition(s)
          </button>




          <button
            className={`btn ${
              activeComponent === "Purchase Quotation" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("Purchase Quotation")}
          >
            Purchase Quotation(s)
          </button>
          </>
          }
        </div>
      </div>



      {activeComponent === "Purchase Requisition" ? (
        <PurchaseRequistionTable permission={ permissions.some(item => item.add===true)} />
      )
      
      : activeComponent === "Purchase Quotation" ? (
        <ShowQuotations
          comparision_permission = {false}
        />
      ) 
      
      
      
      : 
      ""
      }

    


      <CustomModalPDF
        isOpen={isModalOpen3}
        onClose={() => setIsModalOpen3(false)}
        title={"Generate Quotation"}
        size={"xl"}
      >
        <QuotationForm />
      </CustomModalPDF>


    </>
  );
}
