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

export default function UserComparisionStatement({compPermission}) {
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
    ""
  );
  
    const determineActiveComponent = () => {
      const addPermission = permissions.some(item => item.add === true);
      const showPermission = permissions.some(item => item.show === true);
  
      if (addPermission) {
        return 'Purchase Quotation';
      } else if (showPermission) {
        return 'Approved Comparision Statements';
      } else {
        return ''; // Set the default value
      }
    };

  useEffect(() => {
    if(permissions)
    {
      const initialActiveComponent = determineActiveComponent();
      setActiveComponent(initialActiveComponent);
    }
  }, [permissions]);

  const navigate = useNavigate();

  const [prId, setPrId] = useState("");

  const [vendorId, setVendorId] = useState("");

  const [comparisionId, setComparisionId] = useState("");

  const [selectedVendors, setSelectedVendors] = useState([]);

  const [showDropdown2, setShowDropdown2] = useState(false);
 
  return (
    <>
      <div>
      

      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ zIndex: '1' }}>
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
        {/* <span className="navbar-toggler-icon"></span> */}
        <i class="fa-solid fa-caret-down"></i>
      </button>
 
      </nav>

        <div
          className="row p-0 m-0 mt-2 d-flex"
          style={{ justifyContent: "space-around" }}
        >
         {permissions.some((item) => item.add === true) && (
        <>
          <button
            className={`btn ${
              activeComponent === 'Purchase Quotation' ? 'active' : ''
            }`}
            onClick={() => handleButtonClick('Purchase Quotation')}
          >
            Purchase Quotation(s)
          </button>

          <button
            className={`btn ${
              activeComponent === 'Comparision Statements' ? 'active' : ''
            }`}
            onClick={() => handleButtonClick('Comparision Statements')}
          >
            Comparision Statement(s)
          </button>
        </>
      )}

      {permissions.some((item) => item.show === true) && (
        <>
          <button
            className={`btn ${
              activeComponent === 'Approved Comparision Statements'
                ? 'active'
                : ''
            }`}
            onClick={() => handleButtonClick('Approved Comparision Statements')}
          >
            Approved Comparision Statement(s)
          </button>

          <button
            className={`btn ${
              activeComponent === 'Show Approved CS' ? 'active' : ''
            }`}
            onClick={() => handleButtonClick('Show Approved CS')}
          >
            Show Approved CS
          </button>
        </>
      )}
       
    
        </div>
      </div>
      {activeComponent === "Purchase Quotation" ? (
        <ShowQuotations
        comparision_permission={true}
          toggleTo={(toggle) => handleButtonClick("Comparision Statements")}
          prId={(quotationId) => setPrId(quotationId)}
          setVendorId={(id)=>setVendorId(id)}
          
        />
      ) 
      
      : activeComponent === "Comparision Statements" ? (
        <Comparision
        purchase_permission={false}
          prId={prId}
          vendorId={vendorId}
          setToggle={(toggle) => handleButtonClick("Generate Purchase Order")}
          setPrId={(prId) => setPrId(prId)}
          setSelectedVendor={(vendor) => setVendorId(vendor)}
        />
      ) 
      
      :activeComponent === "Approved Comparision Statements" ? (
          activeComponent === "Approved Comparision Statements" && (
          <ShowApprovedComparisionsForUser
            // prId={prId}
            purchase_permission={false}
            setToggle={(toggle) => handleButtonClick("Show Approved CS")}
            setPrId={(prId) => setPrId(prId)}
            setComparisionId={(id) => setComparisionId(id)}
            setSelectedVendors={(vendor) => setSelectedVendors(vendor)}
          />
        )
      ) 


      :activeComponent === "Show Approved CS" ? (
    
        activeComponent === "Show Approved CS" && (
          <ApprovedComparision
          purchase_permission={false}
            prId={prId}
            setToggle={(toggle) => handleButtonClick("Generate Purchase Order")}
            comparisionId={comparisionId}
            selectedVendors={selectedVendors}

            setPrId={(prId) => setPrId(prId)}
            setSelectedVendor={(vendor) => setVendorId(vendor)}
          />
        )
      ) 

      :
      ""
      
        }
   

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
