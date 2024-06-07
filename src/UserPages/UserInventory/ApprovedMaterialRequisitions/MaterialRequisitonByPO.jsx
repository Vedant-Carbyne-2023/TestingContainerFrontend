import React, { useEffect, useState } from 'react'

import { errorHandler } from '../../../CommonUtitlites/Others/errorHandle';
import { api } from '../../../CommonUtitlites/AxiosSetup/axiosDefault';
import {userId, role} from '../../../CommonUtitlites/Others/commonExportVariable'
import CustomModal from '../../../CommonUtitlites/ModalPopUp/CustomModal';
import MrnShowModal from '../../UserIndent(MR)/DetailShowingModal/MrnShowModal';
import { formatDate } from '../../../CommonUtitlites/Others/formattingDateAndName';
import useGetApprovedMR_ProjectWise from '../../../CommonUtitlites/customHooks/useGetApprovedMR_ProjectWise';

export default function MRN_Stock() {

  let approvedIndent = useGetApprovedMR_ProjectWise()


  const [isModalOpen, setIsModalOpen] = useState(false)
  const [entry, setModalData] = useState({})
  const handleModalOpen = (data) =>{
    setIsModalOpen(true)
    // console.log(data)
    setModalData(data)
  }
  
  return (
    <div className='container p-0 mt-3'>
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>PO No.</th> 
            <th>MRN No.</th> 
            <th>MRN Date</th>
            <th>Project Name</th>
            <th>Contractor Name</th>
          </tr>
        </thead>
        <tbody>

        {approvedIndent.map((item) => (
            <tr key={item.indentId}>
              <td>
                <button
                  className="btn btn-link text-left"
                  onClick={() => handleModalOpen(item)}
                  >
                  {item.indentId}
                </button>
              </td>
                  <td>{item.indentId}</td>
              <td>{formatDate(new Date(item.indentDate))}</td>
              <td>{item.project}</td>
              <td>{item.vendor}</td>
             
            </tr>
          ))}
        </tbody>
      </table>

     
      <CustomModal 
      isOpen={isModalOpen}
      onClose={()=>setIsModalOpen(false)}
      title={"MRN Info"}
      size={'large'}
      >

       <MrnShowModal data={entry}/>


      </CustomModal>
      
        
      </div>
      </div>
    
  )
}
