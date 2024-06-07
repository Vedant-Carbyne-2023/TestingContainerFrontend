import React, { useEffect, useState } from 'react'
import { api } from '../../../CommonUtitlites/AxiosSetup/axiosDefault'
import {userId, role, userName} from '../../../CommonUtitlites/Others/commonExportVariable'
import { errorHandler } from '../../../CommonUtitlites/Others/errorHandle'
import CustomModal from '../../../CommonUtitlites/ModalPopUp/CustomModal'
import MaterialIssueNoteFormShow from '../../Inventory/MaterialIssueNotes/MaterialIssueNoteShow/MaterialIssueNoteFormShow'
import MrnShowModal from '../../MaterialRequisition/DetailShowingModal/MrnShowModal'
import { format } from 'date-fns'
import WorkOrderFormModal from '../../WorkOrder/WorkOrderForm/WorkOrderFormModal/WorkOrderFormModal'
export default function WorkOrders({vendorName, vendorId}) {
const [mins, setMins] = useState([])
    useEffect(() => {
    const getMIN = async()=>{
        let result = api.post("/get-workorder-by-vendor-id", {userId,role,userName,vendorId, vendorName})
        result = await errorHandler(result)
        console.log(result.data.data)
        setMins(result.data.data)
    }
    console.log(vendorName)
    if(vendorId && vendorName){
      getMIN()

    }
    }, [vendorName, vendorId])
    
const [openIndent, setOpenIndent] = useState(false)
const [openMIN, setOpenMIN] = useState(false)
const [minData, setMinData] = useState({})
const [indentData, setIndentData] = useState({})



const handleIndent = async(indentId)=>{
    console.log(indentId)
    console.log(mins)
    let workOrder = mins.find(id => id.workOrderId==indentId)
    console.log(workOrder)
    setIndentData(workOrder)
    setOpenIndent(true)

}


  return (
    <div className="container mt-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Sno</th>
            <th scope="col">Project Name</th>
            <th scope="col">Work Order ID</th>
            <th scope="col">Prepared By</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {mins.map((row, index) => (
            <tr key={index}>
              <th scope="row">{index+1}</th>
              <td>{row.projectName}</td>
              <td>
                <button className='btn' onClick={()=>handleIndent(row.workOrderId)}>
                {row.workOrderId}
                </button>
                </td>
              <td>{row.preparedBy}</td>

              <td>
                {format(new Date(row.workOrderDate), 'dd-MM-yyyy')}
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    
      <CustomModal
      title={"Material Issue Note"}
        isOpen={openMIN}
        onClose={()=>setOpenMIN(false)}
      >
        <MaterialIssueNoteFormShow data={minData} />
      </CustomModal>
    
      <CustomModal
      title={"WorkOrder"}
        isOpen={openIndent}
        onClose={()=>setOpenIndent(false)}
      >
        <WorkOrderFormModal workOrder={indentData} />
      </CustomModal>
    </div>
  )
}
