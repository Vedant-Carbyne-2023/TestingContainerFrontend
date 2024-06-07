import React, { useEffect, useRef, useState } from "react";

import styles from '../../Inventory.module.css'
import Stock from "./Stock";
import GpWiseStock from "./GpStock";

export default function InventoryStockReport({projectId}) {



  const [activeComponent, setActiveComponent] = useState("ProjectStock");


  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };




  
  const [status, setStatus] = useState(false);

  const [showDropdown2, setShowDropdown2] = useState(false);


  return (
    <>
     



      <div>
        <div
          className="row p-0 m-0 mt-2 d-flex"
          style={{ justifyContent: "space-around" }}
        >

    
          <button
            className={`btn col-6 col-md-2 mb-2 ml-2 ${activeComponent === "ProjectStock" ? styles.active : ""}`}
            onClick={() => handleButtonClick("ProjectStock")}
          >
          Project Inventory Stock
          </button>
          <button
            className={`btn col-6 col-md-2 mb-2 ml-2 ${activeComponent === "GPStock" ? styles.active : ""}`}
            onClick={() => handleButtonClick("GPStock")}
          >
            GP Wise Inventory Stock
          </button>
          
     
</div>


        <div className="mb-4">
          {projectId ? (
            <>
           
              {activeComponent === "ProjectStock" && 
             
              (
                <>
                <Stock
                  projectId={projectId ? projectId : ""}
                  status={status}
                />
          
                </>
              )}
              {activeComponent === "GPStock" && 
             
              (
                <>
            
                <GpWiseStock
                  projectId={projectId ? projectId : "false"}
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
    </>
  );
}
