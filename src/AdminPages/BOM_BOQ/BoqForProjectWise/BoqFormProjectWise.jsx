import React, {useState, useEffect } from "react";
import { api } from '../../../CommonUtitlites/AxiosSetup/axiosDefault';
import { errorHandler } from '../../../CommonUtitlites/Others/errorHandle';
import useGetProductData from "../../../CommonUtitlites/customHooks/useGetProducts";
import useGetAllProjectsForAdmin from "../../../CommonUtitlites/customHooks/useGetAllProjectsForAdmin";
import CustomModal from "../../../CommonUtitlites/ModalPopUp/CustomModal";
// import Loader from "../../../CommonUtitlites/Loader/Loader";
import ProgressBar from "../../../CommonUtitlites/Loader/ProgressBar";
import Swal from 'sweetalert2';
import UpdateBoqFormModal from "./UpdateBoqFormForProject";
import {
  userId,
  role,
  userName,
} from  "../../../CommonUtitlites/Others/commonExportVariable";
import EditableTable from "./EditableTable/EditableTable";

const BoqFormProjectWise = () => {
  
  const [tableData, setTableData] = useState([])

    let projects = useGetAllProjectsForAdmin()
    // console.log('we have options ',projects);
    const tableStyle = {
        border: '1px solid black',
        borderCollapse: 'collapse',
        width: '100%',
      };
      const cellStyle = {
        border: '1px solid black',
      
        padding: '8px',
        textAlign: 'center',
      };

// console.log(tableData)
      // to store selected project name and id
      const [projectName, setProjectName] = useState("");
      const [projectId, setProjectId] = useState("");



      const handleProjectChange = async(e) => {
        const selectedProjectId = e.target.value;
       setProjectId(selectedProjectId)

     let project = projects.find(project => project.id === selectedProjectId)

     setProjectName(project.name)

      };


      const [loading, setLoading] = useState(false);

      const handleSubmit = async(e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        
        // console.log(projectId, projectName,tableData)
        // console.log('tried to submit');
        // const newData = [];
        if(projectId===""){
            Swal.fire("Please Select Project!");
            // alert("Please Select Project!");
          return;

        }
        
        else{
          setLoading(true);
          // console.log(tableData.length)
            for (let i = 0; i < tableData.length; i++) {
                // if(i==0) continue;
                let temp={
                    serviceOrSupply: "Supply",
                    totalQuantity: parseInt(tableData[i].quantity),
                    productCode: tableData[i].materialCategory + '/'+tableData[i].materialSubCategory+ '/'+ tableData[i].materialDescription ,
                    projectId: projectId,
                    projectName: projectName,
                    userId:userId,
                    role:role,
                    userName:userName,
                };
                // console.log(temp)

                let result = api.post('/create-boqForm', temp);
                result = await errorHandler(result);
                // console.log(result.data);
                // Use SweetAlert instead of alert
               Swal.fire({
                icon: 'success',
                title: 'Success',
                text: result.data.message,
              });
                // alert(result.data.message)
            }
            setLoading(false);
        }
        // console.log('saved each row');
    
        // setFormData(newData);
      };

      const [showModal, setShowModal] = useState(false);
      const [selectedItem, setSelectedItem] = useState(null);

      const handleCloseModal = () => {
        setSelectedItem(null);
        setShowModal(false);
        // window.location.reload();
      };
    
    return ( 
      <>
        { loading?<ProgressBar/>:<div className="container-fluid">
       
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
            <div
        
          >
                  <form  onSubmit={handleSubmit}>
                   <EditableTable tableData={(data)=>setTableData(data)} />
                  <button type="submit" className="btn btn-primary mt-3">
                     Submit
                  </button>
                  </form>
              </div>
    
          
          <CustomModal
            isOpen={showModal}
            onClose={handleCloseModal}
            title={"Update BOQForm"}
          >
            {selectedItem &&<UpdateBoqFormModal data={selectedItem} />}           
          </CustomModal>
          </div>
        }
      </>
     );
}
 
export default BoqFormProjectWise;