import React, { useEffect, useState } from "react";
import "./inventory.css";

import MRN_Site from "./MaterialRequisitionsBySite";
import MRN_Stock from "./MaterialRequisitonByPO";

export default function ApprovedMaterialRequisition() {
  const [activeComponent, setActiveComponent] = useState("Site MRN");
  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <>
      <div
        className="mt-2"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <button
          className={`btn ${activeComponent === "Site MRN" ? "active" : ""}`}
          onClick={() => handleButtonClick("Site MRN")}
        >
          Site MR
        </button>
        <button
          className={`btn ${
            activeComponent === "Stock Inward MRN" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("Stock Inward MRN")}
        >
          Stock Inward MRN
        </button>
      </div>
      {activeComponent === "Site MRN" ? <MRN_Site /> : <MRN_Stock />}
    </>
  );
}
