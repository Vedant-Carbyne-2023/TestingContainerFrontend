import React, { useEffect, useState } from "react";
import CustomModal from "../../CommonUtitlites/ModalPopUp/CustomModal";
import { api } from "../../CommonUtitlites/AxiosSetup/axiosDefault";
import { userId, role, userName } from '../../CommonUtitlites/Others/commonExportVariable'
import { errorHandler } from "../../CommonUtitlites/Others/errorHandle";
import useGetAllProjectsForAdmin from "../../CommonUtitlites/customHooks/useGetAllProjectsForAdmin";
import Inward from "./Inward";
import Outward from "./Outward";
import useGetProductData from "../../CommonUtitlites/customHooks/useGetProducts";
import Common from "./Common";
import Loader from "../Permissions&Rules/Loader";
import * as XLSX from "xlsx";


export default function StockReportTillDate() {
  const [products, setProducts] = useState([])
  // const currentDate = new Date();
  //   console.log('formated date', currentDate); 
  

  const [projectName, setProjectName] = useState("");
  const [projectId, setProjectId] = useState("");

  let projects = useGetAllProjectsForAdmin()
  const [loading, setLoading] = useState(false)

  const handleProjectChange = async (e) => {
    const selectedProjectId = e.target.value;
    setProjectId(selectedProjectId)
  };

  const handleFetch = async (e) => {
    if (!projectId ) {
      alert('Please Select Project and DateTime');
      return;
    }
    console.log('we have', projectId);

    setLoading(true)
    let result = api.post('/stock-report-projectWise&AllItemsTillDate', { userId, role, userName, projectId})
    result = await errorHandler(result)
    console.log('we got it', result.data);
    setProducts(result.data.data)
    setLoading(false)
  }

  const cellStyle = {
    border: '1px solid black',

    padding: '8px',
    textAlign: 'center',
  };


  const [modalOpen1, setModalOpen1] = useState(false)
  const [modalOpen2, setModalOpen2] = useState(false)
  const [itemSelected, setItemSelected] = useState("")
  const handleOpenModal = (item, field) => {
    if (!projectId) {
      alert("No Project Id Please Select Project First")
      return '';
    }
    setItemSelected(item)
    if (field == 'MIN') {
      setModalOpen1(true)
    }
    if (field == 'MRN') { setModalOpen2(true) }


  };
  const [show, setShow] = useState(false)

  const downloadExcel = () => {
    // Filter out rows where any of the specified columns have zero values
    const filteredProducts = products.filter(project => (
     
      parseFloat(project.mrnQuantity) !== 0 ||
      parseFloat(project.issuedQuantity) !== 0 
      
    ));
  
    // Log the filtered data
    console.log("Filtered data:", filteredProducts);
  
    // If no rows have non-zero data, alert the user and return
    if (filteredProducts.length === 0) {
      alert("No data with non-zero values found.");
      return;
    }
  
    // Constructing the data array
    const data = [
      ["S. No.", "Material Description", "UOM", "Average Material Rate", "Quantity Inward", "Inward Amount", "Quantity Outward", "Outward Amount", "Stock (As On Date)", "Amount"],
      // Mapping over filtered products to populate data
      ...filteredProducts.map((project, index) => [
        index + 1,
        `${project.materialCategory}/${project.materialSubCategory}/${project.materialDescription}`,
        project.uom,
        project.rate ? project.rate : "0.00",
        project.mrnQuantity ? project.mrnQuantity : "0.00",
        parseFloat(project.rate * project.mrnQuantity).toFixed(2) ? parseFloat(project.rate * project.mrnQuantity).toFixed(2) : "0.00",
        project.issuedQuantity ? project.issuedQuantity : "0.00",
        parseFloat(project.rate * project.issuedQuantity).toFixed(2) ? parseFloat(project.rate * project.issuedQuantity).toFixed(2) : "0.00",
        project.mrnQuantity - project.issuedQuantity ? project.mrnQuantity - project.issuedQuantity : "0.00",
        parseFloat(project.rate * (project.mrnQuantity - project.issuedQuantity)).toFixed(2) ? parseFloat(project.rate * (project.mrnQuantity - project.issuedQuantity)).toFixed(2) : "0.00",
      ])
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Stock Report");
    XLSX.writeFile(wb, "stock_report.xlsx");
  };
  


  return (
    <>
      <div className="title">
        <span>Stock Inward And Outward Project Wise</span>
        <div></div>
        {/* <div class="search-bar">
            <input type="text" class="form-control" placeholder="Search" />
            <div class="search-icon-container">
              <div class="search-icon">
                <div class="icon">
                  <i class="fas fa-search"></i>
                </div>
              </div>
            </div>
          </div> */}
      </div>
      <div className="container-fluid">
        <div className="form-group">
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
        <div className="row">
          
          
        </div>
        <div>
          <button className="btn mb-3" type="button" onClick={handleFetch}>
            Fetch StockReport
          </button>
          <button className="btn mb-3" type="button" onClick={downloadExcel}>
            Download Excel
          </button>
        </div>
        {/* <div className="mb-3">
          <label>Date:</label>
           <input
             type="date"
             value={selectedDate}
             onChange={handleDateChange}
           />
          </div> */}
      </div>

      {

        loading ?
          <Loader />
          :


          <>
            <button className="btn" type="button" onClick={() => setShow(!show)}>Click To Edit Other</button>
            <div className="container-fluid">

              <table className="table">
                <thead style={{ position: "sticky", top: "130px", backgroundColor: "#fff" }}>
                  <tr>
                    <th scope="col" style={cellStyle}>S. No.</th>
                    {/* <th scope="col" style={cellStyle}>MRN No.</th> */}
                    <th scope="col" style={cellStyle}>
                      Material Description</th>
                    <th scope="col" style={cellStyle}>UOM</th>
                    <th scope="col" style={cellStyle}>Average Material Rate</th>
                    <th scope="col" style={cellStyle}>Quantity Inward</th>
                    <th scope="col" style={cellStyle}>Inward Amount</th>
                    <th scope="col" style={cellStyle}>Quantity Outward</th>
                    <th scope="col" style={cellStyle}>Outward Amount</th>
                    <th scope="col" style={cellStyle}>Stock (As On Date)</th>
                    <th scope="col" style={cellStyle}>Amount</th>
                    {/* <th scope="col" style={cellStyle}>GP</th> */}
                    {/* <th scope="col" style={cellStyle}>Vendor Name</th> */}
                  </tr>
                </thead>
                <tbody>
                  {
                    products &&
                    products.map((item, index) => {
                      if (!show || (show && item.mrnQuantity !== 0)) {
                        return (
                          <tr key={item._id}>
                            <td scope="col" style={cellStyle}>{index + 1}</td>
                            {/* <th scope="col" style={cellStyle}>{item.mrnsId}</th> */}
                            <td scope="col" style={{ textAlign: "left", border: '1px solid black', padding: '8px' }}>
                              {item.materialCategory}/{item.materialSubCategory}/{item.materialDescription}
                            </td>
                            <td scope="col" style={cellStyle}>{item.uom}</td>
                            <th scope="col" style={cellStyle}>
                              {item.rate}
                            </th>
                            <th scope="col" style={cellStyle}>
                              <button className="btn" type="button" onClick={() => handleOpenModal(item, "MRN")}>
                                {item.mrnQuantity}
                              </button>
                            </th>
                            <th scope="col" style={cellStyle}>
                              {parseFloat(item.rate * item.mrnQuantity).toFixed(2)}
                            </th>
                            <th scope="col" style={cellStyle}>
                              <button className="btn" type="button" onClick={() => handleOpenModal(item, "MIN")}>
                                {item.issuedQuantity}
                              </button>
                            </th>
                            <th scope="col" style={cellStyle}>
                              {parseFloat(item.rate * item.issuedQuantity).toFixed(2)}
                            </th>
                            <th scope="col" style={cellStyle}>
                              {item.mrnQuantity - item.issuedQuantity}
                            </th>
                            <th scope="col" style={cellStyle}>
                              {parseFloat(item.rate * (item.mrnQuantity - item.issuedQuantity)).toFixed(2)}
                            </th>
                          </tr>
                        );
                      }
                      return null; // Make sure to return null if the condition is not met
                    })
                  }
                </tbody>
              </table>
            </div>
          </>
      }
      <CustomModal
        isOpen={modalOpen2}
        onClose={() => setModalOpen2(false)}
        size={"xl"}
        title={"Stock Report Inward"}
      >
        <Inward projectId={projectId} itemSelected={itemSelected}  />

      </CustomModal>
      <CustomModal
        isOpen={modalOpen1}
        onClose={() => setModalOpen1(false)}
        size={"xl"}
        title={"Stock Report Outward"}
      >
        <Outward projectId={projectId} itemSelected={itemSelected}  />

      </CustomModal>
    </>
  );
}
