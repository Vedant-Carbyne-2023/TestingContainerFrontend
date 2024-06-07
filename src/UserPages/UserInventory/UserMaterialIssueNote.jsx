import React, { useEffect, useRef, useState } from "react";
import CustomModal from "../../CommonUtitlites/ModalPopUp/CustomModal";
import AddInventory from "./InventoryStock/AddInventory/AddInventory";
import { role } from "../../CommonUtitlites/Others/commonExportVariable";
import Stock from "./InventoryStock/Stock/Stock";
import MaterialTransferOrder from "./MaterialTransferOrders/MaterialTransferOrder";
import MaterialRecieptNote from "./MaterialReceiptNotes/MaterialRecieptNote";
import MaterialIssueNotes from "./MaterialIssueNotes/MaterialIssueNotes";
import MaterialRequisitionsBySite from "./ApprovedMaterialRequisitions/MaterialRequisitionsBySite";
import MaterialIssueNoteForm from "./MaterialIssueNotes/MaterialIssueNoteForm";
import MaterialRequisitionPO from "./MaterialRequistionPurchaseBehalf/MaterialRequisitionPO";
import MaterialRecieptNoteForm from "./MaterialReceiptNotes/MaterialRecieptNoteForm";
import useGetUserProject from "../../CommonUtitlites/customHooks/useGetUserProject";
import SearchInput from "../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInput";
import SearchInputPostgres from "../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInputForPostgresIdIssue";

import styles from './Inventory.module.css'
import GeneratedPurchaseOrder from "./GeneratedPurchaseOrder/GeneratedPurchaseOrder";
import useGetRolePermissionComponentWise from "../../CommonUtitlites/customHooks/useGetPermissionComponentWise";

export default function UserMaterialIssueNote({compPermission}) {
  let permission = useGetRolePermissionComponentWise(compPermission)
  const [permissions, setPermissions] = useState([])

  useEffect(() => {
    const permissionObject = permission.map(item => ({
      [item.permission]: item.value
    }));
   setPermissions(permissionObject)

  }, [permission])
  // console.log(permissions)
  
  const [activeComponent, setActiveComponent] = useState("MRN");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  let projects = useGetUserProject();
  if (projects === undefined || projects === null) {
    projects = [];
  }
  const [selectedProjectId, setSelectedProjectId] = useState("");
  // console.log(selectedProjectId);
  // console.log(projects);

  const data = {
    block: "New",
    gp: "New",
    indentDate: "2023-07-08T08:58:50.657Z",
    indentId: "CIPL/MR/23-24/00015",
    indentStatus: "Approved",
    inventoryCategory: "sdfsdf",
    itemName: "sdfsdf",
    project: "New",
    remark: "dgdfgdfg",
    store: "New",
    vendor: "New",
  };

  const [status, setStatus] = useState(false);

  const [showDropdown2, setShowDropdown2] = useState(false);
  

  return (
    <>
      <div>
      
{/* <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ zIndex: '1' }}>
      <span><b>Inventory(s)</b></span>
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
        {/* {!(
            role == "Deputy Project Manager" ||
            role == "Project Manager" ||
            role == "Project On-Site Team"
          ) && (
            <>
             
              <li className="nav-item mt-1">
              <button
                type="button"
                id="addInventory"
                className="btn btn-sm btn-outline-primary"
                data-toggle="modal"
                data-target="#myModal"
                onClick={() => setIsModalOpen3(true)}
                style={{ borderColor: "navy", zIndex: "100", padding: "0.2rem 0.5rem" }}
              >
                <i className="fas fa-plus"></i>
                <b> &nbsp; Create Material Issue Note</b>
              </button>
              </li>
              <li className="nav-item mt-1">
              <button
                type="button"
                id="addPoMrn"
                className="btn btn-sm btn-outline-primary"
                onClick={() => setIsModalOpen4(true)}
                style={{ borderColor: "navy", zIndex: "100", padding: "0.2rem 0.5rem" }}
              >
                <i className="fas fa-plus"></i>
                <b>
                  {" "}
                  &nbsp; Create Material Receipt Note Behalf Of Purchase Order
                </b>
              </button>
              </li>
            </>
          )} */}

          {/* <li className="nav-item mt-1">
          <button
            type="button"
            id="addPoMrn"
            className="btn btn-sm btn-outline-primary"
            onClick={() => setIsModalOpen2(true)}
            style={{ borderColor: "navy", zIndex: "100", padding: "0.2rem 0.5rem" }}
          >
            <i className="fas fa-plus"></i>
            <b> &nbsp; Material Requisition </b>
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
      </nav>  */}

        <CustomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={"Add Inventory"}
          size={"large"}
        >
          <AddInventory
            projectId={selectedProjectId ? selectedProjectId : null}
            setStatus={(status)=>setStatus(status)}
          />
        </CustomModal>

        <CustomModal
          isOpen={isModalOpen2}
          onClose={() => setIsModalOpen2(false)}
          size={"large"}
          title={"Material Requisitions Behalf Of Purchase Order"}
        >
          <MaterialRequisitionPO   projectId={selectedProjectId?selectedProjectId:null}/>
        </CustomModal>


        <CustomModal
          isOpen={isModalOpen3}
          onClose={() => setIsModalOpen3(false)}
          size={"large"}
          title={"Add Material Issue"}
        >
          
          <MaterialIssueNoteForm  projectId={selectedProjectId?selectedProjectId:null} data={data} />
        </CustomModal>


        <CustomModal
          isOpen={isModalOpen4}
          onClose={() => setIsModalOpen4(false)}
          size={"xl"}
          title={"Create Material Reciept Note"}
        >
          <MaterialRecieptNoteForm projectId={selectedProjectId?selectedProjectId:null} data={data} />
        </CustomModal>

      </div>


      
      <div className="container">
        <label>Select Project</label>
        <select
          placeholder="Please Select Project First"
          id="projectName"
          className="form-control mb-3"
          onChange ={(e)=>setSelectedProjectId(e.target.value)}
        >
          <option className="form-control">Select Project</option>
      {
        projects && projects.map(project => 
          <option value={project.id} className="form-control">{project.name}</option>
          )
      }
        </select>
        <div
          className="row p-0 m-0 mt-2 d-flex"
          style={{ justifyContent: "space-around" }}
        >
          <button
            className={`btn ${activeComponent === "MRN" ? styles.active : ""}`}
            onClick={() => handleButtonClick("MRN")}
          >
            Material Requisition Notes
          </button>
          <button
            className={`btn ${activeComponent === "MIN" ? styles.active : ""}`}
            onClick={() => handleButtonClick("MIN")}
          >
            Material Issue Notes
          </button>
         
        </div>

      </div>



      <div>
        
          



        <div className="mb-4">
          {selectedProjectId ? (
            <>
              {activeComponent === "MRN" &&
               permissions.some(item => item.show===true) &&
              
              (
                <MaterialRequisitionsBySite
                permission ={permissions.some(item => item.add===true)}
                  projectId={selectedProjectId ? selectedProjectId : ""}
                />
              )}
              {activeComponent === "MIN" && (
                     permissions.some(item => item.show===true) &&
                <MaterialIssueNotes
                  projectId={selectedProjectId ? selectedProjectId : ""}
                />
              )}
            
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
