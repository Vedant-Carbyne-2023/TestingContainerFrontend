import React, { useEffect, useState } from "react";
import AdminNavbar from "../../../CommonUtitlites/AdminNavbar/AdminNavbarC";
import CustomModal from "../../../CommonUtitlites/ModalPopUp/CustomModal";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import {userId, role, userName } from '../../../CommonUtitlites/Others/commonExportVariable'
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import useGetAllProjectsForAdmin from "../../../CommonUtitlites/customHooks/useGetAllProjectsForAdmin";
import Inward from "./Inward";
import Outward from "./Outward";
import Loader from "./Loader";
import GpWise from "./GpWise";

export default function StockReportVendor({vendorName}) {
  const [products, setProducts] = useState([])

  
  
    const [projectName, setProjectName] = useState("");
    const [projectId, setProjectId] = useState("");

    const [vendor, setVendor] = useState(vendorName)
console.log(vendorName)
    useEffect(() => {
      if(vendorName){

        setVendor(vendorName)
      }
    }, [vendorName])
    

    let projects = useGetAllProjectsForAdmin()
   const [loading, setLoading] = useState(false)

  //  useEffect(() => {
  //   const getStock = async()=>{

  //     setLoading(true)
  //     let result = api.post('/stock-report-vendorWise', {userId,role, vendorName}) 
  //     result = await errorHandler(result)
  //     console.log(result.data)
  //     setProducts(result.data.data)
  //     setLoading(false)
  //   }
  //   getStock()
  //  }, [vendorName])
   
   const handleProjectChange = async(e) => {
    const selectedProjectId = e.target.value;
    setProjectId(selectedProjectId)
    if(!selectedProjectId){
      alert("Please Select Project ")
      return;
    }
    setLoading(true);
    let result = api.post('/stock-report-vendorWise', {userId,role,userName, vendorName, projectId:selectedProjectId}) 
  //  let result = api.post('/stock-report-projectWise&AllItems', {userId,role, projectId:selectedProjectId}) 
   result = await errorHandler(result)
   console.log(selectedProjectId,result.data.data);
   setProducts(result.data.data)
   setLoading(false);
  };

    
   

    const cellStyle = {
      border: '1px solid black',
    
      padding: '8px',
      textAlign: 'center',
    };
  

    const [modalOpen1, setModalOpen1] = useState(false)
    const [modalOpen2, setModalOpen2] = useState(false)
    const [itemSelected, setItemSelected] = useState("")
    const [activeComponent, setActiveComponent] = useState("project");
    const handleOpenModal = (item, field) => {
      if(!vendorName){
        alert("No Vendor Selected")
      }
      setVendor(vendorName)
      if(!projectId){
        alert("No Project Id Please Select Project First")
        return '';
      }
      console.log('tried opening',field, item);
      setItemSelected(item)
      if(field=='MIN'){
      setModalOpen1(true)}
      if(field=='MRN')
      {setModalOpen2(true)}
    

    };

  return (
    <>
         {

            loading?
            <Loader/>
            :
          
        

                <div className="container-fluid mt-5">
                  <div className="mb-2"
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        marginTop: "20px"
                      }}
                    >
                      <button
                        className={`btn ${activeComponent === "project" ? "active" : ""}`}
                        style={{ margin: "0 10px" }}
                        onClick={() => setActiveComponent("project")}
                      >
                        Project-Wise
                      </button>
                      <button
                        className={`btn ${activeComponent === "gp" ? "active" : ""}`}
                        style={{ margin: "0 10px" }}
                        onClick={() => setActiveComponent("gp")}
                      >
                        Gp-Wise
                      </button>
                  </div>
                  {activeComponent && activeComponent === "project" &&  (
            <>
            <div className="container-fluid">
        <div className="mb-3">
            <label htmlFor="projectSelect" className="form-label">
              Select Project
            </label>

            <select
              className="form-control"
              id="projectSelect"
              onChange={handleProjectChange}
              value={projectId} // Bind the selected project's ID
            >
              <option value="">Select a Project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
          </div>
          {  (products.length===0)?<div>No data Found</div>:
          (     
            <table className="table">
                    <thead>
                      <tr>
                        <th scope="col" style={cellStyle}>S.No.</th>
                        {/* <th scope="col" style={cellStyle}>MRN No.</th> */}
                        <th scope="col" style={cellStyle}>
                          Material Description</th>
                        <th scope="col" style={cellStyle}>UOM</th>
                        <th scope="col" style={cellStyle}>Quantity (MRN)</th>
                        <th scope="col" style={cellStyle}>Quantity (MIN)</th>
                        {/* <th scope="col" style={cellStyle}>Stock Remaining To Deliver Or Issue (As On Date)</th> */}
                        {/* <th scope="col" style={cellStyle}>GP</th> */}
                        {/* <th scope="col" style={cellStyle}>Vendor Name</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {
                      products &&
                      products.map((item, index) => (
                          <tr key={item._id}>
                        <td scope="col" style={cellStyle}>{index+1}</td>
                        {/* <th scope="col" style={cellStyle}>{item.mrnsId}</th> */}
                        <td scope="col" style={{textAlign:"left", border: '1px solid black',
    
    padding: '8px'}}> 
                        
                        {item.materialCategory + '/' +item.materialSubCategory +'/'+ item.materialDescription }
                         </td>
                        <td scope="col" style={cellStyle}>{item.uom}</td>
                        <th scope="col" style={cellStyle}><button className="btn" type="button"
                        onClick={()=>handleOpenModal(item,"MRN")}
                        >{item.mrnQuantity} </button></th>
                        <th scope="col" style={cellStyle}><button className="btn" type="button"
                        onClick={()=>handleOpenModal(item,"MIN")}
                        >{item.issuedQuantity}</button></th>
                        {/* <th scope="col" style={cellStyle}>{item.mrnQuantity-item.issuedQuantity }</th> */}
                          </tr>
                       ))}
                    </tbody>
                    </table>
          )
                    } 
                    </>
                    )}
                    {activeComponent && activeComponent === "gp" && (
                        <GpWise vendorName={vendorName}/>
                    )}
                    </div>
                    }
                    <CustomModal
                    isOpen={modalOpen2}
                    onClose={()=>setModalOpen2(false)}
                    size={"xl"}
                    title={"Stock Report Inward"}
                    >
                        <Inward projectId={projectId} itemSelected={itemSelected} vendorName={vendorName} />

                    </CustomModal>
                    <CustomModal
                    isOpen={modalOpen1}
                    onClose={()=>setModalOpen1(false)}
                    size={"xl"}
                    title={"Stock Report Outward"}
                    >
                        <Outward projectId={projectId} itemSelected={itemSelected} vendorName={vendorName}/>

                    </CustomModal>
    </>
  );
}
