import React, { useEffect, useState } from 'react'
import { role, userId, userName} from "../../CommonUtitlites/Others/commonExportVariable";
import { api } from "../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../CommonUtitlites/Others/errorHandle";
import Swal from 'sweetalert2';
import Select from 'react-select';
import useGetAllUom from '../../CommonUtitlites/customHooks/useGetAllUom';

export default function EditProduct({item}) {
  const unitOfMeasurement = useGetAllUom();
  function customToLowerCase(input) {
    if (Array.isArray(input)) {
      // If input is an array, apply lowercase to each element
      return input.map(word => word.toLowerCase());
    } else if (typeof input === 'string') {
      // If input is a string, apply lowercase to the whole string
      return input.toLowerCase();
    } else {
      // Handle other types of input, e.g., numbers, objects, etc.
      return input;
    }
  }
  
  function toTitleCase(input) {
    if (Array.isArray(input)) {
      // If input is an array, apply title case to each element
      return input.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      });
    } else if (typeof input === 'string') {
      // If input is a string, apply title case to the whole string
      return input
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    } else {
      // Handle other types of input, e.g., numbers, objects, etc.
      return input;
    }
  }
 
  const categoryOptions = unitOfMeasurement.map(option => ({
    value: customToLowerCase(option.name),
    label: option.name,
  }));

  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect (() => {
    if (item.uom) {
      const selectedUOMs = Array.isArray(item.uom)
      ? item.uom.map(it => ({
          value: customToLowerCase(it),
          label: toTitleCase(it),
        }))
      : [
          {
            value: customToLowerCase(item.uom),
            label: toTitleCase(item.uom),
          },
        ];
      setSelectedOptions(selectedUOMs);
    }
  }, [item.uom]);
const handleSubmit = async(e) =>{
        e.preventDefault();
        const formData = new FormData(e.target)
        let hsnCode = formData.get('hsnCode')
        console.log('we have', hsnCode, item._id);
        let result = api.post('/edit-product', {productId:item._id,hsnCode, userId, role, userName, uom:selectedOptions.map(option => option.value.toLowerCase())})
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
      className="form-control"
      placeholder="Enter HSNCode"
      id="hsnCode"
      name="hsnCode"
      defaultValue={item.hsnCode}
    />
    </div>
    <div className="form-group">
          <label htmlFor="uom">UOM</label>
          <Select
            isMulti
            name="uom"
            options={categoryOptions}
            value={selectedOptions}
            onChange={setSelectedOptions}
          />
        </div>
{/* 
        <button className='btn btn-primary' type='submit'>Submit</button>
      </form> */}

    <button className='btn  btn-primary'  type='submit'>Submit</button>
    </form>
    </>
  )
}
