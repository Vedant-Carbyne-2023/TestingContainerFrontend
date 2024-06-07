import React, { useEffect, useState } from 'react'
import { api } from '../../CommonUtitlites/AxiosSetup/axiosDefault'
import { errorHandler } from '../../CommonUtitlites/Others/errorHandle'
import {userId, role} from '../../CommonUtitlites/Others/commonExportVariable'
export default function AddSubCategory({categoryId,categoryName, error, setStatus}) {
  
  const [err, setErr] = useState(false)

  useEffect(() => {
    if(!categoryId) {alert("No Category Selected")
    setErr(true)
    error(err)
  }
  }, [categoryId])
  
  const handleSubmit = async(e) =>{
    e.preventDefault();
    const formData = new FormData(e.target)
    let subcategoryName = formData.get('subcategoryName')

    let result = api.post('/create-subcategory', {categoryId,userId, role, subcategoryName})
    result=await errorHandler(result)
    if(result.data && result.data.message) alert(result.data.message)
    setStatus(result.data.data._id)
    // alert(result.data)
    }
    
  return (
    <form onSubmit={handleSubmit}>
    <div className="form-group">
    <label htmlFor="categoryName">Category</label>
    <input
      type="text"
      className="form-control"
      placeholder="Search"
      id="categoryName"
      name="categoryName"
      value={categoryName?categoryName:""}
    />
    </div>
    <div className="form-group">
    <label htmlFor="subcategoryName">Sub Category</label>
    <input
      type="text"
      className="form-control"
      placeholder="Enter Sub Category Name"
      id="subcategoryName"
      name="subcategoryName"
    />
    </div>
    <button className='btn btn-primary' type='submit'>Submit</button>
    </form>
  )
}
