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
import Loader from "../../CommonUtitlites/Loader/Loader";
import exportToCSV from "../../CommonUtitlites/Others/exportToCSV";

export default function CompleteStockReportTillDate() {
  const [products, setProducts] = useState([])

  const [dateTimeTo, setDateTimeTo] = useState('');
  const [dateTimeFrom, setDateTimeFrom] = useState('');

  const [projectName, setProjectName] = useState("");
  const [projectId, setProjectId] = useState("");

  let projects = useGetAllProjectsForAdmin()
  const [loading, setLoading] = useState(false)

  const handleProjectChange = async (e) => {
    const selectedProjectId = e.target.value;
    setProjectId(selectedProjectId)
    //   if(!selectedProjectId){
    //     alert("Please Select Project ")
    //     return;
    //   }
    //   setLoading(true)
    //  let result = api.post('/stock-report-projectWise&AllItems', {userId,role, projectId:selectedProjectId}) 
    //  result = await errorHandler(result)
    //  console.log(result.data)
    //  setProducts(result.data.data)
    //  setLoading(false)
  };
  const handleFetch = async (e) => {
    if (!projectId || !dateTimeFrom || !dateTimeTo) {
      alert('Please Select Project and DateTime');
      return;
    }
    console.log('we have', projectId, dateTimeFrom, dateTimeTo);

    setLoading(true)
    let result = api.post('/stock-report-projectWise&AllItemsTillDate', { userId, role, userName, projectId, dateTimeFrom, dateTimeTo })
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

  const handleExcel = async () => {
    function formatItemToRow(item, index) {
      return [
        index + 1,
        `${item.materialCategory}/${item.materialSubCategory}/${item.materialDescription}`,
        item.uom,
        item.rate,
        item.mrnQuantity,
        item.rate * item.mrnQuantity,
        item.issuedQuantity,
        item.rate * item.issuedQuantity,
        item.mrnQuantity - item.issuedQuantity,
        item.rate * (item.mrnQuantity - item.issuedQuantity),
      ];
    }
    let headers = ['S.No.', 'Material Description', 'UOM', 'Average Rate', 'Quantity Inward', 'Amount', 'Quantity Outward', 'Amount', 'Stock On Date', 'Amount']
    exportToCSV(products, headers, formatItemToRow)
  }

  return (
    <>

      <div className="mt-4 " style={{ textAlign: 'center', fontWeight: 'bold', fontSize: "14px" }}>
        <span>Stock Inward And Outward Project Wise</span>
      </div>


      <hr style={{ height: '1px', backgroundColor: 'black', border: 'none', fontWeight: 'bold' }} />

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
          <div className="col-md-6">


            <div className="form-group">
              <label htmlFor="filterDateTime">Select Date and Time From:</label>
              <input
                type="datetime-local" // Use datetime-local input type to capture both date and time
                id="filterDateTime"
                className="form-control"
                name="filterDateTime"
                value={dateTimeFrom}
                onChange={(e) => { setDateTimeFrom(e.target.value) }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="filterDateTime">Select Date and Time To:</label>
              <input
                type="datetime-local" // Use datetime-local input type to capture both date and time
                id="filterDateTime"
                name="filterDateTime"
                className="form-control"
                value={dateTimeTo}
                onChange={(e) => { setDateTimeTo(e.target.value) }}
              />
            </div>
          </div>
        </div>
        <div>
          <button style={{ fontSize: '16px',border:".5px solid black"  }} className="btn mb-4 mt-3 mr-5" type="button" onClick={handleFetch}>
            Fetch StockReport
          </button>
          <button style={{ fontSize: '16px' ,border:".5px solid black" }} className="btn mb-4 mt-3" onClick={() => handleExcel()}>Export To Excel</button>
        </div>
      </div>

      {

        loading ?
          <Loader />
          :


          <>
            <button className="btn mb-4" type="button" style={{ fontSize: '16px' ,border:".5px solid black" }} onClick={() => setShow(!show)}>
              Click To Edit Other
            </button>

            <div className="container-fluid">

              <table className="table">
                <thead style={{ position: "sticky", top: "130px", backgroundColor: "#cedfe5" }}>
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
                    <th scope="col" style={cellStyle}>Stock Amount</th>
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
        <Inward projectId={projectId} itemSelected={itemSelected} dateTimeFrom={dateTimeFrom} dateTimeTo={dateTimeTo} />

      </CustomModal>
      <CustomModal
        isOpen={modalOpen1}
        onClose={() => setModalOpen1(false)}
        size={"xl"}
        title={"Stock Report Outward"}
      >
        <Outward projectId={projectId} itemSelected={itemSelected} dateTimeFrom={dateTimeFrom} dateTimeTo={dateTimeTo} />

      </CustomModal>
    </>
  );
}
