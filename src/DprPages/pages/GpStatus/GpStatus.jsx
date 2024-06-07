import React, { useEffect, useState } from "react";
import { api } from "../../functions/axiosDefault";
import { errorHandler } from "../../functions/errorHandle";
import _ from "lodash";
import { Modal, Button } from "react-bootstrap";
import GpStatusModal from "./GpStatusModal";
import BorewellModal from "./ModalForDprs/BorewellModal";
import FhtcModal from "./ModalForDprs/FhtcModal";
import PipeModal from "./ModalForDprs/PipeModal";
import PumpHouseModal from "./ModalForDprs/PumpHouseModal";
import BoundaryWallModal from "./ModalForDprs/BoundaryWallModal";
import OhtModal from "./ModalForDprs/OhtModal";
import BorewellStatusModal from "./SearchingCriteria/BorewellStatusModal";
import FhtcStatusModal from "./SearchingCriteria/FhtcStatusModal";
import PumpHouseStatusModal from "./SearchingCriteria/PumpHouseStatusModal";
import BoundaryWallStatusModal from "./SearchingCriteria/BoundaryWallStatusModal";
import OhtStatusModal from "./SearchingCriteria/OhtStatusModal";
import PipeStatusModal from "./SearchingCriteria/PipeStatusModal";

