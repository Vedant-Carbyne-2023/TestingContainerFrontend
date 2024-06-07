import React, { useEffect, useState, useRef } from 'react'
import { api } from '../../../CommonUtitlites/AxiosSetup/axiosDefault';
import { errorHandler } from '../../../CommonUtitlites/Others/errorHandle';
import { formatDate } from '../../../CommonUtitlites/Others/formattingDateAndName';
import CustomModal from '../../../CommonUtitlites/ModalPopUp/CustomModal'
import Loader from '../../../CommonUtitlites/Loader/Loader';
import {role,userId,userName} from '../../../CommonUtitlites/Others/commonExportVariable';
import Swal from 'sweetalert2';
import ShowWorkOrder from './ShowWorkOrder';
import $ from 'jquery'; // Import jQuery
import 'datatables.net'; // Import DataTables
import TableWithPaginationAndFilter from '../../../CommonUtitlites/TableHavingFilter/TableWithPaginationAndFilter';
const WorkOrder = () => {
    const [workOrders, setWorkOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toggle, setToggle] = useState(true);
    const tableRef = useRef(null); // Create a ref for the table element.
    let dataTable = null; // Reference to the DataTable instance.

    useEffect(() => {
        const getWorkOrder = async () =>{
          setLoading(true);
          let result = api.post("/get-all-workOrder", {userId,role,userName});
          result=await errorHandler(result)
          // console.log(result)
          // alert(result.data.message)
        //   console.log('main data',result.data.data);
        // get only unapproved workOrders
          // const filteredData = result.data.data.filter(item => item.isApproved === false);
          // console.log('not approved ones',filteredData);
          setWorkOrders(result.data.data);
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
      // useEffect(() => {
      //   if (tableRef.current && $.fn.DataTable) {
      //     if (dataTable) {
      //       // If DataTable instance exists, destroy it before reinitializing
      //       dataTable.destroy();
      //     }
      //     // Initialize DataTable
      //     dataTable = $(tableRef.current).DataTable({
      //       scrollX: false,
      //       // Specify DataTable options here.
      //     });
      //   }
      // }, [workOrders]);
      // useEffect(() => {
      //   // Initialize DataTable when the table element is available.
      //   if (tableRef.current) {
      //     if (!$.fn.DataTable.isDataTable(tableRef.current)) {
      //       // DataTable is not initialized, initialize it now.
      //       dataTable = $(tableRef.current).DataTable({
      //         // Specify DataTable options here.
      //       });
      //     }
      //   }
      // }, [workOrders]);

      const [isModalOpen, setIsModalOpen] = useState(false)
      const [handleSearch, setHandleSearch] = useState(false);

      const [workOrder, setWorkOrder] = useState("")
    
      const handleOpenModal = async (id, amend)=>{
        // setLoading(true);
        let result = api.post("/get-workOrder-by-id", {userId,role,userName,workOrderId:id, amend:amend})
        result=await errorHandler(result)
        console.log(result)
        setWorkOrder(result.data.data)
        // alert(result.data.message)
        setIsModalOpen(true);
        // setLoading(false);
      }

      const handleApproval = async (id)=>{
        // console.log('called to approve', userId, role, id);
        let result = api.post("/approve-workOrder", {userId,role, userName,workOrderId:id})
        result=await errorHandler(result)
         setToggle(!toggle);
         setIsModalOpen(false)
        //  console.log('toggle is',toggle, id);
        Swal.fire(result.data.message);
        // alert(result.data.message)
      }

    
    return ( 
        <>
          { loading?<Loader/>:<div className="container p-0">
          {loading ? (
          <Loader />
        ) : (
          <>
            <TableWithPaginationAndFilter
              apiRoute={"/get-all-workOrder"}
              toggle={toggle}
              // projects={projects}
              setHandleSearch={(data)=>setHandleSearch(data)}
              handleSearch={handleSearch}
              headers={[
                {
                  label: "Work Order Id",
                  field: "workOrderId",
                  renderItem: (item) =>
                    item && (
                      <button
                        className="btn btn-link text-left"
                        onClick={() =>
                          handleOpenModal(item.workOrderId, item.amend)
                        }
                      >
                        {item.workOrderId}
                      </button>
                    ),
                },
                {
                  label: "Amend",
                  field: "amend",
                  renderItem: (item) => item && `Amend: ${item.amend}`,
                },
                {
                  label: "Work Order Date",
                  field: "workOrderDate",
                  renderItem: (item) =>
                    item && formatDate(new Date(item.workOrderDate)),
                },
                {
                  label: "Vendor Name",
                  field: "vendorName",
                  renderItem: (item) => item && item.vendorName,
                },
                {
                  label: "Approved",
                  field: "approved",
                  renderItem: (item) => item && item.isApproved?"Approved":"Not Approved",
                },
                {
                  label: "Download PDF",
                  field: "pdfOfWorkOrder",
                  renderItem: (item) =>
                    item && (
                      <a
                        href={item.pdfOfWorkOrder}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download PDF
                      </a>
                    ),
                },
                
              ]}
              loading={loading}
              handleOpenModal={handleOpenModal}
              // handleComparision={handleComparision}
              // amend_permission={amend_permission}
              // totalPages={totalPages}
              // pageOccupied={pageOccupied}
              // setPageOccupied={setPageOccupied}
            />
          </>
        )}
            <CustomModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title={"Work Order Info"}
              size={"xl"}
            >
                {workOrder && <ShowWorkOrder workOrder={workOrder}/>}
                {workOrder && <button
                className="btn btn-link text-left"
                onClick={() => handleApproval(workOrder.workOrderId)}
                disabled={workOrder.isApproved}
                          >
                Approve
            </button>}
              {/* {workOrder && <MiddleWareForPrintForWorkOrderModal amend_permission={amend_permission} workOrder={workOrder} isToggle={(toggle)=>setToggle(toggle)}/>} */}
            </CustomModal>
          </div>
    }
        </>
     );
}
 
export default WorkOrder;