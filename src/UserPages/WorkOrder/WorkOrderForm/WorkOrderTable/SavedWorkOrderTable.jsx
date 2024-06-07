import React, { useEffect, useState, useRef } from 'react'
import { api } from '../../../../CommonUtitlites/AxiosSetup/axiosDefault'
import { errorHandler } from '../../../../CommonUtitlites/Others/errorHandle'
import { formatDate } from '../../../../CommonUtitlites/Others/formattingDateAndName'
import CustomModal from '../../../../CommonUtitlites/ModalPopUp/CustomModal'
import Loader from '../../../../CommonUtitlites/Loader/Loader'
import {role,userId,userName} from '../../../../CommonUtitlites/Others/commonExportVariable'
import MiddleWareForPrintForWorkOrderModal from '../WorkOrderFormModal/MiddleWareForPrintModal'
import $ from 'jquery'; // Import jQuery
import 'datatables.net'; // Import DataTables

export default function SavedWorkOrderTable({amend_permission}) {
const [workOrders, setWorkOrders] = useState([]);
const [loading, setLoading] = useState(false);
const [toggle, setToggle] = useState('');
const tableRef = useRef(null); // Create a ref for the table element.
let dataTable = null; // Reference to the DataTable instance.

const [companyName, setCompanyName] = useState("");
  useEffect(() => {
    const getWorkOrder = async () =>{
      setLoading(true);
      let result = api.post("/get-save-userWorkOrder", {userId,role,userName})
      result=await errorHandler(result)
      console.log('we got',result)
      // alert(result.data.message)
      setWorkOrders(result.data.data)
      setLoading(false);
    }
    getWorkOrder()
  }, [toggle])

  useEffect(() => {
    // Initialize DataTable when the table element is available.
    if (tableRef.current) {
      $(tableRef.current).DataTable();
    }
  }, [workOrders]); // Trigger DataTable initialization when workOrders change.

  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const [workOrder, setWorkOrder] = useState("")

  const handleOpenModal = async (id)=>{
    // setLoading(true);
    let result = api.post("/get-savedWorkOrder-by-id", {userId,role,userName,workOrderId:id})
    result=await errorHandler(result)
    setWorkOrder(result.data.data)
    // alert(result.data.message)
    setIsModalOpen(true);
    // setLoading(false);
  }

  const handleCompanyChange = async(e) => {
    let selectedCompany = e.target.value
    setCompanyName(selectedCompany)
    if(selectedCompany&&selectedCompany!==''){
      setLoading(true);
      // console.log('selected', selectedCompany);
      let wos = api.post("/get-all-workOrder", {userId,role,userName});
      wos=await errorHandler(wos)
      const filteredWorkOrders = wos.data.data.filter((workOrder) => {
        return workOrder.nameOfCompanyInAddress === selectedCompany;
      });
      // console.log('we selected',filteredWorkOrders);
      setWorkOrders(filteredWorkOrders);
        setLoading(false);
    } else{
      setLoading(true);
      let result = api.post("/get-all-workOrder", {userId,role,userName})
      result=await errorHandler(result)
      // console.log(result)
      // alert(result.data.message)
      // console.log('all wo',result.data.data);
      setWorkOrders(result.data.data)
      setLoading(false);
    }
    // console.log(retrievedData);
}

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


  return (
    <>
    { loading?<Loader/>:<div className="container p-0 mt-3">
    <div className="mb-3">
            <label htmlFor="projectSelect" className="form-label">
              Select Company
            </label>
            <select
              className="form-control"
              id="projectSelect"
              onChange={handleCompanyChange}
              value={companyName} // Bind the selected project's ID
            >
              <option value="">Select a Company</option>
              <option value="SKYMETTLE BUILDCON PRIVATE LIMITED">
                SBPL
                </option>
                <option value="CARBYNE INFRASTRUCTURE PRIVATE LIMITED">
                CIPL
                </option>
              {/* {projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.name}
                </option>
              ))} */}
            </select>
          </div>
    <div>
      <table 
       ref={tableRef} // Set the ref for the table element. 
       id="myTable" className="display table" style={tableStyle}>
        <thead className="sticky-thead">
          <tr>
            <th style={cellStyle} >Work Order Id </th>
            {/* <th style={cellStyle} >Amend </th> */}
            <th style={cellStyle} >Vendor Name</th>
            <th style={cellStyle} >Work Order Date</th>
            {/* <th style={cellStyle} >Download PDF</th>
            <th style={cellStyle} >Send Email</th> */}
          </tr>
        </thead>
        <tbody>
          {workOrders &&
            workOrders?.map((workOrder) => (
              <tr>
                <td style={cellStyle} >
                  {" "}
                  <button
                    className="btn btn-link text-left"
                    onClick={() => handleOpenModal(workOrder.workOrderId)}
                  >
                    {" "}
                    {workOrder.workOrderId}{" "}
                  </button>
                </td>

                {/* <td style={cellStyle} >{`Amend : ${workOrder.amend}`}</td> */}
                <td style={cellStyle} >{workOrder.vendorName}</td>
                <td style={cellStyle} >{ formatDate(new Date( workOrder.workOrderDate))}</td>
                
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    <CustomModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title={"Saved Work Order Info"}
      size={'xl'}
    >
      {workOrder && <MiddleWareForPrintForWorkOrderModal amend_permission={amend_permission} workOrder={workOrder} isToggle={(toggle)=>setToggle(toggle)} saved={true}/>}
    </CustomModal>
  </div>
    }
    </>
  ) 
}
