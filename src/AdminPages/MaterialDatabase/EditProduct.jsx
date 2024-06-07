import React, { useState } from 'react'
import { api } from '../../CommonUtitlites/AxiosSetup/axiosDefault';
import { errorHandler } from '../../CommonUtitlites/Others/errorHandle';
import { role, userId, userName} from "../../CommonUtitlites/Others/commonExportVariable";
import Swal from 'sweetalert2';

export default function EditProduct({item}) {


console.log('into Edit', item);

const handleSubmit = async(e) =>{
        e.preventDefault();
        const formData = new FormData(e.target)
        let hsnCode = formData.get('hsnCode')
        console.log('we have', hsnCode, item._id);
        let result = api.post('/edit-product', {productId:item._id,hsnCode, userId, role, userName})
        result = await errorHandler(result)
        console.log('res',result);
        // setStatus(result.data.data._id)
        
        if(result.data && result.data.message){
          Swal.fire(result.data.message);
          // alert(result.data.message);
        }
}


  return (
    <>
    <form onSubmit={handleSubmit}>
    <div className="form-group">
    <label htmlFor="productCode">Product Code:</label>
    <input
      disabled
      value={item.productCode}
      type="text"
      className="form-control"
      placeholder="NA"
      id="productCode"
      name="productCode"
    />
    </div>
    <div className='form-group'>
    <label htmlFor="hsnCode">HSN Code:</label>
    <input
      type="text"
      value={item.hsnCode}
      className="form-control"
      placeholder="Enter HSNCode"
      id="hsnCode"
      name="hsnCode"
    />
    </div>
    <button className='btn  btn-primary'  type='submit'>Submit</button>
    </form>
    </>
  )
}
