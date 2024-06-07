// BoqForm.js

import React, { useState, useEffect } from "react";
import { api } from '../../CommonUtitlites/AxiosSetup/axiosDefault';
import { errorHandler } from '../../CommonUtitlites/Others/errorHandle';
import useGetProductData from "../../CommonUtitlites/customHooks/useGetProducts";
import useGetAllProjectsForAdmin from "../../CommonUtitlites/customHooks/useGetAllProjectsForAdmin";
import CustomModal from "../../CommonUtitlites/ModalPopUp/CustomModal";
import UpdateBoqFormModal from "./UpdateBoqFormModal";
import {
  userId,
  role,
  userName,
} from  "../../CommonUtitlites/Others/commonExportVariable";
import BoqFormProjectWise from "./BoqForProjectWise/BoqFormProjectWise";
import BoqFormGpWise from "./BoqForGpWise/BoqFormGpWise";
import GetBoqFormGpWise from "./BoqForGpWise/GetBoqFormGpWise";
import GetBoqFormProjectWise from "./BoqForProjectWise/GetBoqFormProjectWise";
import styles from "./BoqForm.module.css";

const BoqForm = ({ permissions }) => {
  const [activeComponent, setActiveComponent] = useState("Create BOQFormGpWise");
  
  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  return ( 
    <>
      <div className={`${styles.title} row p-0 m-0 mt-2`}>
        <div className="col-md-12">
          <h6 className="mb-0">BOQ Form</h6>
        </div>
      </div>
      <hr style={{color :"black"}}/>


      <div className={`${styles.rowButtons}`}>
        
        <button
          className={`${styles.btn} col-6 col-md-2 mb-2 ${activeComponent === "Create BOQFormGpWise" ? "active" : ""}`}
          onClick={() => handleButtonClick("Create BOQFormGpWise")}
        >
          Create BOQ Form For A GP
        </button>

        <button
          className={`${styles.btn} col-6 col-md-2 mb-2 ${activeComponent === "Get BOQForm" ? "active" : ""}`}
          onClick={() => handleButtonClick("Get BOQForm")}
        >
          Get BOQ For A Project
        </button>

        <button
          className={`${styles.btn} col-6 col-md-2 mb-2 ${activeComponent === "Get BOQFormGpWise" ? "active" : ""}`}
          onClick={() => handleButtonClick("Get BOQFormGpWise")}
        >
          Get And Update BOQ Form For A GP
        </button>
        
      </div>
      <hr style={{color :"black"}}/>


      {activeComponent === "Create BOQFormGpWise" && (
        <BoqFormGpWise permission={permissions}/>
      )} 
      
      {activeComponent === "Get BOQFormGpWise" && (
        <GetBoqFormGpWise permission={permissions}/>
      )} 

      {activeComponent === "Get BOQForm" && (
        <GetBoqFormProjectWise permission={permissions}/>
      )} 
    </>
  );
}

export default BoqForm;
