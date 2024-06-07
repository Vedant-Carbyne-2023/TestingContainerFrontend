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

export default function Indents() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpen2, setModalOpen2] = useState(false);
  const [isModalOpen3, setModalOpen3] = useState(false);
  const [isModalOpen4, setModalOpen4] = useState(false);
  const [isModalOpen5, setModalOpen5] = useState(false);
  const [isModalOpen6, setModalOpen6] = useState(false);

  const [showDropdown2, setShowDropdown2] = useState(false);
  const dropdownRef2 = useRef(null);
const [show, setShow] = useState(false)

  const [submit, setSubmit] = useState(false)

  return (
    <>
      {/* <div className="title">
        <span>Indent (s)</span>
        <div>
         
              <button
                type="button"
                id="addIndent"
                className="btn btn-sm btn-outline-primary"
                onClick={() => setModalOpen(!isModalOpen)}
                style={{
                  borderColor: "navy",
                  zIndex: "100",
                  marginRight: "1rem",
                }}
              >
                <i className="fas fa-plus"></i> <b>&nbsp; Fill MR</b>
              </button>
              <button
                type="button"
                id="addIndentRTN"
                className="btn btn-sm btn-outline-primary"
                onClick={() => setModalOpen3(!isModalOpen3)}
                style={{ borderColor: "navy", zIndex: "100" }}
              >
                <i className="fas fa-plus"></i>{" "}
                <b>&nbsp; Fill MR For Return To Store</b>
              </button>
           

        
           
              <button
                type="button"
                id="approveMRN"
                className="btn btn-sm btn-outline-primary"
                onClick={() => setModalOpen5(!isModalOpen5)}
                style={{ borderColor: "navy", zIndex: "100" }}
              >
                <b>&nbsp; Approve Material Requisition</b>
              </button>

              <button
                type="button"
                id="approveMRN"
                className="btn btn-sm btn-outline-primary"
                onClick={() => setModalOpen6(!isModalOpen6)}
                style={{ borderColor: "navy", zIndex: "100" }}
              >
                <b>&nbsp; Approve Purchase Requisition</b>
              </button>
         



         
              <button
              type="button"
              id="addPR"
              className="btn btn-sm btn-outline-primary"
              onClick={() => setModalOpen2(!isModalOpen2)}
              style={{
                borderColor: "navy",
                zIndex: "100",
                marginRight: "1rem",
              }}
            >
              <i className="fas fa-plus"></i> <b>&nbsp; Fill Purchase Requisition</b>
            </button>


            <button
              type="button"
              id="approveMRN"
              className="btn btn-sm btn-outline-primary"
              onClick={() => setModalOpen4(!isModalOpen4)}
              style={{ borderColor: "navy", zIndex: "100" }}
            >
              <b>&nbsp; Recommend Material Requisition</b>
            </button>
        





        </div>
        <div className="search-bar">
          <input type="text" className="form-control" placeholder="Search" />
          <div className="search-icon-container">
            <div className="search-icon">
              <div className="icon">
                <i className="fas fa-search"></i>
              </div>
            </div>
          </div>
        </div>
      </div> */}

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
        style={{height: 'auto'}}
        id="navbarNavDropdown2"
      >
        <ul className="navbar-nav w-100 d-flex justify-content-between">
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
                <i className="fas fa-plus"></i> <b>&nbsp; Fill MR</b>
            </button>
          </li>
          <li className="nav-item mt-1">
              <button
                type="button"
                id="addIndentRTN"
                className="btn btn-sm btn-outline-primary"
                onClick={() => setModalOpen3(!isModalOpen3)}
                style={{ borderColor: "navy", zIndex: "100", padding: "0.2rem 0.5rem" }}
              >
                <i className="fas fa-plus"></i>{" "}
                <b>&nbsp; Fill MR For Return To Store</b>
              </button>
          </li>
          <li className="nav-item mt-1">
              <button
                type="button"
                id="approveMRN"
                className="btn btn-sm btn-outline-primary"
                onClick={() => setModalOpen5(!isModalOpen5)}
                style={{ borderColor: "navy", zIndex: "100", padding: "0.95rem 0.5rem" }}
              >
                <b>&nbsp; Approve MR</b>
              </button>
          </li>
          <li className="nav-item mt-1">
              <button
                type="button"
                id="approveMRN"
                className="btn btn-sm btn-outline-primary"
                onClick={() => setModalOpen6(!isModalOpen6)}
                style={{ borderColor: "navy", zIndex: "100", padding: "0.95rem 0.5rem"  }}
              >
                <b>&nbsp; Approve PR</b>
              </button>
          </li>
          <li className="nav-item mt-1">
            <button
              type="button"
              id="addPR"
              className="btn btn-sm btn-outline-primary"
              onClick={() => setModalOpen2(!isModalOpen2)}
              style={{
                borderColor: "navy",
                zIndex: "100",
                padding: "0.2rem 0.5rem"
              }}
            >
              <i className="fas fa-plus"></i> <b>&nbsp; Fill PR</b>
            </button>
          </li>
          <li className="nav-item mt-1">
            <button
              type="button"
              id="approveMRN"
              className="btn btn-sm btn-outline-primary"
              onClick={() => setModalOpen4(!isModalOpen4)}
              style={{ borderColor: "navy", zIndex: "100", padding: "0.95rem 0.5rem"  }}
            >
              <b>&nbsp; Recommend MR</b>
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
      </nav>
              <div className="col-md-12 d-flex mt-2" style={{justifyContent:'space-around'}}>

      <button className={`btn ${show?'active':""}`}  onClick={()=>setShow(true)}>Material Requisition Table</button>
      <button className={`btn ${show?"":'active'}`} onClick={()=>setShow(false)}>Purchase Requisition Table</button>
     
              </div>
     {
      show?
      <MR_Represent_Table status={submit}/>
      :
      <PR_Represent_Table status={submit}/>
     }
          
          
      <CustomModal
        size={"xl"}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={"Material Requisition Form"}
      >
            <MaterialRequisition  status={(data)=>setSubmit(!submit)} OnClose={(data)=>setModalOpen(false)}/>
      </CustomModal>



      <CustomModal
        size={"xl"}
        isOpen={isModalOpen2}
        onClose={() => setModalOpen2(false)}
        title={"Purchase Requisition Form"}
      >
            <PurchaseRequisition  status={(data)=>setSubmit(!submit)} OnClose={(data)=>setModalOpen(false)}/>
      </CustomModal>



      <CustomModal
        size={"xl"}
        isOpen={isModalOpen3}
        onClose={() => setModalOpen3(false)}
        title={"Return Material To Store Form"}
      >
        <ReturnToStore />
      </CustomModal>



      <CustomModal
        size={"xl"}
        isOpen={isModalOpen4}
        onClose={() => setModalOpen4(false)}
        title={"Recommend Material Requisition"}
      >
        <RecommendMaterialRequisition setStatus={(data)=>setSubmit(!submit)}/>
      </CustomModal>



      <CustomModal
        size={"xl"}
        isOpen={isModalOpen5}
        onClose={() => setModalOpen5(false)}
        title={"Approve Material Requisition"}
      >
        <ApproveMaterialRequisition />
      </CustomModal>


      <CustomModal
        size={"xl"}
        isOpen={isModalOpen6}
        onClose={() => setModalOpen6(false)}
        title={"Approve Purchase Requisition"}
      >
        <ApprovePurchaseRequisition />
      </CustomModal>



    </>
  );
}
