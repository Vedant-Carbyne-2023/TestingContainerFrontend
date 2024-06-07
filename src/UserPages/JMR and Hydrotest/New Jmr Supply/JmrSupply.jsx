import React, { useEffect, useState } from 'react'
import InputForm from './InputForm'
import { api } from '../../../CommonUtitlites/AxiosSetup/axiosDefault'
import { errorHandler } from '../../../CommonUtitlites/Others/errorHandle'
import Swal from 'sweetalert2'
import MainTable from './TableComponent/MainTable'

export default function JmrSupply() {
       const [formData, setFormData] = useState("")
       const [tableData, setTableData] = useState([]);
  const [boqDetails, setBoqDetails] = useState([])
       const handleSubmit = async()=>{
        let result = api.post('/create-jmr-supply',{formData,tableData})
        result = await errorHandler(result)
        console.log(result)
        Swal.fire({
          title:result.data.message,
          icon:"success",
          timer:3000
        })
       }

// console.log(tableData)
   

  return (
    <div>
        <div className="col-md-12">
        <InputForm setData={(data)=>setFormData(data)}  setTableData={(data)=>setTableData(data)} setBoqData={(data)=>setBoqDetails(data)} />
        </div>
        <MainTable setTableDataInForm={(data)=>setTableData(data)} table={tableData} boqDetails={boqDetails}/>


        <button className='form-control' onClick={handleSubmit}>Submit</button>
    </div>

  )
}
