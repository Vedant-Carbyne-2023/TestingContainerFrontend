import React, { useRef, useState } from "react";
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

export default function PurchaseOrder() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);
  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };
  const [activeComponent, setActiveComponent] = useState(
    "Purchase Requisition"
  );

  const navigate = useNavigate();

  const [prId, setPrId] = useState("");

  const [vendorId, setVendorId] = useState("");

  const [comparisionId, setComparisionId] = useState("");

  const [selectedVendors, setSelectedVendors] = useState([]);

  const [showDropdown2, setShowDropdown2] = useState(false);
  const dropdownRef2 = useRef(null);

  const handleDropdownToggle = () => {
    setShowDropdown2(!showDropdown2);
  };
  return (
    <>
      <div>
      <div className="title">
          <span>Purchase Order(s)</span>
          <div></div>
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
        </div>
       
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
        <span className="navbar-toggler-icon"></span>
        <i class="fa-solid fa-caret-down"></i>
      </button>
      <div
        className={`collapse navbar-collapse ${showDropdown2 ? "show" : ""}`}
        id="navbarNavDropdown2"
      >
        <ul className="navbar-nav w-100 d-flex justify-content-between">
          <li className="nav-item mt-1">
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
          </li>
          <li className="nav-item mt-1">
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
          className="row p-0 m-0 mt-2 d-flex flex-wrap justify-content-center"
          // style={{ justifyContent: "space-around" }}
        >


          <button
            className={`btn col-8 col-md mb-2 ml-2 ${
              activeComponent === "Purchase Requisition" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("Purchase Requisition")}
          >
            Purchase Requisition(s)
          </button>




          <button
            className={`btn col-8 col-md mb-2 ml-2 ${
              activeComponent === "Purchase Quotation" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("Purchase Quotation")}
          >
            Purchase Quotation(s)
          </button>



          {role === "SuperUser" && (
            <>
              <button
                className={`btn col-8 col-md mb-2 ml-2 ${
                  activeComponent === "Approve Comparision Statements"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handleButtonClick("Approve Comparision Statements")
                }
              >
                Approve Comparision Statement(s)
              </button>



              <button
                className={`btn col-8 col-md mb-2 ml-2 ${
                  activeComponent === "Comparision Statements For Approval"
                    ? "active"
                    : ""
                }`}
                onClick={() => handleButtonClick("Comparision Statements For Approval")}
              >
                Comparision Statement For Approval
              </button>
            </>
          )}


          {role !== "SuperUser" && (
            <button
              className={`btn col-8 col-md mb-2 ml-2 ${
                activeComponent === "Comparision Statements" ? "active" : ""
              }`}
              onClick={() => handleButtonClick("Comparision Statements")}
            >
              Comparision Statement(s)
            </button>
          )}
          {role !== "SuperUser" && (
            <button
              className={`btn col-8 col-md mb-2 ml-2 ${
                activeComponent === "Approved Comparision Statements" ? "active" : ""
              }`}
              onClick={() => handleButtonClick("Approved Comparision Statements")}
            >
             Approved Comparision Statement(s)
            </button>
          )}

          {role !== "SuperUser" && (
            <button
              className={`btn col-8 col-md mb-2 ml-2 ${
                activeComponent === "Show Approved CS" ? "active" : ""
              }`}
              onClick={() => handleButtonClick("Show Approved CS")}
            >
             Show Approved CS
            </button>
          )}

       
          <button
            className={`btn col-8 col-md mb-2 ml-2 ${
              activeComponent === "Generate Purchase Order" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("Generate Purchase Order")}
          >
            Generate Purchase Order(s)
          </button>


          <button
            className={`btn col-8 col-md mb-2 ml-2 ${
              activeComponent === "Purchase Order" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("Purchase Order")}
          >
            Purchase Order(s)
          </button>
        </div>
      </div>
      {activeComponent === "Purchase Requisition" ? (
        <PurchaseRequistionTable />
      )
      
      : activeComponent === "Purchase Quotation" ? (
        <ShowQuotations
          toggleTo={(toggle) => handleButtonClick("Comparision Statements")}
          prId={(quotationId) => setPrId(quotationId)}
          setVendorId={(id)=>setVendorId(id)}
        />
      ) 
      
      : activeComponent === "Comparision Statements" ? (
        <Comparision
          prId={prId}
          vendorId={vendorId}
          setToggle={(toggle) => handleButtonClick("Generate Purchase Order")}
          setPrId={(prId) => setPrId(prId)}
          setSelectedVendor={(vendor) => setVendorId(vendor)}
        />
      ) 
      
      :activeComponent === "Approved Comparision Statements" ? (
        role === "Admin" &&
        activeComponent === "Approved Comparision Statements" && (
          <ShowApprovedComparisionsForUser
            // prId={prId}
            setToggle={(toggle) => handleButtonClick("Show Approved CS")}
            setPrId={(prId) => setPrId(prId)}
            setComparisionId={(id) => setComparisionId(id)}
            setSelectedVendors={(vendor) => setSelectedVendors(vendor)}
          />
        )
      ) 


      :activeComponent === "Show Approved CS" ? (
        role === "Admin" &&
        activeComponent === "Show Approved CS" && (
          <ApprovedComparision
            prId={prId}
            setToggle={(toggle) => handleButtonClick("Generate Purchase Order")}
            comparisionId={comparisionId}
            selectedVendors={selectedVendors}

            setPrId={(prId) => setPrId(prId)}
            setSelectedVendor={(vendor) => setVendorId(vendor)}
          />
        )
      ) 
      
      :activeComponent === "Comparision Statements For Approval" ? (
        role === "SuperUser" &&
        activeComponent === "Comparision Statements For Approval" && (
          <ComparisionApproval
            prId={prId}
            setToggle={(toggle) => handleButtonClick("Generate Purchase Order")}
            setPrId={(prId) => setPrId(prId)}
            comparisionId={comparisionId}
            selectedVendors={selectedVendors}
          />
        )
      ) 
      
      : activeComponent === "Approve Comparision Statements" ? (
        <ShowComparisions
          toggleTo={(toggle) =>
            handleButtonClick("Comparision Statements For Approval")
          }
          prId={(prId) => setPrId(prId)}
          comparisionId={(id) => setComparisionId(id)}
          selectedVendors={(vendor) => setSelectedVendors(vendor)}
        />
      ) 
      
      : activeComponent === "Generate Purchase Order" ? (
        <MiddleWareForPrintPurchaseOrder prId={prId} vendorId={vendorId} />
      )
      
      : (
        <PurchaseOrderTable />
      )}

      <CustomModalPDF
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={"Purchase Order"}
        size={"xl"}
      >
        <MiddleWareForPrintPurchaseOrder />
      </CustomModalPDF>


      <CustomModalPDF
        isOpen={isModalOpen3}
        onClose={() => setIsModalOpen3(false)}
        title={"Generate Quotation"}
        size={"xl"}
      >
        <QuotationForm />
      </CustomModalPDF>



      <CustomModalPDF
        size={"large"}
        isOpen={isModalOpen4}
        onClose={() => setIsModalOpen4(false)}
        title={"Comparison Of Quotation"}
      >
        <Comparision />
      </CustomModalPDF>
    </>
  );
}
