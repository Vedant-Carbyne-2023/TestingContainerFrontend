import React, { useEffect, useState } from "react";
import { api } from "../../../functions/axiosDefault";
import { errorHandler } from "../../../functions/errorHandle";
import _ from "lodash";
import { Modal, Button } from "react-bootstrap";
import GpStatusModal from "../GpStatusModal";
import BoundaryWallModal from "../ModalForDprs/BoundaryWallModal";
import PipeModal from "../ModalForDprs/PipeModal";
import FhtcModal from "../ModalForDprs/FhtcModal";
import BorewellModal from "../ModalForDprs/BorewellModal";
import OhtModal from "../ModalForDprs/OhtModal";
import PumpHouseModal from "../ModalForDprs/PumpHouseModal";
// import FhtcStatusModal from "./FhtcStatusModal";
// import PipeStatusModal from "./PipeStatusModal";
// import BorewellStatusModal from "./BorewellStatusModal";

export default function SearchingCriteria() {
  const [allVendors, setAllVendors] = useState([]);
  useEffect(() => {
    const getVendors = async () => {
      let result = api.post("/get-vendors");
      result = await errorHandler(result);
      setAllVendors(result.data.data);
    };
    getVendors();
  }, []);

  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0], // Set default to today's date
  });
  
  const [extractedData, setExtractedData] = useState(null);
  const [displayedData, setDisplayedData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [modalData, setModalData] = useState('')

  // Function to show the modal
  const handleShowModal = (data) => {
    console.log(data,"Here")
    setModalData(data.data)
    setShowModal(true);
  };

  console.log(showModal)

  // Function to hide the modal


  const handleChange = (e, fieldType) => {
    setShowModal(false)
    setExtractedData('')
    // alert("click on extract")
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };

    setFormData(updatedFormData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsResponse = await api.post("/get-projects", {
          typeOfWork: formData.typeOfWork,
        });

        const projectsResult = await  errorHandler(projectsResponse)    

      
          setProjects(projectsResult.data.data || []);
      

      } catch (error) {
        console.error("Error fetching data:", error);
        alert(error.message);
      }
    };

    fetchData();
  }, []);

  const [loading, setLoading] = useState(false)

  const handleExtractData = async () => {
    setShowModal(false)
    setExtractedData('')
    setLoading(true)
    try {

      const result = await api.post('/get-search-criteria-table', formData);
      const data = await errorHandler(result);
      console.log(data.data)
      setExtractedData(data.data);
      // Show the modal
    } catch (error) {
      console.error("Error extracting data:", error);
      // Handle errors, show a notification, etc.
    }
    setLoading(false)
  };

  const options = [
    'Borewell',
    'Pipe',
    'Pump House',
    'Boundary Wall',
    'FHTC',
    'OHT'
    // 'JMR',
    // 'Hydrotest'
  ]



  return (
    <div className="container-fluid px-5 mt-5">
 
      <div
        className="col-md-12 d-flex mt-5"
        style={{ justifyContent: "space-between" }}
      >
        <div className="row">
          <div className="col">
          <label htmlFor="projectName" className="form-label">
            Project Name
          </label>
          <select
            className="form-select"
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={(e) => handleChange(e, "projectName")}
          >
            <option value="">Select Project Name</option>
            {projects.map((project) => (
              <option key={project.id} value={project.name}>
                {project.name}
              </option>
            ))}
          </select>
          </div>
          <div className="col">
          <label htmlFor="date" className="form-label">
            Select Date
          </label>
          <input type="date"
          className="form-control"
          id="date"
          name="date"
          onChange={(e) => handleChange(e, "date")}
          value={formData.date}/>
          </div>
          <div className="col">
            
          <label htmlFor="searchCriteria" className="form-label">
          Searching Criteria
          </label>
          <select
            className="form-select"
            id="searchCriteria"
            name="searchCriteria"
            value={formData.searchCriteria}
            onChange={(e) => handleChange(e, "searchCriteria")}
          >
            <option value="">Select Criteria (If Wants To)</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

        </div>
        </div>

    
        <div>
          <button
            className="btn btn-primary mt-5 "
            onClick={handleExtractData}
            style={{ marginRight: "100px" }}
          >
            Extract Data
          </button>
        </div>
      </div>

      {
        extractedData 
        &&
      <div className="col mt-4">
        <label>
          Total Gps Having Work In {formData.searchCriteria}  -  {extractedData.data.filter((gp) => gp.data && gp.data.length > 0).length}
        </label>
       </div>
      }

      <div className="mt-3" style={{ marginLeft: "20px" }}>
      {extractedData ? (
  <table className="table">
    <thead>
      <tr>
        <th scope="col">GP Names</th>
        {/* Add more table headers as needed */}
      </tr>
    </thead>
    <tbody>
      {extractedData.data &&
        extractedData.data.map((gp, index) => {
          if (
            // (gp.borewellDpr && gp.borewellDpr.length > 0) ||
            // (gp.boundarywallDpr && gp.boundarywallDpr.length > 0) ||
            // (gp.fhtcDpr && gp.fhtcDpr.length > 0) ||
            // (gp.pipeDpr && gp.pipeDpr.length > 0) ||
            // (gp.ohtDpr && gp.ohtDpr.length > 0) ||
            // (gp.pumphouseDpr && gp.pumphouseDpr.length > 0)
            (gp.data && gp.data.length>0)
          ) {
            return (
              <tr key={index} style={{ cursor: 'pointer' }} onClick={(e) => handleShowModal(gp)}>
                <td><button className="btn btn-primary" onClick={()=>handleShowModal(gp.data)}>{gp.gpName.name}</button></td>
              </tr>
            );
          }
        })}
    </tbody>
  </table>
) : 
loading?
"Loading"
:
(
  <p>No Data Extracted</p>
)}

    </div>

    {
      showModal === true

      &&

     ( formData.searchCriteria === 'FHTC'
      ?
       <FhtcModal data={modalData} closeModal = {(set) =>setShowModal(set)}/>
       :
       formData.searchCriteria === 'Pipe'
       ?
       <PipeModal data={modalData} closeModal = {(set) =>setShowModal(set)} />
       :
       formData.searchCriteria === 'OHT'
       ?
       <OhtModal data={modalData} closeModal = {(set) =>setShowModal(set)} />
       :
       formData.searchCriteria === 'Boundary Wall'
       ?
       <BoundaryWallModal data={modalData} closeModal = {(set) =>setShowModal(set)} />
       :
       formData.searchCriteria === 'Pump House'
       ?
       <PumpHouseModal data={modalData} closeModal = {(set) =>setShowModal(set)} />
       :
       <BorewellModal data={modalData} closeModal = {(set) =>setShowModal(set)}/>)
       
    }
  </div>  
 


  );
}
