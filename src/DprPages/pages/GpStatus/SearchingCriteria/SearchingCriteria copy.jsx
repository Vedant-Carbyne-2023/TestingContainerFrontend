import React, { useEffect, useState } from "react";
import { api } from "../../../functions/axiosDefault";
import { errorHandler } from "../../../functions/errorHandle";
import _, { set } from "lodash";
import { Modal, Button } from "react-bootstrap";
import GpStatusModal from "../GpStatusModal";
import FhtcStatusModal from "./FhtcStatusModal";
import PipeStatusModal from "./PipeStatusModal";
import BorewellStatusModal from "./BorewellStatusModal";
import OhtModal from "./OhtStatusModal";
import PumpHouseModal from "./PumpHouseStatusModal";
import BoundaryWallModal from "./BoundaryWallStatusModal";

export default function SearchingCriteriaCopy() {
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
    setModalData(data)
    setShowModal(true);
  };

  // Function to hide the modal


  const handleChange = (e, fieldType) => {
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
  }, [formData.typeOfWork]);
  const [loading, setLoading] = useState(false)

  const handleExtractData = async () => {
    setExtractedData('')
    setLoading(true)
    try {

      const result = await api.post('/get-search-criteria', formData);
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
    'OHT',
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
      <div className="mt-3" style={{ marginLeft: "20px" }}>
      {extractedData && extractedData.data ? (
        <div className="row">
       <table className="table table-bordered table-hover">
      <thead>
        <tr>
          <th>Gp Name</th>
          <th>Data</th>
        
        </tr>
      </thead>
      <tbody>
        {extractedData.data &&
          extractedData.data.map((gp) => {
            if (
              (gp.borewellDpr && gp.borewellDpr.length > 0) ||
              ( gp.boundarywallDpr && gp.boundarywallDpr.length > 0) ||
              (gp.fhtcDpr && gp.fhtcDpr.length > 0) ||
              (gp.pipeDpr && gp.pipeDpr.length > 0) ||
              (gp.ohtDpr && gp.ohtDpr.length > 0) ||
              (gp.pumphouseDpr && gp.pumphouseDpr.length) > 0
            )
            {return (
            <tr key={gp.gpName.name}>
              <td>{gp.gpName.name}</td>
              <td>
                {
                             
                   (gp.fhtcDpr && gp.fhtcDpr.length > 0)
                   ?
                    <FhtcStatusModal data={gp.fhtcDpr}/>
                    :
                    (gp.pipeDpr && gp.pipeDpr.length > 0 )
                    ?
                    <PipeStatusModal data={gp.pipeDpr} />
                    :
                    (gp.boundarywallDpr && gp.boundarywallDpr.length > 0 )
                    ?
                    <BoundaryWallModal data={gp.boundarywallDpr} />
                    :
                    (gp.ohtDpr && gp.ohtDpr.length > 0 )
                    ?
                    <OhtModal data={gp.ohtDpr} />
                    :
                    (gp.pumphouseDpr && gp.pumphouseDpr.length > 0 )
                    ?
                    <PumpHouseModal data={gp.pumphouseDpr} />
                    :
                    <BorewellStatusModal data={gp.borewellDpr}/>
                }
              </td>
            </tr>
          )}})}
      </tbody>
    </table>
      </div>
      ) : 
      loading?
      <p>Loading</p>
      :
      (
        <p>No Data Extracted</p>
      )}
    </div>
  </div>  
 


  );
}
