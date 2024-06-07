import React, { useState, useEffect, useRef } from "react";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import useGetProductData from "../../../CommonUtitlites/customHooks/useGetProducts";
import useGetAllProjectsForAdmin from "../../../CommonUtitlites/customHooks/useGetAllProjectsForAdmin";
import CustomModal from "../../../CommonUtitlites/ModalPopUp/CustomModal";
import UpdateBoqFormModal from "./UpdateBoqFormForProject";
import styles from '../../TableModule/TableSticky.module.css';

import {
  userId,
  role,
  userName,
} from "../../../CommonUtitlites/Others/commonExportVariable";
import Loader from "../../../CommonUtitlites/Loader/Loader";
import Swal from 'sweetalert2';
// import $ from 'jquery'; // Import jQuery
// import 'datatables.net'; // Import DataTables

const GetBoqFormProjectWise = () => {
  let projects = useGetAllProjectsForAdmin();
  // console.log("we have options ", projects);
  const tableRef = useRef(null); // Create a ref for the table element.
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

  // const products = useGetProductData();
  // console.log(products);
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



  const handleProjectChange = async (e) => {
    let selectedProject = e.target.value
    setProjectId(selectedProject)
    if (selectedProject) {
      setLoading(true);
      let result = api.post('/get-boqForm-by-project', { selectedProjectId: selectedProject, userId, role, userName });
      result = await errorHandler(result);
      if (result.data && result.data.message) {
        setRetrievedData(result.data.data);
        Swal.fire(result.data.message);
        // alert(result.data.message);
        // console.log('after it', result.data.data);
      }
      setLoading(false);
    } else {
      setRetrievedData([]);
    }
    // console.log(retrievedData);
  }

  useEffect(() => {
    // Initialize DataTable when the table element is available.
    if (tableRef.current) {
      $(tableRef.current).DataTable();
    }
  }, [retrievedData]);


  // Edit a row of BOQ Form
  const [show, setShow] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleUpdate = (item) => {
    setSelectedItem(item);
    setShowModal(true);
    // console.log('came here', item);
  };
  const handleCloseModal = () => {
    setSelectedItem(null);
    setShowModal(false);
    // window.location.reload();
  };

  return (
    <>

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
      {loading ? <Loader /> : retrievedData.length === 0 ? (
        <p>No data found</p>
      ) : (
        <>
          <button className="btn" type="button" onClick={() => setShow(!show)}>Click To Edit Other</button>

          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "#f7f7f7",
            }}
          >
            <div className={`${styles.tableContainer} container-fluid d-flex mt-2`}>
              <div className={`${styles.tableWrapper} col`}>
                <table className={`${styles.table} table`}>
                  <thead className={`${styles.stickyHeader} sticky`}>
                    <tr>
                      <th scope="col" style={cellStyle}>Item No.</th>
                      <th scope="col" style={cellStyle}>Service/Supply</th>
                      <th scope="col" style={cellStyle}>Product Code</th>
                      {/* <th scope="col" style={cellStyle}>Total Quantity</th> */}
                      <th scope="col" style={cellStyle}>Total Quantity From All Gps</th>
                      {/* <th scope="col" style={cellStyle}>Edit</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {retrievedData.map((item, index) => {
                      if (!show || (show && item.totalQuantityFromGps !== 0)) {
                        return (
                          <tr key={item._id}>
                            <td style={cellStyle}>{index + 1}</td>
                            <td style={cellStyle}>{item.serviceOrSupply}</td>
                            <td style={cellStyle}>{item.productCode}</td>
                            <td style={cellStyle}>{item.totalQuantityFromGps}</td>
                            {/* <td style={cellStyle}>
                              <button className="btn" onClick={() => handleUpdate(item)}>
                                Update
                              </button>
                            </td> */}
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
        </>)}


      <CustomModal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={"Update BOQForm"}
      >
        {selectedItem && <UpdateBoqFormModal data={selectedItem} />}
      </CustomModal>
    </>
  );
};

export default GetBoqFormProjectWise;
