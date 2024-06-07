import React, { useState, useEffect } from "react";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import useGetProductData from "../../../CommonUtitlites/customHooks/useGetProducts";
import useGetAllProjectsForAdmin from "../../../CommonUtitlites/customHooks/useGetAllProjectsForAdmin";
import CustomModal from "../../../CommonUtitlites/ModalPopUp/CustomModal";
// import Loader from "../../../CommonUtitlites/Loader/Loader";
import ProgressBar from "../../../CommonUtitlites/Loader/ProgressBar";
import Swal from 'sweetalert2';
import UpdateBoqFormGpWise from "./UpdateBoqFormForGp";
import {
  userId,
  role,
  userName
} from "../../../CommonUtitlites/Others/commonExportVariable";
import EditableTable from "./EditableTable/EditableTable";
import SearchInput from "../../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInput";
import Papa from 'papaparse';
import CSVUploader from "./CsvUpload";

function exportToCSV(data, columns, mergedTitle) {
  const csvData = [];
  // Add the merged title row
  const titleRow = [mergedTitle];
  csvData.push(titleRow);
  // Add the header row
  const headerRow = ['', 'sNo', 'supply', 'productCode', 'uom', ...columns.map(column => column.name)];
  csvData.push(headerRow);
  data.forEach(item => {
    const csvItem = ['', item.sNo, item.supply, item.productCode, item.uom, ...columns.map(column => item.gps[column.name] || '')];
    csvData.push(csvItem);
  });
  const csv = Papa.unparse(csvData);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.setAttribute('download', 'data.csv');
  link.click();
  URL.revokeObjectURL(url);
}


const BoqFormGpWise = () => {
  const [tableData, setTableData] = useState([]);

  const [gps, setGps] = useState([]);
  const [selectedGp, setSelectedGp] = useState({ id: "", name: "" });

  let projects = useGetAllProjectsForAdmin();
  // console.log("we have options ", projects);

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

  // console.log(tableData);
  // to store selected project name and id
  const [projectName, setProjectName] = useState("");
  const [projectId, setProjectId] = useState("");
const [status, setStatus] = useState(false)

  const handleProjectChange = async (e) => {
  setStatus(!status)
    const selectedProjectId = e.target.value;
    setProjectId(selectedProjectId);
    let project = projects.find((project) => project.id === selectedProjectId);
    // console.log(project)
    setGps(project.gpName)
    
    setProjectName(project.name);
   
    setSelectedGp([project.gpName[0]])
    // let response = api.post("/get-all-gps", {
    //   locationName: project.name,
    //   userId,
    //   role,
    // });
    // response = await errorHandler(response);
    // setGps(response.data.data);
  };

  const handleGpChange = async (data) => {
    let result = api.post('/find-boq-gp',{userId, role, userName, projectId, gpId:data.id})
    result = await errorHandler(result)
    // console.log(result)
    if(result.data.code ===1001){
      setTableData([]);
      setSelectedGp({})
      Swal.fire({
        title:result.data.message
      })
      return;
    }
    else{
      setSelectedGp(data);
      setTableData([]);
    }

    
  };

  let products = useGetProductData();


  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // console.log(projectId, projectName, tableData);
    // console.log("tried to submit");
    // const newData = [];
    if (projectId === "") {
      Swal.fire('Please Select Project!');
      // alert("Please Select Project!");
      return;
    }
    if (selectedGp.id === "" || selectedGp.name === "") {
      Swal.fire('Please Select Gp!');
      // alert("Please Select Gp!");
      return;
    } else {
      setLoading(true);
      // console.log(tableData.length);
    

                let result = api.post('/create-boqForm-gpWise', {userId,role,userName, tableData, projectId, projectName ,gpId:selectedGp.id,gpName:selectedGp.name});
                result = await errorHandler(result);
                console.log(result.data);
                Swal.fire(result.data.message);
                // alert(result.data.message)
            
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
        { loading?
        
        <ProgressBar/>
        
        :
        
        
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
          <SearchInput
          placeholder={"Please Select Gp"}
            title={"Select Gps"}
            items={gps}
            allClear={status}
            ResultOnClick={(data) => handleGpChange(data)}
          />
          {/* {
            projectId &&
            < div className="d-flex my-3" style={{justifyContent:"space-around"}}>
            <div>
            <button className="btn" onClick={() => exportToCSV(selectedFieldsProducts, gps, projectName)}>Export CSV</button>
          </div>
          <div>
          <CSVUploader projectId={projectId} selectedGp={selectedGp} />
        </div>
          </div>
          } */}
         
          <div>
            {

projectId && selectedGp.id ?

            <form onSubmit={handleSubmit}>
              <EditableTable tableData={(data) => setTableData(data)} />
              <button type="submit" className="btn btn-primary mt-3">
                Submit
              </button>
            </form>


:

<center><h6 className="form-select mt-4">Please Select Project And Gp First</h6></center>
            }
          </div>
         
          <CustomModal
            isOpen={showModal}
            onClose={handleCloseModal}
            title={"Update BOQForm"}
          >
            {selectedItem && <UpdateBoqFormGpWise data={selectedItem} />}
          </CustomModal>
        </div>
      }
    </>
  );
};

export default BoqFormGpWise;
