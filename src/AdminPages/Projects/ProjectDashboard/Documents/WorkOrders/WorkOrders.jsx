import React, { useEffect, useState } from "react";
import { api } from "../../../../../CommonUtitlites/AxiosSetup/axiosDefault";
import {userId, role, userName } from "../../../../../CommonUtitlites/Others/commonExportVariable";
import { errorHandler } from "../../../../../CommonUtitlites/Others/errorHandle";
import Loader from "../../../../../CommonUtitlites/Loader/Loader";
import CustomModal from "../../../../../CommonUtitlites/ModalPopUp/CustomModal";
import { formatDate } from "../../../../../CommonUtitlites/Others/formattingDateAndName";
import ShowWorkOrder from "../../../../OrderApprovals/WorkOrder/ShowWorkOrder";


const WorkOrders = ({project}) => {

    console.log('project: ', project);
    console.log('projectName: ', project.name, project.id);

    const [workOrders, setWorkOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toggle, setToggle] = useState(true);

    useEffect(() => {
        const getWorkOrder = async () =>{
          setLoading(true);
          let result = api.post("/get-workOrderProjectwise", {projectId: project.id, projectName: project.name,userId,role,userName});
          result=await errorHandler(result)
          console.log(result)
          setWorkOrders(result.data.data);
          setLoading(false);
        }
        getWorkOrder()
      }, [toggle])


      const [isModalOpen, setIsModalOpen] = useState(false)
  
      const [workOrder, setWorkOrder] = useState("")
    
      const handleOpenModal = async (id)=>{
        setLoading(true);
        let result = api.post("/get-workOrder-by-id", {userId,role,userName,workOrderId:id})
        result=await errorHandler(result)
        setWorkOrder(result.data.data)
        // alert(result.data.message)
        setIsModalOpen(true);
        setLoading(false);
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
            <div className="table-responsive">
              <table className="table" style={tableStyle}>
                <thead className="sticky-thead">
                  <tr>
                    <th style={cellStyle} >Work Order Id </th>
                    <th style={cellStyle} >Vendor Name</th>
                    <th style={cellStyle} >Work Order Date</th>
                    {/* <th style={cellStyle} >Download PDF</th> */}
                    {/* <th style={cellStyle} >Send Email</th> */}
                    <th style={cellStyle} >Download PDF</th>
                    <th style={cellStyle} >Approved</th>
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
        
                        <td style={cellStyle} >{workOrder.vendorName}</td>
                        <td style={cellStyle} >{ formatDate(new Date( workOrder.workOrderDate))}</td>
                        <td style={cellStyle} >
                            <a href={workOrder.pdfOfWorkOrder}>
                            Download PDF
                            </a>
                          {/* </button> */}
                        </td>
                        <td style={cellStyle}>
                            {workOrder.isApproved?'Approved':'Not Approved'}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <CustomModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title={"Work Order Info"}
              size={"xl"}
            >
                {workOrder && <ShowWorkOrder workOrder={workOrder}/>}
            </CustomModal>
          </div>
    }
        </>
     );
}
 
export default WorkOrders;