export default function GpStatus() {
  const [allVendors, setAllVendors] = useState([]);
  useEffect(() => {
    const getVendors = async () => {
      let result = api.post("/get-dpr-vendors");
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
  const [showModal, setShowModal] = useState('');

  const [modalData, setModalData] = useState('')

  // Function to show the modal

  // Function to hide the modal

  const [loading, setLoading] = useState(false)

  const handleChange = (e, fieldType) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };

    setFormData(updatedFormData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsResponse = await api.post("/get-dpr-projects", {
          typeOfWork: formData.typeOfWork,
        });

        const projectsResult = await errorHandler(projectsResponse)


        setProjects(projectsResult.data.data || []);


      } catch (error) {
        console.error("Error fetching data:", error);
        alert(error.message);
      }
    };

    fetchData();
  }, [formData.typeOfWork]);

  const handleExtractData = async () => {
    setLoading(true)
    setExtractedData('')
    setModalData('')
    setGpName('')
    try {

      const result = await api.post("/getgpstatus", formData);
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
  const [gpName, setGpName] = useState('')

  const handleOpenModal = (data, gp, type) => {
    setGpName(gp)
    setModalData(data)
    setShowModal(type)
  }




  return (
    <div className="container-fluid mt-5">
  <div className="col-md-12 d-flex flex-column align-items-center mt-5">
    <div className="mb-3 me-md-3 mr-5">
      <label htmlFor="projectName">Project Name</label>
      <select
        id="projectName"
        name="projectName"
        value={formData.projectName}
        onChange={(e) => handleChange(e, "projectName")}
        className="form-select"
      >
        <option value="">Select Project Name</option>
        {projects.map((project) => (
          <option key={project.id} value={project.name}>
            {project.name}
          </option>
        ))}
      </select>
    </div>
    <div className="me-md-3 mr-5">
      <label htmlFor="date">Select Date</label>
      <input
        type="date"
        id="date"
        name="date"
        onChange={(e) => handleChange(e, "date")}
        value={formData.date}
        className="form-control"
      />
    </div>
    <button onClick={handleExtractData} className="btn btn-primary mt-4 mr-5">
      Fetch Data
    </button>
  </div>



      <div className="mt-3" >
        {extractedData && extractedData.data ? (
          <div className=" container-fluid m-0 p-0 row">
            <div className="col-md-4" style={{ height: '20rem', overflow: 'auto' }}>
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>Gp Name</th>
                      <th>Links Of Work Done</th>
                    </tr>
                  </thead>
                  <tbody>
                    {extractedData.data &&
                      extractedData.data.map((gp) => {
                        if (
                          gp.borewellDpr.length > 0 ||
                          gp.boundaryWallDpr.length > 0 ||
                          gp.fhtcDpr.length > 0 ||
                          gp.pipeDpr.length > 0 ||
                          gp.ohtDpr.length > 0 ||
                          gp.pumpHouseDpr.length > 0
                        ) {
                          return (
                            <tr key={gp.gpName.name}>
                              <td>{gp.gpName.name}</td>
                              <td className="d-flex flex-column">
                                {gp.borewellDpr.length > 0 && (
                                  <button className="btn btn-info mb-2" onClick={() => handleOpenModal(gp.borewellDpr, gp.gpName.name, 'borewell')} type="button">
                                    Borewell Link
                                  </button>
                                )}
                                {gp.fhtcDpr.length > 0 && (
                                  <button className="btn btn-info mb-2" onClick={() => handleOpenModal(gp.fhtcDpr, gp.gpName.name, 'fhtc')} type="button">
                                    Fhtc Link
                                  </button>
                                )}
                                {gp.pipeDpr.length > 0 && (
                                  <button className="btn btn-info mb-2" onClick={() => handleOpenModal(gp.pipeDpr, gp.gpName.name, 'pipe')} type="button">
                                    Pipe Layout Link
                                  </button>
                                )}
                                {gp.ohtDpr.length > 0 && (
                                  <button className="btn btn-info mb-2" onClick={() => handleOpenModal(gp.ohtDpr, gp.gpName.name, 'oht')} type="button">
                                    Oht Link
                                  </button>
                                )}
                                {gp.boundaryWallDpr.length > 0 && (
                                  <button className="btn btn-info mb-2" onClick={() => handleOpenModal(gp.boundaryWallDpr, gp.gpName.name, 'boundaryWall')} type="button">
                                    Boundary Wall Link
                                  </button>
                                )}
                                {gp.pumpHouseDpr.length > 0 && (
                                  <button className="btn btn-info mb-2" onClick={() => handleOpenModal(gp.pumpHouseDpr, gp.gpName.name, 'pumpHouse')} type="button">
                                    Pump House Link
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        }
                      })}
                  </tbody>
                </table>

              </div>
            </div>


            <div className="col-md-8 m-0">
              {
                gpName
                &&
                <h5 ><center>{gpName}</center></h5>
              }
              <div className="row p-0 m-0 mt-4" style={{ height: "30rem", overflow: "auto" }}>
                {
                  showModal == 'borewell'
                    ?
                    <BorewellStatusModal data={modalData} />
                    :
                    showModal == 'fhtc'
                      ? <FhtcStatusModal data={modalData} />

                      :
                      showModal == 'pipe'
                        ? <PipeStatusModal data={modalData} />
                        :
                        showModal == 'pumpHouse'
                          ? <PumpHouseStatusModal data={modalData} />
                          :
                          showModal == 'boundaryWall'
                            ? <BoundaryWallStatusModal data={modalData} />
                            :
                            showModal == 'oht'
                              ? <OhtStatusModal data={modalData} />
                              :

                              ""

                  // &&
                  // <GpStatusModal data={modalData}/>
                }
              </div>
            </div>
          </div>
        ) :
          loading ?
            <p>Loading</p>
            :
            (
              <p>No Data Extracted</p>
            )}
      </div>

      {/* {
      showModal  == 'borewell'
      ?
      <BorewellModal data={modalData}/>
      :
      showModal == 'fhtc'
      ?<FhtcModal data={modalData}/>

      :
      showModal == 'pipe'
      ?<PipeModal data={modalData}/>
      :
      showModal == 'pumpHouse'
      ?<PumpHouseModal data={modalData}/>
      :
      showModal == 'boundaryWall'
      ?<BoundaryWallModal data={modalData}/>
      :
      showModal == 'oht'
      ?<OhtModal data={modalData}/>
      :
      
      ""

      // &&
      // <GpStatusModal data={modalData}/>
    } */}
    </div>



  );
}
