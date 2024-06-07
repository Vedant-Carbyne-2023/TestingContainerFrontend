import React, { useEffect, useState } from "react";
import CustomModal from "../../CommonUtitlites/ModalPopUp/CustomModal";
import { api } from "../../CommonUtitlites/AxiosSetup/axiosDefault";
import {
  userId,
  role,
  userName,
} from "../../CommonUtitlites/Others/commonExportVariable";
import { errorHandler } from "../../CommonUtitlites/Others/errorHandle";
import useGetAllProjectsForAdmin from "../../CommonUtitlites/customHooks/useGetAllProjectsForAdmin";
import Inward from "./Inward";
import Outward from "./Outward";
import useGetProductData from "../../CommonUtitlites/customHooks/useGetProducts";
import Common from "./Common";
import Loader from "../Permissions&Rules/Loader";
import DownloadStockProject from "./DownloadStockProject";

export default function StockReport() {
  const [products, setProducts] = useState([]);

  const [projectName, setProjectName] = useState("");
  const [projectId, setProjectId] = useState("");

  let projects = useGetAllProjectsForAdmin();
  const [loading, setLoading] = useState(false);

  const handleProjectChange = async (e) => {
    const selectedProjectId = e.target.value;
    setProjectId(selectedProjectId);
    if (!selectedProjectId) {
      alert("Please Select Project ");
      return;
    }
    setLoading(true);
    let result = api.post("/stock-report-projectWise&AllItems", {
      userId,
      role,
      userName,
      projectId: selectedProjectId,
    });
    result = await errorHandler(result);
    console.log(result.data);
    setProducts(result.data.data);
    setLoading(false);
  };

  const cellStyle = {
    border: "1px solid black",

    padding: "8px",
    textAlign: "center",
  };

  const [modalOpen1, setModalOpen1] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [modalOpen3, setModalOpen3] = useState(false);
  const [itemSelected, setItemSelected] = useState("");
  const handleOpenModal = (item, field) => {
    if (!projectId) {
      alert("No Project Id Please Select Project First");
      return "";
    }
    setItemSelected(item);
    if (field == "MIN") {
      setModalOpen1(true);
    }
    if (field == "MRN") {
      setModalOpen2(true);
    }
  };
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="title">
        <span>Stock Inward And Outward Project Wise</span>
        <div></div>
        <div class="search-bar">
          <input type="text" class="form-control" placeholder="Search" />
          <div class="search-icon-container">
            <div class="search-icon">
              <div class="icon">
                <i class="fas fa-search"></i>
              </div>
            </div>
          </div>
        </div>
      <button className="btn" onClick={()=>setModalOpen3(true)}>
      Downlod Stock Report
      </button>
      </div>
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

      {loading ? (
        <Loader />
      ) : (
        <>
          <button className="btn" type="button" onClick={() => setShow(!show)}>
            Click To Edit Other
          </button>
          <div className="container-fluid">
            <table className="table">
              <thead
                style={{
                  position: "sticky",
                  top: "130px",
                  backgroundColor: "#fff",
                }}
              >
                <tr>
                  <th scope="col" style={cellStyle}>
                    S. No.
                  </th>
                  {/* <th scope="col" style={cellStyle}>MRN No.</th> */}
                  <th scope="col" style={cellStyle}>
                    Material Description
                  </th>
                  <th scope="col" style={cellStyle}>
                    UOM
                  </th>
                  <th scope="col" style={cellStyle}>
                    Average Material Rate
                  </th>
                  <th scope="col" style={cellStyle}>
                    Quantity Inward
                  </th>
                  <th scope="col" style={cellStyle}>
                    Inward Amount
                  </th>
                  <th scope="col" style={cellStyle}>
                    Quantity Outward
                  </th>
                  <th scope="col" style={cellStyle}>
                    Outward Amount
                  </th>
                  <th scope="col" style={cellStyle}>
                    Stock (As On Date)
                  </th>
                  <th scope="col" style={cellStyle}>
                    Amount
                  </th>
                  {/* <th scope="col" style={cellStyle}>GP</th> */}
                  {/* <th scope="col" style={cellStyle}>Vendor Name</th> */}
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((item, index) => {
                    if (!show || (show && item.mrnQuantity !== 0)) {
                      return (
                        <tr key={item._id}>
                          <td scope="col" style={cellStyle}>
                            {index + 1}
                          </td>
                          {/* <th scope="col" style={cellStyle}>{item.mrnsId}</th> */}
                          <td
                            scope="col"
                            style={{
                              textAlign: "left",
                              border: "1px solid black",
                              padding: "8px",
                            }}
                          >
                            {item.materialCategory}/{item.materialSubCategory}/
                            {item.materialDescription}
                          </td>
                          <td scope="col" style={cellStyle}>
                            {item.uom}
                          </td>
                          <th scope="col" style={cellStyle}>
                            {item.rate}
                          </th>
                          <th scope="col" style={cellStyle}>
                            <button
                              className="btn"
                              type="button"
                              onClick={() => handleOpenModal(item, "MRN")}
                            >
                              {item.mrnQuantity}
                            </button>
                          </th>
                          <th scope="col" style={cellStyle}>
                            {parseFloat(item.rate * item.mrnQuantity).toFixed(
                              2
                            )}
                          </th>
                          <th scope="col" style={cellStyle}>
                            <button
                              className="btn"
                              type="button"
                              onClick={() => handleOpenModal(item, "MIN")}
                            >
                              {item.issuedQuantity}
                            </button>
                          </th>
                          <th scope="col" style={cellStyle}>
                            {parseFloat(
                              item.rate * item.issuedQuantity
                            ).toFixed(2)}
                          </th>
                          <th scope="col" style={cellStyle}>
                            {item.mrnQuantity - item.issuedQuantity}
                          </th>
                          <th scope="col" style={cellStyle}>
                            {parseFloat(
                              item.rate *
                                (item.mrnQuantity - item.issuedQuantity)
                            ).toFixed(2)}
                          </th>
                        </tr>
                      );
                    }
                    return null; // Make sure to return null if the condition is not met
                  })}
              </tbody>
            </table>
          </div>
        </>
      )}
      <CustomModal
        isOpen={modalOpen2}
        onClose={() => setModalOpen2(false)}
        size={"xl"}
        title={"Stock Report Inward"}
      >
        <Inward projectId={projectId} itemSelected={itemSelected} />
      </CustomModal>
      <CustomModal
        isOpen={modalOpen1}
        onClose={() => setModalOpen1(false)}
        size={"xl"}
        title={"Stock Report Outward"}
      >
        <Outward projectId={projectId} itemSelected={itemSelected} />
      </CustomModal>
      <CustomModal
        isOpen={modalOpen3}
        onClose={() => setModalOpen3(false)}
        title={"Stock Report Download"}
        
      >
        <DownloadStockProject />
      </CustomModal>
    </>
  );
}
