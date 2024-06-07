import React, { useEffect, useState } from 'react'
import CustomModal from '../../CommonUtitlites/ModalPopUp/CustomModal'
import { api } from '../../CommonUtitlites/AxiosSetup/axiosDefault';
import { userId, role } from '../../CommonUtitlites/Others/commonExportVariable';
import { errorHandler } from '../../CommonUtitlites/Others/errorHandle';
import Swal from 'sweetalert2';
import Ops_Database from './Ops_Database';
import Ops_Boq_GpWise from './Ops_Boq_GpWise';

export default function Ops_Boq() {
    const [isModalOpen, setIsModalOpen] = useState('1')
    const [data, setData] = useState([])
    useEffect(() => {
      const getData = async() =>{
        let result = api.post('/get-operational-boq-database',{userId,role})
        result = await errorHandler(result)
        const sortedData = result.data.data.sort((a, b) => a.indexCode - b.indexCode);

        setData(sortedData);
      }
      getData()
    }, [isModalOpen])
    
    console.log(data)

  


  return (
    <React.Fragment>
    <div>
        <button onClick={()=>setIsModalOpen('1')} className='btn'>Operational Database </button>
        <button onClick={()=>setIsModalOpen('2')} className='btn'>Add Operational Boq (Gp Wise)</button>
        <button onClick={()=>setIsModalOpen('3')} className='btn'>View / Edit Operational  Boq (Gp Wise)</button>
        <button onClick={()=>setIsModalOpen('4')} className='btn'>View Operational Boq (Project Wise)</button></div>
       
       {
        isModalOpen == '1'
        ?
        <Ops_Database />
        :
        <Ops_Boq_GpWise/>
       }
          
       
    </React.Fragment>
  )
}
