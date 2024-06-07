import React, { useState } from 'react';
import Papa from 'papaparse';
import { api } from '../../../CommonUtitlites/AxiosSetup/axiosDefault';
import { errorHandler } from '../../../CommonUtitlites/Others/errorHandle';
import {userId, role, userName } from '../../../CommonUtitlites/Others/commonExportVariable'
import Loader from '../../../CommonUtitlites/Loader/Loader';
import Swal from 'sweetalert2';
export default function CSVUploader({projectId, selectedGp}) {
const [loading, setLoading] = useState(false)
const [mainFile, setMainFile] = useState(null)
  const handleFileChange =  async(event) => {
    const file = event.target.files[0];
    setMainFile(file)
  };
  

 

  const handleSubmitBoq = async() => {
    setLoading(true)
    // const file = event.target.files[0];

    if(!selectedGp.id || !selectedGp.name){
      Swal.fire({
        title:"Please Selected Gp First",
        icon:'warning'
        
      })
      setLoading(false)
      return;
    }

    
    const formData = new FormData()
    formData.append("userId", userId)
    formData.append("role", role)
    formData.append("userName", userName)
    formData.append("excelFile", mainFile)
    formData.append("projectId", projectId)
    formData.append("gpId", selectedGp.id)
    formData.append("gpName", selectedGp.name)

    // console.log(api)
    let result =  api.post('/post-boq-excel',formData)
    result = await errorHandler(result)
    // console.log(result)
    Swal.fire({
      title:result.data.message,
      text:"Fetching Boq Details Now",
      icon:"success"
    })
    
   
    

      let result2 =  api.post('/create-boqForm-gpWise',{userId,role,userName, projectId, gpName:selectedGp.name, gpId:selectedGp.id })
      result2 = await errorHandler(result2)
      // console.log(result)

 Swal.fire({
      title:result.data.message,
      text:"Fetching Boq Details Successful",
      icon:"success"
    })
    
//     else{
// Swal.fire({
//       title:"Some Error Occured In Fetch",
//       icon:"warning"
//     })
//     }
    setLoading(false)


  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className='d-flex' style={{ justifyContent: 'space-between' }}>
          <input
            type='file'
            className='form-control mr-5'
            accept='.csv, .xlsx'
            onChange={handleFileChange}
          />
          {mainFile && (
            <button className='btn form-control' onClick={handleSubmitBoq}>
              Upload Boq To Inventory
            </button>
          )}
        </div>
      )}
    </div>
  );
}

