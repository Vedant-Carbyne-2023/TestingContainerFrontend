import React, { useState } from 'react'
import { api } from '../../CommonUtitlites/AxiosSetup/axiosDefault';
import { errorHandler } from '../../CommonUtitlites/Others/errorHandle';
import { role, userId, userName} from "../../CommonUtitlites/Others/commonExportVariable";
import Swal from 'sweetalert2';

export default function AddCategory({setStatus}) {




const handleSubmit = async(e) =>{

  
e.preventDefault();
const formData = new FormData(e.target)
let categoryName = formData.get('categoryName')
let result = api.post('/create-category', {categoryName, userId, role, userName})
result = await errorHandler(result)

setStatus(result.data.data._id)

if(result.data && result.data.message){
  Swal.fire(result.data.message);
  // alert(result.data.message);
}


}


  return (
    <form onSubmit={handleSubmit}>
    <div className="form-group">
    <label htmlFor="categoryName">Category</label>
    <input
      type="text"
      className="form-control"
      placeholder="Enter Category Name"
      id="categoryName"
      name="categoryName"
    />
    </div>
    <button className='btn  btn-primary'  type='submit'>Submit</button>
    </form>
  )
}
