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
import GpWiseStock from "./InventoryStock/Stock/GpStock";
import useGetRolePermissionComponentWise from "../../CommonUtitlites/customHooks/useGetPermissionComponentWise";
import EditGpWiseStock from "../../AdminPages/Inventory/InventoryStock/EditGpWiseStock";

export default function UserInventoryStockReport({compPermission}) {
  let permission = useGetRolePermissionComponentWise(compPermission)
  const [permissions, setPermissions] = useState([])

  useEffect(() => {
    const permissionObject = permission.map(item => ({
      [item.permission]: item.value
    }));
   setPermissions(permissionObject)

  }, [permission])

  const [activeComponent, setActiveComponent] = useState("ProjectStock");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);
  const [isModalOpen6, setIsModalOpen6] = useState(false);


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
  const dropdownRef2 = useRef(null);

  const handleDropdownToggle = () => {
    setShowDropdown2(!showDropdown2);
  };

  return (
    <>
      <div>
      <h6>Inventory Stock Report</h6>
      <button
              type="button"
              id="createConsumedOrDisrupted"
              className="btn btn-sm btn-outline-primary"
              onClick={() => setIsModalOpen6(true)}
              style={{ borderColor: "navy", zIndex: "100", padding: "0.2rem 0.5rem"   }}
            >
               <i className="fas fa-plus"></i>
               <b> &nbsp; Enter Consumed Or Wasted Or Disrupted Quantity </b>
             </button>
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
        <ul className="navbar-nav w-100 d-flex justify-content-between">
      
    
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
      </nav>  */}

     

      </div>


      
      <div className="container d-flex flex-column align-items-center">
  <label>Select Project</label>
  <select
    style={{ width: "500px" }}
    placeholder="Please Select Project First"
    id="projectName"
    className="form-control mb-3"
    onChange={(e) => setSelectedProjectId(e.target.value)}
  >
    <option className="form-control">Select Project</option>
    {projects &&
      projects.map((project) => (
        <option value={project.id} className="form-control" key={project.id}>
          {project.name}
        </option>
      ))}
  </select>
</div>




      <div>
        <div
          className="row p-0 m-0 mt-2 d-flex"
          style={{ justifyContent: "space-around" }}
        >

    {  permissions.some(item => item.show===true)
    &&
    <>
         <div className="d-flex justify-content-center mb-3">
  <button
    className={`btn  mb-2 mr-4 ${activeComponent === "ProjectStock" ? styles.active : ""}`}
    
    onClick={() => handleButtonClick("ProjectStock")}
  >
    Project Inventory Stock
  </button>
  <button
    className={`btn mb-2 ml-2 ${activeComponent === "GPStock" ? styles.active : ""}`}
    onClick={() => handleButtonClick("GPStock")}
  >
    GP Wise Inventory Stock
  </button>
</div>

          
        </>}
</div>


        <div className="mb-4">
          {selectedProjectId ? (
            <>
           
              {activeComponent === "ProjectStock" && 
               permissions.some(item => item.show===true)
               &&
              (
                <>
                <Stock
                  projectId={selectedProjectId ? selectedProjectId : ""}
                  status={status}
                />
          
                </>
              )}
              {activeComponent === "GPStock" && 
               permissions.some(item => item.show===true)
               &&
              (
                <>
            
                <GpWiseStock
                  projectId={selectedProjectId ? selectedProjectId : "false"}
                  status={status}
                />
                </>
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <CustomModal
          isOpen={isModalOpen6}
          onClose={() => setIsModalOpen6(false)}
          size={"large"}
          title={"Enter Consumed Or Wasted Or Disrupted Quantities"}
        >
          <EditGpWiseStock/>
        </CustomModal>
    </>
  );
}
