import React, { useEffect, useState } from 'react'
import { api } from '../../../CommonUtitlites/AxiosSetup/axiosDefault'
import {userId, role} from '../../../CommonUtitlites/Others/commonExportVariable'
import { errorHandler } from '../../../CommonUtitlites/Others/errorHandle'
import CustomModal from '../../../CommonUtitlites/ModalPopUp/CustomModal'
import MaterialIssueNoteFormShow from '../../UserInventory/MaterialIssueNotes/MaterialIssueNoteShow/MaterialIssueNoteFormShow'
import MrnShowModal from '../../UserIndent(MR)/DetailShowingModal/MrnShowModal'
export default function MaterialIssueNote({vendorName}) {
const [mins, setMins] = useState([])
    useEffect(() => {
    const getMIN = async()=>{
        let result = api.post("/get-min-vendorwise", {userId,role,vendorName})
        result = await errorHandler(result)
        // console.log(result.data.data)
        setMins(result.data.data)
    }
    getMIN()
    }, [vendorName])
    
const [openIndent, setOpenIndent] = useState(false)
const [openMIN, setOpenMIN] = useState(false)
const [minData, setMinData] = useState({})
const [indentData, setIndentData] = useState({})

const handleMin = async(minId)=>{
    // console.log(minId)
    let result = api.post('/get-single-min', {userId,role,minId})
    result = await errorHandler(result)
    setMinData(result.data.data)
    setOpenMIN(true)
}

const handleIndent = async(indentId)=>{
    // console.log(indentId)
    let result = api.post('/get-single-indent', {userId,role,indentId})
    result = await errorHandler(result)
    setIndentData(result.data.data)
    // console.log(result.data.data)
    setOpenIndent(true)

}


  return (
    <div className="container mt-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Sno</th>
            <th scope="col">Project Name</th>
            <th scope="col">GP Name</th>
            <th scope="col">Indent ID</th>
            <th scope="col">Min ID</th>
          </tr>
        </thead>
        <tbody>
          {mins.map((row, index) => (
            <tr key={index}>
              <th scope="row">{index+1}</th>
              <td>{row.project}</td>
              <td>{row.gp}</td>
              <td>
                <button className='btn' onClick={()=>handleIndent(row.indentId)}>
                {row.indentId}
                </button>
                </td>

              <td>
                <button className='btn' onClick={()=>handleMin(row.minId)}>
                {row.minId}
                </button>
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
      title={"Material Requisition"}
        isOpen={openIndent}
        onClose={()=>setOpenIndent(false)}
      >
        <MrnShowModal data={indentData} />
      </CustomModal>
    </div>
  )
}
