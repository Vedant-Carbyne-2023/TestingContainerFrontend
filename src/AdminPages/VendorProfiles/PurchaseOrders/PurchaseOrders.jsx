import React, { useEffect, useState } from 'react'
import { api } from '../../../CommonUtitlites/AxiosSetup/axiosDefault'
import {userId, role, userName} from '../../../CommonUtitlites/Others/commonExportVariable'
import { errorHandler } from '../../../CommonUtitlites/Others/errorHandle'
import CustomModal from '../../../CommonUtitlites/ModalPopUp/CustomModal'
import MaterialIssueNoteFormShow from '../../Inventory/MaterialIssueNotes/MaterialIssueNoteShow/MaterialIssueNoteFormShow'
import MrnShowModal from '../../MaterialRequisition/DetailShowingModal/MrnShowModal'
export default function PurchaseOrders({msName, msId}) {
const [mins, setMins] = useState([])
    useEffect(() => {
    const getMIN = async()=>{
        let result = api.post('/get-all-by-msname', {userId,role,userName,msName,  msId})
        result = await errorHandler(result)
        console.log(result.data.data)
        setMins(result.data.data)
    }
    if(msName)
    {
      getMIN()
    }
    }, [msName])
    
const [openIndent, setOpenIndent] = useState(false)
const [openMIN, setOpenMIN] = useState(false)
const [minData, setMinData] = useState({})
const [indentData, setIndentData] = useState({})



const handleIndent = async(indentId)=>{
    console.log(indentId)
    let purchaseOrder = mins.find(id => id.poId==indentId)
    console.log(purchaseOrder)
    setIndentData(purchaseOrder)
    setOpenIndent(true)

}


  return (
    <div className="container mt-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">S. No</th>
            <th scope="col">Project Name</th>
            <th scope="col">Purchase Order ID</th>
            <th scope="col">Prepared By</th>
            <th scope="col">Approved Or Not Approved</th>
            <th scope="col">Approved On</th>
            <th scope="col">Approved By </th>
            <th scope="col">Download Purchase Order </th>
          </tr>
        </thead>
        <tbody>
          {mins.map((row, index) => (
            <tr key={index}>
              <th scope="row">{index+1}</th>
              <td>{row.projectName}</td>
              <td>
                {/* <button className='btn' onClick={()=>handleIndent(row.poId)}> */}
                {row.poId}
                {/* </button> */}
                </td>
              <td>{row.preparedBy}</td>
              <td>{row.isApproved?"Approved":"Not Approved"}</td>
              <td>{row.isApproved?approvedOn:"Not Approved"}</td>
              <td>{row.isApproved?approvedBy:"Not Approved"}</td>

              <td>
              <a href={row.pdfOfPurchaseOrder} download>
    Download Purchase Order
  </a>
                </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <CustomModal
      title={"Purchase Order"}
        isOpen={openIndent}
        onClose={()=>setOpenIndent(false)}
      >
        <PurchaseO data={indentData} />
      </CustomModal> */}
    </div>
  )
}
