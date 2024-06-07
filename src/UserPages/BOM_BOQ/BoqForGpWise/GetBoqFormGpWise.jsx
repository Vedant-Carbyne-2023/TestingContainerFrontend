import React, { useState, useEffect } from "react";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import useGetProductData from "../../../CommonUtitlites/customHooks/useGetProducts";
import useGetAllProjectsForAdmin from "../../../CommonUtitlites/customHooks/useGetAllProjectsForAdmin";
import CustomModal from "../../../CommonUtitlites/ModalPopUp/CustomModal";
import UpdateBoqFormForGp from "./UpdateBoqFormForGp";
import {
  userId,
  role,
  userName,
} from "../../../CommonUtitlites/Others/commonExportVariable";
import SearchInput from "../../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInput";
import Loader from "../../../CommonUtitlites/Loader/Loader";
import Swal from 'sweetalert2';

const GetBoqFormGpWise = ({permission}) => {
  console.log(permission)
  const [gps, setGps] = useState([]);
  const [selectedGp, setSelectedGp] = useState({ id: "", name: "" });

  let projects = useGetAllProjectsForAdmin();
  console.log("we have options ", projects);
  const tableStyle = {
    border: "1px solid black",
    borderCollapse: "collapse",
    width: "100%",
  };
  const cellStyle = {
    border: "1px solid black",

    padding: "8px",
    textAlign: "center",
  };

  // as we need 2 components
  const handleButtonClick = (component) => {
    setActiveComponent(component);
    setProjectName("");
    setProjectId("");
  };
  const [activeComponent, setActiveComponent] = useState("Create BOQForm");
  // to store selected project name and id
  const [projectName, setProjectName] = useState("");
  const [projectId, setProjectId] = useState("");
  const [retrievedData, setRetrievedData] = useState([]);
  const [desiredGps, setDesiredGps] = useState([]);
  const [loading, setLoading] = useState(false);

const [status, setStatus] = useState(false)   

      const handleProjectChange = async(e) => {
        setLoading(true);
        const selectedProjectId = e.target.value;
        setProjectId(selectedProjectId)
 
      let project = projects.find(project => project.id === selectedProjectId)
 
      setProjectName(project.name)
 
      // let response =  api.post('/get-all-gps', {locationName:project.name, userId, role, userName});
      // response= await errorHandler(response)
      setGps(project.gpName)
      setLoading(false);
       
        // console.log(retrievedData);
    }
   const handleGpChange = async(data) => {
        setLoading(true);
          setSelectedGp(data)
        
       
            let result = api.post('/get-boqForm-by-gp', {selectedProjectId:projectId, selectedGpId:data.id, userId,role,userName});
            result = await errorHandler(result);
            console.log(result.data)
            if(result.data && result.data.message){
               setRetrievedData(result.data.data);
                alert(result.data.message);
                console.log('after it', result.data.data);
            }
            setLoading(false);
      
      }

  // Edit a row of BOQ Form
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleUpdate = (item) => {
    setSelectedItem(item);
    setShowModal(true);
    console.log("came here", item);
  };
  const handleCloseModal = () => {
    setSelectedItem(null);
    setShowModal(false);
    // window.location.reload();
  };
  const [show, setShow] = useState(false)

  return (
    <div className="container-fluid">
      <div className="mb-3 ">
        <label htmlFor="projectSelect" className="form-label">
          Select Project
        </label>

        <select
       
          className="form-control"
          style={{width:"220px"}}
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
      <SearchInput
        title={"Select Gps"}
        items={gps}
        ResultOnClick={(data) => handleGpChange(data)}
      />

      {loading ? (
        <Loader />
      ) : retrievedData.length === 0 ? (
        <p>No data found</p>
      ) : (
        <>
        <button className="btn" type="button" onClick={()=>setShow(!show)}>Click To Edit Other</button>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <div className="container mt-4" style={{ maxWidth: "100%" }}>
            <div className="mt-2">
            <table className="table table-bordered table-hover" style={{ borderCollapse: "collapse", width: "100%", marginTop: "1rem" }}>
  <thead style={{backgroundColor:"#cedfe5"}}>
    <tr>
      <th scope="col" style={cellStyle}>
        Item No.
      </th>
      <th scope="col" style={cellStyle}>
        Service/Supply
      </th>
      <th scope="col" style={cellStyle}>
        Product Code
      </th>
      <th scope="col" style={cellStyle}>
        Total Quantity
      </th>
      {permission.some(permi => permi.update === true) && (
        <th scope="col" style={cellStyle}>
          Edit
        </th>
      )}
    </tr>
  </thead>
  <tbody>
    {retrievedData.map((item, index) => {
      if (!show || (show && item.quantity !== 0)) {
        return (
          <tr key={item._id}>
            <td style={cellStyle}>{index + 1}</td>
            <td style={cellStyle}>{item.serviceOrSupply}</td>
            <td style={cellStyle}>{item.productCode}</td>
            <td style={cellStyle}>{item.quantity}</td>
            {permission.some(permi => permi.update === true) && (
              <td style={cellStyle}>
                <button className="btn btn-primary" onClick={() => handleUpdate(item)}>
                  Update
                </button>
              </td>
            )}
          </tr>
        );
      } else {
        return null; // Don't render the row if show is true and quantity is 0
      }
    })}
  </tbody>
</table>

              </div>
             </div>
          </div>
          </>
         )}
      
          
          <CustomModal
            isOpen={showModal}
            onClose={handleCloseModal}
            title={"Update BOQForm"}
          >
            {selectedItem &&<UpdateBoqFormForGp data={selectedItem} setStatus={(submit)=>handleGpChange(selectedGp)} update_permission={ permission.some(permi=>permi.update===true)}/>}           
          </CustomModal>
          </div>
      
    
     );
}
 
export default GetBoqFormGpWise;
