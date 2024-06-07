import React, { useEffect, useState } from 'react'
import CustomModal from '../../CommonUtitlites/ModalPopUp/CustomModal'
import { api } from '../../CommonUtitlites/AxiosSetup/axiosDefault';
import { userId, role } from '../../CommonUtitlites/Others/commonExportVariable';
import { errorHandler } from '../../CommonUtitlites/Others/errorHandle';
import Swal from 'sweetalert2';
import Ops_Add_Database from './Ops_Add_Database';

export default function Ops_Database() {
    const [isModalOpen, setIsModalOpen] = useState(false)
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
        <button onClick={()=>setIsModalOpen(true)} className='btn mt-3'>Edit Operational Database </button>
        <div className="container mt-4">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Index Code</th>
            <th>WTD</th>
            <th>Description</th>
            <th>UOM</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.indexCode}</td>
              <td>{item.wtd?item.wtd:100}%</td>
              <td>{item.description}</td>
              <td>{item.uom}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

        <CustomModal
        title="Operational Boq"
        isOpen={isModalOpen}
        onClose={()=>setIsModalOpen(false)}
        >
          <Ops_Add_Database />
        </CustomModal>
    </React.Fragment>
  )
}
