import React, { useEffect, useRef, useState } from "react";
// import "./style.css";
// import PR from "./PR";
// import Indent from "./Indent";
// import MRN from "./MRN";
// import RecommendIndent from "./RecommendIndent";
// import ToBeApproveIndent from "./ToBeApproveIndent";
// import ReturnToSite from "./ReturnToSite";
import CustomModalPDF from "../../CommonUtitlites/ModalPopUpWithPDF/CustomModal";
import CustomModal from "../../CommonUtitlites/ModalPopUp/CustomModal";
import { role } from "../../CommonUtitlites/Others/commonExportVariable";
import MR_Represent_Table from "./TableForRepresentMR/MR_Represent_Table";
import MaterialRequisition from "./MaterialRequisition/MaterialRequisition";
import ReturnToStore from "./ReturnToSite/ReturnToStore";
import PR_Represent_Table from "./TableForRepresentPR/PR_Represent_Table";
import RecommendMaterialRequisition from "./RecommendMaterialRequisition/RecommendMaterialRequisition";
import ApproveMaterialRequisition from "./ApproveMR_PR/ApproveMaterialRequisition";
import ApprovePurchaseRequisition from "./ApproveMR_PR/ApprovePurchaseRequisition";
import PurchaseRequisition from "./PurchaseRequisition/PurchaseRequistion";
import MiddleWareForPrint from "./MaterialRequisition/MiddleWareForPrint";
import useGetRoleWithPermission from "../../CommonUtitlites/customHooks/useGetRoleWithPermission";
import useGetRolePermissionComponentWise from "../../CommonUtitlites/customHooks/useGetPermissionComponentWise";

export default function UserMaterialRequisition({compPermission}) {
  let permission = useGetRolePermissionComponentWise(compPermission)
console.log(permission)
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpen2, setModalOpen2] = useState(false);
  const [isModalOpen3, setModalOpen3] = useState(false);
  const [isModalOpen4, setModalOpen4] = useState(false);
  const [isModalOpen5, setModalOpen5] = useState(false);
  const [isModalOpen6, setModalOpen6] = useState(false);
  const [submit, setSubmit] = useState(false)


  const [showDropdown2, setShowDropdown2] = useState(false);

  const [permissions, setPermissions] = useState([])

  useEffect(() => {
    const permissionObject = permission.map(item => ({
      [item.permission]: item.value
    }));
   setPermissions(permissionObject)

  }, [permission])
  

// console.log(  permissions.some(item => item.approve===true))

  return (
    <>
       <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ zIndex: '1' }}>
      <span><b>Indent(s)</b></span>
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


        {
      permissions.some(item => item.add===true)
         
         &&
         
            <>
              <li className="nav-item mt-1">
                 <button
                   type="button"
                   id="addIndent"
                   className="btn btn-sm btn-outline-primary"
                   onClick={() => setModalOpen(!isModalOpen)}
                   style={{
                      borderColor: "navy",
                      zIndex: "100",
                      padding: "0.2rem 0.5rem"
                    }}
                  >
                     <i className="fas fa-plus"></i> <b>&nbsp; Material Requisition</b>
                 </button>
              </li>
             
            </>
          }
        {/* {
      permissions.some(item => item.add===true)
         
         &&
         
            <>
              <li className="nav-item mt-1">
              <button
                type="button"
                id="addIndentRTN"
                className="btn btn-sm btn-outline-primary"
                onClick={() => setModalOpen3(!isModalOpen3)}
                style={{ borderColor: "navy", zIndex: "100", padding: "0.2rem 0.5rem" }}
              >
                <i className="fas fa-plus"></i>{" "}
                <b>&nbsp; Material Requisition For Return To Store</b>
              </button>
              </li>
             
            </>
          } */}

          {
            // handleSeparatePermission("Material Requisition")
            permissions.some(item => item.approve===true)
         
          && (
            <>
              <li className="nav-item mt-1">
              <button
                type="button"
                id="approveMRN"
                className="btn btn-sm btn-outline-primary"
                onClick={() => setModalOpen5(!isModalOpen5)}
                style={{ borderColor: "navy", zIndex: "100", padding: "0.95rem 0.5rem" }}
              >
                <b>&nbsp; Approve Material Requisition</b>
              </button>
              </li>
             
            </>
          )}

          {
           permissions.some(item => item.recommend===true)
          
           && 
          (
            <>
           
            <li className="nav-item mt-1">
            <button
              type="button"
              id="approveMRN"
              className="btn btn-sm btn-outline-primary"
              onClick={() => setModalOpen4(!isModalOpen4)}
              style={{ borderColor: "navy", zIndex: "100", padding: "0.95rem 0.5rem" }}
            >
              <b>&nbsp; Recommend Material Requisition</b>
            </button>
            </li>
            </>
          )}

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
          </li> */}
        </ul>
        </div>
      </nav> 
      

      { 
      permissions.some(item => item.show===true) 
    
      &&
      <MR_Represent_Table state={submit} />
      
      }
          

      <CustomModal
        size={"xl"}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={"Material Requisition Form"}
      >
        <MiddleWareForPrint  setSubmit={(state)=>setSubmit(!state)} OnClose={()=>setModalOpen(false)}/>
      </CustomModal>



      <CustomModal
        size={"large"}
        isOpen={isModalOpen4}
        onClose={() => setModalOpen4(false)}
        title={"Recommend Material Requisition"}
      >
        <RecommendMaterialRequisition setStatus={(data)=>setSubmit(!submit)}/>
      </CustomModal>



      <CustomModal
        size={"large"}
        isOpen={isModalOpen5}
        onClose={() => setModalOpen5(false)}
        title={"Approve Material Requisition"}
      >
        <ApproveMaterialRequisition setStatus={(data)=>setSubmit(!submit)}/>
      </CustomModal>





    </>
  );
}
