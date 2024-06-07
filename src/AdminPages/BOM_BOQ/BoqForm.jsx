import React, {useState, useEffect } from "react";
import { api } from '../../CommonUtitlites/AxiosSetup/axiosDefault';
import { errorHandler } from '../../CommonUtitlites/Others/errorHandle';
import useGetProductData from "../../CommonUtitlites/customHooks/useGetProducts";
import useGetAllProjectsForAdmin from "../../CommonUtitlites/customHooks/useGetAllProjectsForAdmin";
import CustomModal from "../../CommonUtitlites/ModalPopUp/CustomModal";
import UpdateBoqFormModal from "./UpdateBoqFormModal";
import {
  userId,
  role,
} from  "../../CommonUtitlites/Others/commonExportVariable";
import BoqFormProjectWise from "./BoqForProjectWise/BoqFormProjectWise";
import BoqFormGpWise from "./BoqForGpWise/BoqFormGpWise";
import GetBoqFormGpWise from "./BoqForGpWise/GetBoqFormGpWise";
import GetBoqFormProjectWise from "./BoqForProjectWise/GetBoqFormProjectWise";

const BoqForm = () => {
  const [activeComponent, setActiveComponent] = useState("Create BOQFormGpWise");
  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '2rem',
    justifyContent: 'space-around', // Default value for mobile screens
  };

  const mediumScreenStyle = {
    '@media (minWidth: 768px)': {
      justifyContent: 'center', // Change this value for medium screens
    },
  };
  return ( 
        <>
        {/* <div
          className="row p-0 m-0 mt-2 d-flex"
          style={{ justifyContent: "space-around" }}
        > */}
        {/* <div className="row p-0 m-0 mt-2 d-flex flex-wrap justify-content-center"> */}
        <div className="row p-0 m-0 mt-2" style={{ ...containerStyle, ...mediumScreenStyle }}>
          {/* <button
            className={`btn ${
              activeComponent === "Create BOQForm" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("Create BOQForm")}
          >
            Create BOQ Form For Project
          </button> */}
          <button
           className={`btn col-6 col-md-2 mb-2 ml-2 ${activeComponent === "Create BOQFormGpWise" ? "active" : ""}`}
            // className={`btn ${
            //   activeComponent === "Create BOQFormGpWise" ? "active" : ""
            // }`}
            onClick={() => handleButtonClick("Create BOQFormGpWise")}
          >
            Create BOQ Form For A GP
          </button>
          <button
            className={`btn col-6 col-md-2 mb-2 ml-2 ${activeComponent === "Get BOQForm" ? "active" : ""}`}
            // className={`btn ${
            //   activeComponent === "Get BOQForm" ? "active" : ""
            // }`}
            onClick={() => handleButtonClick("Get BOQForm")}
          >
            Get BOQ For A Project
          </button>
          <button
            className={`btn col-6 col-md-2 mb-2 ml-2 ${activeComponent === "Get BOQFormGpWise" ? "active" : ""}`}
            // className={`btn ${
            //   activeComponent === "Get BOQFormGpWise" ? "active" : ""
            // }`}
            onClick={() => handleButtonClick("Get BOQFormGpWise")}
          >
            Get And Update BOQ Form For A GP
          </button>
         </div> 
         {/* {activeComponent === "Create BOQForm" && (
            <BoqFormProjectWise/>

            )}  */}
         {activeComponent === "Create BOQFormGpWise" && (
            <BoqFormGpWise/>
            )} 
         {activeComponent === "Get BOQFormGpWise" && (
            <GetBoqFormGpWise/>
            )} 
         {activeComponent === "Get BOQForm" && (
            <GetBoqFormProjectWise/>
            )} 

          {/* 2 component */}
     
          {/* <CustomModal
            isOpen={showModal}
            onClose={handleCloseModal}
            title={"Update BOQForm"}
          >
            {selectedItem &&<UpdateBoqFormModal data={selectedItem} />}           
          </CustomModal> */}
    </>
     );
}
 
export default BoqForm;