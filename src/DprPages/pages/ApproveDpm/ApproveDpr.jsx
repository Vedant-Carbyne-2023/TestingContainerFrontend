import React, { useEffect, useState } from "react";
import { api } from "../../functions/axiosDefault";
import { errorHandler } from "../../functions/errorHandle";
import FhtcApproveDpr from "./FhtcApproveDpr";
import BoundaryWallApproveDpr from "./BoundaryWallApproveDpr";
import PumpHouseApproveDpr from "./PumpHouseApproveDpr";
import OhtApproveDpr from "./OhtApproveDpr";
import PipeApproveDpr from "./PipeApproveDpr";
import BorewellApproveDpr from "./BorewellApproveDpr";

export default function ApproveDpr() {
  const [projects, setProjects] = useState([]);
  const [gpData, setGpData] = useState([]);
  const [fetchedData, setFetchedData] = useState(null); // New state for fetched data


  const [formData, setFormData] = useState({
    projectName: "",
    gpName: "",
    typeOfWork: "",
    selectedDate: null,
  });

  const handleSubmit = async () => {
    console.log(formData);
    try {
      // Check if all required fields are selected
      if (!formData.projectName || !formData.gpName || !formData.typeOfWork || !formData.selectedDate) {
        alert("Please select all fields");
        return;
      }
      const result = await api.post("/approval-data", formData);
      const data = await errorHandler(result);
      console.log(data);
      setFetchedData(data.data);

      // Handle the retrieved data as needed
    } catch (error) {
      console.error("Error extracting data:", error);
      alert(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsResponse, gpResponse] = await Promise.all([
          api.post("/get-dpr-projects"),
          api.post("/get-dpr-gps"),
        ]);

        const [projectsResult, gpResult] = await Promise.all([
          errorHandler(projectsResponse),
          errorHandler(gpResponse),
        ]);

        if (projectsResult?.data?.success) {
          setProjects(projectsResult.data.data || []);
        } else {
          console.error("Error fetching Projects:", projectsResult?.data?.message);
        }

        if (gpResult?.data?.success) {
          setGpData(gpResult.data.data || []);
        } else {
          console.error("Error fetching GP:", gpResult?.data?.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert(error.message);
      }
    };

    fetchData();
  }, []);

  const handleChange = async(e, fieldType) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };
    const selectedProject = projects.find((project) => project.name === value);

    if (fieldType === "projectName") {
      let result =  api.post('/get-all-gps',{locationName:value})
      result = await errorHandler(result)
      setGpData(result.data.data || []);
    }
    console.log("here", updatedFormData);
    setFormData(updatedFormData);

  };
  
  const renderBorewellDpr = (fetchedData) => (
    fetchedData && (
      <div className="col-md-12 mt-4">
        <h5>Fetched Data:</h5>
        <pre>{JSON.stringify(fetchedData, null, 2)}</pre>
      </div>
    )
  );

  const renderHydrotestDpr = (fetchedData) => (
    fetchedData && (
      <div className="col-md-12 mt-4">
        <h5>Fetched Data:</h5>
        <pre>{JSON.stringify(fetchedData, null, 2)}</pre>
      </div>
    )
  );
  const renderJMRDpr = (fetchedData) => (
    fetchedData && (
      <div className="col-md-12 mt-4">
        <h5>Fetched Data:</h5>
        <pre>{JSON.stringify(fetchedData, null, 2)}</pre>
      </div>
    )
  );




  return (
    <div className="container-fluid px-4 mt-5">
      <center>
        <h4>Approval Page</h4>
      </center>

      <div className="col-md-12 d-flex mt-4" style={{ justifyContent: "space-between" }}>
        <div className="row">
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

        <div className="row">
        <label htmlFor="gpName">GP Name</label>
  <select
    className="form-select"
    id="gpName"
    name="gpName"
    value={formData.gpName}
    onChange={(e) => handleChange(e, "gpName")}
  >
    <option value="">Select GP Name</option>
    {gpData.map((gp) => (
      <option key={gp._id} value={gp.name}>
        {gp.name}
      </option>
    ))}
  </select>
        </div>

        <div className="row">
          <label htmlFor="typeOfWork" className="form-label">
            Type Of Work
          </label>
          <select
            className="form-select"
            id="typeOfWork"
            name="typeOfWork"
            value={formData.typeOfWork}
            onChange={(e) => handleChange(e, "typeOfWork")}
          >
            <option value="">Select Type Of Work</option>
            {[
              "Borewell",
              "Pipe",
              "FHTC",
              "BoundaryWall",
              "PumpHouse",
              "OHT",
              // "Hydrotest",
              // "JMR",
            ].map((work) => (
              <option key={work} value={work}>
                {work}
              </option>
            ))}
          </select>
        </div>

        <div className="row">
          <label htmlFor="selectedDate" className="form-label">
            Select Date
          </label>
          <input
            type="date"
            className="form-control"
            id="selectedDate"
            name="selectedDate"
            value={formData.selectedDate}
            onChange={(e) => handleChange(e, "selectedDate")}
          />
        </div>
      </div>

      <div className="col-md-12 mt-4" style={{ display: "flex", justifyContent: "center" }}>
        <button className="btn btn-primary" type="button" onClick={handleSubmit}>
          Fetch Data
        </button>
      </div>

      {formData.typeOfWork === "Pipe" && fetchedData && fetchedData.data && <PipeApproveDpr fetchedData={fetchedData} projectName={formData.projectName} />}
      {formData.typeOfWork === "Borewell" && fetchedData && fetchedData.data && <BorewellApproveDpr fetchedData={fetchedData} projectName={formData.projectName} />}
      {formData.typeOfWork === "FHTC" && fetchedData && fetchedData.data && <FhtcApproveDpr fetchedData={fetchedData} projectName={formData.projectName} />}
      {formData.typeOfWork === "BoundaryWall" && fetchedData && fetchedData.data && <BoundaryWallApproveDpr fetchedData={fetchedData} projectName={formData.projectName} />}
      {formData.typeOfWork === "PumpHouse" && fetchedData && fetchedData.data && <PumpHouseApproveDpr fetchedData={fetchedData} projectName={formData.projectName} />}
      {formData.typeOfWork === "OHT" && fetchedData && fetchedData.data && <OhtApproveDpr fetchedData={fetchedData} projectName={formData.projectName} />}
      {formData.typeOfWork === "Hydrotest" && fetchedData && fetchedData.data && renderHydrotestDpr(fetchedData)}
      {formData.typeOfWork === "JMR" && fetchedData && fetchedData.data && renderJMRDpr(fetchedData)}


    </div>
  );
}
